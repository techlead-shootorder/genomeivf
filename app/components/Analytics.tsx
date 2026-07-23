"use client";
import React, { createContext, useContext, useEffect } from "react";
import Script from "next/script";

interface AnalyticsContextType {
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
}

// Analytics Context
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export default function AnalyticsProvider({
  gtmId,
  children,
}: {
  gtmId: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize GTM DataLayer BEFORE GTM script loads
    if (gtmId && typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
    }
  }, [gtmId]);

  const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
    // Track in GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {/* GTM Script - Load this FIRST with afterInteractive strategy */}
      {gtmId && (
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `
          }}
        />
      )}

      {children}
    </AnalyticsContext.Provider>
  );
}

// Custom hook to use analytics
export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

// Page tracking component - Fixed for hydration
export function PageViewTracker() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Only run on client side to prevent hydration mismatch
    if (typeof window === 'undefined') return;

    const handleRouteChange = (url: string) => {
      trackEvent('page_view', {
        page_path: url,
        page_title: typeof document !== 'undefined' ? document.title : '',
      });
    };

    // Track initial page view
    handleRouteChange(window.location.pathname);

    // Create a stable reference for the event handler
    const popstateHandler = () => {
      handleRouteChange(window.location.pathname);
    };

    // Listen for route changes
    window.addEventListener('popstate', popstateHandler);

    return () => {
      window.removeEventListener('popstate', popstateHandler);
    };
  }, [trackEvent]);

  return null;
}
