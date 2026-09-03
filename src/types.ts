export type Language = 'en' | 'si' | 'ta';

export type LearningMode = 'standard' | 'simple' | 'step_by_step';

export type PageView = 
  | 'home'
  | 'teacher_dashboard'
  | 'create_lesson'
  | 'ai_processing'
  | 'student_lesson'
  | 'quiz'
  | 'teacher_results';

export interface LocalizedString {
  en: string;
  si: string;
  ta: string;
}

export interface LocalizedStringArray {
  en: string[];
  si: string[];
  ta: string[];
}

export interface StepItem {
  stepNumber: number;
  title: LocalizedString;
  instruction: LocalizedString;
  keyClue: LocalizedString;
}

export interface KeyConcept {
  id: string;
  concept: LocalizedString;
  summary: LocalizedString;
}

export interface VocabularyWord {
  id: string;
  word: LocalizedString;
  meaning: LocalizedString;
  example: LocalizedString;
}

export interface PracticeQuestion {
  id: string;
  question: LocalizedString;
  hint: LocalizedString;
  sampleAnswer: LocalizedString;
}

export interface TeacherSupportInfo {
  scaffoldingTips: string[];
  classroomActivities: string[];
  pacingAdvice: string;
  nonDiagnosticNotice: string;
}

export interface LessonContent {
  simpleExplanation: LocalizedString;
  stepByStep: StepItem[];
  keyConcepts: KeyConcept[];
  vocabulary: VocabularyWord[];
  easierPracticeQuestions: PracticeQuestion[];
  teacherSupport: TeacherSupportInfo;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: LocalizedString;
  options: LocalizedStringArray;
  correctAnswerIndex: number;
  explanation: LocalizedString;
  conceptTested: string;
  difficulty: 'Easy' | 'Medium';
}

export interface Lesson {
  id: string;
  grade: string;
  subject: string;
  title: string;
  originalText: string;
  content: LessonContent;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizAttemptAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  conceptTested: string;
}

export interface QuizAttempt {
  id: string;
  lessonId: string;
  lessonTitle: string;
  studentCode: string; // e.g. "ST001"
  score: number;
  totalQuestions: number;
  answers: QuizAttemptAnswer[];
  completedAt: string;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  dyslexicFont: boolean;
  highlightKeywords: boolean;
}
