
import { createContext, useContext, useState, useEffect } from 'react';
import './LoadingContext.css';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-hide loading spinner after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="loading-container flex items-center justify-center">
          <span className="loading loading-bars loading-lg text-blue-500"></span>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;