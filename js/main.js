/* ============================================================
   THE SAPPHIRE SCROLL — Main JavaScript
   ============================================================ */

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

// ── Category Filters (blog / shop) ───────────────────────
function initCategoryFilters() {
  qsa('.category-filters').forEach(filterBar => {
    filterBar.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.category;
        const grid = filterBar.closest('.section')?.querySelector('[data-filterable]');
        if (!grid) return;

        qsa('[data-category]', grid).forEach(item => {
          const show = cat === 'all' || item.dataset.category === cat;
          item.style.display = show ? '' : 'none';
        });
      });
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
