import React, { createContext, useEffect, useState } from 'react';
import Loader from '../Loder/loader';
import { getItem, setItem } from '../../common/localStorage';

// Create a context for theme or language
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  
  // Set the default language to 'en' on component mount
  useEffect(() => {
    const savedLanguage = getItem("language");
    if (!savedLanguage) {
      setItem("language", "en");
    }
  }, []);

  const changeLanguage = (value) => {
    setLoading(true);
    // Simulate a loader for 2 seconds
    setTimeout(() => {
      setItem("language", value);
      setLoading(false); // Hide the loader after the language is set
    }, 2000);
  };

  return (
    <>
      {loading && <Loader loaderTransForm="loaderTransForm" />}
      <ThemeContext.Provider value={{ changeLanguage, loading }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};
