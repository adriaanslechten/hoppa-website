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
import { GA_MEASUREMENT_ID } from "../analytics/config";

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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
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
      analytics = getAnalytics(app);
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
