import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import LoadingSpinner from './components/layout/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const SectionPage = lazy(() => import('./pages/SectionPage'));
const GPACalculator = lazy(() => import('./pages/GPACalculator'));
const News = lazy(() => import('./pages/News'));

import AIChatBot from './components/home/AIChatBot';
import { AnimatePresence } from 'motion/react';
import { Globe, Linkedin, Facebook } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-100 antialiased selection:bg-primary-gold selection:text-white transition-colors duration-300">
        <Header />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/section/:type" element={<SectionPage />} />
              <Route path="/gpa-calculator" element={<GPACalculator />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        
        <AIChatBot />
        
        <footer className="border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/40 py-16 transition-colors duration-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Stay Connected with us</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.linkedin.com/company/circle-of-human-resource-development-university-of-ruhuna/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#0077b5] text-white shadow-lg shadow-[#0077b5]/20 hover:shadow-xl hover:shadow-[#0077b5]/30 hover:scale-105 transition-all group"
                >
                  <Linkedin className="h-5 w-5 transition-transform group-hover:rotate-6" />
                  <span className="font-semibold">LinkedIn</span>
                </a>
                <a 
                  href="https://www.facebook.com/CHRDOFFMFUOR?mibextid=ZbWKwL" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#1877f2] text-white shadow-lg shadow-[#1877f2]/20 hover:shadow-xl hover:shadow-[#1877f2]/30 hover:scale-105 transition-all group"
                >
                  <Facebook className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">Facebook</span>
                </a>
                <a 
                  href="https://www.mgt.ruh.ac.lk/hrd/index.php" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-primary-navy dark:bg-slate-800 text-white shadow-lg shadow-primary-navy/20 dark:shadow-none hover:shadow-xl hover:shadow-primary-navy/30 hover:scale-105 transition-all group border dark:border-slate-700"
                >
                  <Globe className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">Department Website</span>
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200/60 dark:border-slate-800">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} HR EduNet | Department of Human Resource Management
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Faculty of Management and Finance, University of Ruhuna, Sri Lanka
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
