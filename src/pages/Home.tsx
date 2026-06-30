import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import DeveloperMessage from '../components/home/DeveloperMessage';
import { motion } from 'motion/react';
import { Calculator, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <CategoryGrid />
      
      {/* GPA Calculator CTA */}
      <section className="bg-gray-50 dark:bg-slate-900/40 pb-24 sm:pb-32 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="group relative isolate overflow-hidden bg-white dark:bg-slate-900 px-6 py-12 sm:py-16 shadow-lg ring-1 ring-gray-200 dark:ring-slate-800 rounded-3xl sm:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex h-24 w-24 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-3xl bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy shadow-2xl shadow-primary-navy/20 dark:shadow-none group-hover:scale-110 transition-transform duration-500">
              <Calculator className="h-10 w-10 sm:h-14 sm:w-14" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-3xl">
                Track Your Academic Progress
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-slate-300 max-w-xl">
                Use our built-in GPA Calculator tailored for Ruhuna University students. 
                Keep track of your semester results and see where you stand.
              </p>
              <div className="mt-8">
                <Link 
                  to="/gpa-calculator"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-navy dark:bg-primary-gold px-8 py-4 text-sm font-bold text-white dark:text-primary-navy shadow-lg dark:shadow-none hover:bg-opacity-95 hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                >
                  Open GPA Calculator
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeveloperMessage />
      
      {/* Call to Action for Contributors */}
      <section className="bg-white dark:bg-slate-950 py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-primary-navy dark:bg-slate-900 px-6 py-16 sm:py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-white dark:text-slate-100 sm:text-4xl">
              Have something to share?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-300 dark:text-slate-400">
              Contribute to the community by uploading your notes and papers. 
              Help your fellow undergraduates succeed together.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-primary-navy hover:bg-gray-100 transition-all active:scale-95">
                Join as Contributor
              </button>
            </div>
            {/* Background design */}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#C5A022" />
                  <stop offset="1" stopColor="#003366" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
