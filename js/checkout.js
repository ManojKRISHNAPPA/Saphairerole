/* ============================================================
   THE SAPPHIRE SCROLL — Checkout Engine
   ------------------------------------------------------------
   Powers checkout.html and thankyou.html:
     • reads the cart, computes totals
     • collects billing details
     • opens Razorpay Checkout (client-only)
     • on success: persists the order, emails customer + owner
       via EmailJS, and redirects to the thank-you page
     • thank-you page renders the order + builds a PDF invoice

   Depends on: js/config.js, Razorpay checkout.js, EmailJS SDK,
   jsPDF (loaded on the relevant pages). Standalone — does not
   rely on main.js internals beyond the shared localStorage keys.
   ============================================================ */
(function () {
  'use strict';

  const CFG = window.SS_CONFIG || {};
  const $   = (sel, ctx = document) => ctx.querySelector(sel);
  const INR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
  const rules = (CFG.order || {});

  function hasValidRazorpayKey() {
    const keyId = CFG.razorpay && CFG.razorpay.keyId;
    return !!keyId && !String(keyId).includes('REPLACE_ME');
  }

  function manualCheckoutEnabled() {
    return rules.allowManualWithoutPayment === true;
  }

  // ── Cart + totals ─────────────────────────────────────────
  function getCart() {
    try { return JSON.parse(localStorage.getItem('ss_cart') || '[]'); }
    catch { return []; }
  }

  function computeTotals(cart) {
    const subtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const shipping = subtotal >= (rules.freeShippingThreshold ?? 2000)
      ? 0 : (rules.shippingFlat ?? 99);
    const tax   = Math.round(subtotal * (rules.taxRate ?? 0.18));
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }

  function orderNumber() {
    const d = new Date();
    const stamp = d.getFullYear().toString().slice(2) +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0');
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `SS-${stamp}-${rand}`;
  }

  function deliveryWindow() {
    const d = new Date();
    d.setDate(d.getDate() + (rules.deliveryDays ?? 7));
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function itemsAsText(cart) {
    return cart.map(i => `${i.name}${i.variant ? ' (' + i.variant + ')' : ''} × ${i.qty} — ${INR(i.price * i.qty)}`).join('\n');
  }

  // ============================================================
  //  CHECKOUT PAGE
  // ============================================================
  function initCheckoutPage() {
    const form = $('#checkout-form');
    if (!form) return;

    const cart = getCart();
    const summaryWrap = $('#co-summary-items');
    const emptyWrap   = $('#co-empty');
    const payBtn      = $('#co-pay-btn');

    if (cart.length === 0) {
      if (emptyWrap) emptyWrap.style.display = 'block';
      const panel = $('#co-main');
      if (panel) panel.style.display = 'none';
      return;
    }

    const totals = computeTotals(cart);

    // Render order summary
    if (summaryWrap) {
      summaryWrap.innerHTML = cart.map(i => `
        <div class="co-line-item">
          <div class="co-line-thumb">${i.img ? `<img src="${i.img}" alt="${i.name}">` : '<span>◈</span>'}</div>
          <div class="co-line-info">
            <span class="co-line-name">${i.name}</span>
            ${i.variant ? `<span class="co-line-variant">${i.variant}</span>` : ''}
            <span class="co-line-qty">Qty ${i.qty}</span>
          </div>
          <span class="co-line-price">${INR(i.price * i.qty)}</span>
        </div>`).join('');
    }
    const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };
    setText('#co-subtotal', INR(totals.subtotal));
    setText('#co-shipping', totals.shipping === 0 ? 'Free' : INR(totals.shipping));
    setText('#co-tax',      INR(totals.tax));
    setText('#co-total',    INR(totals.total));
    setText('#co-delivery-est', deliveryWindow());

    if (manualCheckoutEnabled() && !hasValidRazorpayKey()) {
      if (payBtn) payBtn.textContent = 'Place Order';
      const note = $('.co-secure-note');
      if (note) note.textContent = 'Payment is not configured yet. Orders will be submitted and confirmed manually.';
    }

    // Carry over the PIN entered on the cart page, if any
    const savedPin = localStorage.getItem('ss_pincode') || '';
    if (savedPin && form.pincode && !form.pincode.value) form.pincode.value = savedPin;

    // PIN-code → City / District / State autofill (India Post API)
    initPincodeAutofill(form);

    // Pre-fill district chosen earlier (shared key from product/cart flow)
    const savedDistrict = localStorage.getItem('ss_district') || '';
    if (savedDistrict && form.district) form.district.value = savedDistrict;

    // Restore any previously typed billing details
    try {
      const saved = JSON.parse(localStorage.getItem('ss_billing') || '{}');
      Object.keys(saved).forEach(k => { if (form[k] && !form[k].value) form[k].value = saved[k]; });
    } catch { /* ignore */ }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const billing = {
        name:     form.name.value.trim(),
        email:    form.email.value.trim(),
        phone:    form.phone.value.trim(),
        address:  form.address.value.trim(),
        city:     form.city.value.trim(),
        district: form.district.value.trim(),
        state:    form.state.value.trim(),
        pincode:  form.pincode.value.trim(),
        notes:    form.notes ? form.notes.value.trim() : '',
      };
      localStorage.setItem('ss_billing', JSON.stringify(billing));
      if (billing.district) localStorage.setItem('ss_district', billing.district);

      startRazorpay(cart, totals, billing, payBtn);
    });
  }

  // ── PIN-code autofill (India Post — free, no key) ─────────
  function initPincodeAutofill(form) {
    const pin    = form.pincode;
    const status = $('#co-pin-status');
    const townList = $('#co-town-list');
    if (!pin) return;

    let lastPin = '';

    const setStatus = (msg, kind) => {
      if (!status) return;
      status.textContent = msg || '';
      status.className = 'co-pin-status' + (kind ? ' co-pin-' + kind : '');
    };

    async function lookup(code) {
      if (code === lastPin) return;
      lastPin = code;
      setStatus('Looking up location…', 'loading');
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${code}`);
        const data = await res.json();
        const entry = Array.isArray(data) ? data[0] : null;

        if (!entry || entry.Status !== 'Success' || !entry.PostOffice || !entry.PostOffice.length) {
          setStatus('PIN not found — please type City, District & State.', 'error');
          return;
        }

        const offices = entry.PostOffice;
        const first   = offices[0];

        // District + State are constant for a PIN → always fill
        if (form.district) form.district.value = first.District || '';
        if (form.state)    form.state.value    = first.State || '';

        // Persist so the cart / next visit can reuse it
        localStorage.setItem('ss_pincode', code);
        if (first.District) localStorage.setItem('ss_district', first.District);

        // City / locality: offer all post offices as suggestions
        if (townList) {
          townList.innerHTML = offices
            .map(o => `<option value="${o.Name}"></option>`).join('');
        }
        // Only set city if empty (don't clobber a manual entry)
        if (form.city && !form.city.value.trim()) {
          form.city.value = first.Block && first.Block !== 'NA' ? first.Block : (first.District || first.Name);
        }

        setStatus(`✓ ${first.District}, ${first.State}`, 'ok');
      } catch (err) {
        setStatus('Could not auto-detect — please fill City, District & State.', 'error');
      }
    }

    const maybeLookup = () => {
      const code = (pin.value || '').replace(/\D/g, '').slice(0, 6);
      if (code.length === 6) lookup(code);
      else { setStatus(''); lastPin = ''; }
    };

    pin.addEventListener('input', maybeLookup);
    pin.addEventListener('blur',  maybeLookup);
    // If a PIN was restored from saved billing, resolve it on load
    if ((pin.value || '').replace(/\D/g, '').length === 6) maybeLookup();
  }

  // ── Razorpay (client-only) ────────────────────────────────
  function startRazorpay(cart, totals, billing, payBtn) {
    const rzpCfg = CFG.razorpay || {};

    if (!hasValidRazorpayKey()) {
      if (manualCheckoutEnabled()) {
        const order = buildOrder(orderNumber(), cart, totals, billing, {
          razorpay_payment_id: 'Pending manual confirmation',
        });
        order.paymentStatus = 'pending_manual';
        order.paymentMethod = 'manual';
        if (payBtn) {
          payBtn.disabled = true;
          payBtn.dataset.label = payBtn.textContent;
          payBtn.textContent = 'Submitting order…';
        }
        completeOrder(order);
        return;
      }

      alert('Razorpay key is not configured yet. Add your Key ID in js/config.js to enable live payments.');
      return;
    }

    if (typeof Razorpay === 'undefined') {
      alert('Payment library failed to load. Please check your connection and retry.');
      return;
    }

    const orderId = orderNumber();
    if (payBtn) { payBtn.disabled = true; payBtn.dataset.label = payBtn.textContent; payBtn.textContent = 'Opening secure payment…'; }

    const options = {
      key:      rzpCfg.keyId,
      amount:   Math.round(totals.total * 100), // paise
      currency: rzpCfg.currency || 'INR',
      name:     (CFG.store && CFG.store.name) || 'The Sapphire Scroll',
      description: `Order ${orderId}`,
      image:    'images/LOGO-ICON-COLOR.webp',
      prefill: {
        name:    billing.name,
        email:   billing.email,
        contact: billing.phone,
      },
      notes: {
        order_id: orderId,
        district: billing.district,
      },
      theme: { color: rzpCfg.themeColor || '#1C1C2E' },
      modal: {
        ondismiss: function () {
          if (payBtn) { payBtn.disabled = false; payBtn.textContent = payBtn.dataset.label || 'Pay Securely'; }
        },
      },
      handler: function (response) {
        const order = buildOrder(orderId, cart, totals, billing, response);
        order.paymentStatus = 'paid';
        order.paymentMethod = 'razorpay';
        completeOrder(order);
      },
    };

    try {
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        if (payBtn) { payBtn.disabled = false; payBtn.textContent = payBtn.dataset.label || 'Pay Securely'; }
        alert('Payment failed: ' + (resp.error && resp.error.description ? resp.error.description : 'Please try again.'));
      });
      rzp.open();
    } catch (err) {
      if (payBtn) { payBtn.disabled = false; payBtn.textContent = payBtn.dataset.label || 'Pay Securely'; }
      alert('Could not start payment. ' + err.message);
    }
  }

  function completeOrder(order) {
    localStorage.setItem('ss_last_order', JSON.stringify(order));
    sendOrderEmails(order).finally(() => {
      localStorage.removeItem('ss_cart');
      window.location.href = 'thankyou.html';
    });
  }

  function buildOrder(orderId, cart, totals, billing, rzpResponse) {
    return {
      orderId,
      paymentId: (rzpResponse && rzpResponse.razorpay_payment_id) || '',
      date: new Date().toISOString(),
      items: cart.map(i => ({ name: i.name, variant: i.variant || '', qty: i.qty, price: i.price, lineTotal: i.price * i.qty })),
      totals,
      billing,
      deliveryEstimate: deliveryWindow(),
      currency: (CFG.razorpay && CFG.razorpay.currency) || 'INR',
    };
  }

  // ── EmailJS: customer + owner ─────────────────────────────
  function sendOrderEmails(order) {
    const ej = CFG.emailjs || {};
    if (typeof emailjs === 'undefined' ||
        !ej.publicKey || ej.publicKey.includes('REPLACE_ME') ||
        !ej.serviceId || ej.serviceId.includes('REPLACE_ME')) {
      console.warn('[SS] EmailJS not configured — skipping confirmation emails.');
      return Promise.resolve();
    }

    try { emailjs.init({ publicKey: ej.publicKey }); } catch (e) { /* older SDK */ try { emailjs.init(ej.publicKey); } catch (_) {} }

    const store = CFG.store || {};
    const b = order.billing;
    const shared = {
      order_id:        order.orderId,
      payment_id:      order.paymentId,
      order_date:      new Date(order.date).toLocaleString('en-IN'),
      customer_name:   b.name,
      customer_email:  b.email,
      customer_phone:  b.phone,
      shipping_address: `${b.address}, ${b.city}, ${b.district}, ${b.state} - ${b.pincode}`,
      items:           itemsAsText(order.items),
      subtotal:        INR(order.totals.subtotal),
      shipping:        order.totals.shipping === 0 ? 'Free' : INR(order.totals.shipping),
      tax:             INR(order.totals.tax),
      total:           INR(order.totals.total),
      delivery_estimate: order.deliveryEstimate,
      store_name:      store.name || 'The Sapphire Scroll',
      notes:           b.notes || '—',
    };

    const sends = [];
    // → Customer order confirmation
    if (ej.customerTemplate && !ej.customerTemplate.includes('REPLACE_ME')) {
      sends.push(emailjs.send(ej.serviceId, ej.customerTemplate, {
        ...shared,
        to_email:  b.email,
        to_name:   b.name,
        reply_to:  store.supportEmail || store.ownerEmail || '',
      }).catch(err => console.warn('[SS] customer email failed', err)));
    }
    // → Store-owner new-order alert
    if (ej.ownerTemplate && !ej.ownerTemplate.includes('REPLACE_ME')) {
      sends.push(emailjs.send(ej.serviceId, ej.ownerTemplate, {
        ...shared,
        to_email:  store.ownerEmail || '',
        to_name:   store.name || 'Store Owner',
        reply_to:  b.email,
      }).catch(err => console.warn('[SS] owner email failed', err)));
    }
    return Promise.all(sends);
  }

  // ============================================================
  //  THANK-YOU PAGE
  // ============================================================
  function initThankYouPage() {
    const root = $('#ty-root');
    if (!root) return;

    let order = null;
    try { order = JSON.parse(localStorage.getItem('ss_last_order') || 'null'); } catch { /* */ }

    const noOrder = $('#ty-no-order');
    const content = $('#ty-content');

    if (!order) {
      if (noOrder) noOrder.style.display = 'block';
      if (content) content.style.display = 'none';
      return;
    }
    if (noOrder) noOrder.style.display = 'none';

    const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };
    setText('#ty-order-id',   order.orderId);
    setText('#ty-payment-id', order.paymentId || (order.paymentStatus === 'pending_manual' ? 'Pending manual confirmation' : '—'));
    setText('#ty-email',      order.billing.email);
    setText('#ty-delivery',   order.deliveryEstimate);
    setText('#ty-total',      INR(order.totals.total));

    const itemsEl = $('#ty-items');
    if (itemsEl) {
      itemsEl.innerHTML = order.items.map(i => `
        <div class="ty-item">
          <span>${i.name}${i.variant ? ' · ' + i.variant : ''} <em>× ${i.qty}</em></span>
          <span>${INR(i.lineTotal)}</span>
        </div>`).join('');
    }
    setText('#ty-subtotal', INR(order.totals.subtotal));
    setText('#ty-shipping', order.totals.shipping === 0 ? 'Free' : INR(order.totals.shipping));
    setText('#ty-tax',      INR(order.totals.tax));
    setText('#ty-grand',    INR(order.totals.total));

    const dlBtn = $('#ty-download-invoice');
    if (dlBtn) dlBtn.addEventListener('click', () => generateInvoicePDF(order));

    // Reflect emptied cart in the navbar badge
    try {
      const badge = document.querySelector('.cart-count');
      if (badge) { badge.textContent = '0'; badge.style.display = 'none'; }
    } catch { /* */ }
  }

  // ── PDF invoice (jsPDF) ───────────────────────────────────
  function generateInvoicePDF(order) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      alert('Invoice library failed to load. Please retry.');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const store = CFG.store || {};
    const navy = [28, 28, 46];
    const gold = [168, 137, 58];
    const grey = [120, 120, 120];
    const M = 48;                 // margin
    const W = doc.internal.pageSize.getWidth();
    let y = 56;

    // Header
    doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.setTextColor(...navy);
    doc.text(store.name || 'The Sapphire Scroll', M, y);
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(...grey);
    doc.text((store.address || '') , M, y + 16);
    if (store.gstin) doc.text('GSTIN: ' + store.gstin, M, y + 28);

    doc.setFont('helvetica', 'bold'); doc.setFontSize(22); doc.setTextColor(...gold);
    doc.text('INVOICE', W - M, y, { align: 'right' });

    y += 56;
    doc.setDrawColor(...gold); doc.setLineWidth(1); doc.line(M, y, W - M, y);
    y += 24;

    // Meta (order + bill-to)
    doc.setFontSize(9); doc.setTextColor(...grey); doc.setFont('helvetica', 'bold');
    doc.text('BILL TO', M, y);
    doc.text('ORDER DETAILS', W / 2, y);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(40, 40, 40);
    const b = order.billing;
    const billLines = [
      b.name, b.email, b.phone,
      b.address, `${b.city}, ${b.district}`, `${b.state} - ${b.pincode}`,
    ].filter(Boolean);
    billLines.forEach((ln, i) => doc.text(String(ln), M, y + 16 + i * 13));

    const meta = [
      ['Order ID',   order.orderId],
      ['Payment ID', order.paymentId || '—'],
      ['Date',       new Date(order.date).toLocaleDateString('en-IN')],
      ['Est. Delivery', order.deliveryEstimate],
    ];
    meta.forEach((row, i) => {
      doc.setTextColor(...grey); doc.text(row[0], W / 2, y + 16 + i * 13);
      doc.setTextColor(40, 40, 40); doc.text(String(row[1]), W - M, y + 16 + i * 13, { align: 'right' });
    });

    y += 16 + Math.max(billLines.length, meta.length) * 13 + 24;

    // Items table header
    doc.setFillColor(...navy); doc.rect(M, y, W - 2 * M, 24, 'F');
    doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(9);
    doc.text('ITEM', M + 10, y + 16);
    doc.text('QTY', W - M - 180, y + 16, { align: 'right' });
    doc.text('PRICE', W - M - 95, y + 16, { align: 'right' });
    doc.text('AMOUNT', W - M - 10, y + 16, { align: 'right' });
    y += 24;

    // Items rows
    doc.setFont('helvetica', 'normal'); doc.setTextColor(40, 40, 40);
    order.items.forEach((it, idx) => {
      if (idx % 2 === 0) { doc.setFillColor(245, 243, 238); doc.rect(M, y, W - 2 * M, 22, 'F'); }
      const label = it.name + (it.variant ? ' · ' + it.variant : '');
      doc.text(doc.splitTextToSize(label, W - 2 * M - 230)[0], M + 10, y + 15);
      doc.text(String(it.qty), W - M - 180, y + 15, { align: 'right' });
      doc.text(INR(it.price), W - M - 95, y + 15, { align: 'right' });
      doc.text(INR(it.lineTotal), W - M - 10, y + 15, { align: 'right' });
      y += 22;
    });

    y += 10;
    doc.setDrawColor(220, 220, 220); doc.line(W / 2, y, W - M, y); y += 18;

    // Totals
    const totalsRows = [
      ['Subtotal', INR(order.totals.subtotal)],
      ['Shipping', order.totals.shipping === 0 ? 'Free' : INR(order.totals.shipping)],
      ['GST (18%)', INR(order.totals.tax)],
    ];
    doc.setFontSize(10);
    totalsRows.forEach(r => {
      doc.setTextColor(...grey); doc.text(r[0], W - M - 160, y, { align: 'left' });
      doc.setTextColor(40, 40, 40); doc.text(r[1], W - M - 10, y, { align: 'right' });
      y += 18;
    });
    doc.setDrawColor(...gold); doc.setLineWidth(1); doc.line(W - M - 200, y, W - M, y); y += 20;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(...navy);
    doc.text('TOTAL PAID', W - M - 160, y, { align: 'left' });
    doc.text(INR(order.totals.total), W - M - 10, y, { align: 'right' });

    // Footer
    const fy = doc.internal.pageSize.getHeight() - 60;
    doc.setDrawColor(...gold); doc.line(M, fy, W - M, fy);
    doc.setFont('helvetica', 'italic'); doc.setFontSize(9); doc.setTextColor(...grey);
    doc.text('Thank you for your order. Crafted with intention, written with purpose.', W / 2, fy + 20, { align: 'center' });
    if (store.supportEmail) doc.text(store.supportEmail + '  ·  ' + (store.url || ''), W / 2, fy + 34, { align: 'center' });

    doc.save(`Invoice-${order.orderId}.pdf`);
  }

  // ── Boot ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initCheckoutPage();
    initThankYouPage();
  });

  // Expose for debugging / manual triggers
  window.SS_Checkout = { computeTotals, generateInvoicePDF, sendOrderEmails };
})();
