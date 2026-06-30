import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function DeveloperMessage() {
  return (
    <section className="bg-gray-50 dark:bg-slate-900/10 py-24 border-t border-gray-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-12">
            <Quote className="h-12 w-12 text-primary-gold opacity-30 mx-auto mb-6" />
            <div className="inline-flex items-center rounded-full bg-primary-navy/5 dark:bg-primary-gold/10 px-4 py-1.5 text-sm font-bold text-primary-navy dark:text-primary-gold mb-8">
              Developer's Message
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl mb-8">
              Empowering HR Education through <span className="text-primary-navy dark:text-primary-gold font-bold">Digital Innovation</span>
            </h2>
            
            <div className="prose prose-lg text-gray-600 dark:text-slate-300 mb-12 italic leading-relaxed max-w-2xl mx-auto text-lg">
              "Providing a central platform for our department to share resources and grow together. This project is a step towards a more connected and efficient learning environment for all HR undergraduates."
              <p className="mt-4 text-sm not-italic font-medium text-gray-400 dark:text-gray-550">Message will be updated soon.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-1 w-12 bg-primary-gold mb-6 rounded-full" />
              <div>
                <a 
                  href="https://www.linkedin.com/in/ashen-jayasooriya-%E2%99%94-46619b253?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-black text-gray-900 dark:text-slate-100 tracking-tight hover:text-primary-navy dark:hover:text-primary-gold transition-colors duration-200"
                >
                  Ashen Jayasooriya
                </a>
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-bold text-primary-navy dark:text-primary-gold uppercase tracking-wider">Undergraduate, Department of HRM</p>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vice President, CHRD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
