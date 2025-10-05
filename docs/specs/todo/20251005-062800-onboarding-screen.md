# Onboarding Screen Development

**Original Request**: Sergous needs a quick signup flow for Voices MVP.
**Goal**: Enable 1-min signup with goal selection for personalized UX, driving PMF.
**Priority**: High | **Deadline**: Oct 15, 2025

## Specs

1. Add Supabase auth (email/Apple/Google) in `Onboarding.tsx`.
2. Implement `Picker` for goals ("Podcasts," "Courses," "Shadowing," "Analysis").
3. Store user data in `user_profiles` table.

## Screens/Components

- `Onboarding.tsx`: Signup form

## Technical Details

- DB: `user_profiles` (id, email, goal, subscription_status, streak)
- Auth: Supabase `signInWithPassword`/`signInWithOAuth`
- UI: SwiftUI `VStack`, fade-in anim
- Constraints: Supabase free tier (441/500MB)

## Success Criteria

- [ ] 1-min signup completes
- [ ] Data stored in Supabase

## Out of Scope

- Multi-step onboarding

## Dependencies

- Supabase auth setup
- User profile schema

## Estimated Effort

- 8-10 hours development
- 2 hours testing
