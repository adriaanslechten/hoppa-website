/**
 * Analytics Event Tracking
 *
 * Unified event tracking that sends to both Amplitude and Firebase Analytics.
 * Event names use snake_case to match the mobile app conventions.
 */

import * as amplitude from "@amplitude/analytics-browser";
import { logEvent as firebaseLogEvent } from "../utils/firebase";
import { PLATFORM } from "./config";

/**
 * Track an event to both Amplitude and Firebase Analytics
 */
const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
): void => {
  const enrichedProperties = {
    ...properties,
    platform: PLATFORM,
  };

  // Amplitude
  amplitude.track(eventName, enrichedProperties);

  // Firebase Analytics
  firebaseLogEvent(eventName, enrichedProperties);
};

// ============================================================================
// Page & Navigation Events
// ============================================================================

/**
 * Track page view
 */
export const trackPageView = (pagePath: string, pageTitle?: string): void => {
  trackEvent("page_viewed", {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// ============================================================================
// Authentication Events
// ============================================================================

/**
 * Track user sign up
 */
export const trackSignUp = (method: "email" | "google" | "apple"): void => {
  trackEvent("user_signed_up", {
    auth_method: method,
    signup_platform: PLATFORM,
  });
};

/**
 * Track user sign in
 */
export const trackSignIn = (method: "email" | "google" | "apple"): void => {
  trackEvent("user_signed_in", {
    auth_method: method,
  });
};

/**
 * Track user sign out
 */
export const trackSignOut = (): void => {
  trackEvent("user_signed_out", {});
};

// ============================================================================
// Content Events
// ============================================================================

/**
 * Track blog post view
 */
export const trackBlogPostViewed = (
  postSlug: string,
  postTitle: string
): void => {
  trackEvent("blog_post_viewed", {
    post_slug: postSlug,
    post_title: postTitle,
  });
};

/**
 * Track forum topic view
 */
export const trackForumTopicViewed = (
  topicId: string,
  topicTitle: string
): void => {
  trackEvent("forum_topic_viewed", {
    topic_id: topicId,
    topic_title: topicTitle,
  });
};

// ============================================================================
// Conversion Events
// ============================================================================

/**
 * Track app download click
 */
export const trackAppDownloadClicked = (
  store: "app_store" | "play_store",
  source: string
): void => {
  trackEvent("app_download_clicked", {
    store,
    source,
  });
};

/**
 * Track CTA button click
 */
export const trackCtaClicked = (
  ctaName: string,
  ctaLocation: string
): void => {
  trackEvent("cta_clicked", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

// ============================================================================
// Cookie Consent Events
// ============================================================================

/**
 * Track cookie consent response
 */
export const trackCookieConsent = (accepted: boolean): void => {
  // Only track if accepted (we can't track if they declined since analytics isn't initialized)
  if (accepted) {
    trackEvent("cookie_consent_given", {
      consent: "accepted",
    });
  }
};
