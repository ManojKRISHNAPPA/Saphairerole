# Checkout Setup — Razorpay + EmailJS

This store uses GitHub Pages for the static website. Public keys live in the
site config, while the Razorpay **Key Secret** must stay in a backend such as a
Cloudflare Worker. **Never** put a Razorpay **Key Secret** or an EmailJS
**Private Key** in these files.

All configuration lives in **`js/config.js`**.

---

## 1. Razorpay

1. Create an account → Razorpay Dashboard → **Settings → API Keys**.
2. Copy the **Key ID** (`rzp_test_…` for testing, `rzp_live_…` when live).
3. Paste it into `js/config.js` → `razorpay.keyId`.

```js
razorpay: {
  keyId: 'rzp_live_xxxxxxxxxxxxx',
  currency: 'INR',
  themeColor: '#1C1C2E',
  apiBaseUrl: 'https://your-worker.your-account.workers.dev',
  allowedHosts: ['www.thesapphirescroll.com', 'thesapphirescroll.com'],
}
```

### Fixing "Business - Website Mismatch"

If Razorpay shows this status, it usually means checkout was opened on a domain
different from your approved website.

1. In Razorpay Dashboard, set **Account & Settings → Website/App URL** to your
   production checkout domain (for this site: `https://www.thesapphirescroll.com`).
2. Ensure your public Key ID and backend secret belong to the same Razorpay account.
3. In `js/config.js`, keep `store.url` and `razorpay.allowedHosts` aligned to the
   exact hostnames you use for checkout.
4. Avoid collecting live payments from preview/staging domains.

Checkout now blocks live-key payments on unexpected hosts and shows a clear
message before payment starts.

### Secure Razorpay backend with Cloudflare Worker

Use `cloudflare/razorpay-worker.js` as the Worker code. In Cloudflare, add these
Worker environment variables/secrets:

```text
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_from_razorpay_dashboard
ALLOWED_ORIGIN=https://www.thesapphirescroll.com
```

After deploying the Worker, paste the Worker URL into `js/config.js` →
`razorpay.apiBaseUrl`. The site will call:

```text
/create-order
/verify-payment
```

If `apiBaseUrl` is left blank, checkout falls back to the older client-only
Razorpay flow and cannot verify signatures automatically.

---

## 2. EmailJS (confirmation emails — customer + store owner)

1. Sign up at https://www.emailjs.com → connect an email service
   (Gmail, etc.) → copy the **Service ID**.
2. **Account → API Keys** → copy the **Public Key**.
3. Create **two** email templates and copy each **Template ID**:
   - Customer order confirmation
   - Store-owner new-order alert
4. Fill them into `js/config.js → emailjs`.

```js
emailjs: {
  publicKey:        'xxxxxxxxxxxx',
  serviceId:        'service_xxxxx',
  customerTemplate: 'template_customer',
  ownerTemplate:    'template_owner',
  enquiryTemplate:  'template_enquiry',   // contact + corporate forms
}
```

### Enquiry template (contact.html + corporate.html → company inbox)

Create a 3rd template for website enquiries. Set its **To Email** to
`{{to_email}}` (auto-filled with `store.ownerEmail`) and **Reply-To** to
`{{reply_to}}` (the sender, so you can reply directly). Available variables —
every named form field is passed through automatically:

| Variable | Source |
|---|---|
| `{{company_name}}` `{{contact_name}}` | Corporate form |
| `{{email}}` `{{phone}}` | Both forms |
| `{{enquiry_type}}` `{{quantity}}` `{{message}}` | Form fields |
| `{{form_source}}` | Which page/form it came from |
| `{{page_url}}` `{{submitted_at}}` | Context |
| `{{to_email}}` `{{reply_to}}` | Routing (company inbox / sender) |

> Note: the file-upload field ("brief") is **not** emailed — EmailJS attachments
> require a paid plan. The rest of the enquiry is sent as text.
> Until `enquiryTemplate` is set, the form still shows a polite "Thank You"
> but does not send — so add this template to actually receive enquiries.

### Template variables available

Use these in **both** templates (subject/body). The recipient is controlled by
the **To Email** field of the template — set it to `{{to_email}}`.

| Variable | Example |
|---|---|
| `{{order_id}}` | SS-260628-1234 |
| `{{payment_id}}` | pay_Q1aB2c3D4e |
| `{{order_date}}` | 28/6/2026, 7:30 pm |
| `{{customer_name}}` | Aarav Sharma |
| `{{customer_email}}` | aarav@example.com |
| `{{customer_phone}}` | 9876543210 |
| `{{shipping_address}}` | 12 MG Road, Hyderabad, Hyderabad, Telangana - 500050 |
| `{{items}}` | multi-line list of items × qty — amount |
| `{{subtotal}}` `{{shipping}}` `{{tax}}` `{{total}}` | ₹3,197 / Free / ₹575 / ₹3,772 |
| `{{delivery_estimate}}` | Sunday, 5 July 2026 |
| `{{notes}}` | Gift wrap please |
| `{{store_name}}` | The Sapphire Scroll |
| `{{to_email}}` `{{to_name}}` `{{reply_to}}` | routing fields |

> The **customer** template gets `to_email = buyer`, `reply_to = support`.
> The **owner** template gets `to_email = store ownerEmail`, `reply_to = buyer`.
> Owner email is set in `config.js → store.ownerEmail`.

---

## 3. Flow

`cart.html` → **Proceed to Checkout** → `checkout.html`
(billing form + order summary) → **Pay with Razorpay** → on success:
emails fire (customer + owner) → cart cleared → `thankyou.html`
(order confirmation + **Download Invoice PDF**).

## 4. Test it

1. Add items to the cart, go to checkout, fill the form.
2. With a `rzp_test_…` key, use Razorpay's test cards
   (e.g. card `4111 1111 1111 1111`, any future expiry/CVV).
3. After "payment", you land on the thank-you page; click **Download Invoice**.
4. Check the customer + owner inboxes for the confirmation emails.

Until keys are added, the Pay button shows a friendly "not configured" notice
and emails are skipped — the rest of the UI works.
