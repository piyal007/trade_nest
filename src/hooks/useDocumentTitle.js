import { useEffect } from 'react';

/**
 * Custom hook to set the document title dynamically
 * @param {string} title - The title to set for the current page
 * @param {boolean} [includeAppName=true] - Whether to include the app name in the title
 */
const useDocumentTitle = (title, includeAppName = true) => {
  useEffect(() => {
    const appName = 'TradeNest';
    document.title = includeAppName ? `${title} | ${appName}` : title;
    
    // Restore the original title when the component unmounts
    return () => {
      document.title = appName;
    };
  }, [title, includeAppName]);
};

export default useDocumentTitle;