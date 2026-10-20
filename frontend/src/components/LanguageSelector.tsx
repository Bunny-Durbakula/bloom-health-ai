import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'EN' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-ivory-100 border border-mint-200/80 rounded-full p-1 shadow-sm">
      <Globe className="w-3.5 h-3.5 text-forest-700 ml-1.5" />
      <div className="flex items-center gap-1">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-150 ${
                isActive
                  ? 'bg-forest-800 text-white shadow-xs'
                  : 'text-forest-900/80 hover:bg-mint-100/60'
              }`}
              title={lang.label}
              aria-label={`Switch to ${lang.label}`}
            >
              {lang.nativeName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
