import React from 'react';
import { Lesson, PageView, QuizAttempt } from '../types';
import { 
  GraduationCap, 
  PlusCircle, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Trash2, 
  RefreshCw, 
  BarChart3, 
  ShieldAlert, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

interface Props {
  lessons: Lesson[];
  attempts: QuizAttempt[];
  onNavigate: (page: PageView) => void;
  onSelectLesson: (lesson: Lesson, targetPage: PageView) => void;
  onDeleteLesson: (id: string) => void;
  onResetDemoData: () => void;
}

export const TeacherDashboard: React.FC<Props> = ({
  lessons,
  attempts,
  onNavigate,
  onSelectLesson,
  onDeleteLesson,
  onResetDemoData
}) => {
  const totalAttempts = attempts.length;
  const uniqueStudents = new Set(attempts.map((a) => a.studentCode)).size;
  const avgScore = totalAttempts > 0 
    ? Math.round((attempts.reduce((sum, a) => sum + (a.score / a.totalQuestions), 0) / totalAttempts) * 100) 
    : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Teacher Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Sri Lanka Curriculum Hub
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage school lessons, view generated multi-modal learning material, and track anonymous student engagement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-teacher-reset-demo"
            onClick={onResetDemoData}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Reload default Sri Lankan curriculum sample lessons"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Data
          </button>

          <button
            id="btn-teacher-create-new"
            onClick={() => onNavigate('create_lesson')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" /> Create New Lesson
          </button>
        </div>
      </div>

      {/* Non-diagnostic Ethical Notice Banner */}
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl flex items-start gap-3 text-slate-800 text-xs shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">Pedagogical Guardrail Reminder</p>
          <p className="text-slate-700 leading-relaxed">
            This educational platform does not diagnose medical or cognitive conditions, does not label students, and does not determine classroom streaming or placement. Educators remain responsible for instructional choices and accommodations.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Lessons Prepared</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{lessons.length}</div>
          <span className="text-[11px] text-indigo-600 font-semibold">Curriculum Ready</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Quiz Attempts</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalAttempts}</div>
          <span className="text-[11px] text-indigo-600 font-semibold">Self-paced practice rounds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Anonymous Learners</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{uniqueStudents}</div>
          <span className="text-[11px] text-slate-500 font-medium font-mono">e.g. ST001, ST002</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Average Comprehension</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{avgScore}%</div>
          <span className="text-[11px] text-green-600 font-semibold">Formative accuracy</span>
        </div>
      </div>

      {/* Lessons List Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">
            Curriculum Lessons in Database ({lessons.length})
          </h2>
          <button
            id="btn-teacher-view-analytics"
            onClick={() => onNavigate('teacher_results')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
          >
            <BarChart3 className="w-3.5 h-3.5" /> View Class Results
          </button>
        </div>

        {lessons.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <p className="text-slate-500 text-sm">No lessons found in storage.</p>
            <button
              onClick={onResetDemoData}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              Load Sri Lankan Curriculum Samples
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {lessons.map((lesson) => {
              const lessonAttempts = attempts.filter((a) => a.lessonId === lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {lesson.grade}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                        {lesson.subject}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {lesson.content.simpleExplanation.en}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span><strong>{lesson.content.stepByStep.length}</strong> Guided Steps</span>
                      <span>•</span>
                      <span><strong>{lesson.content.vocabulary.length}</strong> Vocab Terms</span>
                      <span>•</span>
                      <span><strong>{lesson.questions.length}</strong> Questions</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-semibold"><strong>{lessonAttempts.length}</strong> Student Submissions</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      id={`btn-dash-student-view-${lesson.id}`}
                      onClick={() => onSelectLesson(lesson, 'student_lesson')}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Student View
                    </button>

                    <button
                      id={`btn-dash-ai-pack-${lesson.id}`}
                      onClick={() => onSelectLesson(lesson, 'ai_processing')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> AI Lesson Pack
                    </button>

                    <button
                      id={`btn-dash-quiz-${lesson.id}`}
                      onClick={() => onSelectLesson(lesson, 'quiz')}
                      className="px-3.5 py-2 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-green-700" /> Quiz
                    </button>

                    <button
                      id={`btn-dash-delete-${lesson.id}`}
                      onClick={() => {
                        if (confirm(`Delete lesson "${lesson.title}"?`)) {
                          onDeleteLesson(lesson.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      title="Delete lesson"
                      aria-label="Delete lesson"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
