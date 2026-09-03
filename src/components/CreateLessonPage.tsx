import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  PlusCircle, 
  Sparkles, 
  FileText, 
  BookOpen, 
  Check, 
  Layers, 
  Info, 
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface Props {
  onSubmitLesson: (
    title: string,
    grade: string,
    subject: string,
    text: string,
    useGemini: boolean
  ) => void;
  onNavigate: (page: PageView) => void;
}

const SRI_LANKA_GRADES = [
  'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8',
  'Grade 9', 'Grade 10', 'Grade 11 (O/L)'
];

const SRI_LANKA_SUBJECTS = [
  'Science',
  'History',
  'Health & Physical Education',
  'Geography',
  'Mathematics',
  'Civic Education',
  'English Language',
  'Sinhala Language & Literature',
  'Tamil Language & Literature',
  'Agriculture & Food Technology'
];

export const CreateLessonPage: React.FC<Props> = ({
  onSubmitLesson,
  onNavigate
}) => {
  const [grade, setGrade] = useState('Grade 7');
  const [subject, setSubject] = useState('Science');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [useGemini, setUseGemini] = useState(false);
  const [error, setError] = useState('');

  const loadTemplate = (templateType: 'plants' | 'diet' | 'monsoons') => {
    if (templateType === 'plants') {
      setGrade('Grade 7');
      setSubject('Science');
      setTitle('Photosynthesis and Green Plants in Sri Lanka');
      setText(
        `Green plants make their own food through a biochemical process called photosynthesis. Using chlorophyll inside their green leaves, plants absorb energy from sunlight. They take in carbon dioxide gas from the air and draw liquid water from the soil through root systems. Through this reaction, plants produce glucose (sugar) which gives them energy to grow, and they release clean oxygen gas into the atmosphere, which animals and human beings need to breathe. In Sri Lankan agricultural areas, sunlight is abundant all year round, allowing crops like tea, rubber, and paddy to thrive.`
      );
    } else if (templateType === 'diet') {
      setGrade('Grade 6');
      setSubject('Health & Physical Education');
      setTitle('Balanced Nutrition for School Children');
      setText(
        `A balanced diet provides all necessary nutrients in correct proportions for healthy growth and energy. School children require carbohydrates from grains like Sri Lankan red rice or kurakkan for daily energy, proteins from pulses like dhal, green gram, fish, and eggs for muscle building, and vitamins and minerals from local vegetables like gotukola, mukunuwenna, and fruits like bananas and papayas to strengthen immunity against illnesses. Drinking clean boiled water and limiting refined sugars and excess oil keeps our bodies active and focused during studies.`
      );
    } else if (templateType === 'monsoons') {
      setGrade('Grade 8');
      setSubject('Geography');
      setTitle('Monsoon Wind Patterns of Sri Lanka');
      setText(
        `Sri Lanka's tropical climate is strongly shaped by two seasonal wind systems known as monsoons. The Southwest Monsoon blows from May to September across the Indian Ocean, bringing moisture-laden winds and heavy rainfall to the Western slopes, Colombo, and the central hills. The Northeast Monsoon blows from December to February across the Bay of Bengal, bringing valuable rain to the Northern and Eastern provinces and filling our ancient irrigation tanks in the dry zone.`
      );
    }
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a lesson title.');
      return;
    }
    if (!text.trim() || text.trim().length < 25) {
      setError('Please enter or paste at least 25 characters of lesson text.');
      return;
    }
    setError('');
    onSubmitLesson(title.trim(), grade, subject, text.trim(), useGemini);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create / Upload School Lesson</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Teacher Authoring
          </span>
        </div>
        <p className="text-xs text-slate-500">
          Enter any standard national textbook passage. The AI engine will decompose it into simple, trilingual, step-by-step, and quiz materials.
        </p>
      </div>

      {/* Quick Fill Sri Lankan Templates */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          Quick-Fill Sri Lankan School Curriculum Examples (for fast demonstration):
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            id="btn-template-plants"
            onClick={() => loadTemplate('plants')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 text-xs font-semibold transition-colors"
          >
            Grade 7 Science: Photosynthesis
          </button>
          <button
            type="button"
            id="btn-template-diet"
            onClick={() => loadTemplate('diet')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 text-xs font-semibold transition-colors"
          >
            Grade 6 Health: Balanced Diet
          </button>
          <button
            type="button"
            id="btn-template-monsoons"
            onClick={() => loadTemplate('monsoons')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 border border-slate-200 text-xs font-semibold transition-colors"
          >
            Grade 8 Geography: Monsoons
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Grade and Subject Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="select-grade" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Grade Level:
            </label>
            <select
              id="select-grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50"
            >
              {SRI_LANKA_GRADES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="select-subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Curriculum Subject:
            </label>
            <select
              id="select-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50"
            >
              {SRI_LANKA_SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Lesson Title */}
        <div className="space-y-1.5">
          <label htmlFor="input-lesson-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Lesson Title:
          </label>
          <input
            id="input-lesson-title"
            type="text"
            placeholder="e.g. Photosynthesis and Green Plants in Sri Lanka"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Lesson Text */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="textarea-lesson-text" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Paste Standard Textbook / Syllabus Text:
            </label>
            <span className="text-[11px] text-slate-400">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            id="textarea-lesson-text"
            rows={7}
            placeholder="Paste the original lesson paragraph or chapter section here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-300 text-sm font-normal focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder:text-slate-400 leading-relaxed font-sans"
          />
        </div>

        {/* AI Engine Selection */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              AI Processing Engine Selection:
            </span>
            <p className="text-[11px] text-slate-500">
              {useGemini 
                ? 'Using Cloud Gemini 3.8 Flash (Online Server Mode)' 
                : 'Using Built-in Mock AI Service (Instant, zero API key required, exhibition-ready)'}
            </p>
          </div>

          <button
            type="button"
            id="btn-toggle-ai-engine"
            onClick={() => setUseGemini(!useGemini)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              useGemini
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {useGemini ? 'Switch to Mock AI Engine' : 'Use Mock AI (Recommended for Exhibition)'}
          </button>
        </div>

        {/* Ethical disclaimer reminder */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Output material will include non-diagnostic teacher scaffolding and trilingual adaptations.</span>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            id="btn-cancel-create-lesson"
            onClick={() => onNavigate('teacher_dashboard')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            id="btn-submit-process-lesson"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Process Lesson with AI
          </button>
        </div>
      </form>
    </div>
  );
};
