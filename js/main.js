/* ============================================================
   THE SAPPHIRE SCROLL — Main JavaScript
   ============================================================ */

// ── Product Catalog ───────────────────────────────────────
const PRODUCTS = {
  'the-shift': {
    category: 'Journal',
    name: 'The Shift – Productivity Journal',
    price: 1399,
    mrp: 1999,
    priceFormatted: '₹1,399',
    inStock: true,
    images: [
      'images/product-portraits/the-shift-1.webp',
      'images/product-portraits/the-shift-2.webp',
      'images/product-portraits/the-shift-3.webp',
      'images/product-portraits/the-shift-4.webp',
      'images/product-portraits/the-shift-5.webp',
    ],
    description: [
      "The Shift is created for those seasons of life when you're ready for more clarity, more intention, and more flow — without the pressure to perform productivity.",
      "This journal gently guides you into a rhythm that feels natural, not forced, helping you organise your day in a way that feels grounding and aligned.",
      "It turns planning into a mindful ritual, not a task — a soft structure for a busy life that holds your plans, thoughts, and progress with calm certainty.",
      "Whether you're building habits, juggling roles, or searching for balance, The Shift helps you stay steady without losing yourself in the rush.",
    ],
    features: [
      'Total Pages: 175 pages for structured, consistent planning.',
      'Paper: 100 GSM smooth, bleed-resistant pages suitable for most pens.',
      'Cover: Hardback cover for durability, stability, and a luxurious hand-feel.',
      'Size: 5.8 x 8.3 inches for easy carrying and desk use.',
      'Daily Planner Pages: 99 simple daily layouts to organise tasks, priorities, and notes.',
      'Weekly Reflection Pages: 15 quick weekly resets to review progress and realign.',
      'Monthly Calendar Pages: 5 minimal monthly overviews for planning ahead and key dates.',
    ],
  },
  'gentle-pause': {
    category: 'Journal',
    name: 'The Gentle Pause',
    price: 1399,
    mrp: 1999,
    priceFormatted: '₹1,399',
    inStock: true,
    images: [
      'images/product-portraits/gentle-pause-1.webp',
      'images/product-portraits/gentle-pause-6.webp',
      'images/product-portraits/gentle-pause-2.webp',
      'images/product-portraits/gentle-pause-3.webp',
      'images/product-portraits/gentle-pause-4.webp',
      'images/product-portraits/gentle-pause-5.webp',
    ],
    description: [
      "The Gentle Pause is a softly structured self-reflection journal designed to help you return to yourself — one page, one breath, one quiet moment at a time.",
      "Created for those new to journaling and for anyone rebuilding a connection with their inner world, it offers a simple yet deeply grounding experience.",
      "Each page is intentionally minimal, giving your thoughts room to land — no pressure, no perfection, just presence.",
      "With vision, daily, weekly, and yearly reflection pages, it becomes a companion on your journey back to yourself.",
    ],
    features: [
      'Pages: 169 pages designed for gentle, thoughtful journaling.',
      'Paper: 100 GSM premium inner pages for a smooth, satisfying writing experience.',
      'Cover: Hardback cover for durability, stability, and a luxurious hand-feel.',
      'Size: 5.8 x 8.3 inches — ideal for desk, bedside, or daily bag.',
      'Vision Board Section: Set intentions for the year.',
      'Daily Journal Pages: Reflection, grounding, and mindful pauses.',
      'Weekly Reflection Pages: Observe patterns and emotional shifts.',
      'Yearly Reflection Page: Honour your growth at the end of the journey.',
      'Beginner-Friendly: Open layouts with gentle guidance.',
    ],
  },
  'inner-alchemy': {
    category: 'Notebook',
    name: 'Inner Alchemy',
    price: 799,
    mrp: 1299,
    priceFormatted: '₹799',
    inStock: true,
    images: [
      'images/product-portraits/inner-alchemy-1.webp',
      'images/product-portraits/inner-alchemy-2.webp',
      'images/product-portraits/inner-alchemy-3.webp',
      'images/product-portraits/inner-alchemy-4.webp',
    ],
    description: [
      "Inner Alchemy is your quiet space to slow down — where thoughts settle, ideas soften into clarity, and the noise of the day can fade.",
      "Write without rules, structure, or needing the right words — for brain dumps, meeting notes, sketches, planning, or reflective writing.",
      "It's a companion for full-mind days when you need a clean page to breathe and for quiet evenings when writing becomes release.",
      "Every blank page is a gentle reminder that you don't need a perfect plan — you only need room to begin.",
    ],
    features: [
      'Total Pages: 190 unlined pages for flexible journaling and planning.',
      'Size: 5.8 x 8.3 inches for easy carrying and desk use.',
      'Format: Open, unstructured blank-page journal for flexible daily use.',
      'Use Cases: Brain-dumps, meeting notes, ideation, sketches, and reflective writing.',
      'Experience: A calming, grounding writing space with zero rules.',
      'Purpose: Helps reconnect with your inner world through simple, intentional writing.',
    ],
  },
  'self-discovery': {
    category: 'Notebook',
    name: 'Self Discovery',
    price: 799,
    mrp: 1299,
    priceFormatted: '₹799',
    inStock: true,
    images: [
      'images/product-portraits/self-discovery-1.webp',
      'images/product-portraits/self-discovery-2.webp',
      'images/product-portraits/self-discovery-3.webp',
      'images/product-portraits/self-discovery-4.webp',
    ],
    description: [
      "Inner Alchemy is your quiet space to slow down — where thoughts settle, ideas soften into clarity, and the noise of the day can fade.",
      "Write without rules, structure, or needing the right words — for brain dumps, meeting notes, sketches, planning, or reflective writing.",
      "It's a companion for full-mind days when you need a clean page to breathe and for quiet evenings when writing becomes release.",
      "Every blank page is a gentle reminder that you don't need a perfect plan — you only need room to begin.",
    ],
    features: [
      'Total Pages: 190 unlined pages for flexible journaling and planning.',
      'Size: 5.8 x 8.3 inches for easy carrying and desk use.',
      'Format: Open, unstructured blank-page journal for flexible daily use.',
      'Use Cases: Brain-dumps, meeting notes, ideation, sketches, and reflective writing.',
      'Experience: A calming, grounding writing space with zero rules.',
      'Purpose: Helps reconnect with your inner world through simple, intentional writing.',
    ],
  },
  'self-care-cards': {
    category: 'Guided Cards',
    name: 'The Ritual Edit',
    price: 399,
    mrp: 699,
    priceFormatted: '₹399',
    inStock: true,
    images: [
      'images/product-portraits/self-care-cards-1.webp',
      'images/product-portraits/self-care-cards-2.webp',
      'images/product-portraits/self-care-cards-3.webp',
    ],
    description: [
      "The Ritual Edit is a gentle doorway back to yourself — a set of grounding practices to help you understand emotions and reconnect inward.",
      "Unlike decks that only affirm, these cards invite action: pause, reflect, and practice small rituals that nourish you from the inside out.",
      "Each card offers a meaningful activity to help you slow down, listen to yourself, and build tiny daily acts of care.",
      "Whether building a routine or rediscovering self-priority, The Ritual Edit supports the small steps toward clarity and emotional balance.",
    ],
    features: [
      'Dimensions: 2.5 x 3.5 inches for an easy-to-hold, desk-friendly format.',
      'Total Number of Cards: 45 guided cards for repeat use across planning, prompts, and conversation starters.',
      'GSM: 300 GSM FSC-certified stock for a sturdy, premium feel that lasts through regular handling.',
      'Type of Finish: Premium card finish designed for durability, repeat use, and a polished tactile feel.',
    ],
  },
};


