import React, { useState, useEffect } from 'react';
import { 
  Lesson, 
  Language, 
  LearningMode, 
  PageView, 
  AccessibilitySettings 
} from '../types';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Languages, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  Bookmark, 
  Check, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface Props {
  lesson: Lesson;
  settings: AccessibilitySettings;
  onNavigate: (page: PageView) => void;
  onStartQuiz: () => void;
}

export const StudentLessonPage: React.FC<Props> = ({
  lesson,
  settings,
  onNavigate,
  onStartQuiz
}) => {
  const [lang, setLang] = useState<Language>('en');
  const [mode, setMode] = useState<LearningMode>('standard');
  const [activeStep, setActiveStep] = useState(0);
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Browser Text-to-Speech (Web Speech API)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Stop speech synthesis on unmount or language/mode switch
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang, mode, activeStep]);

  const handleSpeak = (textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser window.');
      return;
    }

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;

    // Pick appropriate voice or language code if available
    if (lang === 'si') {
      utterance.lang = 'si-LK';
    } else if (lang === 'ta') {
      utterance.lang = 'ta-LK';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const { content } = lesson;
  const currentStepItem = content.stepByStep[activeStep] || content.stepByStep[0];

  // Derive text for Speech according to active mode
  const getReadAloudText = () => {
    if (mode === 'step_by_step') {
      return `${currentStepItem.title[lang]}. ${currentStepItem.instruction[lang]}. ${currentStepItem.keyClue[lang]}`;
    }
    if (mode === 'simple') {
      return content.simpleExplanation[lang];
    }
    return `${lesson.title}. ${content.simpleExplanation[lang]}`;
  };

  // Font size multiplier
  const getFontSizeClass = () => {
    if (settings.fontSize === 'extra-large') return 'text-xl leading-loose';
    if (settings.fontSize === 'large') return 'text-lg leading-relaxed';
    return 'text-base leading-relaxed';
  };

  return (
    <div className={`space-y-6 pb-12 ${settings.highContrast ? 'bg-black text-white p-4 rounded-3xl' : ''}`}>
      
      {/* Top Header & Trilingual Selector */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-indigo-600 font-bold mb-1 uppercase tracking-tight">
              <span>{lesson.grade}</span>
              <span>•</span>
              <span>{lesson.subject}</span>
              <span className="text-slate-400 font-normal ml-1">| Student Study Session</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Language Switcher with Professional Polish styling */}
          <div className="flex flex-wrap items-center gap-2 self-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
              Language:
            </span>
            <button
              id="btn-lang-en"
              onClick={() => setLang('en')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                lang === 'en'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400'
              }`}
              aria-pressed={lang === 'en'}
            >
              English
            </button>
            <button
              id="btn-lang-si"
              onClick={() => setLang('si')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                lang === 'si'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400'
              }`}
              aria-pressed={lang === 'si'}
            >
              සිංහල (Sinhala)
            </button>
            <button
              id="btn-lang-ta"
              onClick={() => setLang('ta')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                lang === 'ta'
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400'
              }`}
              aria-pressed={lang === 'ta'}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>

        {/* Learning Mode Switcher Tabs & Audio Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Learning Modes">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Mode:
            </span>
            
            <button
              id="btn-mode-standard"
              role="tab"
              aria-selected={mode === 'standard'}
              onClick={() => setMode('standard')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'standard'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" /> Standard Mode
            </button>

            <button
              id="btn-mode-simple"
              role="tab"
              aria-selected={mode === 'simple'}
              onClick={() => setMode('simple')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'simple'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" /> Simple Mode
            </button>

            <button
              id="btn-mode-step-by-step"
              role="tab"
              aria-selected={mode === 'step_by_step'}
              onClick={() => setMode('step_by_step')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'step_by_step'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-500" /> Step-by-Step
            </button>
          </div>

          {/* Browser Text-to-Speech Audio Controls */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
              Listen:
            </span>

            <button
              id="btn-speech-play-pause"
              onClick={() => handleSpeak(getReadAloudText())}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                isSpeaking && !isPaused
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
              title={isSpeaking && !isPaused ? 'Pause Speech' : 'Play Speech'}
              aria-label={isSpeaking && !isPaused ? 'Pause speech read-aloud' : 'Play speech read-aloud'}
            >
              {isSpeaking && !isPaused ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSpeaking && !isPaused ? 'Pause' : 'Read Aloud'}</span>
            </button>

            {isSpeaking && (
              <button
                id="btn-speech-stop"
                onClick={handleStopSpeech}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700"
                title="Stop Speech"
                aria-label="Stop speech read-aloud"
              >
                <VolumeX className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Speech Rate Control */}
            <select
              id="select-speech-speed"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="text-xs bg-white border border-slate-300 text-slate-700 rounded-lg px-2 py-1 focus:outline-none"
              aria-label="Speech rate"
            >
              <option value="0.8">0.8x</option>
              <option value="1.0">1.0x</option>
              <option value="1.2">1.2x</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Main Reading View */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. STANDARD MODE */}
          {mode === 'standard' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Standard Curriculum Reading
                </span>
                <span className="text-xs text-indigo-600 font-semibold">
                  Official Syllabus
                </span>
              </div>

              <div className={`${getFontSizeClass()} text-slate-700 space-y-6`}>
                {/* Yellow Quote callout from design */}
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 italic rounded-r-lg text-slate-800">
                  {content.simpleExplanation[lang].split('.')[0] + '.'}
                </div>

                <p className="leading-relaxed whitespace-pre-line text-base sm:text-lg">
                  {content.simpleExplanation[lang]}
                </p>

                {/* Concept breakdown cards from design */}
                {content.keyConcepts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {content.keyConcepts.slice(0, 2).map((kc, i) => (
                      <div key={kc.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-indigo-600 mb-2">
                          {i + 1}. {kc.concept[lang]}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {kc.summary[lang]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-700 space-y-2">
                  <span className="font-bold text-slate-900 block">Syllabus Excerpt & Context:</span>
                  <p className="text-slate-600 leading-relaxed">{lesson.originalText}</p>
                </div>
              </div>

              {/* Bottom action banner */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Finished reading? Test your understanding with the self-paced quiz.
                </p>
                <button
                  id="btn-start-quiz-bottom"
                  onClick={onStartQuiz}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          )}

          {/* 2. SIMPLE MODE */}
          {mode === 'simple' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Simple Mode (Clear & Direct)
                </span>
                <span className="text-xs text-indigo-600 font-semibold">
                  Reduced Cognitive Load
                </span>
              </div>

              <div className={`${getFontSizeClass()} text-slate-800 space-y-6`}>
                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 italic rounded-r-lg text-slate-800 text-base sm:text-lg leading-relaxed">
                  {content.simpleExplanation[lang]}
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-500">
                    Core Concepts Breakdown:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.keyConcepts.map((kc, i) => (
                      <div key={kc.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-indigo-600 mb-1.5 text-sm sm:text-base">
                            {i + 1}. {kc.concept[lang]}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{kc.summary[lang]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom action banner */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Ready to test with practice questions?
                </p>
                <button
                  onClick={onStartQuiz}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          )}

          {/* 3. STEP-BY-STEP MODE */}
          {mode === 'step_by_step' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  Step-by-Step Guided Walkthrough
                </span>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Step {activeStep + 1} of {content.stepByStep.length}
                </span>
              </div>

              {/* Progress Bar with Indigo styling */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300"
                  style={{
                    width: `${((activeStep + 1) / content.stepByStep.length) * 100}%`
                  }}
                />
              </div>

              {/* Step Card */}
              {currentStepItem && (
                <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-xs">
                      {currentStepItem.stepNumber}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {currentStepItem.title[lang]}
                    </h2>
                  </div>

                  <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
                    {currentStepItem.instruction[lang]}
                  </p>

                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-xs font-semibold text-slate-800 flex items-start gap-2 shadow-2xs">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>Key Clue:</strong> {currentStepItem.keyClue[lang]}</span>
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  id="btn-step-prev"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    activeStep === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Step
                </button>

                <div className="hidden sm:flex items-center gap-1.5">
                  {content.stepByStep.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === activeStep ? 'bg-indigo-600 w-5' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {activeStep < content.stepByStep.length - 1 ? (
                  <button
                    id="btn-step-next"
                    onClick={() => setActiveStep((prev) => Math.min(content.stepByStep.length - 1, prev + 1))}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="btn-step-complete-to-quiz"
                    onClick={onStartQuiz}
                    className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    Start Quiz <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Easier Practice Questions Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Easier Practice Questions (Supported Learning)
            </h3>
            <div className="space-y-3">
              {content.easierPracticeQuestions.map((pq) => (
                <div key={pq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {pq.question[lang]}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      id={`btn-hint-${pq.id}`}
                      onClick={() => toggleHint(pq.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors border border-indigo-100"
                    >
                      {revealedHints[pq.id] ? 'Hide Hint' : 'Show Hint'}
                    </button>

                    <button
                      id={`btn-answer-${pq.id}`}
                      onClick={() => toggleAnswer(pq.id)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
                    >
                      {revealedAnswers[pq.id] ? 'Hide Sample Answer' : 'Show Sample Answer'}
                    </button>
                  </div>

                  {revealedHints[pq.id] && (
                    <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-amber-950">
                      <strong>Hint:</strong> {pq.hint[lang]}
                    </div>
                  )}

                  {revealedAnswers[pq.id] && (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
                      <strong>Sample Answer:</strong> {pq.sampleAnswer[lang]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Vocabulary & Key Concepts Drawer (Professional Polish Theme) */}
        <div className="space-y-6">
          
          {/* Quick Tools Box matching design */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Tools</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleSpeak(getReadAloudText())}
                className="text-sm flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold p-2 rounded-lg hover:bg-indigo-50/60 transition-colors text-left"
              >
                <span>🔈</span> Read Aloud ({isSpeaking && !isPaused ? 'Playing' : 'Listen'})
              </button>
              <button
                onClick={() => {
                  const elem = document.getElementById('key-concepts-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold p-2 rounded-lg hover:bg-indigo-50/60 transition-colors text-left"
              >
                <span>🔍</span> Key Concepts
              </button>
              <button
                onClick={() => {
                  const elem = document.getElementById('vocabulary-glossary-section');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold p-2 rounded-lg hover:bg-indigo-50/60 transition-colors text-left"
              >
                <span>📝</span> Important Vocabulary
              </button>
            </div>
          </div>

          {/* Important Vocabulary Glossary (styled like the design cards) */}
          <div id="vocabulary-glossary-section" className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Vocabulary Glossary
            </h3>
            {content.vocabulary.map((v) => (
              <div key={v.id} className="bg-white p-4 rounded-xl shadow-xs border border-slate-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VOCABULARY</span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">KEY</span>
                </div>
                <div className="text-sm font-bold text-slate-900">{v.word[lang]}</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{v.meaning[lang]}</p>
                {v.example[lang] && (
                  <p className="text-[11px] text-slate-400 italic mt-1.5 border-t border-slate-100 pt-1.5">
                    "{v.example[lang]}"
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Key Concepts Box */}
          <div id="key-concepts-section" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
              Key Concepts
            </h3>
            <div className="space-y-2.5">
              {content.keyConcepts.map((kc) => (
                <div key={kc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block">{kc.concept[lang]}</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{kc.summary[lang]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Take Quiz Callout Card */}
          <div className="bg-[#1E293B] text-white p-6 rounded-2xl space-y-4 shadow-md border border-slate-700/60">
            <h3 className="font-bold text-base">Ready to test your knowledge?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Take the self-paced practice quiz with {lesson.questions.length} questions. You'll get instant supportive explanations for every question.
            </p>
            <button
              id="btn-student-sidebar-quiz"
              onClick={onStartQuiz}
              className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
