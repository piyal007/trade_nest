import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Determine if user has explicitly chosen a theme previously
  const initialSavedTheme = useMemo(() => localStorage.getItem('theme'), []);
  const [hasExplicitPreference, setHasExplicitPreference] = useState(
    () => initialSavedTheme === 'dark' || initialSavedTheme === 'light'
  );

  const getSystemPrefersDark = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (initialSavedTheme === 'dark') return true;
    if (initialSavedTheme === 'light') return false;
    return getSystemPrefersDark();
  });

  const toggleTheme = () => {
    setHasExplicitPreference(true);
    setIsDarkMode((previous) => !previous);
  };

  // Persist only when user explicitly chooses
  useEffect(() => {
    if (hasExplicitPreference) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [hasExplicitPreference, isDarkMode]);

  // Apply theme to document immediately on changes
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      html.setAttribute('data-theme', 'dark');
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.setAttribute('data-theme', 'light');
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Follow system changes only when no explicit preference
  useEffect(() => {
    if (hasExplicitPreference) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event) => setIsDarkMode(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [hasExplicitPreference]);

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 