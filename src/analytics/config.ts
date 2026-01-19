/**
 * Analytics Configuration
 *
 * Uses the same Amplitude API key as the mobile app for cross-platform correlation.
 * Firebase Analytics is configured via the existing Firebase setup with measurementId.
 */

// Amplitude API key (same as mobile app)
export const AMPLITUDE_API_KEY =
  process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || "";

// Firebase Analytics measurement ID for hoppa-website (separate from mobile app)
export const GA_MEASUREMENT_ID = "G-NWNX10JXF3";

// Platform identifier for cross-platform correlation
export const PLATFORM = "web" as const;

// Analytics feature flag
export const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false";

// Consent storage key
export const CONSENT_STORAGE_KEY = "hoppa_analytics_consent";

// Check if Amplitude is configured
export const isAmplitudeConfigured = (): boolean => {
  return AMPLITUDE_API_KEY.length > 0;
};
