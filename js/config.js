/* ============================================================
   THE SAPPHIRE SCROLL — Storefront Config
   ------------------------------------------------------------
   Fill in the keys below. All of these are PUBLIC (publishable)
   keys and are safe to ship in a static GitHub Pages site.

   ⚠️  Never put your Razorpay KEY SECRET or an EmailJS PRIVATE
       key here — those must stay on a server. This is a
       client-only checkout, so payments are reconciled via the
       Razorpay Dashboard + webhooks, not server-side signature
       verification.
   ============================================================ */
window.SS_CONFIG = {
  // ── Store details (shown on invoice + emails) ─────────────
  store: {
    name:    'The Sapphire Scroll',
    url:     'https://www.thesapphirescroll.com',
    // Where the store-owner "new order" notification is sent.
    ownerEmail: 'info@thesapphirescroll.com',
    supportEmail: 'info@thesapphirescroll.com',
    // Used on the invoice header. Optional.
    gstin:   '',           // e.g. '36ABCDE1234F1Z5' (leave '' to hide)
    address: '',
  },

  // ── Razorpay (client-only Checkout) ───────────────────────
  // Get this from Razorpay Dashboard → Settings → API Keys.
  // Use the TEST key (rzp_test_…) until you go live, then swap
  // for the LIVE key (rzp_live_…).
  razorpay: {
    keyId:    'rzp_live_RmF3i4Hfjovo7B',
    currency: 'INR',
    themeColor: '#1C1C2E',   // navy — matches the brand
    // Optional secure backend for creating Razorpay Orders and verifying signatures.
    // Example: 'https://sapphire-razorpay-api.yourname.workers.dev'
    apiBaseUrl: 'https://little-cake-2bae.contactmanojmech.workers.dev',
    // Optional host allow-list for LIVE key safety checks.
    // If omitted, checkout uses store.url hostname.
    // Example: ['www.thesapphirescroll.com', 'thesapphirescroll.com']
    allowedHosts: ['www.thesapphirescroll.com', 'thesapphirescroll.com'],
  },

  // ── EmailJS ───────────────────────────────────────────────
  // Dashboard → Account → API Keys (Public Key),
  // Email Services (Service ID), Email Templates (Template IDs).
  emailjs: {
    publicKey:        'Nl2kwj66DRE8pLIVp',
    serviceId:        'service_h22032m',
    customerTemplate: 'template_order_customer',              // order confirmation → buyer
    ownerTemplate:    'template_order_owner',                 // new order alert → store owner
    enquiryTemplate:  'template_fjxyquo',                     // contact/corporate enquiry → company inbox
    newsletterTemplate:'template_fjxyquo',                    // newsletter signup alert → company inbox
  },

  // ── Order rules (kept in sync with the cart page) ─────────
  order: {
    freeShippingThreshold: 2000, // ₹ — at/above this, shipping is free
    shippingFlat:          1,    // ₹ — test shipping charge below the threshold
    taxRate:               0.18, // 18% GST
    deliveryDays:          7,
    allowManualWithoutPayment: true, // temporary fallback until Razorpay is configured
  },
};