// ── State ─────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('ss_cart') || '[]');
const WELCOME_COUPON = Object.freeze({ code: 'WELCOME10', percent: 10 });
let refreshCartPage = null;

// ── Helpers ───────────────────────────────────────────────
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function getActiveCoupon() {
  try {
    const coupon = JSON.parse(localStorage.getItem('ss_coupon') || 'null');
    if (!coupon) return null;
    if (coupon.code !== WELCOME_COUPON.code) return null;
    const percent = Number(coupon.percent || 0);
    if (!Number.isFinite(percent) || percent <= 0) return null;
    return { ...coupon, percent };
  } catch {
    return null;
  }
}

function setActiveCoupon(coupon) {
  localStorage.setItem('ss_coupon', JSON.stringify(coupon));
}

function couponDiscountAmount(subtotal, coupon) {
  if (!coupon || subtotal <= 0) return 0;
  return Math.round(subtotal * (coupon.percent / 100));
}

function saveCart() {
  localStorage.setItem('ss_cart', JSON.stringify(cart));
  updateCartUI();
}

// ── Navbar Scroll ─────────────────────────────────────────
function initNavbar() {
  const navbar = qs('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.navbar-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ── Mobile Menu ───────────────────────────────────────────
function initMobileMenu() {
  const btn    = qs('.mobile-menu-btn');
  const mobileNav = qs('.mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    btn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  qsa('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Search Overlay ────────────────────────────────────────
function initSearch() {
  const overlay    = qs('.search-overlay');
  const openBtns   = qsa('.search-toggle');
  const closeBtn   = qs('.search-close');
  const input      = qs('.search-input-wrap input');
  if (!overlay) return;

  const openSearch = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
  };

  const closeSearch = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(b => b.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);

  overlay.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  // Navigate to shop with search query on Enter
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) {
        const target = `shop.html?search=${encodeURIComponent(q)}`;
        window.location.href = target;
      }
    }
  });
}

// ── Cart ──────────────────────────────────────────────────
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id && i.variant === product.variant);
  if (existing) {
    existing.qty += (product.qty || 1);
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart();
  openCartDrawer();

  // Feedback pulse on cart icon
  const cartIcon = qs('.cart-toggle');
  cartIcon?.classList.add('pulse');
  setTimeout(() => cartIcon?.classList.remove('pulse'), 600);
}

function removeFromCart(id, variant) {
  cart = cart.filter(i => !(i.id === id && i.variant === variant));
  saveCart();
}

function updateQty(id, variant, delta) {
  const item = cart.find(i => i.id === id && i.variant === variant);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id, variant);
  } else {
    saveCart();
  }
}

function cartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function updateCartUI() {
  // Count badge
  const total = cart.reduce((s, i) => s + i.qty, 0);
  qsa('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total ? 'flex' : 'none';
  });

  // Drawer items
  const itemsContainer = qs('.cart-drawer-items');
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center;padding:3rem 1rem;color:var(--grey-mid);">
        <div style="font-size:2.5rem;margin-bottom:1rem;opacity:0.4;">◈</div>
        <p style="font-size:0.85rem;">Your scroll is empty.</p>
      </div>`;
  } else {
    itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img" style="background:var(--cream);display:flex;align-items:center;justify-content:center;">
          ${item.img
            ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">`
            : `<span style="font-size:1.5rem;opacity:0.3;">◈</span>`}
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          ${item.variant ? `<div class="cart-item-variant">${item.variant}</div>` : ''}
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty('${item.id}','${item.variant}',-1);renderCartDrawer()">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="updateQty('${item.id}','${item.variant}',1);renderCartDrawer()">+</button>
            <button onclick="removeFromCart('${item.id}','${item.variant}');renderCartDrawer()" style="margin-left:0.5rem;font-size:0.75rem;color:var(--grey-mid);text-decoration:underline;background:none;border:none;cursor:pointer;">Remove</button>
          </div>
        </div>
      </div>`).join('');
  }

  // Subtotal
  const subtotalEl = qs('.cart-subtotal-amount');
  if (subtotalEl) subtotalEl.textContent = `₹${cartTotal().toLocaleString('en-IN')}`;
}

function renderCartDrawer() { updateCartUI(); }

function openCartDrawer() {
  qs('.cart-drawer')?.classList.add('open');
  qs('.cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateCartUI();
}

function closeCartDrawer() {
  qs('.cart-drawer')?.classList.remove('open');
  qs('.cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function initCart() {
  qs('.cart-toggle')?.addEventListener('click', openCartDrawer);
  qs('.cart-drawer-close')?.addEventListener('click', closeCartDrawer);
  qs('.cart-overlay')?.addEventListener('click', closeCartDrawer);
  updateCartUI();
}

// ── Scroll Reveal ─────────────────────────────────────────
function initScrollReveal() {
  const elements = qsa('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

// ── Accordion ─────────────────────────────────────────────
function initAccordions() {
  qsa('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.accordion-item');
      const body   = item.querySelector('.accordion-body');
      const isOpen = trigger.classList.contains('open');

      // Close all in same group
      const group = trigger.closest('.accordion-group, .faq-list') || document;
      qsa('.accordion-trigger.open', group).forEach(t => {
        if (t !== trigger) {
          t.classList.remove('open');
          t.closest('.accordion-item').querySelector('.accordion-body')?.classList.remove('open');
        }
      });

      trigger.classList.toggle('open', !isOpen);
      body?.classList.toggle('open', !isOpen);
    });
  });
}

// ── Product Gallery ───────────────────────────────────────
function initProductGallery() {
  const mainImg = qs('.product-main-img img');
  const thumbs  = qsa('.product-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.thumbSrc || thumb.querySelector('img')?.src;
      if (src) mainImg.src = src;
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    if (i === 0) thumb.classList.add('active');
  });
}

// ── Variant Selectors ─────────────────────────────────────
function initVariantSelectors() {
  qsa('.variant-options').forEach(group => {
    group.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

// ── Quantity Selector (detail page) ──────────────────────
function initQtySelectors() {
  qsa('.qty-selector').forEach(selector => {
    const input   = selector.querySelector('.qty-val');
    const minusBtn = selector.querySelector('.qty-btn:first-child');
    const plusBtn  = selector.querySelector('.qty-btn:last-child');
    if (!input) return;

    minusBtn?.addEventListener('click', () => {
      const v = Math.max(1, parseInt(input.value) - 1);
      input.value = v;
    });
    plusBtn?.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });
  });
}

// ── Add to Cart (detail page) ─────────────────────────────
function initAddToCart() {
  // Product detail page "Add to Cart" button
  const addBtn = qs('.btn-add-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const name    = qs('.product-info h1')?.textContent || 'Product';
      const priceEl = qs('.product-price-current');
      const price   = priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g, '')) : 0;
      const variant = qs('.variant-options .variant-btn.active')?.textContent || '';
      const qty     = parseInt(qs('.qty-val')?.value || 1);
      const id      = 'p_' + name.toLowerCase().replace(/\s+/g,'_');
      const img     = qs('.product-main-img img')?.src || '';

      addToCart({ id, name, price, variant, qty, img });
    });
  }

  // Quick-add buttons on product cards (shop, wishlist, related, etc.)
  qsa('.product-card-cta[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const card  = btn.closest('.product-card');
      const name  = card.querySelector('.product-card-name')?.textContent || 'Product';
      const price = parseInt((card.querySelector('.product-card-price')?.textContent || '0').replace(/[^0-9]/g, ''));
      const img   = card.querySelector('.product-img-primary')?.src || '';
      const id    = card.dataset.id ? 'p_' + card.dataset.id : 'p_' + Date.now();
      addToCart({ id, name, price, variant: '', qty: 1, img });
    });
  });
}

// ── Wishlist ──────────────────────────────────────────────
function initWishlist() {
  let wishlist      = JSON.parse(localStorage.getItem('ss_wishlist') || '[]');
  let wishlistItems = JSON.parse(localStorage.getItem('ss_wishlist_items') || '[]');

  qsa('.product-wishlist-btn, .btn-wishlist').forEach(btn => {
    const card = btn.closest('.product-card');
    const id   = btn.dataset.productId || card?.dataset?.id || null;
    if (!id) return;

    if (wishlist.includes(id)) btn.classList.add('active');

    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (wishlist.includes(id)) {
        wishlist      = wishlist.filter(w => w !== id);
        wishlistItems = wishlistItems.filter(i => i.id !== id);
        btn.classList.remove('active');
      } else {
        wishlist.push(id);
        const name  = card?.querySelector('.product-card-name')?.textContent?.trim() || '';
        const img   = card?.querySelector('.product-img-primary')?.src || '';
        const price = card?.querySelector('.product-card-price')?.textContent?.trim() || '';
        const href  = card?.querySelector('a[href*="product"]')?.getAttribute('href') || 'shop.html';
        if (!wishlistItems.find(i => i.id === id)) {
          wishlistItems.push({ id, name, img, price, href });
        }
        btn.classList.add('active');
        showToast(`${name || 'Item'} added to wishlist`);
      }
      localStorage.setItem('ss_wishlist',       JSON.stringify(wishlist));
      localStorage.setItem('ss_wishlist_items', JSON.stringify(wishlistItems));
      if (qs('#wishlist-grid')) initWishlistPage();
    });
  });
}

// ── Newsletter ────────────────────────────────────────────
function initNewsletter() {
  qsa('.newsletter-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const nameInput  = form.querySelector('input[name="name"], input[name="firstName"], input[autocomplete="name"], input[autocomplete="given-name"]');
      const btn = form.querySelector('button[type="submit"], button');

      const email = (emailInput?.value || '').trim();
      const name  = (nameInput?.value || '').trim();
      if (!email) return;

      const original = btn?.textContent || 'Subscribe';
      if (btn) {
        btn.textContent = 'Subscribing...';
        btn.disabled = true;
      }

      try {
        const sent = await sendNewsletterEmails({ email, name, form });
        if (sent) {
          if (btn) {
            btn.textContent = 'Subscribed ✓';
            btn.style.background = '#4a7c59';
          }
          showToast('Subscribed successfully. Please check your inbox.');
          if (emailInput) emailInput.value = '';
          if (nameInput) nameInput.value = '';
        } else {
          if (btn) {
            btn.textContent = 'Saved ✓';
            btn.style.background = '#4a7c59';
          }
          showToast('Subscription saved. Email service not configured yet.');
        }
      } catch (err) {
        console.error('[SS] Newsletter subscribe failed', err);
        showToast('Could not subscribe right now. Please try again.', 'error');
      } finally {
        if (btn) {
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            btn.style.background = '';
          }, 2500);
        }
      }
    });
  });
}

function sendNewsletterEmails({ email, name, form }) {
  const CFG = window.SS_CONFIG || {};
  const ej  = CFG.emailjs || {};
  const store = CFG.store || {};

  const ready = typeof emailjs !== 'undefined'
    && ej.publicKey && !String(ej.publicKey).includes('REPLACE_ME')
    && ej.serviceId && !String(ej.serviceId).includes('REPLACE_ME');

  if (!ready) return Promise.resolve(false);

  try { emailjs.init({ publicKey: ej.publicKey }); }
  catch (e) { try { emailjs.init(ej.publicKey); } catch (_) {} }

  const ownerTemplate = ej.newsletterOwnerTemplate || ej.newsletterTemplate || ej.enquiryTemplate;
  const customerTemplate = ej.newsletterCustomerTemplate || ej.newsletterTemplate;

  const paramsBase = {
    subscriber_email: email,
    subscriber_name: name || 'Subscriber',
    form_source: form?.getAttribute('data-form') || 'Newsletter Signup',
    page_url: window.location.href,
    subscribed_at: new Date().toLocaleString('en-IN'),
    store_name: store.name || 'The Sapphire Scroll',
  };

  const sends = [];

  if (ownerTemplate && !String(ownerTemplate).includes('REPLACE_ME') && store.ownerEmail) {
    sends.push(
      emailjs.send(ej.serviceId, ownerTemplate, {
        ...paramsBase,
        to_email: store.ownerEmail,
        to_name: store.name || 'The Sapphire Scroll',
        reply_to: email,
      })
    );
  }

  if (customerTemplate && !String(customerTemplate).includes('REPLACE_ME')) {
    sends.push(
      emailjs.send(ej.serviceId, customerTemplate, {
        ...paramsBase,
        to_email: email,
        to_name: name || 'Subscriber',
        reply_to: store.supportEmail || store.ownerEmail || '',
      })
    );
  }

  if (!sends.length) return Promise.resolve(false);

  return Promise.allSettled(sends).then(results => results.some(r => r.status === 'fulfilled'));
}

// ── Timed Promo Popup ────────────────────────────────────
function initTimedPromoPopup() {
  const path = window.location.pathname.toLowerCase();
  const skipOn = ['checkout.html', 'thankyou.html', 'cart.html'];
  if (skipOn.some(p => path.endsWith(p))) return;

  const seenKey = 'ss_promo_popup_seen_at';
  const now = Date.now();
  const seenAt = Number(localStorage.getItem(seenKey) || 0);
  const cooldownMs = 24 * 60 * 60 * 1000;
  if (seenAt && now - seenAt < cooldownMs) return;

  const overlay = document.createElement('div');
  overlay.className = 'promo-popup-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="promo-popup" role="dialog" aria-modal="true" aria-label="Limited-time offer">
      <button class="promo-close" type="button" aria-label="Close">&times;</button>
      <span class="label">Welcome Offer</span>
      <h3>Get 10% Off</h3>
      <p>Join our inner circle for exclusive launches, journaling prompts, and member-only offers.</p>
      <form class="promo-popup-form" novalidate>
        <input type="text" name="firstName" placeholder="First name" autocomplete="given-name">
        <input type="email" name="email" placeholder="Email" autocomplete="email" required>
        <button class="btn btn-dark" type="submit">Get 10% Off</button>
      </form>
      <p class="promo-popup-note">By signing up, you agree to receive occasional updates from The Sapphire Scroll.</p>
    </div>`;

  const markSeen = () => {
    localStorage.setItem(seenKey, String(Date.now()));
  };

  const closePopup = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    markSeen();
    setTimeout(() => overlay.remove(), 260);
    document.removeEventListener('keydown', onEsc);
  };

  const onEsc = (e) => {
    if (e.key === 'Escape') closePopup();
  };

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  overlay.querySelector('.promo-close')?.addEventListener('click', closePopup);

  overlay.querySelector('.promo-popup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = overlay.querySelector('input[name="firstName"]')?.value?.trim() || '';
    const email = overlay.querySelector('input[name="email"]')?.value?.trim();
    if (!email) return;
    setActiveCoupon({
      code: WELCOME_COUPON.code,
      percent: WELCOME_COUPON.percent,
      email,
      firstName,
      source: 'popup',
      unlockedAt: Date.now(),
    });
    showToast('Offer unlocked. Coupon WELCOME10 applied.');
    closePopup();
  });

  const delayMs = 7000;
  setTimeout(() => {
    if (!document.body) return;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
    });
    document.addEventListener('keydown', onEsc);
  }, delayMs);
}

