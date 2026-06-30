import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, ArrowRight, Upload, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import AI-generated baseline slides (retaining imports to avoid compile issues, but using gorgeous real-life images)
import slide1_ai from '../../assets/images/slideshow_1_1780299965856.png';
import slide2_ai from '../../assets/images/slideshow_2_1780299987562.png';
import slide3_ai from '../../assets/images/slideshow_3_1780300009674.png';
import slide4_ai from '../../assets/images/slideshow_4_1780300027742.png';
import slide5_ai from '../../assets/images/slideshow_5_1780300054692.png';
import slide6_ai from '../../assets/images/slideshow_6_1780300074820.png';

// Premium high-resolution real photography of Sri Lanka & collegiate student life
const REAL_SRI_LANKAN_SLIDES = [
  // Slice 1: Students active peer-study & discussion outdoors 
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
  // Slide 2: Southern Coastal Marine Belt of Sri Lanka (Ruhuna's iconic coastal environment in Matara/Galle)
  "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80",
  // Slide 3: Individual studious research & Library reading focus
  "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
  // Slide 4: Real university students collaborate on data/HR-strategy with high-performance laptops
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  // Slide 5: Historic maritime landmarks & coastal beauty of Galle (near University faculties)
  "https://images.unsplash.com/photo-1588598144026-b51f04ef050b?auto=format&fit=crop&w=1200&q=80",
  // Slide 6: Graduation day ceremony with diplomas and caps, representing ultimate HR leadership peak
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
];

const AI_SLIDES = [slide1_ai, slide2_ai, slide3_ai, slide4_ai, slide5_ai, slide6_ai];
const SLIDE_COUNT = 6;
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

interface ImageWithFallbackProps {
  index: number;
  isActive: boolean;
  className: string;
  fallbackImage: string;
}

function ImageWithFallback({ index, isActive, className, fallbackImage }: ImageWithFallbackProps) {
  const [extIndex, setExtIndex] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Re-evaluate if index or active status changes
  useEffect(() => {
    setExtIndex(0);
    setUseFallback(false);
    setHasLoaded(false);
  }, [index]);

  const currentExt = EXTENSIONS[extIndex];
  const realSrc = `/images/slide${index + 1}${currentExt}`;

  const handleLoad = () => {
    setHasLoaded(true);
  };

  const handleError = () => {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex((prev) => prev + 1);
    } else {
      setUseFallback(true);
      setHasLoaded(true); // Fallback image displays instantly as it is locally imported
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="absolute inset-0 h-full w-full"
    >
      {/* Loading Skeleton */}
      {!hasLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse rounded-[2.5rem]" />
      )}
      <img
        src={useFallback ? fallbackImage : realSrc}
        alt={`Student life at University of Ruhuna Slide ${index + 1}`}
        onLoad={handleLoad}
        onError={useFallback ? undefined : handleError}
        className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDE_COUNT);
    }, 4500); // 4.5 seconds per slide for better viewing duration
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-10 pb-20 lg:pt-20 lg:pb-32 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-50/50 dark:bg-blue-950/10 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-center">
          <div className="text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-slate-800 px-3 py-1 text-sm font-medium text-primary-navy dark:text-primary-gold ring-1 ring-inset ring-blue-700/10 dark:ring-slate-700">
                Department of Human Resource Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 font-serif text-4xl sm:text-7xl font-bold tracking-tight text-gray-900 dark:text-slate-100 leading-tight"
            >
              Empowering <br />
              <span className="text-primary-navy dark:text-primary-gold font-bold">HR Excellence</span>
              <div className="mt-4 text-primary-gold dark:text-slate-400 text-lg sm:text-2xl font-sans tracking-[0.2em] uppercase font-bold whitespace-nowrap">
                University of Ruhuna
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-slate-300"
            >
              Access a comprehensive repository of handouts, lecture notes, and past papers curated 
              specifically for HRM undergraduates. Stay ahead in your academic journey with centralized resources.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center lg:items-center gap-4 sm:gap-x-6"
            >
              <Link
                to="/section/all"
                className="w-full sm:w-auto rounded-full bg-primary-navy dark:bg-primary-gold px-8 py-4 text-base sm:text-lg font-semibold text-white dark:text-primary-navy shadow-xl shadow-primary-navy/20 dark:shadow-none hover:bg-opacity-90 dark:hover:bg-opacity-95 transition-all active:scale-95 text-center"
              >
                Explore Resources
              </Link>
              <a href="#categories" className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200 flex items-center gap-1 group py-2">
                Browse Categories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative h-64 sm:h-96 lg:h-[500px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 bg-slate-50 dark:bg-slate-900">
              <AnimatePresence mode="popLayout">
                {Array.from({ length: SLIDE_COUNT }).map((_, idx) => (
                  <ImageWithFallback
                    key={idx}
                    index={idx}
                    isActive={idx === activeIndex}
                    fallbackImage={REAL_SRI_LANKAN_SLIDES[idx]}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 hover:scale-105"
                  />
                ))}
              </AnimatePresence>
              
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none z-10" />
              
              {/* Slide dots indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {Array.from({ length: SLIDE_COUNT }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex 
                        ? "w-6 bg-primary-gold" 
                        : "w-2 bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-left-6 rounded-3xl bg-white p-4 sm:p-6 shadow-2xl ring-1 ring-gray-900/5 max-w-[160px] sm:max-w-[200px] z-30">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary-gold text-white">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Students</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">250+</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
