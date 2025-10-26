# Environment Setup

Create a `.env.local` file in the root of the project with the following variables:

```bash
# Backend API URL (server-side only, not exposed to client)
API_URL=https://fitwars-backend-z2twf2vqkq-ew.a.run.app

# Firebase Configuration (client-side)
# Get these values from your Firebase project settings in the mobile app
# Path: hoppa/clients/android/app/google-services.json or iOS GoogleService-Info.plist
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Finding Firebase Config

Your Firebase configuration is already set up in your mobile app. You can find it in:

- **Android**: `hoppa/clients/android/app/google-services.json`
- **iOS**: `hoppa/clients/ios/GoogleService-Info.plist`

Copy these same values to your `.env.local` file.

## Note

The `.env.local` file is git-ignored and should never be committed to the repository.
