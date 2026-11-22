# Storefront Architecture & Security Rules (Firebase + Stripe)

## Skill Routing
- Always combine irebase + stripe-integration when building checkout flows, webhooks, or customer/order data models.
- Always run cc-skill-security-review before deploying changes to irestore.rules or Cloud Functions.
- Always pair ui-ux-pro-max + rontend-design + paywall-upgrade-cro for product pages, carts, and checkout UI.

## Firebase + Stripe Non-Negotiables
1. **Firestore Security Rules:** Users may read their own orders, customers, or subscriptions documents (equest.auth.uid == userId), but **NEVER** allow client-side writes (llow write: if false;) to payment status, entitlements, or price fields. Only Firebase Admin SDK inside Cloud Functions may write fulfillment states.
2. **Webhook Verification:** In Firebase Cloud Functions (onRequest), always verify the stripe-signature header using eq.rawBody (never parsed JSON eq.body) via stripe.webhooks.constructEvent().
3. **Idempotency:** Record every processed Stripe event.id in a stripe_events Firestore collection inside a transaction before fulfilling orders so Stripe webhook retries never duplicate shipments or credits.
4. **Secrets:** Store STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET in Firebase Secret Manager (defineSecret), never in .env files committed to git or NEXT_PUBLIC_ / client bundles.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
