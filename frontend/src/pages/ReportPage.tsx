import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { DocumentAnalysisResponse } from '../types';
import { SafetyNotice } from '../components/SafetyNotice';
import {
  UploadCloud,
  FileText,
  Lock,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  FileCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ReportPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResponse | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
  const ALLOWED_TYPES = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/webp',
  ];

  const handleFileSelection = (file: File) => {
    setFileError(null);
    setAnalysisResult(null);

    // Enforce 15 MB Limit
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size exceeds 15 MB limit. Please select a smaller document.');
      setSelectedFile(null);
      return;
    }

    // Enforce MIME types
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Unsupported file type. Please upload a PDF, PNG, JPEG, or WebP document.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (!isAuthenticated) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    if (!isAuthenticated) {
      navigate('/login?redirect=/report');
      return;
    }

    setIsAnalyzing(true);
    setFileError(null);
    setAnalysisResult(null);

    try {
      const result = await api.analyzeDocument(selectedFile, language);
      setAnalysisResult(result);
    } catch (err: unknown) {
      const msg = (err as Error)?.message || 'Failed to analyze document. Please check your file and try again.';
      setFileError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-100/90 text-xs font-bold text-forest-900 mb-1">
          <FileCheck className="w-3.5 h-3.5 text-forest-700" />
          <span>Clinical Document Intelligence</span>
        </div>
        <h1 className="text-3xl font-extrabold text-forest-950 tracking-tight">
          {t.report.title}
        </h1>
        <p className="text-sm text-gray-700 max-w-xl mx-auto">
          {t.report.subtitle}
        </p>
      </div>

      <SafetyNotice compact />

      {/* Compulsory Authentication Gate Warning */}
      {!isAuthenticated && (
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 shadow-2xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-1 text-amber-900 leading-relaxed">
              <h2 className="text-sm font-bold text-amber-950">
                Authentication Required for Medical Documents
              </h2>
              <p>{t.report.loginRequiredNotice}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <Link
              to="/login?redirect=/report"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-mint-300" />
              <span>{t.report.loginCta}</span>
            </Link>
            <Link
              to="/register?redirect=/report"
              className="text-xs font-bold text-forest-800 hover:underline"
            >
              {t.auth.registerTitle} &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Upload Box Form */}
      <div className="p-6 sm:p-8 rounded-2xl bg-ivory-100 border border-mint-200 shadow-xs space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login?redirect=/report');
              } else {
                fileInputRef.current?.click();
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
              dragOver
                ? 'border-forest-600 bg-mint-50/80 scale-[1.01]'
                : selectedFile
                ? 'border-forest-500 bg-mint-50/40'
                : 'border-mint-300 hover:border-forest-600 hover:bg-mint-50/40 bg-white/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileSelection(e.target.files[0]);
                }
              }}
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-mint-100 flex items-center justify-center text-forest-800 mx-auto shadow-2xs">
                {selectedFile ? (
                  <FileCheck className="w-7 h-7 text-forest-700" />
                ) : (
                  <UploadCloud className="w-7 h-7 text-forest-700" />
                )}
              </div>

              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-forest-950">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 font-mono">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; {selectedFile.type || 'Document'}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-semibold text-forest-700 bg-mint-100 px-2 py-0.5 rounded-full">
                    Ready to analyze
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-base font-bold text-forest-950">
                    {t.report.dropzoneTitle}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.report.dropzoneSubtitle}
                  </p>
                </div>
              )}

              <p className="text-[11px] text-gray-500 pt-2">
                {t.report.fileLimitNotice}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {fileError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-forest-600" />
              <span>Processed temporarily & never permanently retained</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {selectedFile && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  Reset
                </button>
              )}

              <button
                type="submit"
                disabled={!selectedFile || isAnalyzing}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs sm:text-sm shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.report.analyzingBtn}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-mint-300" />
                    <span>{t.report.analyzeBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <section aria-label="Analysis Results" className="p-6 sm:p-8 rounded-2xl bg-white border border-mint-200 shadow-sm space-y-6">
          {/* Header status */}
          <div className="flex items-center justify-between pb-4 border-b border-mint-100">
            <div className="flex items-center gap-2">
              {analysisResult.status === 'SUCCESS' ? (
                <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center text-forest-800">
                  <CheckCircle className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
              <div>
                <h2 className="text-base font-bold text-forest-950">
                  {analysisResult.status === 'SUCCESS' ? t.report.resultsTitle : t.report.nonMedicalTitle}
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  {analysisResult.originalFilename} &bull; {new Date(analysisResult.processedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-forest-800 hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Upload Another
            </button>
          </div>

          {/* If Non-Medical Rejection */}
          {analysisResult.status === 'NON_MEDICAL' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-2">
              <p className="font-semibold text-sm text-amber-950">Notice on Document Relevancy</p>
              <p>{analysisResult.message}</p>
            </div>
          )}

          {/* If Uncertain Rejection */}
          {analysisResult.status === 'UNCERTAIN' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-2">
              <p className="font-semibold text-sm text-amber-950">Uncertain Document Classification</p>
              <p>{analysisResult.message}</p>
            </div>
          )}

          {/* If Success: 9-part Structured Clinical Report */}
          {analysisResult.status === 'SUCCESS' && analysisResult.explanation && (
            <div className="space-y-6">
              <div className="p-3.5 rounded-xl bg-mint-50/70 border border-mint-200/80 text-xs text-forest-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-forest-700 shrink-0" />
                <span>
                  Below is an organized breakdown of values present in your document. Please review it alongside your doctor.
                </span>
              </div>

              {/* Render Structured Explanation */}
              <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap font-sans leading-relaxed text-sm bg-ivory-50/50 p-6 rounded-2xl border border-mint-100">
                {analysisResult.explanation}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
