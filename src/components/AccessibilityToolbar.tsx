import React from 'react';
import { AccessibilitySettings } from '../types';
import { Eye, Type, Sparkles, ShieldCheck } from 'lucide-react';

interface Props {
  settings: AccessibilitySettings;
  onChange: (settings: AccessibilitySettings) => void;
  onOpenEthicalModal: () => void;
}

export const AccessibilityToolbar: React.FC<Props> = ({
  settings,
  onChange,
  onOpenEthicalModal
}) => {
  return (
    <div
      id="accessibility-toolbar"
      className="bg-[#0F172A] text-slate-300 px-4 sm:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-slate-800"
      role="region"
      aria-label="Accessibility options"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          Accessibility:
        </span>
        
        {/* Font size */}
        <div className="flex items-center gap-1 bg-slate-800/90 rounded-lg px-1.5 py-0.5 border border-slate-700/60" role="group" aria-label="Text Size">
          <Type className="w-3 h-3 text-slate-400" aria-hidden="true" />
          <button
            id="font-size-normal"
            onClick={() => onChange({ ...settings, fontSize: 'normal' })}
            className={`px-2 py-0.5 rounded font-medium transition-colors ${
              settings.fontSize === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={settings.fontSize === 'normal'}
          >
            A
          </button>
          <button
            id="font-size-large"
            onClick={() => onChange({ ...settings, fontSize: 'large' })}
            className={`px-2 py-0.5 rounded font-semibold text-sm transition-colors ${
              settings.fontSize === 'large' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={settings.fontSize === 'large'}
          >
            A+
          </button>
          <button
            id="font-size-xlarge"
            onClick={() => onChange({ ...settings, fontSize: 'extra-large' })}
            className={`px-2 py-0.5 rounded font-bold text-base transition-colors ${
              settings.fontSize === 'extra-large' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
            }`}
            aria-pressed={settings.fontSize === 'extra-large'}
          >
            A++
          </button>
        </div>

        {/* High contrast */}
        <button
          id="toggle-high-contrast"
          onClick={() => onChange({ ...settings, highContrast: !settings.highContrast })}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors border ${
            settings.highContrast
              ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border-slate-700/60'
          }`}
          aria-pressed={settings.highContrast}
        >
          {settings.highContrast ? 'High Contrast ON' : 'High Contrast'}
        </button>

        {/* Dyslexia / Clean Font Spacing */}
        <button
          id="toggle-dyslexic-font"
          onClick={() => onChange({ ...settings, dyslexicFont: !settings.dyslexicFont })}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors border ${
            settings.dyslexicFont
              ? 'bg-indigo-600 text-white font-bold border-indigo-500'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border-slate-700/60'
          }`}
          aria-pressed={settings.dyslexicFont}
        >
          {settings.dyslexicFont ? 'Wide Spacing ON' : 'Wide Spacing'}
        </button>

        {/* Highlight Keywords */}
        <button
          id="toggle-highlight-keywords"
          onClick={() => onChange({ ...settings, highlightKeywords: !settings.highlightKeywords })}
          className={`px-2.5 py-1 rounded-lg font-medium hidden sm:flex items-center gap-1 transition-colors border ${
            settings.highlightKeywords
              ? 'bg-indigo-500 text-white font-bold border-indigo-400'
              : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700 border-slate-700/60'
          }`}
          aria-pressed={settings.highlightKeywords}
        >
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          {settings.highlightKeywords ? 'Highlights ON' : 'Highlight Keys'}
        </button>
      </div>

      {/* Ethical boundary reminder button */}
      <button
        id="btn-ethical-guardrails"
        onClick={onOpenEthicalModal}
        className="text-slate-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors underline decoration-dotted"
        aria-label="View ethical guidelines and non-diagnostic policy"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
        <span>Ethical Guidelines & Policy</span>
      </button>
    </div>
  );
};
