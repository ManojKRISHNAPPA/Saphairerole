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

  // Navigate to shop with search query on Enter
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
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
                <img src="${rp.images[0]}" alt="${rp.name}" class="product-img-primary">
                ${rp.images[1] ? `<img src="${rp.images[1]}" alt="${rp.name} alt view" class="product-img-secondary">` : ''}
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

// ── Category Filters (blog / shop) ───────────────────────
function initCategoryFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlCat    = urlParams.get('category') || '';
  const urlSearch = urlParams.get('search') || '';

  const CATEGORY_LABELS = {
    'journals':        'Journals',
    'notebooks':       'Notebooks',
    'self-care-cards': 'Self Care Cards',
    'desk-edit':       'Desk Edit',
    'gifts':           'Gift Sets',
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
            <img src="${item.img}" alt="${item.name}" class="product-img-primary">
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
              <img src="${p.images[0]}" alt="${p.name}" class="product-img-primary">
              ${p.images[1] ? `<img src="${p.images[1]}" alt="${p.name}" class="product-img-secondary">` : ''}
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

  function renderCartPage() {
    const subtotalEl = qs('#cart-page-subtotal');
    const shippingEl = qs('#cart-page-shipping');
    const taxEl      = qs('#cart-page-tax');
    const totalEl    = qs('#cart-page-total');

    if (cart.length === 0) {
      itemsEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (taxEl)      taxEl.textContent      = '₹0';
      if (totalEl)    totalEl.textContent    = '₹0';
      if (shippingEl) { shippingEl.textContent = '₹99'; shippingEl.style.color = 'inherit'; }
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    itemsEl.innerHTML = cart.map(item => `
      <div data-id="${item.id}" data-variant="${item.variant || ''}"
        style="display:flex;align-items:center;gap:1rem;padding:1.5rem 0;border-bottom:1px solid var(--grey-light);">
        <!-- Product info -->
        <div style="flex:1;min-width:0;display:flex;gap:1rem;align-items:center;">
          <div style="width:80px;height:100px;flex-shrink:0;overflow:hidden;background:var(--cream);display:flex;align-items:center;justify-content:center;">
            ${item.img
              ? `<img src="${item.img}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;">`
              : `<span style="font-size:1.5rem;opacity:0.3;">◈</span>`}
          </div>
          <div style="min-width:0;">
            <div style="font-family:var(--font-serif);font-size:1rem;margin-bottom:0.25rem;">${item.name}</div>
            ${item.variant ? `<div style="font-size:0.78rem;color:var(--grey-mid);">${item.variant}</div>` : ''}
          </div>
        </div>
        <!-- Qty controls -->
        <div style="display:flex;align-items:center;gap:0.4rem;border:1px solid var(--grey-light);padding:0.25rem 0.5rem;flex-shrink:0;">
          <button class="cart-qty-btn" data-action="dec" data-id="${item.id}" data-variant="${item.variant || ''}"
            style="background:none;border:none;cursor:pointer;font-size:1rem;color:var(--brown);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;">&#8722;</button>
          <span style="font-family:'Jost',sans-serif;font-size:0.9rem;min-width:1.5rem;text-align:center;">${item.qty}</span>
          <button class="cart-qty-btn" data-action="inc" data-id="${item.id}" data-variant="${item.variant || ''}"
            style="background:none;border:none;cursor:pointer;font-size:1rem;color:var(--brown);width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;">&#43;</button>
        </div>
        <!-- Price -->
        <div style="width:100px;text-align:right;font-family:'Cormorant Garamond',serif;font-size:1.05rem;white-space:nowrap;flex-shrink:0;">
          &#8377;${(item.price * item.qty).toLocaleString('en-IN')}
        </div>
        <!-- Remove -->
        <button class="cart-remove-btn" data-id="${item.id}" data-variant="${item.variant || ''}"
          aria-label="Remove ${item.name}"
          style="background:none;border:none;cursor:pointer;color:var(--grey-mid);font-size:1.2rem;padding:0;width:2rem;text-align:center;flex-shrink:0;transition:color 0.2s;">&times;</button>
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
    const shipping = subtotal >= 2000 ? 0 : 99;
    const tax      = Math.round(subtotal * 0.18);
    const total    = subtotal + shipping + tax;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
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

  renderCartPage();
}

window.applyCoupon = function() {
  const code = qs('#coupon-code')?.value?.trim().toUpperCase();
  if (!code) return;
  showToast('Invalid or expired coupon code.');
};

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
  initWishlistPage();
  initDiscoverMore();
  initCartPage();
});

// Expose for inline calls
window.addToCart       = addToCart;
window.removeFromCart  = removeFromCart;
window.updateQty       = updateQty;
window.renderCartDrawer = renderCartDrawer;
window.openCartDrawer  = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;
window.showToast       = showToast;
