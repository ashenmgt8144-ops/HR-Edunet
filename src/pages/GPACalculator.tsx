import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Plus, Trash2, Info, ChevronLeft, Download, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'E': 0.0,
};

const GRADES = Object.keys(GRADE_POINTS);

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('hr-edu-gpa-courses');
    return saved ? JSON.parse(saved) : [{ id: '1', name: '', credits: 3, grade: 'A' }];
  });

  // Synchronize with localStorage
  useEffect(() => {
    localStorage.setItem('hr-edu-gpa-courses', JSON.stringify(courses));
  }, [courses]);

  // Derived state calculated efficiently using useMemo
  const { currentGPA, totalCredits } = useMemo(() => {
    let totalPoints = 0;
    let credits = 0;

    courses.forEach((course) => {
      const points = GRADE_POINTS[course.grade] || 0;
      totalPoints += points * course.credits;
      credits += course.credits;
    });

    return {
      totalCredits: credits,
      currentGPA: credits > 0 ? totalPoints / credits : 0
    };
  }, [courses]);

  const addCourse = () => {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: '',
      credits: 3,
      grade: 'A',
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: string) => {
    if (courses.length === 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(courses.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const resetCalculator = () => {
    if (confirm('Are you sure you want to clear all subjects?')) {
      setCourses([{ id: '1', name: '', credits: 3, grade: 'A' }]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50/50 dark:bg-slate-950 pt-24 pb-20 transition-colors duration-300"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold transition-colors"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
             <button 
              onClick={resetCalculator}
              className="flex items-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2 text-xs font-bold text-gray-500 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-805 transition-all active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">GPA Calculator</h1>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Calculate your semester GPA instantly</p>
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="group flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-slate-850 border border-transparent hover:border-gray-250 dark:hover:border-slate-700 transition-all hover:shadow-md"
                    >
                      <div className="flex-1 min-w-0 w-full">
                        <input
                          type="text"
                          placeholder={`Subject Name (e.g. HRM 31403)`}
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, { name: e.target.value })}
                          className="w-full bg-transparent border-0 focus:ring-0 text-sm font-semibold text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-normal p-0"
                        />
                      </div>
                      
                      <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 dark:border-slate-800">
                        <div className="flex flex-col gap-1 w-24">
                          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">Credits</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, { credits: Number(e.target.value) })}
                            className="bg-white dark:bg-slate-800 rounded-lg border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-950 dark:text-slate-100 focus:ring-primary-navy dark:focus:ring-primary-gold focus:border-primary-navy py-1.5"
                          />
                        </div>
                        
                        <div className="flex flex-col gap-1 w-24">
                          <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-1">Grade</label>
                          <select
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, { grade: e.target.value })}
                            className="bg-white dark:bg-slate-800 rounded-lg border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-950 dark:text-slate-100 focus:ring-primary-navy dark:focus:ring-primary-gold focus:border-primary-navy py-1.5"
                          >
                            {GRADES.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>

                        <button 
                          onClick={() => removeCourse(course.id)}
                          className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors mt-5 sm:mt-5"
                          title="Remove row"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <button 
                  onClick={addCourse}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-850 py-4 text-sm font-bold text-gray-500 dark:text-gray-450 hover:border-primary-navy dark:hover:border-primary-gold hover:text-primary-navy dark:hover:text-primary-gold hover:bg-primary-navy/5 dark:hover:bg-primary-navy/10 transition-all active:scale-[0.98]"
                >
                  <Plus className="h-4 w-4" />
                  Add Subject
                </button>
              </div>
            </div>

            {/* University Grading Info */}
            <div className="mt-8 p-6 rounded-3xl bg-primary-navy/5 dark:bg-slate-900/50 border border-primary-navy/10 dark:border-slate-850">
              <div className="flex items-start gap-4">
                <Info className="h-5 w-5 text-primary-navy dark:text-primary-gold mt-1" />
                <div>
                  <h3 className="font-bold text-primary-navy dark:text-primary-gold uppercase tracking-wider text-xs">Standard University Grading System</h3>
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {Object.entries(GRADE_POINTS).map(([g, p]) => (
                      <div key={g} className="bg-white dark:bg-slate-850 px-2 py-1 rounded-lg border border-gray-100 dark:border-slate-750 flex justify-between items-center">
                        <span className="font-bold text-gray-700 dark:text-slate-200">{g}</span>
                        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">{p.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <motion.div 
              layout
              className="rounded-3xl bg-primary-navy p-8 shadow-xl shadow-primary-navy/20 text-white overflow-hidden relative"
            >
              <div className="relative z-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-gold mb-6 opacity-80 underline underline-offset-8">Academic Result</h3>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black">{currentGPA.toFixed(2)}</span>
                    <span className="text-primary-gold font-bold">GPA</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-100 opacity-80">
                    Calculated for <span className="font-bold text-white">{totalCredits}</span> total credits
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-sm opacity-70">Class Honors</span>
                    <span className="text-sm font-bold">
                      {currentGPA >= 3.7 ? "First Class" : 
                       currentGPA >= 3.3 ? "Second Upper" : 
                       currentGPA >= 3.0 ? "Second Lower" : "General Pass"}
                    </span>
                  </div>
                </div>

                <div className="mt-10">
                  <div className={`h-2.5 w-full bg-white/20 rounded-full overflow-hidden`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentGPA / 4) * 100}%` }}
                      className="h-full bg-primary-gold"
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                    <span>0.0</span>
                    <span>2.0</span>
                    <span>4.0</span>
                  </div>
                </div>

                <button className="hidden mt-10 w-full flex items-center justify-center gap-2 rounded-2xl bg-white/10 border border-white/20 py-4 text-sm font-bold text-white hover:bg-white hover:text-primary-navy transition-all active:scale-95">
                  <Download className="h-4 w-4" />
                  Save as Image
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-8 -bottom-8 h-40 w-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -left-8 -top-8 h-40 w-40 bg-primary-gold/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>

            <div className="mt-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-4">Calculation Formula</h4>
              <div className="flex flex-col gap-3 font-mono text-[11px] text-gray-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary-gold shrink-0" />
                  <span>GPA = Σ (Grade Points × Credits) / Σ Credits</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-slate-850 rounded-xl leading-relaxed italic border border-gray-105 dark:border-slate-800">
                  Example: An 'A' in a 3-credit course gives 4.0 × 3 = 12 points.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
