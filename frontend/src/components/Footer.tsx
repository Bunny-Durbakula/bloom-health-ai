import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { Activity, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-forest-950 text-ivory-300 border-t border-forest-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-mint-500/20 flex items-center justify-center text-mint-300">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Bloom <span className="text-mint-400 font-medium">Health AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Bloom Health AI is a multilingual healthcare information assistant empowering patients to understand health questions, symptoms, and medical test documents in plain, accessible language.
            </p>
            <div className="flex items-center gap-2 text-xs text-mint-400 pt-1">
              <Heart className="w-3.5 h-3.5 fill-mint-400" />
              <span>Multilingual care in English, Telugu (తెలుగు), and Hindi (हिन्दी)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ivory-400">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-mint-300 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-mint-300 transition-colors">
                  {t.nav.chat}
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-mint-300 transition-colors">
                  {t.nav.report}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-mint-300 transition-colors">
                  {t.nav.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Notice */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Emergency Help
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              If you have sudden chest pain, severe shortness of breath, signs of stroke, or trauma, contact emergency medical response immediately:
            </p>
            <div className="p-2.5 rounded-lg bg-forest-900/80 border border-forest-800 text-xs text-mint-200 font-mono">
              India: 112 / 108<br />
              US/Global: 911 / 112
            </div>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="mt-10 pt-6 border-t border-forest-900/80">
          <div className="p-3.5 rounded-xl bg-forest-900/60 border border-forest-800/80 text-xs text-gray-400 leading-relaxed">
            <strong className="text-ivory-200">Medical Disclaimer: </strong>
            {t.disclaimer}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
            <p>&copy; {new Date().getFullYear()} Bloom Health AI. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-mint-300 flex items-center gap-1 transition-colors">
                Privacy & Data Security <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
