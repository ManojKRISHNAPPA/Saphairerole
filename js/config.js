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
    ownerEmail: 'contactmanojmech@gmail.com',
    supportEmail: 'contactmanojmech@gmail.com',
    // Used on the invoice header. Optional.
    gstin:   '',           // e.g. '36ABCDE1234F1Z5' (leave '' to hide)
    address: 'Jaipur, India',
  },

  // ── Razorpay (client-only Checkout) ───────────────────────
  // Get this from Razorpay Dashboard → Settings → API Keys.
  // Use the TEST key (rzp_test_…) until you go live, then swap
  // for the LIVE key (rzp_live_…).
  razorpay: {
    keyId:    'rzp_test_REPLACE_ME',
    currency: 'INR',
    themeColor: '#1C1C2E',   // navy — matches the brand
  },

  // ── EmailJS ───────────────────────────────────────────────
  // Dashboard → Account → API Keys (Public Key),
  // Email Services (Service ID), Email Templates (Template IDs).
  emailjs: {
    publicKey:        'EMAILJS_PUBLIC_KEY_REPLACE_ME',
    serviceId:        'EMAILJS_SERVICE_ID_REPLACE_ME',
    customerTemplate: 'EMAILJS_TEMPLATE_CUSTOMER_REPLACE_ME', // order confirmation → buyer
    ownerTemplate:    'EMAILJS_TEMPLATE_OWNER_REPLACE_ME',    // new order alert → store owner
    enquiryTemplate:  'EMAILJS_TEMPLATE_ENQUIRY_REPLACE_ME',  // contact/corporate enquiry → company inbox
  },

  // ── Order rules (kept in sync with the cart page) ─────────
  order: {
    freeShippingThreshold: 2000, // ₹ — at/above this, shipping is free
    shippingFlat:          99,   // ₹ — flat shipping below the threshold
    taxRate:               0.18, // 18% GST
    deliveryDays:          7,
  },
};
