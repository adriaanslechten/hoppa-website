# Hoppa Website - Firebase Auth + Forum Setup Guide

## ✅ What's Been Implemented

Your Next.js website now has:

1. **Firebase Authentication** (email/password + Google Sign-in)
2. **Forum System** (topics, comments, voting)
3. **Shared backend** with your mobile app
4. **Production-ready architecture** with Next.js API routes

## 🚀 Quick Start

### 1. Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# Backend API (server-side only)
API_URL=https://fitwars-backend-z2twf2vqkq-ew.a.run.app

# Firebase Configuration (from your mobile app)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**To find your Firebase config:**
- Android: `hoppa/clients/android/app/google-services.json`
- iOS: `hoppa/clients/ios/GoogleService-Info.plist`

Copy the same values from your mobile app to ensure shared authentication.

### 2. Run the Development Server

```bash
cd /Users/adriaan.slechten/projects/hoppa-website
yarn dev
```

Visit `http://localhost:3000`

### 3. Test the Features

1. **Login**: Visit `/login` to create an account or sign in
2. **Forum**: Visit `/forum` to see topics
3. **Create Topic**: Click "Create Topic" button (requires login)
4. **View Topic**: Click any topic to view details and comments
5. **Vote**: Use up/down arrows on topics (requires login)
6. **Comment**: Post comments on topics (requires login)

## 📂 What Was Created

### Core Infrastructure

```
src/
├── utils/
│   └── firebase.ts                 # Firebase initialization
├── hooks/
│   └── useAuth.ts                  # Authentication hook
├── contexts/
│   └── AuthContext.tsx             # Global auth state
├── services/
│   └── api.ts                      # API client with token interceptor
└── types/
    └── forum.ts                    # Forum type definitions
```

### API Routes (Backend Proxy)

```
src/pages/api/
└── forum/
    ├── topics/
    │   ├── index.ts               # GET/POST topics
    │   └── [topicId].ts           # GET/PATCH/DELETE topic
    └── comments/
        ├── index.ts               # GET/POST comments
        └── [commentId].ts         # PATCH/DELETE comment
```

### Frontend Pages

```
src/pages/
├── login/
│   ├── LoginScreen.tsx            # Functional login/register page
│   └── Login.module.css           # Login page styles
└── forum/
    ├── index.tsx                  # Forum list page
    ├── [topicId].tsx              # Topic detail page
    └── Forum.module.css           # Forum styles
```

### Updated Files

- `next.config.mjs` - Removed static export
- `_app.tsx` - Added AuthProvider wrapper
- `TopNavBar.tsx` - Added forum link + auth UI
- `ENVIRONMENT_SETUP.md` - Environment setup instructions

## 🔧 Architecture

### Authentication Flow

1. User signs in via Firebase (email/password or Google)
2. Firebase returns JWT token
3. Token automatically attached to all API calls
4. Backend verifies token with Firebase Admin SDK
5. Protected resources accessible

### API Request Flow

```
Website → Next.js API Route → Backend API → Database
  ↓           ↓                    ↓
Firebase   Proxy Layer        JWT Verification
Token      (Server-side)      (FirebaseAuthGuard)
```

**Benefits:**
- Backend URL hidden from client
- Can add rate limiting, caching, logging
- Server-side token validation possible
- Easier to modify API structure later

### Shared Authentication

Both your website and mobile app use:
- Same Firebase project
- Same backend API
- Same user database

Users can log in on either platform with the same credentials!

## 🎨 Features Implemented

### Authentication
- ✅ Email/password sign in
- ✅ Email/password registration
- ✅ Google Sign-in (popup)
- ✅ Password reset (via email)
- ✅ Auto logout
- ✅ Protected routes
- ✅ User state management

### Forum
- ✅ List topics (with sorting: new/hot/top)
- ✅ Create topics (auth required)
- ✅ View topic details
- ✅ Vote on topics (auth required)
- ✅ Post comments (auth required)
- ✅ View comments
- ✅ Responsive design
- ✅ Loading states
- ✅ Error handling

## 🚢 Deployment

### Option 1: Vercel (Recommended)

```bash
vercel
```

Make sure to add environment variables in Vercel dashboard.

### Option 2: Other Node.js Hosts

Since you removed `output: "export"`, you can deploy to any Node.js hosting:
- Railway
- Render
- Fly.io
- AWS/GCP/Azure

## 📝 Next Steps

### Optional Enhancements

1. **User Profiles**
   - Display user names instead of IDs
   - User avatars
   - User profile pages

2. **Forum Features**
   - Edit topics/comments
   - Delete topics/comments
   - Topic categories/tags
   - Search functionality
   - Pagination

3. **Security**
   - Rate limiting on API routes
   - CORS restrictions
   - Input sanitization

4. **Performance**
   - SSR for forum pages (SEO)
   - Caching layer
   - Image optimization

5. **Analytics**
   - Track user engagement
   - Monitor API usage
   - Error tracking (Sentry)

## 🐛 Troubleshooting

### Firebase Errors

**"Missing Authorization header"**
- Check `.env.local` has all Firebase config
- Restart dev server after adding env variables

**"Invalid Firebase token"**
- Firebase config mismatch between website and mobile
- Verify you're using the same Firebase project

### API Errors

**"Failed to load topics"**
- Check backend API is running
- Verify `API_URL` in `.env.local`
- Check network tab for error details

**CORS errors**
- Backend already has CORS enabled
- If issues persist, check backend logs

### Build Errors

**Module not found**
- Run `yarn install` again
- Delete `node_modules` and `.next`, then reinstall

## 📚 Code Structure

### Best Practices Followed

1. **Type Safety**: TypeScript throughout
2. **Separation of Concerns**: API layer separate from components
3. **Reusable Hooks**: `useAuth` for all auth operations
4. **Error Handling**: Try/catch with user-friendly messages
5. **Loading States**: Proper UX during async operations
6. **Responsive Design**: Mobile-first approach
7. **Accessibility**: Semantic HTML, ARIA labels

### Key Files to Know

- `src/utils/firebase.ts` - Firebase setup
- `src/hooks/useAuth.ts` - All auth functions
- `src/services/api.ts` - API calls
- `src/contexts/AuthContext.tsx` - Global auth state
- `src/pages/api/forum/*` - Backend proxy routes

## 🎉 You're All Set!

Your website now shares authentication and data with your mobile app through the same backend. Users can create an account on the website and use it in the mobile app, or vice versa.

The forum is fully functional and ready for your users to start conversations!