// ── Feature Tile Renderer ─────────────────────────────────
function getFeatureIcon(text) {
  const t = text.toLowerCase();
  if (t.includes('paper') || t.includes('gsm'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`;
  if (t.includes('cover') || t.includes('hardback') || t.includes('binding'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  if (t.includes('size') || t.includes('dimension') || t.includes('compact') || t.includes('inch') || t.includes('cm'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;
  if (t.includes('daily') || t.includes('planner') || t.includes('layout'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
  if (t.includes('weekly') || t.includes('reflection') || t.includes('reset') || t.includes('review'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.18-8.14"/></svg>`;
  if (t.includes('monthly') || t.includes('calendar') || t.includes('date'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>`;
  if (t.includes('ribbon') || t.includes('bookmark') || t.includes('marker'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
  if (t.includes('set') || t.includes('deck') || t.includes('card') || t.includes('box') || t.includes('gift'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/></svg>`;
  if (t.includes('page') || t.includes('pages') || t.includes('blank') || t.includes('guided'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
  if (t.includes('matte') || t.includes('finish') || t.includes('foil') || t.includes('gold') || t.includes('print'))
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8l1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z"/></svg>`;
  return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
}

function renderFeatureTile(featureText) {
  const colonIdx = featureText.indexOf(':');
  let label, detail;
  if (colonIdx > -1 && colonIdx < 30) {
    label  = featureText.slice(0, colonIdx).trim();
    detail = featureText.slice(colonIdx + 1).trim();
  } else {
    const words = featureText.split(' ');
    label  = words.slice(0, Math.min(3, words.length)).join(' ');
    detail = featureText;
  }
  const icon = getFeatureIcon(featureText);
  return `<div class="pd-feature-tile">
    <div class="pd-feature-icon" aria-hidden="true">${icon}</div>
    <div class="pd-feature-text">
      <span class="pd-feature-label">${label}</span>
      <span class="pd-feature-detail">${detail}</span>
    </div>
  </div>`;
}

// ── Sticky-Note Tear Strip (Blog Cards) ──────────────────
function initTearStrips() {
  qsa('.article-card').forEach(card => {
    // Find the article link (title link or read-more link)
    const titleLink = card.querySelector('h3 a[href]') || card.querySelector('a[href^="blog-"]');
    if (!titleLink) return;

    const href = titleLink.getAttribute('href');

    // Hide any existing plain "Read More" text link
    qsa('a[href^="blog-"]', card).forEach(a => {
      if (!a.closest('h3') && !a.classList.contains('tear-strip')) {
        a.style.display = 'none';
      }
    });

    // Build tear strip
    const strip = document.createElement('a');
    strip.href = href;
    strip.className = 'tear-strip';
    strip.setAttribute('aria-label', `Read article: ${titleLink.textContent.trim()}`);
    strip.innerHTML = `
      <div class="tear-strip-face">
        <span class="tear-strip-label">
          Read More
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>`;

    card.appendChild(strip);
  });
}

// ── Product Page (dynamic) ────────────────────────────────
function initProductPage() {
  const mainImgEl   = qs('#pd-main-img');
  if (!mainImgEl) return;

  const params = new URLSearchParams(window.location.search);
  const id     = params.get('id') || 'the-shift';
  const p      = PRODUCTS[id] || PRODUCTS['the-shift'];

  // Populate text fields
  const set = (sel, val) => { const el = qs(sel); if (el) el.textContent = val; };
  set('#pd-category', p.category);
  set('#pd-name',     p.name);
  set('#pd-price',    p.priceFormatted);
  set('#pd-stock',    p.inStock ? 'In stock' : 'Out of stock');

  const stockEl = qs('#pd-stock');
  if (stockEl) {
    stockEl.className = 'pd-stock ' + (p.inStock ? 'in-stock' : 'out-of-stock');
  }

  // Description paragraphs
  const descEl = qs('#pd-description');
  if (descEl) {
    descEl.innerHTML = p.description.map(t => `<p>${t}</p>`).join('');
  }

  // Features grid (spec tiles)
  const featuresEl = qs('#pd-features');
  if (featuresEl) {
    featuresEl.innerHTML = p.features.map(f => renderFeatureTile(f)).join('');
    // Stagger-reveal tiles
    qsa('.pd-feature-tile', featuresEl).forEach((tile, i) => {
      setTimeout(() => tile.classList.add('pf-revealed'), 80 + i * 75);
    });
  }

  // Update page title / breadcrumb
  document.title = `${p.name} — The Sapphire Scroll`;
  const breadcrumbCurrent = qs('[aria-current="page"]');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = p.name;

  // Main image
  mainImgEl.src = p.images[0];
  mainImgEl.alt = p.name;
  mainImgEl.setAttribute('loading', 'eager');
  mainImgEl.setAttribute('decoding', 'async');
  mainImgEl.setAttribute('fetchpriority', 'high');

  // Thumbnails — rendered here; click handlers attached by initProductGallery()
  const thumbsEl = qs('#pd-thumbs');
  if (thumbsEl && p.images.length > 1) {
    thumbsEl.innerHTML = p.images.map((src, i) => `
      <div class="product-thumb ${i === 0 ? 'active' : ''}" role="listitem" tabindex="0"
           data-thumb-src="${src}" aria-label="View image ${i + 1}">
        <img src="${src}" alt="${p.name} view ${i + 1}" class="product-thumb-img" loading="lazy" decoding="async">
      </div>`).join('');

    // Attach click handlers directly (initProductGallery runs before thumbs exist)
    thumbsEl.querySelectorAll('.product-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImgEl.src = thumb.dataset.thumbSrc;
        thumbsEl.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  // Add to Cart button
  const addBtn = qs('#pd-add-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart({ id: 'p_' + id, name: p.name, price: p.price, variant: '', qty: 1, img: p.images[0] });
    });
  }

  // Buy Now button (add to cart then go to cart)
  const buyBtn = qs('#pd-buy-now');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      addToCart({ id: 'p_' + id, name: p.name, price: p.price, variant: '', qty: 1, img: p.images[0] });
      window.location.href = 'cart.html';
    });
  }

  // Populate related products
  const relatedGrid = qs('#pd-related-grid');
  if (relatedGrid) {
    const relatedIds = Object.keys(PRODUCTS).filter(k => k !== id).slice(0, 4);
    relatedGrid.innerHTML = relatedIds.map((relId, idx) => {
      const rp = PRODUCTS[relId];
      return `
        <article class="product-card" data-id="${relId}" data-reveal data-reveal-delay="${idx}">
          <div class="product-card-image-wrap">
            <a href="product.html?id=${relId}" class="product-card-media-link">
              <div class="product-card-media">
                <img src="${rp.images[0]}" alt="${rp.name}" class="product-img-primary" loading="lazy" decoding="async">
                ${rp.images[1] ? `<img src="${rp.images[1]}" alt="${rp.name} alt view" class="product-img-secondary" loading="lazy" decoding="async">` : ''}
              </div>
            </a>
            <button class="product-card-cta" data-quick-add>Add to Cart</button>
          </div>
          <button class="product-wishlist-btn" aria-label="Add ${rp.name} to wishlist" data-product-id="${relId}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <div class="product-card-info">
            <a href="product.html?id=${relId}">
              <h3 class="product-card-name">${rp.name}</h3>
            </a>
            <p class="product-card-desc">${rp.description[0].substring(0, 80)}…</p>
            <span class="product-card-price">&#8377;${rp.price.toLocaleString('en-IN')}</span>
          </div>
        </article>`;
    }).join('');
    initWishlist();
    initScrollReveal();
    initAddToCart();
  }
}

// ── Delivery Estimator (cart) — PIN-code based ───────────
function initDeliveryEstimator() {
  const pin = qs('#co-pincode-cart');
  const msg = qs('#co-delivery-msg');
  if (!pin || !msg) return;

  const DELIVERY_DAYS = 7;
  let lastPin = '';

  const deliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + DELIVERY_DAYS);
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const setMsg = (html, active) => {
    msg.innerHTML = html;
    msg.classList.toggle('pd-delivery-active', !!active);
  };

  async function lookup(code) {
    if (code === lastPin) return;
    lastPin = code;
    setMsg('Checking delivery for ' + code + '…', false);
    try {
      const res  = await fetch(`https://api.postalpincode.in/pincode/${code}`);
      const data = await res.json();
      const po   = (Array.isArray(data) && data[0] && data[0].Status === 'Success') ? data[0].PostOffice : null;
      if (!po || !po.length) {
        setMsg('We could not find that PIN code. Please re-check.', false);
        return;
      }
      const place = `${po[0].District}, ${po[0].State}`;
      // Persist so checkout can pre-fill
      localStorage.setItem('ss_pincode', code);
      localStorage.setItem('ss_district', po[0].District);
      setMsg(
        `<strong>FREE delivery</strong> to <strong>${place}</strong> by ` +
        `<strong>${deliveryDate()}</strong> — within ${DELIVERY_DAYS} days.`, true);
    } catch (e) {
      setMsg('Could not check delivery right now. Please try again.', false);
    }
  }

  const maybeLookup = () => {
    const code = (pin.value || '').replace(/\D/g, '').slice(0, 6);
    if (code.length === 6) lookup(code);
    else { setMsg('Enter your PIN code to check delivery.', false); lastPin = ''; }
  };

  // Restore previously entered PIN
  const savedPin = localStorage.getItem('ss_pincode') || '';
  if (savedPin) { pin.value = savedPin; maybeLookup(); }

  pin.addEventListener('input', maybeLookup);
  pin.addEventListener('blur',  maybeLookup);
}

// ── Category Filters (blog / shop) ───────────────────────
function initCategoryFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlCat    = urlParams.get('category') || '';
  const urlSearch = urlParams.get('search') || '';

  const CATEGORY_LABELS = {
    'journals':        'Journals',
    'notebooks':       'Notebooks',
    'self-care-cards': 'Guided Cards',
    'desk-edit':       'Desk Edit',
    'gifts':           'Gift Sets',
  };

  const CATEGORY_META = {
    'journals':        { heading: 'Journals', subtitle: 'Luxury journals built for planning, focus, and high-performance routines.', label: 'The Journal Collection' },
    'notebooks':       { heading: 'Notebooks', subtitle: 'Premium blank notebooks for notes, strategy, ideas, and creative work.', label: 'The Notebook Collection' },
    'self-care-cards': { heading: 'Guided Cards', subtitle: 'Practical card sets for prompts, planning, and everyday clarity.', label: 'The Ritual Edit' },
    'desk-edit':       { heading: 'Desk Edit', subtitle: 'Thoughtful accents and bookmarks to elevate your writing space.', label: 'The Desk Collection' },
    'gifts':           { heading: 'Gift Sets', subtitle: 'Curated gift sets for those who appreciate the art of writing.', label: 'Gifting' },
  };

  // Handle search parameter
  if (urlSearch) {
    const term = urlSearch.toLowerCase();
    const heading = qs('#shop-heading');
    if (heading) heading.textContent = `Search: "${urlSearch}"`;
    const crumb = qs('#shop-breadcrumb-current');
    if (crumb) crumb.textContent = `Search: "${urlSearch}"`;

    let visibleCount = 0;
    qsa('[data-filterable] [data-category]').forEach(item => {
      const name = item.querySelector('.product-card-name')?.textContent?.toLowerCase() || '';
      const desc = item.querySelector('.product-card-desc')?.textContent?.toLowerCase() || '';
      const show = name.includes(term) || desc.includes(term);
      item.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    const emptyState = qs('#shop-empty-state');
    if (emptyState) emptyState.style.display = visibleCount === 0 ? '' : 'none';
    return;
  }

  // Direct URL filter
  if (urlCat) {
    const meta = CATEGORY_META[urlCat] || { heading: CATEGORY_LABELS[urlCat] || urlCat, subtitle: '', label: '' };

    // Update heading, breadcrumb, subtitle, label
    const heading = qs('#shop-heading');
    if (heading) heading.textContent = meta.heading;

    const crumb = qs('#shop-breadcrumb-current');
    if (crumb) crumb.textContent = meta.heading;

    const subtitle = qs('#shop-subtitle');
    if (subtitle && meta.subtitle) subtitle.textContent = meta.subtitle;

    const catLabel = qs('#shop-category-label');
    if (catLabel && meta.label) {
      catLabel.textContent = meta.label;
      catLabel.style.display = 'block';
    }

    const divider = qs('#shop-gold-divider');
    if (divider) divider.style.display = 'block';

    // Update document title
    document.title = `${meta.heading} — The Sapphire Scroll`;

    // Mark active navbar link for the current category
    qsa('.navbar-links a').forEach(a => {
      const linkCat = new URLSearchParams(a.search).get('category') || '';
      a.classList.toggle('active', linkCat === urlCat);
    });

    // Filter products
    qsa('[data-filterable]').forEach(grid => {
      let visibleCount = 0;
      qsa('[data-category]', grid).forEach(item => {
        const show = item.dataset.category === urlCat;
        item.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      const emptyState = qs('#shop-empty-state');
      if (emptyState) emptyState.style.display = visibleCount === 0 ? '' : 'none';
    });
  }

  // Hide the (unfiltered) featured article when a specific blog category is active
  const featuredSection = qs('#featured-article-section');
  const toggleFeatured = (cat) => {
    if (!featuredSection) return;
    const showAll = (cat === '' || cat === 'all');
    featuredSection.style.display = showAll ? '' : 'none';
  };
  toggleFeatured(urlCat);

  qsa('.category-filters').forEach(filterBar => {
    const buttons = filterBar.querySelectorAll('.cat-btn');

    const applyFilter = (cat) => {
      toggleFeatured(cat);
      buttons.forEach(b => b.classList.toggle('active', b.dataset.category === cat || (cat === '' && b.dataset.category === 'all')));
      const grid = filterBar.closest('main')?.querySelector('[data-filterable]')
                || document.querySelector('[data-filterable]');
      if (!grid) return;
      qsa('[data-category]', grid).forEach(item => {
        item.style.display = (cat === 'all' || cat === '' || item.dataset.category === cat) ? '' : 'none';
      });
    };

    if (urlCat) {
      applyFilter(urlCat);
    } else {
      applyFilter('all');
    }

    buttons.forEach(btn => {
      if (btn.tagName !== 'A') {
        btn.addEventListener('click', () => applyFilter(btn.dataset.category));
      }
    });
  });
}

// ── Sort Select ───────────────────────────────────────────
function initSort() {
  const sortSelect = qs('.sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', () => {
    const grid = qs('.product-grid');
    if (!grid) return;
    const cards = qsa('.product-card', grid);

    const getSortVal = card => {
      const priceEl = card.querySelector('.product-card-price');
      if (!priceEl) return 0;
      return parseInt(priceEl.textContent.replace(/[^0-9]/g, '')) || 0;
    };

    const sorted = cards.sort((a, b) => {
      switch (sortSelect.value) {
        case 'price-asc':  return getSortVal(a) - getSortVal(b);
        case 'price-desc': return getSortVal(b) - getSortVal(a);
        default: return 0;
      }
    });

    sorted.forEach(card => grid.appendChild(card));
  });
}

// ── Form Validation ───────────────────────────────────────
function initForms() {
  qsa('form[data-validate]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      qsa('[required]', form).forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          valid = false;
          group?.classList.add('error');
        } else {
          group?.classList.remove('error');
        }
      });

      if (!valid) return;

      const btn = form.querySelector('[type="submit"]');
      const original = btn?.textContent;
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }

      const showThankYou = () => {
        form.innerHTML = `
          <div style="text-align:center;padding:2rem;color:var(--brown);">
            <div style="font-size:2rem;color:var(--gold);margin-bottom:1rem;">◈</div>
            <h3 style="font-family:var(--font-serif);margin-bottom:0.75rem;">Thank You</h3>
            <p style="font-size:0.88rem;">We've received your enquiry and will respond within 2 business days.</p>
          </div>`;
      };
      const resetBtn = () => { if (btn) { btn.textContent = original; btn.disabled = false; } };

      sendEnquiryEmail(form).then(sent => {
        showThankYou();
        if (!sent) console.warn('[SS] Enquiry email skipped (EmailJS not configured) — form shown as submitted.');
      }).catch(err => {
        console.error('[SS] Enquiry email failed', err);
        resetBtn();
        showToast('Sorry, your enquiry could not be sent. Please email us directly.', 'error');
      });
    });
  });
}

