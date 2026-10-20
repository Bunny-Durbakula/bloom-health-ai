import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { AlertCircle } from 'lucide-react';

export const SafetyNotice: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { t } = useLanguage();

  if (compact) {
    return (
      <div className="flex items-start gap-2 p-2.5 rounded-lg bg-mint-50/80 border border-mint-200/70 text-xs text-forest-900 leading-normal">
        <AlertCircle className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Educational Assistant: </span>
          {t.disclaimer}
        </p>
      </div>
    );
  }

  return (
    <aside aria-label="Medical Safety Notice" className="p-4 rounded-xl bg-ivory-100 border border-mint-200/80 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center shrink-0">
          <AlertCircle className="w-5 h-5 text-forest-700" />
        </div>
        <div className="text-xs space-y-1.5 text-gray-700 leading-relaxed">
          <h2 className="text-sm font-semibold text-forest-900">Patient Safety & Educational Purpose</h2>
          <p>{t.disclaimer}</p>
          <p className="text-amber-800 font-medium">{t.emergencyNotice}</p>
        </div>
      </div>
    </aside>
  );
};
