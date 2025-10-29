'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      console.log('Applying theme, isDark:', isDark);
      // Apply theme to document
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      
      // Save to localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      console.log('Theme applied. HTML classes:', document.documentElement.classList.toString());
      console.log('Saved to localStorage:', localStorage.getItem('theme'));
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    console.log('=== TOGGLE CLICKED ===');
    console.log('Current isDark:', isDark);
    console.log('Will change to:', !isDark);
    
    // Temporarily disable transitions for instant theme change
    document.documentElement.classList.add('theme-transitioning');
    
    // Change theme
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    console.log('State updated to:', newIsDark);
    
    // Re-enable transitions after a brief delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 25);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