// ── Enquiry email (contact / corporate forms → company inbox)
function sendEnquiryEmail(form) {
  const CFG = window.SS_CONFIG || {};
  const ej  = CFG.emailjs || {};
  const store = CFG.store || {};

  const ready = typeof emailjs !== 'undefined'
    && ej.publicKey && !String(ej.publicKey).includes('REPLACE_ME')
    && ej.serviceId && !String(ej.serviceId).includes('REPLACE_ME')
    && ej.enquiryTemplate && !String(ej.enquiryTemplate).includes('REPLACE_ME');

  // Not configured yet → resolve false so the UI still confirms politely.
  if (!ready) return Promise.resolve(false);

  try { emailjs.init({ publicKey: ej.publicKey }); }
  catch (e) { try { emailjs.init(ej.publicKey); } catch (_) {} }

  // Collect every named field into template params.
  const data = {};
  new FormData(form).forEach((val, key) => {
    if (val instanceof File) return; // skip file uploads (needs paid EmailJS attachments)
    data[key] = (data[key] ? data[key] + ', ' : '') + val;
  });

  const params = {
    ...data,
    form_source:  form.getAttribute('data-form') || (document.title || 'Website Enquiry'),
    page_url:     window.location.href,
    submitted_at: new Date().toLocaleString('en-IN'),
    to_email:     store.ownerEmail || '',
    to_name:      store.name || 'The Sapphire Scroll',
    reply_to:     data.email || data.email_address || '',
  };

  return emailjs.send(ej.serviceId, ej.enquiryTemplate, params).then(() => true);
}

