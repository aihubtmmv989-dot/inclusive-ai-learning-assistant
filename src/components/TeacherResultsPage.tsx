import React, { useState } from 'react';
import { Lesson, PageView, QuizAttempt } from '../types';
import { 
  BarChart3, 
  GraduationCap, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Calendar, 
  HelpCircle,
  ArrowUpDown
} from 'lucide-react';

interface Props {
  lessons: Lesson[];
  attempts: QuizAttempt[];
  onNavigate: (page: PageView) => void;
}

export const TeacherResultsPage: React.FC<Props> = ({
  lessons,
  attempts,
  onNavigate
}) => {
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>('all');

  const filteredAttempts = selectedLessonFilter === 'all'
    ? attempts
    : attempts.filter((a) => a.lessonId === selectedLessonFilter);

  // Compute concept mastery
  const conceptStats: Record<string, { correct: number; total: number }> = {};
  filteredAttempts.forEach((attempt) => {
    attempt.answers.forEach((ans) => {
      const c = ans.conceptTested || 'General Comprehension';
      if (!conceptStats[c]) {
        conceptStats[c] = { correct: 0, total: 0 };
      }
      conceptStats[c].total += 1;
      if (ans.isCorrect) {
        conceptStats[c].correct += 1;
      }
    });
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Teacher Results & Analytics</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Formative Insights
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Anonymous student comprehension breakdown to guide instructional pacing and classroom scaffolding.
          </p>
        </div>

        {/* Filter by Lesson */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <label htmlFor="filter-lesson-results" className="text-xs font-bold text-slate-700">Lesson:</label>
          <select
            id="filter-lesson-results"
            value={selectedLessonFilter}
            onChange={(e) => setSelectedLessonFilter(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Lessons ({attempts.length} attempts)</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.grade} - {l.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ethical Guardrail Reminder */}
      <div className="p-4 bg-slate-50 border-l-4 border-indigo-600 rounded-r-xl flex items-start gap-3 text-slate-800 text-xs shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">Instructional Formative Purpose</p>
          <p className="text-slate-600 leading-relaxed">
            Data uses strictly anonymous IDs (ST001, ST002). Results are meant to identify which curricular concepts need additional physical models or bilingual review in class, not for ranking, sorting, or cognitive diagnostic labels.
          </p>
        </div>
      </div>

      {/* Concept Mastery Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-600" />
          Concept Mastery & Scaffolding Signals
        </h2>

        {Object.keys(conceptStats).length === 0 ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            No quiz answer data recorded yet. Students can take a quiz to populate concept analytics.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(conceptStats).map(([concept, data]) => {
              const pct = Math.round((data.correct / data.total) * 100);
              const isHigh = pct >= 70;
              return (
                <div
                  key={concept}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs truncate max-w-[180px]">
                      {concept}
                    </span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                      isHigh ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {pct}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isHigh ? 'bg-green-600' : 'bg-amber-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    {data.correct} of {data.total} correct responses
                  </p>

                  <div className="pt-1 text-[11px] text-slate-600">
                    {isHigh ? (
                      <span className="text-green-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Well understood by class
                      </span>
                    ) : (
                      <span className="text-amber-800 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> Consider step-by-step re-review
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Attempts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">
            Anonymous Student Attempts Log ({filteredAttempts.length})
          </h2>
          <span className="text-xs text-slate-400">Stored in SQLite Database</span>
        </div>

        {filteredAttempts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No attempts match the current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-3">Student Code</th>
                  <th className="px-6 py-3">Curriculum Lesson</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Accuracy</th>
                  <th className="px-6 py-3">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAttempts.map((att) => {
                  const pct = Math.round((att.score / att.totalQuestions) * 100);
                  return (
                    <tr key={att.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        {att.studentCode}
                      </td>
                      <td className="px-6 py-3.5 font-medium text-slate-800">
                        {att.lessonTitle}
                      </td>
                      <td className="px-6 py-3.5 font-semibold">
                        {att.score} / {att.totalQuestions}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                          pct >= 70 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {pct}%
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-slate-400">
                        {new Date(att.completedAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
