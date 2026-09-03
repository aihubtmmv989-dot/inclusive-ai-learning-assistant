import React from 'react';
import { ShieldCheck, X, AlertTriangle, UserCheck, HeartHandshake } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalNoticeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="ethical-notice-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ethical-notice-title"
    >
      <div
        id="ethical-notice-card"
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800 relative"
      >
        <button
          id="btn-close-ethical-modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 id="ethical-notice-title" className="text-xl font-bold text-slate-900">
              Ethical Educational Safeguards
            </h2>
            <p className="text-xs text-slate-500">
              Sri Lankan Inclusive Education Policy Guidelines
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-sm">
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl text-slate-800 flex items-start gap-3 shadow-2xs">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-1">Strict Non-Diagnostic Commitment</p>
              <p className="text-xs leading-relaxed text-slate-700">
                This software is an assistive pedagogical tool. It must <strong>NOT</strong> diagnose dyslexia, ADHD, autism, or any medical or developmental disorder, and must <strong>NOT</strong> categorize or label students.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Teacher Responsibility
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Qualified school educators remain entirely responsible for classroom decisions, teaching pacing, and academic accommodations.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-xs mb-1">
                <HeartHandshake className="w-4 h-4 text-indigo-600" />
                No Student Placement
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                This tool does not recommend student streaming, grading tracks, or special education placement.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
            <p className="font-bold text-xs text-slate-900 mb-1">Privacy & Anonymous IDs (e.g. ST001)</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              To protect student privacy in schools, no names, medical files, or personal identifiers are collected. Only anonymous codes like <strong>ST001, ST002</strong> are utilized for self-paced practice.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            id="btn-confirm-ethical-notice"
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