// ── Sticky Header Highlight on Scroll ────────────────────
function initActiveSectionHighlight() {
  const sections = qsa('[data-section]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.section;
        qsa('.navbar-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ── Lazy Loading Fallback ─────────────────────────────────
function initLazyLoad() {
  // Native lazy loading + async decode where supported.
  qsa('img').forEach(img => {
    if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');

    const isPriority =
      img.id === 'pd-main-img' ||
      !!img.closest('.hero') ||
      !!img.closest('.navbar');

    if (!img.hasAttribute('loading') && !isPriority) {
      img.setAttribute('loading', 'lazy');
    }
  });

  if ('loading' in HTMLImageElement.prototype) return; // native support

  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      }
    });
  });

  qsa('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ── Mobile Image Budget (skip hover-only images) ──────────
function initResponsiveImageBudget() {
  const mq = window.matchMedia('(max-width: 768px)');

  const apply = (isMobile) => {
    qsa('.product-img-secondary').forEach(img => {
      if (isMobile) {
        if (img.getAttribute('src')) {
          img.dataset.secondarySrc = img.getAttribute('src');
          img.removeAttribute('src');
        }
      } else {
        if (!img.getAttribute('src') && img.dataset.secondarySrc) {
          img.setAttribute('src', img.dataset.secondarySrc);
          img.setAttribute('decoding', 'async');
          img.setAttribute('loading', 'lazy');
        }
      }
    });
  };

  apply(mq.matches);
  mq.addEventListener('change', (e) => apply(e.matches));
}

// ── Toast Notification ────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = qs('.ss-toast');
  existing?.remove();

  const toast = document.createElement('div');
  toast.className = 'ss-toast';
  toast.style.cssText = `
    position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(60px);
    background:${type === 'success' ? 'var(--black)' : '#c0392b'};
    color:var(--white);padding:0.875rem 2rem;
    font-size:0.82rem;letter-spacing:0.08em;
    z-index:9999;transition:transform 0.3s ease;
    border-left:3px solid var(--gold);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(60px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Video Hero Fallback ───────────────────────────────────
function initVideoHero() {
  const video = qs('.hero-video');
  if (!video) return;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowNetwork = !!(connection && /2g/.test(connection.effectiveType || ''));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldSkipVideo = slowNetwork || reducedMotion;

  if (shouldSkipVideo) {
    video.pause();
    video.removeAttribute('autoplay');
    video.setAttribute('preload', 'none');
    video.style.display = 'none';
    qs('.hero-fallback')?.style.removeProperty('display');
    return;
  }

  video.addEventListener('error', () => {
    video.style.display = 'none';
    qs('.hero-fallback')?.style.removeProperty('display');
  });
}

// ── Mobile Filters Toggle (Shop page) ────────────────────
function initMobileFilters() {
  const toggleBtn = qs('#filters-toggle');
  const sidebar   = qs('#filters-sidebar');
  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.textContent = isOpen ? '✕  Close Filters' : '⊞  Filter & Sort';
  });

  // On desktop, always show sidebar
  const mq = window.matchMedia('(min-width: 901px)');
  const handleMQ = (e) => {
    if (e.matches) {
      sidebar.classList.remove('collapsed', 'open');
    } else {
      if (!sidebar.classList.contains('open')) {
        sidebar.classList.add('collapsed');
      }
    }
  };
  mq.addEventListener('change', handleMQ);
  handleMQ(mq);
}

// ── Wishlist Page Renderer ────────────────────────────────
function initWishlistPage() {
  const grid    = qs('#wishlist-grid');
  if (!grid) return;

  const emptyState = qs('#wishlist-empty');
  const actions    = qs('#wishlist-actions');
  const items      = JSON.parse(localStorage.getItem('ss_wishlist_items') || '[]');

  if (items.length === 0) {
    if (emptyState) emptyState.style.display = '';
    grid.style.display = 'none';
    if (actions) actions.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  grid.style.display = 'grid';
  if (actions) actions.style.display = 'block';

  grid.innerHTML = items.map(item => `
    <article class="product-card" data-id="${item.id}">
      <div class="product-card-image-wrap">
        <a href="${item.href}" class="product-card-media-link">
          <div class="product-card-media">
            <img src="${item.img}" alt="${item.name}" class="product-img-primary" loading="lazy" decoding="async">
          </div>
        </a>
        <button class="product-card-cta" data-quick-add>Add to Cart</button>
      </div>
      <button class="product-wishlist-btn active" aria-label="Remove from wishlist" data-product-id="${item.id}" style="opacity:1;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <div class="product-card-info">
        <a href="${item.href}"><div class="product-card-name">${item.name}</div></a>
        <div class="product-card-price">${item.price}</div>
      </div>
    </article>`).join('');

  initWishlist();
  initAddToCart();
}

// ── Discover More (Wishlist page) ─────────────────────────
function initDiscoverMore() {
  const grid = qs('#discover-more-grid');
  if (!grid) return;

  const ids = Object.keys(PRODUCTS).slice(0, 4);
  grid.innerHTML = ids.map((id, idx) => {
    const p = PRODUCTS[id];
    return `
      <article class="product-card" data-id="${id}" data-reveal data-reveal-delay="${idx}">
        <div class="product-card-image-wrap">
          <a href="product.html?id=${id}" class="product-card-media-link">
            <div class="product-card-media">
              <img src="${p.images[0]}" alt="${p.name}" class="product-img-primary" loading="lazy" decoding="async">
              ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" class="product-img-secondary" loading="lazy" decoding="async">` : ''}
            </div>
          </a>
          <button class="product-card-cta" data-quick-add>Add to Cart</button>
        </div>
        <button class="product-wishlist-btn" aria-label="Add ${p.name} to wishlist" data-product-id="${id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="product-card-info">
          <a href="product.html?id=${id}">
            <h3 class="product-card-name">${p.name}</h3>
          </a>
          <p class="product-card-desc">${p.description[0].substring(0, 80)}…</p>
          <span class="product-card-price">&#8377;${p.price.toLocaleString('en-IN')}</span>
        </div>
      </article>`;
  }).join('');

  initWishlist();
  initScrollReveal();
  initAddToCart();
}

// ── Cart Page ─────────────────────────────────────────────
function initCartPage() {
  const itemsEl  = qs('#cart-page-items');
  const emptyEl  = qs('#cart-page-empty');
  if (!itemsEl) return;

  function syncCouponInput() {
    const couponInput = qs('#coupon-code');
    if (!couponInput) return;
    const coupon = getActiveCoupon();
    couponInput.value = coupon ? coupon.code : '';
  }

  function renderCartPage() {
    const subtotalEl = qs('#cart-page-subtotal');
    const discountEl = qs('#cart-page-discount');
    const shippingEl = qs('#cart-page-shipping');
    const taxEl      = qs('#cart-page-tax');
    const totalEl    = qs('#cart-page-total');

    if (cart.length === 0) {
      itemsEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (discountEl) discountEl.textContent = '−₹0';
      if (taxEl)      taxEl.textContent      = '₹0';
      if (totalEl)    totalEl.textContent    = '₹0';
      if (shippingEl) { shippingEl.textContent = '₹99'; shippingEl.style.color = 'inherit'; }
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-table-row" data-id="${item.id}" data-variant="${item.variant || ''}">
        <!-- Product info -->
        <div class="cart-product-info">
          <div class="cart-product-img">
            ${item.img
              ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">`
              : `<span style="font-size:1.5rem;opacity:0.3;">◈</span>`}
          </div>
          <div>
            <div class="cart-product-name">${item.name}</div>
            ${item.variant ? `<div class="cart-product-meta">${item.variant}</div>` : ''}
          </div>
        </div>
        <!-- Qty controls — centred in column -->
        <div class="cart-qty-wrap" style="display:flex;align-items:center;justify-content:center;gap:0.4rem;border:1px solid var(--grey-light);padding:0.3rem 0.5rem;">
          <button class="cart-qty-btn" data-action="dec" data-id="${item.id}" data-variant="${item.variant || ''}"
            style="background:none;border:none;cursor:pointer;font-size:1rem;color:var(--brown);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;">&#8722;</button>
          <span style="font-family:'Jost',sans-serif;font-size:0.9rem;min-width:1.5rem;text-align:center;">${item.qty}</span>
          <button class="cart-qty-btn" data-action="inc" data-id="${item.id}" data-variant="${item.variant || ''}"
            style="background:none;border:none;cursor:pointer;font-size:1rem;color:var(--brown);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;">&#43;</button>
        </div>
        <!-- Price — right-aligned in column -->
        <div class="cart-price" style="text-align:right;font-family:'Cormorant Garamond',serif;font-size:1.05rem;white-space:nowrap;">
          &#8377;${(item.price * item.qty).toLocaleString('en-IN')}
        </div>
        <!-- Remove -->
        <button class="cart-remove cart-remove-btn" data-id="${item.id}" data-variant="${item.variant || ''}"
          aria-label="Remove ${item.name}"
          style="background:none;border:none;cursor:pointer;color:var(--grey-mid);font-size:1.2rem;padding:0;text-align:center;transition:color 0.2s;">&times;</button>
      </div>`).join('');

    // Attach row button listeners
    qsa('.cart-qty-btn', itemsEl).forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = btn.dataset.action === 'inc' ? 1 : -1;
        updateQty(btn.dataset.id, btn.dataset.variant, delta);
        renderCartDrawer();
        renderCartPage();
      });
    });
    qsa('.cart-remove-btn', itemsEl).forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id, btn.dataset.variant);
        renderCartDrawer();
        renderCartPage();
      });
    });

    // Totals
    const subtotal = cartTotal();
    const coupon   = getActiveCoupon();
    const discount = couponDiscountAmount(subtotal, coupon);
    const taxable  = Math.max(subtotal - discount, 0);
    const shipping = subtotal >= 2000 ? 0 : 99;
    const tax      = Math.round(taxable * 0.18);
    const total    = taxable + shipping + tax;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    if (discountEl) {
      discountEl.textContent = `−₹${discount.toLocaleString('en-IN')}`;
      discountEl.style.color = discount > 0 ? 'var(--gold)' : 'inherit';
    }
    if (shippingEl) {
      if (shipping === 0) {
        shippingEl.textContent   = 'Free (above ₹2,000)';
        shippingEl.style.color   = 'var(--gold)';
      } else {
        shippingEl.textContent   = `₹${shipping}`;
        shippingEl.style.color   = 'inherit';
      }
    }
    if (taxEl)   taxEl.textContent   = `₹${tax.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  }

  refreshCartPage = renderCartPage;
  syncCouponInput();
  renderCartPage();
}

