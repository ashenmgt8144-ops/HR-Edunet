import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Clock,
  Layers,
  Youtube,
  PlayCircle,
  Globe,
  BookOpen,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Resource, AcademicLevel } from '../types';
import { cn } from '../lib/utils';
import { REAL_RESOURCES } from '../data/resources';

// Easily configurable Google Drive Links for each academic level & section
const DRIVE_LINKS: Record<string, Record<AcademicLevel, string>> = {
  'handouts': {
    '2000': 'https://drive.google.com',
    '3000': 'https://drive.google.com',
    '4000': 'https://drive.google.com'
  },
  'past-papers': {
    '2000': 'https://drive.google.com',
    '3000': 'https://drive.google.com',
    '4000': 'https://drive.google.com'
  },
  'lecture-notes': {
    '2000': 'https://drive.google.com',
    '3000': 'https://drive.google.com',
    '4000': 'https://drive.google.com'
  },
  'all': {
    '2000': 'https://drive.google.com',
    '3000': 'https://drive.google.com',
    '4000': 'https://drive.google.com'
  }
};

const levels: { id: AcademicLevel; label: string; desc: string }[] = [
  { id: '2000', label: '2000 Level', desc: 'Second Year' },
  { id: '3000', label: '3000 Level', desc: 'Third Year' },
  { id: '4000', label: '4000 Level', desc: 'Final Year' },
];

const titleMap: Record<string, string> = {
  'handouts': 'Handouts',
  'past-papers': 'Past Papers',
  'lecture-notes': 'Lecture Notes',
  'youtube': 'Other Materials',
  'all': 'All Resources'
};

