import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Calculator, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary-navy dark:text-slate-100 whitespace-nowrap">
            HR Edu<span className="text-primary-gold">Net</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-5 xl:gap-8 shrink-0">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors relative group whitespace-nowrap",
              isActive('/') ? "text-primary-navy dark:text-primary-gold" : "text-gray-600 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold"
            )}
          >
            Home
            {isActive('/') && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-gold" />
            )}
          </Link>
          <Link 
            to="/section/handouts" 
            className={cn(
              "text-sm font-medium transition-colors relative group whitespace-nowrap",
              isActive('/section/handouts') ? "text-primary-navy dark:text-primary-gold" : "text-gray-600 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold"
            )}
          >
            Handouts
            {isActive('/section/handouts') && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-gold" />
            )}
          </Link>
          <Link 
            to="/section/lecture-notes" 
            className={cn(
              "text-sm font-medium transition-colors relative group whitespace-nowrap",
              isActive('/section/lecture-notes') ? "text-primary-navy dark:text-primary-gold" : "text-gray-600 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold"
            )}
          >
            Lecture Notes
            {isActive('/section/lecture-notes') && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-gold" />
            )}
          </Link>
          <Link 
            to="/section/past-papers" 
            className={cn(
              "text-sm font-medium transition-colors relative group whitespace-nowrap",
              isActive('/section/past-papers') ? "text-primary-navy dark:text-primary-gold" : "text-gray-600 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold"
            )}
          >
            Past Papers
            {isActive('/section/past-papers') && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-gold" />
            )}
          </Link>
          <Link 
            to="/section/youtube" 
            className={cn(
              "text-sm font-medium transition-colors relative group whitespace-nowrap",
              isActive('/section/youtube') ? "text-primary-navy dark:text-primary-gold" : "text-gray-600 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold"
            )}
          >
            Other
            {isActive('/section/youtube') && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-gold" />
            )}
          </Link>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-slate-800 shrink-0" />
          
          <Link 
            to="/gpa-calculator" 
            className={cn(
              "flex items-center gap-2 text-sm font-bold transition-colors whitespace-nowrap",
              isActive('/gpa-calculator') ? "text-primary-gold" : "text-primary-navy dark:text-slate-200 hover:text-opacity-80 dark:hover:text-primary-gold"
            )}
          >
            <Calculator className="h-4 w-4" />
            GPA Calculator
          </Link>
          
          <Link 
            to="/news" 
            className={cn(
              "text-sm font-medium transition-colors relative group whitespace-nowrap",
              isActive('/news') ? "text-primary-navy dark:text-primary-gold" : "text-gray-600 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold"
            )}
          >
            News & Updates
            {isActive('/news') && (
              <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-gold" />
            )}
          </Link>
          
          <button 
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-all active:scale-95 shrink-0"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-primary-gold" /> : <Moon className="h-5 w-5 text-primary-navy" />}
          </button>
          
          <button className="rounded-full bg-primary-navy dark:bg-primary-gold px-5 py-2 text-sm font-semibold text-white dark:text-primary-navy hover:bg-opacity-90 dark:hover:bg-opacity-95 transition-all shrink-0">
            Upload
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4"
          >
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-all px-4 py-2 rounded-xl",
                  isActive('/') ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy" : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                Home
              </Link>
              <Link 
                to="/section/handouts" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-all px-4 py-2 rounded-xl",
                  isActive('/section/handouts') ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy" : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                Handouts
              </Link>
              <Link 
                to="/section/lecture-notes" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-all px-4 py-2 rounded-xl",
                  isActive('/section/lecture-notes') ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy" : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                Lecture Notes
              </Link>
              <Link 
                to="/section/past-papers" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-all px-4 py-2 rounded-xl",
                  isActive('/section/past-papers') ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy" : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                Past Papers
              </Link>
              <Link 
                to="/section/youtube" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-all px-4 py-2 rounded-xl",
                  isActive('/section/youtube') ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy" : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                Other Materials
              </Link>
              <Link 
                to="/gpa-calculator" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 text-lg font-bold transition-all px-4 py-2 rounded-xl",
                  isActive('/gpa-calculator') ? "bg-primary-gold text-primary-navy" : "text-primary-navy dark:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                <Calculator className="h-5 w-5" />
                GPA Calculator
              </Link>
              <Link 
                to="/news" 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-all px-4 py-2 rounded-xl",
                  isActive('/news') ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy" : "text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800"
                )}
              >
                News & Updates
              </Link>
              
              <button 
                onClick={toggleTheme}
                className="flex items-center justify-between gap-2 text-lg font-medium px-4 py-3 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-xl transition-all"
              >
                <span>Theme Mode</span>
                <div className="flex items-center gap-1.5 font-semibold text-sm capitalize text-gray-500 dark:text-gray-400">
                  {theme === 'dark' ? <Sun className="h-5 w-5 text-primary-gold animate-spin-slow" /> : <Moon className="h-5 w-5 text-primary-navy" />}
                  <span>{theme}</span>
                </div>
              </button>

              <button className="mt-2 w-full rounded-xl bg-primary-navy dark:bg-primary-gold py-3 text-center font-semibold text-white dark:text-primary-navy hover:bg-opacity-95 transition-all">
                Upload Resource
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
