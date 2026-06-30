import { motion } from 'motion/react';
import { Bot, GraduationCap } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center" id="loading-spinner-container">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute h-32 w-32 rounded-full bg-primary-navy/10 dark:bg-primary-gold/10"
        />

        {/* Middle decorative spinning dash ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute h-24 w-24 rounded-full border-2 border-dashed border-gray-200 dark:border-slate-800"
        />

        {/* Primary speed ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute h-20 w-20 rounded-full border-t-2 border-r-2 border-primary-navy dark:border-primary-gold"
        />

        {/* Centered elegant app icon */}
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-navy dark:bg-primary-gold text-white dark:text-primary-navy shadow-lg shadow-primary-navy/10 dark:shadow-none">
          <GraduationCap className="h-7 w-7 animate-pulse" />
        </div>
      </div>

      {/* Loading textual guides */}
      <h3 className="text-base font-extrabold text-gray-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
        <Bot className="h-4 w-4 text-primary-gold animate-bounce" />
        Preparing Educational Resources
      </h3>
      <p className="mt-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        HR EduNet is optimizing assets...
      </p>
    </div>
  );
}
