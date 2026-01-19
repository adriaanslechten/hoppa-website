/**
 * usePageTracking Hook
 *
 * Automatically tracks page views on route changes.
 * Only tracks after analytics is initialized and user has given consent.
 */

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { trackPageView } from "../events";
import { isAnalyticsInitialized } from "../index";

/**
 * Hook to automatically track page views on Next.js route changes
 */
export const usePageTracking = (): void => {
  const router = useRouter();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const handleRouteChange = (url: string): void => {
      // Avoid tracking the same page twice
      if (url === previousPathRef.current) return;

      // Only track if analytics is initialized
      if (!isAnalyticsInitialized()) return;

      previousPathRef.current = url;

      // Extract path without query params for cleaner tracking
      const path = url.split("?")[0];

      // Get page title from document
      const pageTitle = typeof document !== "undefined" ? document.title : "";

      trackPageView(path, pageTitle);
    };

    // Track initial page view
    if (isAnalyticsInitialized() && router.pathname !== previousPathRef.current) {
      previousPathRef.current = router.pathname;
      trackPageView(router.pathname, document?.title || "");
    }

    // Subscribe to route changes
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);
};

export default usePageTracking;
