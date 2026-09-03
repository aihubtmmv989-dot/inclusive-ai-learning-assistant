import React, { useState, useEffect } from 'react';
import { 
  Lesson, 
  PageView, 
  AccessibilitySettings, 
  QuizAttempt 
} from './types';
import { StorageService } from './services/storage';
import { MockAIService } from './services/aiService';

import { Navbar } from './components/Navbar';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { EthicalNoticeModal } from './components/EthicalNoticeModal';
import { HomePage } from './components/HomePage';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CreateLessonPage } from './components/CreateLessonPage';
import { AiProcessingPage } from './components/AiProcessingPage';
import { StudentLessonPage } from './components/StudentLessonPage';
import { QuizPage } from './components/QuizPage';
import { TeacherResultsPage } from './components/TeacherResultsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [isEthicalModalOpen, setIsEthicalModalOpen] = useState(false);

  // Accessibility configuration
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    dyslexicFont: false,
    highlightKeywords: false,
  });

  // Load initial data
  useEffect(() => {
    const loadedLessons = StorageService.getLessons();
    const loadedAttempts = StorageService.getAttempts();
    setLessons(loadedLessons);
    setAttempts(loadedAttempts);
    if (loadedLessons.length > 0) {
      setActiveLesson(loadedLessons[0]);
    }
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lesson: Lesson, targetPage: PageView) => {
    setActiveLesson(lesson);
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteLesson = (id: string) => {
    StorageService.deleteLesson(id);
    const updated = StorageService.getLessons();
    setLessons(updated);
    if (activeLesson?.id === id) {
      setActiveLesson(updated[0] || null);
    }
  };

  const handleResetDemoData = () => {
    StorageService.resetToDemoData();
    const updated = StorageService.getLessons();
    const updatedAttempts = StorageService.getAttempts();
    setLessons(updated);
    setAttempts(updatedAttempts);
    setActiveLesson(updated[0] || null);
  };

  const handleSubmitNewLesson = async (
    title: string,
    grade: string,
    subject: string,
    text: string,
    useGemini: boolean
  ) => {
    setIsProcessingAI(true);
    setCurrentPage('ai_processing');

    try {
      // First try server-side endpoint if available, otherwise use client-side Mock AI
      let result;
      try {
        const response = await fetch('/api/process-lesson', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, grade, subject, text, useGemini })
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.content && !data.useClientFallback) {
            result = data;
          }
        }
      } catch (err) {
        // Fallback to offline mock engine
      }

      if (!result || !result.content) {
        result = await MockAIService.processLesson(title, grade, subject, text);
      }

      const newLesson: Lesson = {
        id: 'lesson-' + Date.now(),
        grade,
        subject,
        title,
        originalText: text,
        content: result.content,
        questions: result.questions,
        createdAt: new Date().toISOString()
      };

      StorageService.saveLesson(newLesson);
      setLessons(StorageService.getLessons());
      setActiveLesson(newLesson);
    } catch (err) {
      console.error('Error processing lesson:', err);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleSaveAttempt = (attempt: QuizAttempt) => {
    StorageService.saveAttempt(attempt);
    setAttempts(StorageService.getAttempts());
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      settings.highContrast 
        ? 'bg-black text-white' 
        : 'bg-slate-50 text-slate-900'
    } ${settings.dyslexicFont ? 'tracking-wider' : ''}`}>
      
      {/* Top Accessibility Bar */}
      <AccessibilityToolbar
        settings={settings}
        onChange={setSettings}
        onOpenEthicalModal={() => setIsEthicalModalOpen(true)}
      />

      {/* Main Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        activeLessonTitle={activeLesson ? `${activeLesson.grade} - ${activeLesson.title}` : undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectLesson={handleSelectLesson}
            lessons={lessons}
          />
        )}

        {currentPage === 'teacher_dashboard' && (
          <TeacherDashboard
            lessons={lessons}
            attempts={attempts}
            onNavigate={handleNavigate}
            onSelectLesson={handleSelectLesson}
            onDeleteLesson={handleDeleteLesson}
            onResetDemoData={handleResetDemoData}
          />
        )}

        {currentPage === 'create_lesson' && (
          <CreateLessonPage
            onSubmitLesson={handleSubmitNewLesson}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'ai_processing' && activeLesson && (
          <AiProcessingPage
            lesson={activeLesson}
            isProcessing={isProcessingAI}
            onSaveAndOpenStudent={() => handleNavigate('student_lesson')}
            onSaveAndOpenQuiz={() => handleNavigate('quiz')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'student_lesson' && activeLesson && (
          <StudentLessonPage
            lesson={activeLesson}
            settings={settings}
            onNavigate={handleNavigate}
            onStartQuiz={() => handleNavigate('quiz')}
          />
        )}

        {currentPage === 'quiz' && activeLesson && (
          <QuizPage
            lesson={activeLesson}
            onSaveAttempt={handleSaveAttempt}
            onNavigate={handleNavigate}
            onBackToLesson={() => handleNavigate('student_lesson')}
          />
        )}

        {currentPage === 'teacher_results' && (
          <TeacherResultsPage
            lessons={lessons}
            attempts={attempts}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 space-y-1">
        <p className="font-semibold text-slate-700">
          Inclusive AI Learning Assistant – Sri Lanka • ශ්‍රී ලංකා අධ්‍යාපන සහායක පද්ධතිය
        </p>
        <p className="text-[11px] text-slate-400">
          Educational support system • Strictly non-diagnostic • Anonymous student IDs only
        </p>
      </footer>

      {/* Ethical Boundaries Modal */}
      <EthicalNoticeModal
        isOpen={isEthicalModalOpen}
        onClose={() => setIsEthicalModalOpen(false)}
      />
    </div>
  );
}
