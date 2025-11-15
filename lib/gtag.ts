const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Declare gtag on window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;

  window.gtag?.("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = (
  action: string,
  options?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (!GA_TRACKING_ID) return;

  window.gtag?.("event", action, options);
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!GA_TRACKING_ID) return;

  window.gtag?.("event", eventName, eventParams);
};
