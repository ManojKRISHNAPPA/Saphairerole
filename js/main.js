/* ============================================================
   THE SAPPHIRE SCROLL — Main JavaScript
   ============================================================ */

// ── Product Catalog ───────────────────────────────────────
const PRODUCTS = {
  'the-shift': {
    category: 'Journal',
    name: 'The Shift – Productivity Journal',
    price: 200,
    priceFormatted: 'INR 200',
    inStock: true,
    images: [
      'images/the-shift-produt-display-min.webp',
      'images/the-shift-img1-min.webp',
      'images/the-shift-img2.webp',
      'images/the-shift-img3.webp',
    ],
    description: [
      "The Shift is created for those seasons of life when you're ready for more clarity, more intention, and more flow — without the pressure to \"perform\" productivity.",
      "This journal gently guides you into a rhythm that feels natural, not forced. Instead of overwhelming you with complex systems, The Shift helps you organise your day in a way that feels doable, grounding, and aligned with what truly matters to you.",
      "Imagine beginning each morning by simply laying out your priorities, setting your intentions, and taking a moment to breathe before the day begins. Imagine ending the week by checking in with yourself — What worked? What didn't? What felt good? — and letting that reflection shape the week ahead.",
      "The Shift turns planning into a mindful ritual, not a task. It's your soft structure for a busy life, a quiet companion that holds your plans, thoughts, and progress with calm certainty.",
    ],
    features: [
      'Total Pages: 120 pages for structured, consistent planning.',
      '100 gsm Paper: Smooth, bleed-resistant pages suitable for most pens.',
      'Hardback cover for durability, stability, and a luxurious hand-feel.',
      'Compact Size: 5.8 × 8.3 inches for easy carrying.',
      '99 Daily Planner Pages: Simple daily layouts to organise tasks, priorities, and notes.',
      '15 Weekly Reflection Pages: A quick weekly reset to review progress and realign.',
      '5 Monthly Calendar Pages: Minimal monthly overview for planning ahead and tracking key dates.',
    ],
  },
  'gentle-pause': {
    category: 'Journal',
    name: 'The Gentle Pause',
    price: 1299,
    priceFormatted: 'INR 1,299',
    inStock: true,
    images: ['images/gentle-pause-product-display-min.webp', 'images/gentle-pause-1a-1.webp'],
    description: [
      "The Gentle Pause is a journal for those moments when you need to slow down and breathe. Designed with intention, it invites you to pause, reflect, and reconnect with what matters.",
      "With a deep plum cover and geometric gold pattern, it's a beautiful companion for your daily reflections.",
    ],
    features: [
      'Deep plum hardback cover with geometric gold foil pattern.',
      '120 guided reflection pages.',
      '100 gsm acid-free paper.',
      'Compact size suitable for everyday carry.',
      'Ribbon bookmark in gold.',
    ],
  },
  'inner-alchemy': {
    category: 'Notebook',
    name: 'Inner Alchemy',
    price: 1199,
    priceFormatted: 'INR 1,199',
    inStock: true,
    images: ['images/inner-alchemy-product-display-min.webp', 'images/inner-alchemy-img1-min-1.webp'],
    description: [
      "Inner Alchemy is a blank notebook for those who prefer to set their own rhythm. Minimalist ivory with a delicate botanical illustration on the cover — it invites you to fill every page with whatever your inner world needs.",
      "Unlined, undirected, and entirely yours.",
    ],
    features: [
      'Ivory hardback cover with botanical illustration.',
      '120 blank pages for free expression.',
      '100 gsm acid-free paper.',
      'Lay-flat binding for comfortable writing.',
      'Ribbon bookmark.',
    ],
  },
  'self-discovery': {
    category: 'Notebook',
    name: 'Self Discovery',
    price: 1299,
    priceFormatted: 'INR 1,299',
    inStock: true,
    images: ['images/self-discovery-product-display-min.webp', 'images/seld-discovery-img1-min (1).webp'],
    description: [
      "Self Discovery is a blank journal for deep self-knowing. Forest green with gold embossing — it's built for those who are ready to explore who they are and who they are becoming, in their own words and their own way.",
      "No prompts. No structure. Just you and the page.",
    ],
    features: [
      'Forest green hardback cover with gold embossing.',
      '128 blank pages.',
      '100 gsm acid-free paper.',
      'Lay-flat binding.',
      'Premium ribbon marker.',
    ],
  },
  'self-care-cards': {
    category: 'Self Care Cards',
    name: 'The Ritual Edit',
    price: 799,
    priceFormatted: 'INR 799',
    inStock: true,
    images: ['images/self-care-cards-display-min.webp', 'images/self-care-card-img-1.webp'],
    description: [
      "The Ritual Edit is a curated deck of 52 self-care prompt cards designed to anchor your daily rituals. Each card is a gentle invitation — to rest, to reflect, and to tend to yourself with intention.",
      "Beautiful enough to display on your desk. Meaningful enough to change your day.",
    ],
    features: [
      '52 beautifully designed self-care prompt cards.',
      'Printed on 350 gsm premium card stock.',
      'Matte finish with subtle gold details.',
      'Boxed for gifting or personal use.',
      'Card dimensions: 10 × 14 cm.',
    ],
  },
  'bookmark-set': {
    category: 'Desk Edit',
    name: 'Watercolour Bookmarks',
    price: 449,
    priceFormatted: 'INR 449',
    inStock: true,
    images: ['images/bookmark-img1-min.webp', 'images/bookmark-img2-min.webp', 'images/bookmark-img3-min.webp'],
    description: [
      "A set of 3 cream and blush watercolour art bookmarks. Gift-ready and beautiful, these bookmarks bring a touch of artistry to every book you open.",
    ],
    features: [
      'Set of 3 watercolour art bookmarks.',
      'Printed on 300 gsm cotton paper.',
      'Cream and blush colour palette.',
      'Wrapped in tissue and ribbon — gift-ready.',
      'Bookmark dimensions: 5 × 18 cm.',
    ],
  },
};

