/**
 * Analytics Module
 *
 * Unified analytics initialization and tracking for the Hoppa website.
 * Uses Amplitude (primary) + Firebase Analytics (secondary) for cross-platform correlation.
 */

import * as amplitude from "@amplitude/analytics-browser";
import { Identify } from "@amplitude/analytics-browser";
import {
  initializeAnalytics as initFirebaseAnalytics,
  setAnalyticsUserId as setFirebaseUserId,
  setAnalyticsUserProperties as setFirebaseUserProperties,
} from "../utils/firebase";
import {
  AMPLITUDE_API_KEY,
  ANALYTICS_ENABLED,
  CONSENT_STORAGE_KEY,
  PLATFORM,
  isAmplitudeConfigured,
} from "./config";

let isInitialized = false;

/**
 * Check if user has given analytics consent
 */
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_STORAGE_KEY) === "true";
};

/**
 * Set analytics consent
 */
export const setAnalyticsConsent = (consent: boolean): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, consent ? "true" : "false");

  if (consent && !isInitialized) {
    initializeAnalytics();
  }
};

/**
 * Initialize all analytics providers
 * Only call this after user consent is granted
 */
export const initializeAnalytics = async (): Promise<void> => {
  if (!ANALYTICS_ENABLED) {
    console.log("[Analytics] Disabled via environment variable");
    return;
  }

  if (isInitialized) {
    return;
  }

  if (typeof window === "undefined") {
    return;
  }

  try {
    // Initialize Amplitude
    if (isAmplitudeConfigured()) {
      amplitude.init(AMPLITUDE_API_KEY, {
        defaultTracking: {
          sessions: true,
          pageViews: false, // We'll handle this manually for more control
          formInteractions: false,
          fileDownloads: false,
        },
      });

      // Set platform user property
      const identifyObj = new Identify();
      identifyObj.set("platform", PLATFORM);
      amplitude.identify(identifyObj);

      console.log("[Amplitude] Initialized successfully");
    } else {
      console.warn("[Amplitude] API key not configured");
    }

    // Initialize Firebase Analytics
    await initFirebaseAnalytics();
    setFirebaseUserProperties({ platform: PLATFORM });
    console.log("[Firebase Analytics] Initialized successfully");

    isInitialized = true;
    console.log("[Analytics] Initialization complete");
  } catch (error) {
    console.error("[Analytics] Initialization failed:", error);
  }
};

/**
 * Set user ID across all analytics providers
 * Call this when user signs in/out
 */
export const setUserId = (userId: string | null): void => {
  if (!isInitialized) return;

  // Amplitude
  if (userId) {
    amplitude.setUserId(userId);
  } else {
    amplitude.reset();
  }

  // Firebase Analytics
  setFirebaseUserId(userId);

  console.log("[Analytics] User ID set:", userId ? "authenticated" : "anonymous");
};

/**
 * Set user properties across all analytics providers
 */
export const setUserProperties = (
  properties: Record<string, string | number | boolean>
): void => {
  if (!isInitialized) return;

  // Amplitude - use Identify API
  const identifyObj = new Identify();
  for (const [key, value] of Object.entries(properties)) {
    identifyObj.set(key, value);
  }
  amplitude.identify(identifyObj);

  // Firebase Analytics (convert to strings)
  const stringProps: Record<string, string> = {};
  for (const [key, value] of Object.entries(properties)) {
    stringProps[key] = String(value);
  }
  setFirebaseUserProperties(stringProps);
};

/**
 * Check if analytics is initialized
 */
export const isAnalyticsInitialized = (): boolean => isInitialized;

// Re-export event tracking functions
export * from "./events";
