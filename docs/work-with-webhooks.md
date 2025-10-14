To work with subscriptions and licenses locally you need:
- the subscription + licenses rows (even if free) to exist in your local database
- the referral to the stripe customer + subscription to exist in stripe

The easiest way to do the above is to get started with a new account, and let the webhooks do their thing.

You'll need to set up two webhooks - Clerk and Stripe.

CLERK:
- ngrok tunnel (`ngrok http 3001`)
- add webhook in Clerk (in the dashboard, Developers -> Webhooks). just subscribe to all events (no need to start checking boxes)
- copy the Signing Secret to your local .env CLERK_WEBHOOK_SECRET


STRIPE:
- `pnpm stripe`