import React, { createContext, useContext, useState } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// Create a custom hook to use the theme and toggleTheme function
export const useTheme = () => {
  return useContext(ThemeContext);
};

export const test = () => {
    return "test";
};

// Define the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Define the theme states and toggle function
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    document.body.classList.toggle('dark', theme === 'dark');

    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
