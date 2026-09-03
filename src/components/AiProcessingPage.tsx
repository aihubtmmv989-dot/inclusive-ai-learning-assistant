import React, { useState } from 'react';
import { Lesson, PageView, Language } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Save, 
  Layers, 
  Languages, 
  HelpCircle as QuizIcon,
  Lightbulb,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileCheck
} from 'lucide-react';

interface Props {
  lesson: Lesson;
  isProcessing: boolean;
  onSaveAndOpenStudent: () => void;
  onSaveAndOpenQuiz: () => void;
  onNavigate: (page: PageView) => void;
}

export const AiProcessingPage: React.FC<Props> = ({
  lesson,
  isProcessing,
  onSaveAndOpenStudent,
  onSaveAndOpenQuiz,
  onNavigate
}) => {
  const [previewLang, setPreviewLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'all' | 'explanations' | 'steps' | 'vocabulary' | 'questions' | 'support'>('all');

  if (isProcessing) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto border border-indigo-100 animate-pulse">
          <Sparkles className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Generating Inclusive Lesson Representations
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Decomposing textbook passage into simplified explanations, step-by-step milestones, Tamil and Sinhala adaptations, and quiz questions...
          </p>
        </div>

        {/* Processing step indicators */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-left space-y-3 shadow-xs">
          {[
            'Deconstructing complex sentences and vocabulary',
            'Drafting simple & sequential step-by-step structures',
            'Synthesizing Sinhala (සිංහල) and Tamil (தமிழ்) versions',
            'Formulating multi-difficulty comprehension quiz',
            'Compiling non-diagnostic teacher scaffolding notes'
          ].map((step, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { content, questions } = lesson;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1E293B] via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <FileCheck className="w-3.5 h-3.5" />
            10-Point Inclusive Pack Generated
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {lesson.title}
          </h1>
          <p className="text-xs text-slate-300">
            {lesson.grade} • {lesson.subject}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-process-open-student"
            onClick={onSaveAndOpenStudent}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" /> Open in Student Mode
          </button>
          <button
            id="btn-process-open-quiz"
            onClick={onSaveAndOpenQuiz}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-indigo-300" /> Launch Quiz
          </button>
        </div>
      </div>

      {/* Language Preview Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-slate-700">Preview Language:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setPreviewLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                previewLang === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setPreviewLang('si')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                previewLang === 'si' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              සිංහල (Sinhala)
            </button>
            <button
              onClick={() => setPreviewLang('ta')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                previewLang === 'ta' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>

        <span className="text-[11px] text-slate-400">
          Showing 10 pedagogical transformations
        </span>
      </div>

      {/* Grid of the 10 Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. Simple Explanation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              1. Simple Explanation
            </span>
            <span className="text-[11px] text-slate-400 font-medium uppercase">{previewLang}</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {content.simpleExplanation[previewLang]}
          </p>
        </div>

        {/* 2. Step-by-Step Overview */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            2. Step-by-Step Breakdown ({content.stepByStep.length} Steps)
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {content.stepByStep.map((s) => (
              <div key={s.stepNumber} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-900 block">{s.title[previewLang]}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{s.instruction[previewLang]}</p>
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                  {s.keyClue[previewLang]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Key Concepts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            3. Key Concepts ({content.keyConcepts.length})
          </span>
          <div className="space-y-2">
            {content.keyConcepts.map((kc) => (
              <div key={kc.id} className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs">
                <span className="font-bold text-purple-900 block">{kc.concept[previewLang]}</span>
                <p className="text-[11px] text-purple-800 mt-0.5">{kc.summary[previewLang]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Vocabulary Glossary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            4. Vocabulary Terms ({content.vocabulary.length})
          </span>
          <div className="space-y-2">
            {content.vocabulary.map((v) => (
              <div key={v.id} className="p-2.5 rounded-xl bg-amber-50/40 border border-amber-100 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950">{v.word[previewLang]}</span>
                </div>
                <p className="text-[11px] text-slate-700 mt-0.5">{v.meaning[previewLang]}</p>
                <span className="text-[10px] text-slate-500 italic block mt-0.5">Ex: {v.example[previewLang]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5, 6, 7. Trilingual Full Text Verification */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            5, 6, 7. Trilingual Translations (EN, SI, TA)
          </span>
          <div className="text-xs space-y-2 max-h-48 overflow-y-auto">
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="font-bold text-[10px] text-slate-500 uppercase block">English:</span>
              <p className="text-[11px] text-slate-700">{content.simpleExplanation.en}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="font-bold text-[10px] text-slate-500 uppercase block">සිංහල (Sinhala):</span>
              <p className="text-[11px] text-slate-700">{content.simpleExplanation.si}</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="font-bold text-[10px] text-slate-500 uppercase block">தமிழ் (Tamil):</span>
              <p className="text-[11px] text-slate-700">{content.simpleExplanation.ta}</p>
            </div>
          </div>
        </div>

        {/* 8. Practice Quiz Questions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            8. Practice Quiz ({questions.length} Questions)
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">Q{idx + 1}: {q.question[previewLang]}</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">
                  Correct Answer: {q.options[previewLang][q.correctAnswerIndex]}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Concept: {q.conceptTested} • Difficulty: {q.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Easier Practice Questions */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
            9. Easier Practice Questions ({content.easierPracticeQuestions.length})
          </span>
          <div className="space-y-2">
            {content.easierPracticeQuestions.map((eq) => (
              <div key={eq.id} className="p-2.5 rounded-xl bg-cyan-50/40 border border-cyan-100 text-xs space-y-0.5">
                <span className="font-bold text-cyan-950 block">{eq.question[previewLang]}</span>
                <span className="text-[11px] text-cyan-800 block">Hint: {eq.hint[previewLang]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 10. Teacher Support & Scaffolding */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            10. Teacher Support & Classroom Activities
          </span>
          <div className="text-xs space-y-1.5 text-slate-600">
            <p className="font-semibold text-slate-800">Scaffolding Suggestions:</p>
            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
              {content.teacherSupport.scaffoldingTips.slice(0, 2).map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <p className="font-semibold text-slate-800 pt-1">Recommended Pacing:</p>
            <p className="text-[11px]">{content.teacherSupport.pacingAdvice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
