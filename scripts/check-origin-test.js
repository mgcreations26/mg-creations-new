import { POST } from '@/app/api/checkout/route';
import { Request } from 'node-fetch';

// Helper to create a request with a given Origin header
function makeRequest(origin) {
  const headers = { 'content-type': 'application/json' };
  if (origin) headers['origin'] = origin;
  return new Request('http://localhost/api/checkout', {
    method: 'POST',
    headers,
    body: JSON.stringify({ items: [{ productId: 'dummy', quantity: 1 }] })
  });
}

async function run() {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://mgcreations.store';
  process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';

  const origins = [
    'https://mgcreations.store',
    'https://www.mgcreations.store',
    'https://evil.example.com'
  ];

  for (const o of origins) {
    const resp = await POST(makeRequest(o));
    const json = await resp.json();
    console.log(`Origin: ${o} => status ${resp.status}, body:`, json);
  }
}

run().catch(err => console.error(err));