// ── State ─────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('ss_cart') || '[]');

// ── Helpers ───────────────────────────────────────────────
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

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
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
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
  const mainImg  = qs('.product-main-img img');
  const thumbs   = qsa('.product-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.src;
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
  const addBtn = qs('.btn-add-cart');
  if (!addBtn) return;

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

  // Quick-add buttons on cards
  qsa('.product-card-cta[data-quick-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const card  = btn.closest('.product-card');
      const name  = card.querySelector('.product-card-name')?.textContent || 'Product';
      const price = parseInt((card.querySelector('.product-card-price')?.textContent || '0').replace(/[^0-9]/g, ''));
      const img   = card.querySelector('.product-img-primary')?.src || '';
      addToCart({ id: 'p_' + Date.now(), name, price, variant: '', qty: 1, img });
    });
  });
}

// ── Wishlist ──────────────────────────────────────────────
function initWishlist() {
  let wishlist = JSON.parse(localStorage.getItem('ss_wishlist') || '[]');

  qsa('.product-wishlist-btn, .btn-wishlist').forEach(btn => {
    const id = btn.dataset.productId || btn.closest('.product-card')?.dataset?.id || 'unknown';
    if (wishlist.includes(id)) btn.classList.add('active');

    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(w => w !== id);
        btn.classList.remove('active');
      } else {
        wishlist.push(id);
        btn.classList.add('active');
      }
      localStorage.setItem('ss_wishlist', JSON.stringify(wishlist));
    });
  });
}

