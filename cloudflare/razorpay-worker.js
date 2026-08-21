export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const corsHeaders = cors(origin, env.ALLOWED_ORIGIN);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
        return json({ ok: true, service: 'razorpay-worker' }, corsHeaders);
      }

      if (request.method === 'POST' && url.pathname === '/create-order') {
        return json(await createOrder(request, env), corsHeaders);
      }

      if (request.method === 'POST' && url.pathname === '/verify-payment') {
        return json(await verifyPayment(request, env), corsHeaders);
      }

      return json({ error: 'Not found' }, corsHeaders, 404);
    } catch (err) {
      return json({ error: err.message || 'Payment API error' }, corsHeaders, err.status || 500);
    }
  },
};

function cors(origin, allowedOrigin) {
  const allowedOrigins = String(allowedOrigin || '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
  if (!allowedOrigins.length) {
    allowedOrigins.push('https://www.thesapphirescroll.com', 'https://thesapphirescroll.com');
  }
  if (allowedOrigins.includes('https://www.thesapphirescroll.com') &&
      !allowedOrigins.includes('https://thesapphirescroll.com')) {
    allowedOrigins.push('https://thesapphirescroll.com');
  }

  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

async function createOrder(request, env) {
  requireEnv(env, 'RAZORPAY_KEY_ID');
  requireEnv(env, 'RAZORPAY_KEY_SECRET');

  const body = await request.json();
  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) badRequest('Invalid order amount');

  const receipt = String(body.orderId || `ss_${Date.now()}`).slice(0, 40);
  const notes = body.billing || {};
  const website = body.website || {};
  const orderPayload = {
    amount: Math.round(amount * 100),
    currency: body.currency || 'INR',
    receipt,
    notes: {
      site_order_id: receipt,
      customer_name: String(notes.name || '').slice(0, 120),
      customer_email: String(notes.email || '').slice(0, 120),
      customer_phone: String(notes.phone || '').slice(0, 40),
      district: String(notes.district || '').slice(0, 80),
      pincode: String(notes.pincode || '').slice(0, 20),
      checkout_origin: String(website.origin || '').slice(0, 120),
      checkout_host: String(website.hostname || '').slice(0, 80),
    },
  };

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw Object.assign(new Error(data.error && data.error.description ? data.error.description : 'Razorpay order failed'), { status: 502 });
  }

  return {
    id: data.id,
    amount: data.amount,
    currency: data.currency,
  };
}

async function verifyPayment(request, env) {
  requireEnv(env, 'RAZORPAY_KEY_SECRET');

  const body = await request.json();
  const orderId = body.razorpay_order_id;
  const paymentId = body.razorpay_payment_id;
  const signature = body.razorpay_signature;
  if (!orderId || !paymentId || !signature) badRequest('Missing Razorpay verification fields');

  const expected = await hmacSha256(`${orderId}|${paymentId}`, env.RAZORPAY_KEY_SECRET);
  return { verified: timingSafeEqual(expected, signature) };
}

async function hmacSha256(message, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return [...new Uint8Array(signature)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(left, right) {
  const a = String(left || '');
  const b = String(right || '');
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function requireEnv(env, name) {
  if (!env[name]) throw Object.assign(new Error(`${name} is not configured`), { status: 500 });
}

function badRequest(message) {
  throw Object.assign(new Error(message), { status: 400 });
}

function json(body, headers, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
}