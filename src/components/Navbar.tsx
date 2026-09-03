import React from 'react';
import { PageView } from '../types';
import { 
  BookOpen, 
  GraduationCap, 
  PlusCircle, 
  Sparkles, 
  HelpCircle, 
  BarChart3, 
  Home,
  Menu,
  X
} from 'lucide-react';

interface Props {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  activeLessonTitle?: string;
}

export const Navbar: React.FC<Props> = ({
  currentPage,
  onNavigate,
  activeLessonTitle
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'teacher_dashboard', label: 'Teacher Dashboard', icon: GraduationCap },
    { id: 'create_lesson', label: 'Create Lesson', icon: PlusCircle },
    { id: 'student_lesson', label: 'Student Lesson', icon: BookOpen },
    { id: 'quiz', label: 'Quiz Practice', icon: HelpCircle },
    { id: 'teacher_results', label: 'Teacher Results', icon: BarChart3 },
  ];

  return (
    <header className="bg-[#1E293B] text-white border-b border-slate-700/80 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <button
            id="nav-logo-button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer"
          >
            <div className="bg-indigo-500 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-sm transition-transform group-hover:scale-105">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg leading-tight group-hover:text-indigo-300 transition-colors">
                  Inclusive AI Learning Assistant
                </span>
                <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Sri Lanka
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal">
                Sri Lanka Educational Support System • ශ්‍රී ලංකා අධ්‍යාපන සහායක
              </p>
            </div>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id as PageView)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right side: Anonymous Student ID badge & Divider */}
          <div className="hidden xl:flex items-center gap-4">
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none">Student ID</p>
              <p className="font-mono font-bold text-xs text-white mt-0.5">ST001</p>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-700/70 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as PageView);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeLessonTitle && (
        <div className="bg-[#0F172A] border-t border-slate-800 px-4 py-1.5 text-xs text-slate-400 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Lesson:</span>
            <span className="truncate text-indigo-300 font-medium">{activeLessonTitle}</span>
          </div>
        </div>
      )}
    </header>
  );
};
