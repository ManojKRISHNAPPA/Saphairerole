# EmailJS Enquiry Template

Use this to create the enquiry template in EmailJS for The Sapphire Scroll.

## Template settings

- Template name: `Website Enquiry`
- Suggested template ID: `template_enquiry`
- Service ID: `service_h22032m`
- To email: `{{to_email}}`
- Reply-to: `{{reply_to}}`

## Subject

```text
New {{form_source}} from {{name}}{{contact_name}}
```

If EmailJS does not handle the combined placeholder well in the subject, use this instead:

```text
New website enquiry from {{reply_to}}
```

## HTML content

```html
<div style="margin:0;padding:24px;background:#f7f1e8;font-family:Georgia,serif;color:#1c1c2e;">
  <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e8ddd0;">
    <div style="padding:24px 28px;background:#1c1c2e;color:#ffffff;">
      <div style="font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#c9a84c;">The Sapphire Scroll</div>
      <h1 style="margin:10px 0 0;font-size:28px;font-weight:400;line-height:1.2;">New Enquiry Received</h1>
    </div>

    <div style="padding:28px;">
      <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#5c3d2e;">
        A new enquiry has been submitted from the website.
      </p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.6;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;width:180px;color:#9c9289;">Form Source</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{form_source}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Submitted At</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{submitted_at}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{name}}{{contact_name}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Company</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{company}}{{company_name}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{email}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Phone</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{phone}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Enquiry Type</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{type}}{{enquiry_type}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#9c9289;">Quantity</td>
          <td style="padding:10px 0;border-bottom:1px solid #f0e8da;color:#1c1c2e;">{{quantity}}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;vertical-align:top;color:#9c9289;">Message</td>
          <td style="padding:10px 0;color:#1c1c2e;white-space:pre-line;">{{message}}</td>
        </tr>
      </table>

      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#9c9289;">
        Reply directly to this email to answer the customer. Source page: {{page_url}}
      </p>
    </div>
  </div>
</div>
```

## Final code step

After creating the template in EmailJS, copy its template ID and replace this value in `js/config.js`:

```js
enquiryTemplate: 'EMAILJS_TEMPLATE_ENQUIRY_REPLACE_ME'
```

Example:

```js
enquiryTemplate: 'template_enquiry'
```
