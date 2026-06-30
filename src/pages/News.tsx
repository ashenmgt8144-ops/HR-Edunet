import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ExternalLink, Calendar, RefreshCcw, TrendingUp } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
  date: string;
  category: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-20 pb-20 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary-gold" />
            <span className="text-xs font-black uppercase tracking-widest text-primary-navy/60 dark:text-primary-gold/80">Stay Informed</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-gray-900 dark:text-slate-100 leading-none mb-6">
            News & <br />
            <span className="text-primary-navy dark:text-primary-gold italic font-bold">HR Updates</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-650 dark:text-slate-300 font-medium leading-relaxed">
            Stay ahead with the latest trends, news, and insights from the world of Human Resource Management. 
            Curated weekly for HRM undergraduates.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-slate-900 rounded-[2.5rem] h-96 shadow-sm border border-gray-100 dark:border-slate-800" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 italic text-gray-500 dark:text-slate-400">
            <RefreshCcw className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>{error}. Please try again later.</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 italic text-gray-500 dark:text-slate-400">
            <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No news updates available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary-navy/5 dark:hover:shadow-primary-gold/10 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/95 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-primary-navy dark:text-primary-gold rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  {idx === 0 && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-gold text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                    <Calendar className="h-3 w-3" />
                    {item.date}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-slate-100 mb-4 group-hover:text-primary-navy dark:group-hover:text-primary-gold transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed mb-8 flex-1">
                    {item.excerpt}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/link"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-primary-navy dark:text-primary-gold">Read Full Article</span>
                    <div className="h-8 w-8 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-slate-350 flex items-center justify-center group-hover/link:bg-primary-navy dark:group-hover/link:bg-primary-gold group-hover/link:text-white dark:group-hover/link:text-primary-navy transition-all duration-300">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
