import { POST } from '@/app/api/checkout/route';
import { Request } from 'node-fetch';

// ---------------------------------------------------------------------------
// Mock Stripe – we replace the actual Stripe constructor with a stub that
// returns a dummy checkout session URL. This prevents any network traffic or
// reliance on real secret keys during the test run.
// ---------------------------------------------------------------------------
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      checkout: {
        sessions: {
          create: jest.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/mock-session' })
        }
      }
    };
  });
});

/** Helper to build a Request with a custom Origin header */
const makeRequest = (origin: string | null) => {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (origin) headers['origin'] = origin;
  return new Request('http://localhost/api/checkout', {
    method: 'POST',
    headers,
    body: JSON.stringify({ items: [{ productId: 'dummy', quantity: 1 }] })
  });
};

describe('Checkout origin validation', () => {
  // Set required env vars for the handler (Stripe key is mocked, so dummy ok)
  beforeAll(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_dummy';
    process.env.NEXT_PUBLIC_SITE_URL = 'https://mgcreations.store';
  });

  test('accepts exact configured origin and returns a checkout URL', async () => {
    const resp = await POST(makeRequest('https://mgcreations.store'));
    expect(resp.status).not.toBe(403);
    const json = await resp.json();
    expect(json.url).toBe('https://checkout.stripe.com/mock-session');
  });

  test('accepts www sub‑domain and returns a checkout URL', async () => {
    const resp = await POST(makeRequest('https://www.mgcreations.store'));
    expect(resp.status).not.toBe(403);
    const json = await resp.json();
    expect(json.url).toBe('https://checkout.stripe.com/mock-session');
  });

  test('rejects unrelated origin with proper 403 error', async () => {
    const resp = await POST(makeRequest('https://evil.example.com'));
    expect(resp.status).toBe(403);
    const json = await resp.json();
    expect(json.error).toBe('Invalid request origin.');
  });
});
