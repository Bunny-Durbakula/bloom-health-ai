import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { LanguageSelector } from './LanguageSelector';
import { Activity, MessageSquareHeart, FileText, User as UserIcon, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-ivory-100/90 backdrop-blur-md border-b border-mint-200/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-mint-100 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5 text-mint-300" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-forest-900 group-hover:text-forest-700 transition-colors">
                Bloom <span className="text-forest-700 font-medium">Health AI</span>
              </span>
              <p className="text-[10px] text-gray-700 -mt-0.5 tracking-wider uppercase font-semibold">
                Healthcare Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/') ? 'text-forest-900 bg-mint-100/70' : 'text-gray-800 hover:text-forest-800 hover:bg-mint-50'
              }`}
            >
              {t.nav.home}
            </Link>

            <Link
              to="/chat"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/chat') ? 'text-forest-900 bg-mint-100/70' : 'text-gray-800 hover:text-forest-800 hover:bg-mint-50'
              }`}
            >
              <MessageSquareHeart className="w-4 h-4 text-forest-600" />
              {t.nav.chat}
            </Link>

            <Link
              to="/report"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/report') ? 'text-forest-900 bg-mint-100/70' : 'text-gray-800 hover:text-forest-800 hover:bg-mint-50'
              }`}
            >
              <FileText className="w-4 h-4 text-forest-600" />
              {t.nav.report}
            </Link>

            <Link
              to="/privacy"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/privacy') ? 'text-forest-900 bg-mint-100/70' : 'text-gray-800 hover:text-forest-800 hover:bg-mint-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-forest-600" />
              {t.nav.privacy}
            </Link>
          </nav>

          {/* Right Action: Language + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />

            {isAuthenticated ? (
              <div className="flex items-center gap-3 border-l border-mint-200/80 pl-3">
                <div className="flex items-center gap-1.5 text-xs text-forest-900 font-semibold bg-mint-100/60 px-2.5 py-1 rounded-full">
                  <UserIcon className="w-3.5 h-3.5 text-forest-700" />
                  <span className="max-w-[120px] truncate">{user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-xs text-gray-700 hover:text-red-700 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  title={t.nav.logout}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.nav.logout}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 border-l border-mint-200/80 pl-3">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-semibold text-forest-900 hover:text-forest-700 hover:bg-mint-50 rounded-lg transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-sm font-bold bg-forest-800 hover:bg-forest-900 text-white rounded-lg shadow-xs transition-colors"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-forest-900 hover:bg-mint-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-mint-200 bg-ivory-100 px-4 pt-3 pb-5 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-forest-900 hover:bg-mint-100"
          >
            {t.nav.home}
          </Link>
          <Link
            to="/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-forest-900 hover:bg-mint-100"
          >
            <MessageSquareHeart className="w-5 h-5 text-forest-700" />
            {t.nav.chat}
          </Link>
          <Link
            to="/report"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-forest-900 hover:bg-mint-100"
          >
            <FileText className="w-5 h-5 text-forest-700" />
            {t.nav.report}
          </Link>
          <Link
            to="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-semibold text-forest-900 hover:bg-mint-100"
          >
            <ShieldCheck className="w-5 h-5 text-forest-700" />
            {t.nav.privacy}
          </Link>

          <div className="pt-3 border-t border-mint-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 text-sm text-gray-700 font-medium truncate">
                  Logged in as <span className="font-semibold text-forest-900">{user?.email}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-3 py-2 text-sm font-semibold text-forest-900 bg-mint-100 rounded-md"
                >
                  {t.nav.login}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center px-3 py-2 text-sm font-bold text-white bg-forest-800 rounded-md"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
