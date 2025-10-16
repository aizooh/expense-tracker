import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = 'G-ZEEM0NSDB8';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag has loaded and send the page_view event
    if (window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        'page_path': location.pathname + location.search, // e.g., /dashboard?user=123
        'page_title': document.title, 
      });
      // Optional: console.log('GA Tracked:', location.pathname);
    }
  }, [location.pathname, location.search]); // Re-run effect when path or query params change

  return null; // Component renders nothing
};

export default AnalyticsTracker;