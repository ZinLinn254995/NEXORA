import React, { createContext, useContext, useState, useEffect } from 'react';
import { InterfaceLanguage, TranslationDictionary } from '../types/i18n';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: InterfaceLanguage;
  setLanguage: (lang: InterfaceLanguage) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'nexora_ui_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<InterfaceLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'my') {
        return saved;
      }
    } catch {
      // LocalStorage unavailable
    }
    return 'en';
  });

  const setLanguage = (newLang: InterfaceLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language] || translations.en,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
