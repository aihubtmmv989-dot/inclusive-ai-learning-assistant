import React from 'react';
import { PageView, Lesson } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Languages, 
  Layers, 
  HelpCircle, 
  Volume2, 
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Award,
  ShieldCheck
} from 'lucide-react';

interface Props {
  onNavigate: (page: PageView) => void;
  onSelectLesson: (lesson: Lesson, targetPage: PageView) => void;
  lessons: Lesson[];
}

export const HomePage: React.FC<Props> = ({
  onNavigate,
  onSelectLesson,
  lessons
}) => {
  return (
    <div className="space-y-10 pb-12">
      {/* Exhibition Welcome Header */}
      <section className="bg-gradient-to-br from-[#1E293B] via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-slate-700/50">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Sri Lanka School Exhibition Edition • Version 1.0
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Inclusive AI Learning Assistant
          </h1>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Helping students with diverse learning paces study the exact same national curriculum lessons through simplified multi-sensory modes, Sinhala, Tamil, and English representations, and guided quizzes.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="btn-home-teacher-start"
              onClick={() => onNavigate('create_lesson')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              Teacher: Create / Upload Lesson
            </button>

            <button
              id="btn-home-student-start"
              onClick={() => {
                if (lessons.length > 0) {
                  onSelectLesson(lessons[0], 'student_lesson');
                } else {
                  onNavigate('student_lesson');
                }
              }}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm flex items-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-300" />
              Student: Open Interactive Lessons
            </button>
          </div>

          <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-indigo-400" /> Trilingual: English • සිංහල • தமிழ்
            </span>
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> Audio Read-Aloud (Text-to-Speech)
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Strictly Non-Diagnostic & Anonymous
            </span>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Quick Launch Pre-Loaded Exhibition Lessons */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Curriculum Demonstrations (Sri Lanka Textbooks)
            </h2>
            <p className="text-xs text-slate-500">
              Select any sample lesson below to immediately experience the student or teacher tools.
            </p>
          </div>
          <button
            id="btn-view-all-lessons"
            onClick={() => onNavigate('teacher_dashboard')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            All Lessons ({lessons.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.slice(0, 2).map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {lesson.grade} • {lesson.subject}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {lesson.questions.length} Practice Questions
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {lesson.content.simpleExplanation.en}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id={`btn-open-student-${lesson.id}`}
                  onClick={() => onSelectLesson(lesson, 'student_lesson')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Study Lesson
                </button>
                <button
                  id={`btn-open-quiz-${lesson.id}`}
                  onClick={() => onSelectLesson(lesson, 'quiz')}
                  className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-white" /> Take Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 10 AI Lesson Transformations Architecture */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            The 10 Accessible Transformations Created for Every Lesson
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            When a teacher enters text, the AI engine structures the material into 10 multi-modal pedagogical layers:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { num: '01', title: 'Simple Explanation', desc: 'Shorter sentences, low cognitive strain, concrete everyday analogies.' },
            { num: '02', title: 'Step-by-Step Milestones', desc: 'Chunked sequence with memory clues for sequential learners.' },
            { num: '03', title: 'Key Concepts', desc: 'Core foundational principles highlighted clearly.' },
            { num: '04', title: 'Important Vocabulary', desc: 'Keywords paired with student-friendly definitions and examples.' },
            { num: '05', title: 'English Version', desc: 'Full national curriculum standards in accessible English.' },
            { num: '06', title: 'Tamil Version (தமிழ்)', desc: 'Natural Tamil translations ensuring language accessibility in northern & eastern schools.' },
            { num: '07', title: 'Sinhala Version (සිංහල)', desc: 'Accurate Sinhala translations for bilingual national classrooms.' },
            { num: '08', title: 'Short Practice Quiz', desc: 'Multiple-choice questions with concepts tested and explanatory answers.' },
            { num: '09', title: 'Easier Practice Questions', desc: 'Supported questions with expandable hints and model answers.' },
            { num: '10', title: 'Teacher Support Info', desc: 'Scaffolding techniques, multisensory classroom activities, and pacing advice.' },
          ].map((item) => (
            <div
              key={item.num}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-start gap-3 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-100">
                {item.num}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teacher Workflow Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold border border-indigo-100">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Teacher Workspace</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create school lessons, view generated multi-sensory packs, and monitor anonymous student results.
            </p>
          </div>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              Paste standard textbook passages from Grades 3-11
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              Toggle Mock AI Mode (offline exhibition) or Gemini AI
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              Review anonymous student quiz comprehension stats
            </li>
          </ul>
          <div className="pt-2 flex gap-2">
            <button
              id="btn-home-to-teacher-dash"
              onClick={() => onNavigate('teacher_dashboard')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-2xs"
            >
              Teacher Dashboard
            </button>
            <button
              id="btn-home-to-create-lesson"
              onClick={() => onNavigate('create_lesson')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
            >
              New Lesson
            </button>
          </div>
        </div>

        {/* Student Workflow Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold border border-green-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Student Learning Portal</h3>
            <p className="text-xs text-slate-500 mt-1">
              Read lessons in Standard, Simple, or Step-by-Step modes with built-in voice read-aloud.
            </p>
          </div>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              Switch between English, Sinhala (සිංහල), and Tamil (தமிழ்)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              Listen with browser Text-to-Speech audio reader
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              Answer quizzes anonymously (e.g. ST001) with explanation tips
            </li>
          </ul>
          <div className="pt-2 flex gap-2">
            <button
              id="btn-home-to-student-lesson"
              onClick={() => {
                if (lessons.length > 0) {
                  onSelectLesson(lessons[0], 'student_lesson');
                } else {
                  onNavigate('student_lesson');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-2xs"
            >
              Study Active Lesson
            </button>
            <button
              id="btn-home-to-quiz"
              onClick={() => {
                if (lessons.length > 0) {
                  onSelectLesson(lessons[0], 'quiz');
                } else {
                  onNavigate('quiz');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-colors shadow-2xs"
            >
              Practice Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
