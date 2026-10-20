import { SafetyNotice } from '../components/SafetyNotice';
import { Shield, Lock, EyeOff, FileText, AlertTriangle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-100 text-xs font-bold text-forest-900">
          <Shield className="w-3.5 h-3.5 text-forest-700" />
          <span>Patient Data Protection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
          Privacy Policy & Medical Safety Principles
        </h1>
        <p className="text-sm text-gray-700 max-w-xl mx-auto">
          We treat healthcare information with highest integrity, confidentiality, and technical rigor.
        </p>
      </div>

      <SafetyNotice />

      <div className="space-y-6">
        {/* Card 1: Document Processing Privacy */}
        <div className="p-6 rounded-2xl bg-ivory-100 border border-mint-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-forest-900 font-bold text-base">
            <Lock className="w-5 h-5 text-forest-700" />
            <h2>Zero Permanent Storage for Medical Uploads</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            When you submit a medical test report, blood work, or prescription for analysis:
          </p>
          <ul className="space-y-2 text-xs text-gray-700 pl-4 list-disc">
            <li>Your uploaded files are processed strictly in temporary volatile memory to extract values.</li>
            <li>No permanent copy of your uploaded document or raw extracted text is saved to our servers or permanent disk.</li>
            <li>We store only the metadata timestamp and user identifier necessary to ensure system integrity and abuse prevention.</li>
          </ul>
        </div>

        {/* Card 2: AI Interaction Confidentiality */}
        <div className="p-6 rounded-2xl bg-ivory-100 border border-mint-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-forest-900 font-bold text-base">
            <EyeOff className="w-5 h-5 text-forest-700" />
            <h2>Strict AI Communication Architecture</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            All AI interactions are conducted securely through backend server-to-server TLS encryption.
          </p>
          <ul className="space-y-2 text-xs text-gray-700 pl-4 list-disc">
            <li>API credentials and server keys are never exposed to browser clients or public code.</li>
            <li>System prompts strictly mandate that patient inputs are treated as confidential and untrusted data.</li>
            <li>We do not sell, rent, or monetize your health questions or personal records to third parties.</li>
          </ul>
        </div>

        {/* Card 3: Clinical Disclaimer and Scope */}
        <div className="p-6 rounded-2xl bg-ivory-100 border border-mint-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-forest-900 font-bold text-base">
            <FileText className="w-5 h-5 text-forest-700" />
            <h2>Educational Purpose & Scope of Service</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Bloom Health AI is explicitly engineered as an educational translation and health literacy tool.
          </p>
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed space-y-1.5">
            <p className="font-semibold text-amber-950 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Important Non-Diagnostic Notice
            </p>
            <p>
              The explanations provided by Bloom Health AI do not constitute official clinical diagnoses, clinical treatment plans, or prescriptions. Always consult a licensed physician, clinical pathologist, or specialist to review abnormal lab values or persistent symptoms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
