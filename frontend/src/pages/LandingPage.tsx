import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { SafetyNotice } from '../components/SafetyNotice';
import {
  MessageSquareHeart,
  FileText,
  Languages,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  // Cycling animated headline between English and Telugu
  const headlines = [
    { text: "Know more about your health.", lang: "en" },
    { text: "మీ ఆరోగ్యం గురించి మరింత తెలుసుకోండి.", lang: "te" },
  ];
  const [currentHeadlineIdx, setCurrentHeadlineIdx] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setCurrentHeadlineIdx((prev) => (prev + 1) % headlines.length);
        setFadeState('in');
      }, 400);
    }, 3800);

    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-12">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-mint-100/50 via-transparent to-transparent pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mint-100/80 border border-mint-200/90 text-xs font-bold text-forest-900 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-forest-600" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-tight">
            {t.hero.headline}
          </h1>

          {/* Cycling Bilingual Animated Subtitle */}
          <div className="h-12 flex items-center justify-center">
            <p
              className={`text-xl sm:text-2xl font-semibold text-forest-700 transition-opacity duration-400 ease-in-out ${
                fadeState === 'in' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {headlines[currentHeadlineIdx].text}
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 leading-relaxed">
            Bloom Health AI is an intelligent healthcare assistant that translates medical jargon, lab reports, and wellness questions into simple, reassuring language in English, Telugu, and Hindi.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-base shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <MessageSquareHeart className="w-5 h-5 text-mint-300" />
              <span>{t.hero.ctaChat}</span>
              <ArrowRight className="w-4 h-4 text-mint-300 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/report"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ivory-100 hover:bg-mint-50 text-forest-900 border border-mint-300 font-bold text-base shadow-2xs hover:shadow-xs transition-all duration-200"
            >
              <FileText className="w-5 h-5 text-forest-700" />
              <span>{t.hero.ctaReport}</span>
            </Link>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-700 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600" />
              <span>No login needed for Q&A</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest-600" />
              <span>Strict Privacy & Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-forest-600" />
              <span>English &bull; తెలుగు &bull; हिन्दी</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-forest-950">
            {t.features.title}
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: AI Health Q&A */}
          <div className="p-7 rounded-2xl bg-ivory-100 border border-mint-200/90 shadow-2xs hover:shadow-md transition-all duration-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center text-forest-800">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest-950">
              {t.features.chatTitle}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.features.chatDesc}
            </p>
            <div className="pt-2">
              <Link
                to="/chat"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{t.hero.ctaChat}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Medical Report Explanations */}
          <div className="p-7 rounded-2xl bg-ivory-100 border border-mint-200/90 shadow-2xs hover:shadow-md transition-all duration-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center text-forest-800">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest-950">
              {t.features.reportTitle}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.features.reportDesc}
            </p>
            <div className="pt-2">
              <Link
                to="/report"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-900 group"
              >
                <span>{t.hero.ctaReport}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 3: Multilingual Support */}
          <div className="p-7 rounded-2xl bg-ivory-100 border border-mint-200/90 shadow-2xs hover:shadow-md transition-all duration-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-mint-100 flex items-center justify-center text-forest-800">
              <Languages className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-forest-950">
              {t.features.langTitle}
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t.features.langDesc}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-forest-800 bg-mint-100/80 px-2.5 py-1 rounded-full">
                <span>తెలుగు</span> &bull; <span>English</span> &bull; <span>हिन्दी</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sample Questions Showcase */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-mint-50/90 via-ivory-100 to-ivory-200 border border-mint-300 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-forest-800">
            <HeartPulse className="w-5 h-5 text-forest-700" />
            <h3 className="text-base font-bold uppercase tracking-wider text-forest-900">
              Ask Common Health Inquiries Instantly
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {t.chat.examples.map((example, i) => (
              <Link
                key={i}
                to={`/chat?q=${encodeURIComponent(example)}`}
                className="p-3.5 rounded-xl bg-white/80 hover:bg-white border border-mint-200/80 text-xs font-semibold text-forest-900 hover:text-forest-700 hover:border-mint-400 shadow-2xs transition-all duration-150 flex flex-col justify-between"
              >
                <span>"{example}"</span>
                <span className="text-[10px] text-forest-700 font-bold mt-2 flex items-center gap-1">
                  Ask Bloom <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-mint-200/60">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              Live AI response in seconds
            </span>
            <Link to="/chat" className="font-bold text-forest-800 hover:underline">
              Open Full Chat &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Safety Notice Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SafetyNotice />
      </section>
    </div>
  );
};