window.applyCoupon = function() {
  const code = qs('#coupon-code')?.value?.trim().toUpperCase();
  if (!code) return;
  if (code !== WELCOME_COUPON.code) {
    showToast('Invalid or expired coupon code.');
    return;
  }

  setActiveCoupon({
    code: WELCOME_COUPON.code,
    percent: WELCOME_COUPON.percent,
    source: 'manual',
    unlockedAt: Date.now(),
  });
  const couponInput = qs('#coupon-code');
  if (couponInput) couponInput.value = WELCOME_COUPON.code;
  showToast('Coupon applied: 10% off.');
  refreshCartPage?.();
};

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSearch();
  initCart();
  initScrollReveal();
  initAccordions();
  initProductGallery();
  initProductPage();
  initVariantSelectors();
  initQtySelectors();
  initAddToCart();
  initWishlist();
  initNewsletter();
  initTimedPromoPopup();
  initCategoryFilters();
  initSort();
  initForms();
  initActiveSectionHighlight();
  initResponsiveImageBudget();
  initLazyLoad();
  initVideoHero();
  initMobileFilters();
  initWishlistPage();
  initDiscoverMore();
  initCartPage();
  initDeliveryEstimator();
  initTearStrips();
});

// Expose for inline calls
window.addToCart       = addToCart;
window.removeFromCart  = removeFromCart;
window.updateQty       = updateQty;
window.renderCartDrawer = renderCartDrawer;
window.openCartDrawer  = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.showToast       = showToast;
