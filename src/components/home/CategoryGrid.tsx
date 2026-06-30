import { motion } from 'motion/react';
import { BookOpen, FileText, History, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

const categories: Category[] = [
  {
    id: 'handouts',
    title: 'Handouts',
    description: 'Quick reference materials and supplementary handouts from your lecturers.',
    icon: 'BookOpen',
    color: 'bg-blue-500',
  },
  {
    id: 'lecture-notes',
    title: 'Lecture Notes',
    description: 'Detailed session notes and presentations to help you review key concepts.',
    icon: 'FileText',
    color: 'bg-amber-500',
  },
  {
    id: 'past-papers',
    title: 'Past Papers',
    description: 'Sharpen your skills with previous exam papers and model answers.',
    icon: 'History',
    color: 'bg-emerald-500',
  },
  {
    id: 'youtube',
    title: 'Other Materials',
    description: 'Expert HR insights, tutorials, and global industry trends from top creators.',
    icon: 'Youtube',
    color: 'bg-red-600',
  },
];

const iconMap: Record<string, any> = {
  BookOpen,
  FileText,
  History,
  Youtube,
};

export default function CategoryGrid() {
  return (
    <section id="categories" className="bg-gray-50 dark:bg-slate-900/40 py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">Resource Library</h2>
          <p className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-slate-400">
            Select a category to find specialized materials for your semester.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {categories.map((category, idx) => {
            const Icon = iconMap[category.icon];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative"
              >
                <Link
                  to={`/section/${category.id}`}
                  className="flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm ring-1 ring-gray-200 dark:ring-slate-800 transition-all hover:scale-[1.02] hover:shadow-xl group-hover:ring-primary-navy/20 dark:group-hover:ring-primary-gold/20"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${category.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 group-hover:text-primary-navy dark:group-hover:text-primary-gold transition-colors">
                      {category.title}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-semibold text-primary-navy dark:text-primary-gold group-hover:gap-2 transition-all">
                    Browse Files <ArrowRight className="h-4 w-4 scale-0 group-hover:scale-100 transition-all" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