// ── Newsletter ────────────────────────────────────────────
function initNewsletter() {
  qsa('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input?.value) return;
      const btn = form.querySelector('button');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Subscribed ✓';
        btn.style.background = '#4a7c59';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          input.value = '';
        }, 3000);
      }
    });
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

  // Features list
  const featuresEl = qs('#pd-features');
  if (featuresEl) {
    featuresEl.innerHTML = p.features.map(f => `<li>${f}</li>`).join('');
  }

  // Update page title / breadcrumb
  document.title = `${p.name} — The Sapphire Scroll`;
  const breadcrumbCurrent = qs('[aria-current="page"]');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = p.name;

  // Main image
  mainImgEl.src = p.images[0];
  mainImgEl.alt = p.name;

  // Thumbnails
  const thumbsEl = qs('#pd-thumbs');
  if (thumbsEl && p.images.length > 1) {
    thumbsEl.innerHTML = p.images.map((src, i) => `
      <div class="product-thumb ${i === 0 ? 'active' : ''}" role="listitem" tabindex="0"
           data-thumb-src="${src}" aria-label="View image ${i + 1}">
        <img src="${src}" alt="${p.name} view ${i + 1}" style="width:100%;height:100%;object-fit:cover;">
      </div>`).join('');

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
}

// ── Category Filters (blog / shop) ───────────────────────
function initCategoryFilters() {
  const urlCat = new URLSearchParams(window.location.search).get('category') || '';

  const CATEGORY_LABELS = {
    'journals':        'Journals',
    'notebooks':       'Notebooks',
    'self-care-cards': 'Self Care Cards',
    'desk-edit':       'Desk Edit',
    'gifts':           'Gift Sets',
  };

  // Direct URL filter — works even when there are no filter-pill buttons
  if (urlCat) {
    const label = CATEGORY_LABELS[urlCat] || urlCat;

    // Update page heading and breadcrumb
    const heading = qs('#shop-heading');
    if (heading) heading.textContent = label;
    const crumb = qs('#shop-breadcrumb-current');
    if (crumb) crumb.textContent = label;

    qsa('[data-filterable]').forEach(grid => {
      let visibleCount = 0;
      qsa('[data-category]', grid).forEach(item => {
        const show = item.dataset.category === urlCat;
        item.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      // Show empty state if no products match
      const emptyState = qs('#shop-empty-state');
      if (emptyState) emptyState.style.display = visibleCount === 0 ? '' : 'none';
    });
  }

  qsa('.category-filters').forEach(filterBar => {
    const buttons = filterBar.querySelectorAll('.cat-btn');

    const applyFilter = (cat) => {
      buttons.forEach(b => b.classList.toggle('active', b.dataset.category === cat));
      const grid = filterBar.closest('main')?.querySelector('[data-filterable]')
                || document.querySelector('[data-filterable]');
      if (!grid) return;
      qsa('[data-category]', grid).forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    };

    if (urlCat) {
      const match = [...buttons].find(b => b.dataset.category === urlCat);
      if (match) applyFilter(urlCat);
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.category));
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

      // Simulate submission
      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align:center;padding:2rem;color:var(--brown);">
            <div style="font-size:2rem;color:var(--gold);margin-bottom:1rem;">◈</div>
            <h3 style="font-family:var(--font-serif);margin-bottom:0.75rem;">Thank You</h3>
            <p style="font-size:0.88rem;">We've received your message and will respond within 2 business days.</p>
          </div>`;
      }, 1200);
    });
  });
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

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSearch();
  initCart();
  initScrollReveal();
  initAccordions();
  initProductPage();
  initProductGallery();
  initVariantSelectors();
  initQtySelectors();
  initAddToCart();
  initWishlist();
  initNewsletter();
  initCategoryFilters();
  initSort();
  initForms();
  initActiveSectionHighlight();
  initLazyLoad();
  initVideoHero();
  initMobileFilters();
});

// Expose for inline calls
window.addToCart       = addToCart;
window.removeFromCart  = removeFromCart;
window.updateQty       = updateQty;
window.renderCartDrawer = renderCartDrawer;
window.openCartDrawer  = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.showToast       = showToast;
