import React, { useState } from 'react';
import { 
  Lesson, 
  Language, 
  PageView, 
  QuizAttempt, 
  QuizAttemptAnswer 
} from '../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Languages, 
  User, 
  Award, 
  Lightbulb, 
  BookOpen, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';

interface Props {
  lesson: Lesson;
  onSaveAttempt: (attempt: QuizAttempt) => void;
  onNavigate: (page: PageView) => void;
  onBackToLesson: () => void;
}

export const QuizPage: React.FC<Props> = ({
  lesson,
  onSaveAttempt,
  onNavigate,
  onBackToLesson
}) => {
  const [lang, setLang] = useState<Language>('en');
  const [studentCode, setStudentCode] = useState('ST001');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInstantFeedback, setShowInstantFeedback] = useState(true);

  const questions = lesson.questions;
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Calculate score & finish
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    let calculatedScore = 0;
    const answerRecords: QuizAttemptAnswer[] = questions.map((q, idx) => {
      const selected = selectedAnswers[idx] ?? -1;
      const isCorrect = selected === q.correctAnswerIndex;
      if (isCorrect) calculatedScore += 1;
      return {
        questionId: q.id,
        selectedIndex: selected,
        isCorrect,
        conceptTested: q.conceptTested
      };
    });

    const attempt: QuizAttempt = {
      id: 'att-' + Date.now(),
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      studentCode: studentCode.trim().toUpperCase() || 'ST001',
      score: calculatedScore,
      totalQuestions: questions.length,
      answers: answerRecords,
      completedAt: new Date().toISOString()
    };

    onSaveAttempt(attempt);
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setIsSubmitted(false);
  };

  // Score stats
  const totalScore = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correctAnswerIndex ? 1 : 0);
  }, 0);
  const percentage = Math.round((totalScore / Math.max(1, questions.length)) * 100);

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <p className="text-slate-500 text-sm">No quiz questions found for this lesson.</p>
        <button
          onClick={onBackToLesson}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
        >
          Back to Lesson
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      
      {/* Quiz Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {lesson.grade} • {lesson.subject}
              </span>
              <span className="text-xs text-slate-400">Interactive Quiz</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 mt-1">
              {lesson.title}
            </h1>
          </div>

          {/* Anonymous Student ID & Language */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <User className="w-3.5 h-3.5 text-slate-600" />
              <label htmlFor="input-student-code" className="text-xs font-bold text-slate-700">ID:</label>
              <input
                id="input-student-code"
                type="text"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="ST001"
                className="w-16 text-xs font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-300 uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500"
                title="Anonymous Student Code"
              />
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('si')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'si' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                සිං
              </button>
              <button
                onClick={() => setLang('ta')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === 'ta' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                தமி
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQIndex + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* RESULT SCREEN */}
      {isSubmitted ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-inner border border-indigo-100">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Quiz Completed!</h2>
            <p className="text-xs text-slate-500">
              Anonymous Student: <strong className="text-slate-800">{studentCode}</strong>
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 inline-block w-full max-w-sm">
            <div className="text-4xl font-black text-indigo-700">{percentage}%</div>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              {totalScore} out of {questions.length} questions correct
            </p>
          </div>

          {/* Question Breakdown with Explanations */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Answers & Explanations Review:
            </h3>

            {questions.map((q, idx) => {
              const selected = selectedAnswers[idx];
              const isCorrect = selected === q.correctAnswerIndex;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isCorrect ? 'bg-green-50/50 border-green-200' : 'bg-red-50/40 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Q{idx + 1}: {q.question[lang]}
                      </span>
                      <span className="text-[11px] text-slate-600 block mt-0.5">
                        Your choice: <strong>{selected !== undefined ? q.options[lang][selected] : 'None'}</strong>
                        {!isCorrect && (
                          <span className="text-green-800 ml-2 font-semibold">
                            (Correct: {q.options[lang][q.correctAnswerIndex]})
                          </span>
                        )}
                      </span>
                      <p className="text-[11px] text-slate-700 mt-1.5 p-2 bg-white rounded-lg border border-slate-200/80">
                        <strong>Explanation:</strong> {q.explanation[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              id="btn-quiz-retry"
              onClick={restartQuiz}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
            </button>

            <button
              id="btn-quiz-back-lesson"
              onClick={onBackToLesson}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" /> Back to Lesson
            </button>

            <button
              id="btn-quiz-view-results"
              onClick={() => onNavigate('teacher_results')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <BarChart3 className="w-3.5 h-3.5" /> View Teacher Results Table
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION CARD */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          
          {/* Question Meta */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Concept: {currentQ.conceptTested}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200">
              {currentQ.difficulty} Difficulty
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question[lang]}
          </h2>

          {/* Options Grid */}
          <div className="space-y-3" role="radiogroup" aria-label="Question choices">
            {currentQ.options[lang].map((optText, optIdx) => {
              const isSelected = selectedAnswers[currentQIndex] === optIdx;

              let btnClasses = 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 text-slate-800';
              if (isSelected) {
                btnClasses = 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold ring-2 ring-indigo-500/20';
              }

              return (
                <button
                  key={optIdx}
                  id={`btn-option-${currentQIndex}-${optIdx}`}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnClasses}`}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{optText}</span>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant feedback explanation note when answered */}
          {selectedAnswers[currentQIndex] !== undefined && showInstantFeedback && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1 animate-fade-in">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Explanation Insight:
              </span>
              <p className="text-slate-700 leading-relaxed">
                {currentQ.explanation[lang]}
              </p>
            </div>
          )}

          {/* Bottom Nav */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              id="btn-quiz-prev-q"
              disabled={currentQIndex === 0}
              onClick={handlePrev}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                currentQIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              Previous
            </button>

            <button
              id="btn-quiz-next-q"
              disabled={selectedAnswers[currentQIndex] === undefined}
              onClick={handleNext}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                selectedAnswers[currentQIndex] === undefined
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98'
              }`}
            >
              {currentQIndex === questions.length - 1 ? 'Finish & See Score' : 'Next Question'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
