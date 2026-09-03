import { Lesson, QuizAttempt } from '../types';
import { SAMPLE_LESSONS } from '../data/sampleLessons';

const LESSONS_KEY = 'inclusive_ai_lessons_v1';
const ATTEMPTS_KEY = 'inclusive_ai_attempts_v1';

export class StorageService {
  static getLessons(): Lesson[] {
    try {
      const stored = localStorage.getItem(LESSONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read lessons from storage', e);
    }
    // Seed initial demo lessons
    localStorage.setItem(LESSONS_KEY, JSON.stringify(SAMPLE_LESSONS));
    return SAMPLE_LESSONS;
  }

  static getLessonById(id: string): Lesson | undefined {
    const lessons = this.getLessons();
    return lessons.find((l) => l.id === id);
  }

  static saveLesson(lesson: Lesson): void {
    const lessons = this.getLessons();
    const existingIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (existingIndex >= 0) {
      lessons[existingIndex] = lesson;
    } else {
      lessons.unshift(lesson);
    }
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
  }

  static deleteLesson(id: string): void {
    const lessons = this.getLessons().filter((l) => l.id !== id);
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
  }

  static getAttempts(): QuizAttempt[] {
    try {
      const stored = localStorage.getItem(ATTEMPTS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read quiz attempts from storage', e);
    }

    // Default sample exhibition attempts with anonymous student IDs
    const initialAttempts: QuizAttempt[] = [
      {
        id: 'att-1',
        lessonId: 'lesson-water-cycle-gr7',
        lessonTitle: 'The Water Cycle and Weather in Sri Lanka',
        studentCode: 'ST001',
        score: 3,
        totalQuestions: 3,
        completedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        answers: [
          { questionId: 'q1', selectedIndex: 0, isCorrect: true, conceptTested: 'Energy source for evaporation' },
          { questionId: 'q2', selectedIndex: 0, isCorrect: true, conceptTested: 'Condensation mechanism' },
          { questionId: 'q3', selectedIndex: 0, isCorrect: true, conceptTested: 'Precipitation definition' }
        ]
      },
      {
        id: 'att-2',
        lessonId: 'lesson-water-cycle-gr7',
        lessonTitle: 'The Water Cycle and Weather in Sri Lanka',
        studentCode: 'ST002',
        score: 2,
        totalQuestions: 3,
        completedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        answers: [
          { questionId: 'q1', selectedIndex: 0, isCorrect: true, conceptTested: 'Energy source for evaporation' },
          { questionId: 'q2', selectedIndex: 1, isCorrect: false, conceptTested: 'Condensation mechanism' },
          { questionId: 'q3', selectedIndex: 0, isCorrect: true, conceptTested: 'Precipitation definition' }
        ]
      },
      {
        id: 'att-3',
        lessonId: 'lesson-irrigation-gr8',
        lessonTitle: 'Ancient Hydraulic Civilization and Tanks of Sri Lanka',
        studentCode: 'ST003',
        score: 2,
        totalQuestions: 2,
        completedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        answers: [
          { questionId: 'hq1', selectedIndex: 0, isCorrect: true, conceptTested: 'Bisokotuwa mechanism' },
          { questionId: 'hq2', selectedIndex: 0, isCorrect: true, conceptTested: 'Historical ruler attribution' }
        ]
      },
      {
        id: 'att-4',
        lessonId: 'lesson-irrigation-gr8',
        lessonTitle: 'Ancient Hydraulic Civilization and Tanks of Sri Lanka',
        studentCode: 'ST004',
        score: 1,
        totalQuestions: 2,
        completedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        answers: [
          { questionId: 'hq1', selectedIndex: 0, isCorrect: true, conceptTested: 'Bisokotuwa mechanism' },
          { questionId: 'hq2', selectedIndex: 1, isCorrect: false, conceptTested: 'Historical ruler attribution' }
        ]
      }
    ];
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(initialAttempts));
    return initialAttempts;
  }

  static saveAttempt(attempt: QuizAttempt): void {
    const attempts = this.getAttempts();
    attempts.unshift(attempt);
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
  }

  static resetToDemoData(): void {
    localStorage.setItem(LESSONS_KEY, JSON.stringify(SAMPLE_LESSONS));
    localStorage.removeItem(ATTEMPTS_KEY);
    this.getAttempts(); // Will seed fresh demo attempts
  }
}
