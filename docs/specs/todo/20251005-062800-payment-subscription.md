# Payment/Subscription Screen Development

**Original Request**: Sergous needs a monetization flow for Voices MVP.
**Goal**: Enable $2 purchases and $50 subs via Stripe for revenue.
**Priority**: High | **Deadline**: Oct 22, 2025

## Specs

1. Add Stripe SDK for checkout in `Payment.tsx`.
2. Display tiers (Free, $2 Item, $50 Sub).
3. Log purchases in `purchases` table.

## Screens/Components

- `Payment.tsx`: Checkout interface

## Technical Details

- DB: `purchases` (user_id, course_id, amount, stripe_payment_id)
- Payments: Stripe SDK, webhooks
- UI: React Native `List`, Telegram palette
- Constraints: Supabase free tier (441/500MB)

## Success Criteria

- [ ] Payments process
- [ ] Data logged

## Out of Scope

- Multi-currency

## Dependencies

- Stripe account setup
- Supabase webhooks

## Estimated Effort

- 8-10 hours development
- 4 hours testing
