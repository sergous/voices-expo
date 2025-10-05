# Voices App

A premium podcast and audio course platform featuring Juliana's vocal training content. This app allows users to access expert-led lessons through pay-per-item purchases or subscription plans, with offline listening capabilities.

## Style Guide

### Theme and Color Scheme
- **Primary**: #1ED760 (Vibrant Green)
- **Secondary**: #1DB954 (Spotify Green)
- **Accent**: #2D5BFF (Vibrant Blue)
- **Background**: #121212 (Dark)
- **Surface**: #1E1E1E (Darker Surface)
- **Text**: #FFFFFF (White)
- **Text Secondary**: #B3B3B3 (Gray)

### Visual Design
- **Style**: Minimalist with voice-centric elements
- **Mood**: Professional yet accessible
- **Visual Weight**: Medium
- **Border Radius**: 16px (rounded-xl)
- **Padding**: 16px (p-4)
- **Margin**: 12px (m-3)

## Features

1. **Onboarding Flow**
   - Supabase authentication (email, Apple, Google)
   - Goal selection with fade-in animations
   - Quick 1-minute signup process

2. **Home Screen**
   - Personalized content feed
   - Subscription banner for premium access
   - Continue learning section
   - Featured content cards

3. **Content Discovery**
   - Podcast and course categories
   - Search functionality
   - Filtered content lists

4. **Audio Player**
   - Playback controls (play, pause, skip)
   - Progress tracking
   - Speed control
   - Offline download capability

5. **Payment System**
   - Stripe integration for $2 per item
   - Subscription plans ($50/month)
   - Apple Pay support
   - Secure checkout flow

6. **User Profile**
   - Purchase history
   - Subscription status
   - Learning progress tracking
   - Account management

## Technologies Used

- **React Native** with Expo for cross-platform development
- **NativeWind** for styling with Tailwind CSS
- **Supabase** for authentication, database, and storage
- **Stripe** for payment processing
- **Expo AV** for audio playback
- **React Navigation** for app navigation

## Installation Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd voices-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. To run on iOS simulator:
```bash
npx expo run:ios
```

5. To run on Android emulator:
```bash
npx expo run:android
```

## Usage Instructions

1. **Onboarding**: Sign up using email, Apple, or Google account
2. **Browsing**: Explore podcasts and courses through the home screen
3. **Purchasing**: Buy individual items for $2 or subscribe for $50/month
4. **Listening**: Play content online or download for offline access
5. **Progress Tracking**: View learning progress in the profile section

## Deployment

The app is configured for deployment to:
- iOS App Store
- Google Play Store
- Web as a PWA (Progressive Web App)

Use Expo EAS for building and deploying to app stores.
```