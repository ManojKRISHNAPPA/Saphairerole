# EmailJS Order Templates

These templates match the parameters sent by `sendOrderEmails()` in `js/checkout.js`.

## Shared variables

- `{{order_id}}`
- `{{payment_id}}`
- `{{order_date}}`
- `{{customer_name}}`
- `{{customer_email}}`
- `{{customer_phone}}`
- `{{shipping_address}}`
- `{{items}}`
- `{{subtotal}}`
- `{{shipping}}`
- `{{tax}}`
- `{{total}}`
- `{{delivery_estimate}}`
- `{{store_name}}`
- `{{notes}}`
- `{{to_email}}`
- `{{to_name}}`
- `{{reply_to}}`

## Customer template

- Suggested name: `Order Confirmation`
- Template ID: `template_order_customer`
- Subject:

```text
Your order {{order_id}} with {{store_name}} is confirmed
```

## Owner template

- Suggested name: `New Order Alert`
- Template ID: `template_order_owner`
- Subject:

```text
New order received: {{order_id}} from {{customer_name}}
```
