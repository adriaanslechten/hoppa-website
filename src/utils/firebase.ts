import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import {
  getAnalytics,
  Analytics,
  isSupported,
  logEvent as firebaseLogEvent,
  setUserId as firebaseSetUserId,
  setUserProperties as firebaseSetUserProperties,
} from "firebase/analytics";

// GA4 measurement ID for hoppa-website (separate from mobile app)
const GA_MEASUREMENT_ID = "G-NP42ZGDLR1";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: GA_MEASUREMENT_ID,
};

// Initialize Firebase only if it hasn't been initialized already
// This prevents errors during hot reloading in development
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("[Firebase] Initialized NEW app with config:", JSON.stringify(firebaseConfig, null, 2));
} else {
  app = getApp();
  console.log("[Firebase] Using EXISTING app, options:", JSON.stringify(app.options, null, 2));
}
const auth: Auth = getAuth(app);

// Analytics instance (initialized lazily on client-side only)
let analytics: Analytics | null = null;

/**
 * Initialize Firebase Analytics (client-side only)
 * Call this after user consent is granted
 */
export const initializeAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === "undefined") return null;

  try {
    const supported = await isSupported();
    if (supported && !analytics) {
      // Re-initialize Firebase app with measurementId if needed
      // This ensures GA4 gets the correct measurement ID
      const currentApp = getApps().length > 0 ? getApp() : null;
      if (currentApp) {
        analytics = getAnalytics(currentApp);
        console.log("[Firebase Analytics] Initialized with app:", currentApp.options.measurementId);
      }
    }
    return analytics;
  } catch (error) {
    console.warn("[Firebase Analytics] Failed to initialize:", error);
    return null;
  }
};

/**
 * Log an event to Firebase Analytics
 */
export const logEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  }
};

/**
 * Set user ID for Firebase Analytics
 */
export const setAnalyticsUserId = (userId: string | null): void => {
  if (analytics) {
    firebaseSetUserId(analytics, userId);
  }
};

/**
 * Set user properties for Firebase Analytics
 */
export const setAnalyticsUserProperties = (
  properties: Record<string, string>
): void => {
  if (analytics) {
    firebaseSetUserProperties(analytics, properties);
  }
};

export { app, auth, analytics };