export default function SectionPage() {
  const { type } = useParams<{ type: string }>();
  const [activeLevel, setActiveLevel] = React.useState<AcademicLevel>('2000');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterFormat, setFilterFormat] = React.useState<'all' | 'video' | 'article'>('all');
  
  const isYoutubeView = type === 'youtube';

  const youtubeResources = React.useMemo(() => {
    return REAL_RESOURCES.filter(r => r.type === 'youtube');
  }, []);

  const filteredYoutubeResources = React.useMemo(() => {
    if (!isYoutubeView) return [];
    
    let list = youtubeResources;
    if (filterFormat === 'video') {
      list = list.filter(r => r.resourceFormat !== 'article');
    } else if (filterFormat === 'article') {
      list = list.filter(r => r.resourceFormat === 'article');
    }

    return list.filter(res => 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [isYoutubeView, youtubeResources, searchQuery, filterFormat]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-300"
    >
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-slate-300 hover:text-primary-navy dark:hover:text-primary-gold transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">
                {titleMap[type || 'all'] || 'Resources'}
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-slate-400">
                {isYoutubeView 
                  ? "Access top research journals, HBR studies, McKinsey reports, and curated lectures."
                  : `Access curated HRM academic materials filtered by your level.`}
              </p>
            </div>
            
            {isYoutubeView && (
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border-gray-200 dark:border-slate-700 pl-10 focus:border-primary-navy dark:focus:border-primary-gold focus:ring-primary-navy dark:focus:ring-primary-gold transition-all py-2.5 text-sm bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-slate-100"
                  />
                </div>
              </div>
            )}
          </div>

          {isYoutubeView && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              <button
                onClick={() => setFilterFormat('all')}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95",
                  filterFormat === 'all'
                    ? "bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                )}
              >
                All Materials ({youtubeResources.length})
              </button>
              <button
                onClick={() => setFilterFormat('video')}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2",
                  filterFormat === 'video'
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                )}
              >
                <Youtube className="h-3.5 w-3.5 text-red-500" /> Video Channels ({youtubeResources.filter(r => r.resourceFormat !== 'article').length})
              </button>
              <button
                onClick={() => setFilterFormat('article')}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-2",
                  filterFormat === 'article'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700"
                )}
              >
                <BookOpen className="h-3.5 w-3.5 text-blue-500" /> HR Articles & Journals ({youtubeResources.filter(r => r.resourceFormat === 'article').length})
              </button>
            </div>
          )}

          {!isYoutubeView && (
            <div className="mt-10 flex flex-wrap gap-2 sm:gap-4">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={cn(
                    "flex-1 sm:flex-none flex flex-col items-center justify-center rounded-2xl px-6 py-4 transition-all duration-200 border-2 cursor-pointer",
                    activeLevel === level.id 
                      ? "bg-primary-navy dark:bg-primary-gold border-primary-navy dark:border-primary-gold text-white dark:text-primary-navy shadow-lg scale-105 animate-[pulse_3s_infinite]" 
                      : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-750 text-gray-600 dark:text-slate-300 hover:border-gray-300 dark:hover:border-slate-750 hover:bg-gray-50 dark:hover:bg-slate-750"
                  )}
                >
                  <span className="text-lg font-extrabold">{level.label}</span>
                  <span className={cn("text-xs font-semibold", activeLevel === level.id ? "text-blue-200 dark:text-primary-navy/85" : "text-gray-400 dark:text-slate-500")}>
                    {level.desc}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isYoutubeView ? 'youtube' : `${activeLevel}-${type}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
          >
            {isYoutubeView ? (
              filteredYoutubeResources.length > 0 ? (
                filteredYoutubeResources.map((resource) => {
                  const isArticle = resource.resourceFormat === 'article';
                  return (
                    <div
                      key={resource.id}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 transition-all hover:shadow-xl hover:ring-2",
                        isArticle 
                          ? "hover:ring-blue-500/10 dark:hover:ring-blue-500/10" 
                          : "hover:ring-red-600/10 dark:hover:ring-red-600/10"
                      )}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          {isArticle ? (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400">
                              <FileText className="h-6 w-6" />
                            </div>
                          ) : (
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl overflow-hidden bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400">
                              {resource.thumbnailUrl ? (
                                <img 
                                  src={resource.thumbnailUrl} 
                                  alt={resource.author} 
                                  className="h-full w-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <Youtube className="h-6 w-6" />
                              )}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 text-right">
                            {isArticle ? (
                              <>
                                <span className="inline-flex items-center rounded-lg bg-blue-50 dark:bg-blue-950/25 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                  HR Article
                                </span>
                                <span className="inline-flex items-center rounded-lg bg-amber-50 dark:bg-amber-950/25 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-450 uppercase tracking-wider">
                                  {resource.level} Level
                                </span>
                              </>
                            ) : (
                              <span className="inline-flex items-center rounded-lg bg-red-50 dark:bg-red-950/25 px-2.5 py-1 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                                YouTube Channel
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-slate-100 group-hover:text-primary-navy dark:group-hover:text-primary-gold transition-colors leading-snug">
                           {resource.title}
                        </h3>
                        <p className="mt-3 text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                          {resource.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-y-2 gap-x-6 border-t border-gray-55 dark:border-slate-800 pt-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400 font-medium">
                            {isArticle ? (
                              <>
                                <Globe className="h-4 w-4 text-blue-500" /> 
                                <span>Publisher: <strong className="text-gray-700 dark:text-slate-300 font-semibold">{resource.author}</strong></span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                                <span>Curated Video Resource</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto bg-gray-50/80 dark:bg-slate-850 p-5">
                        {isArticle ? (
                          <a 
                            href={resource.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-white dark:text-primary-navy shadow-sm transition-all active:scale-[0.97] bg-primary-navy hover:bg-[#152e52] dark:bg-primary-gold dark:hover:bg-primary-gold/90 hover:shadow-sky-900/10"
                          >
                            <ExternalLink className="h-4.5 w-4.5" />
                            Read Full Article
                          </a>
                        ) : (
                          <a 
                            href={resource.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.97] bg-red-600 hover:bg-red-700 hover:shadow-red-600/20"
                          >
                            <PlayCircle className="h-4.5 w-4.5" />
                            Watch on YouTube
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="rounded-full bg-gray-100 dark:bg-slate-800 p-6 mb-4">
                    <Search className="h-10 w-10 text-gray-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-150">No materials found</h3>
                  <p className="mt-2 text-gray-500 dark:text-slate-400 max-w-xs">
                    We couldn't find any resources matching your search.
                  </p>
                </div>
              )
            ) : (
              <div className="col-span-full max-w-2xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-slate-900 rounded-[24px] border border-gray-100 dark:border-slate-800 p-8 sm:p-12 text-center shadow-[0_20px_45px_-12px_rgba(27,54,93,0.08)] relative overflow-hidden group"
                >
                  {/* Premium Ambient Background Accents */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-38 h-38 bg-primary-gold/10 rounded-full blur-3xl group-hover:bg-primary-gold/20 transition-all duration-500 animate-pulse" />
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-38 h-38 bg-primary-navy/5 rounded-full blur-3xl group-hover:bg-primary-navy/10 transition-all duration-500 animate-pulse" />
                  
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#1B365D] to-[#254B82] text-white shadow-xl shadow-blue-900/10 mb-8 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                    <Layers className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-slate-100 tracking-tight mb-4">
                    {activeLevel} Level {titleMap[type || 'all'] || 'Materials'}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-slate-400 max-w-md mx-auto mb-10 text-sm sm:text-base leading-relaxed">
                    Access the complete curated folder of professional handouts, lecture slides, models, and syllabus resources for your studies.
                  </p>

                  <a 
                    href={DRIVE_LINKS[type || 'all']?.[activeLevel] || 'https://drive.google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-tr from-[#1B365D] to-[#254B82] text-white hover:from-[#152e52] hover:to-[#1e3f71] text-base font-bold py-4 px-10 rounded-xl shadow-lg shadow-[#1B365D]/15 transition-all active:scale-[0.98] group/btn"
                  >
                    <Globe className="h-5 w-5 text-[#FFB81C] group-hover/btn:rotate-12 transition-transform" />
                    <span>Access Google Drive Folder</span>
                  </a>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-center gap-6 text-[10px] font-extrabold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Curated Repository</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FFB81C]" />
                    <span>Faculty of Management & Finance</span>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
