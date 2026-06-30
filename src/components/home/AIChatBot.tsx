import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Globe, TrendingUp, Zap, RefreshCcw, Paperclip, Image as ImageIcon, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getChatResponse, Attachment } from '../../services/geminiService';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
  attachments?: Attachment[];
}

const QUICK_SUGGESTIONS = [
  { label: 'Analyze Theory', query: 'Explain the difference between Soft and Hard HRM using Sri Lankan examples.' },
  { label: 'Exam Prep', query: 'What are the key themes often tested in Labour Law exams?' },
  { label: 'Local Impact', query: 'How does the current economic situation in Sri Lanka affect local recruitment strategies?' },
  { label: 'Pro Tips', query: 'Give me 3 tips for my first HR internship interview.' }
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hello! How can I assist you with your HR studies today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<Attachment[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      
      const fileData = await new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      newAttachments.push({
        name: file.name,
        mimeType: file.type,
        data: fileData
      });
    }

    setSelectedAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (index: number) => {
    setSelectedAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (text?: string) => {
    const userMessage = text || inputText.trim();
    if ((!userMessage && selectedAttachments.length === 0) || isLoading) return;

    const currentAttachments = [...selectedAttachments];
    setInputText('');
    setSelectedAttachments([]);
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage || (currentAttachments.length > 0 ? "Attached files" : ""),
      attachments: currentAttachments 
    }]);
    setIsLoading(true);

    // Prepare history for Gemini, skipping the initial greeting if it's the first message
    const history = messages
      .slice(1) // Skip the first greeting message
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

    const response = await getChatResponse(userMessage, history, currentAttachments);
    
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 h-[620px] max-h-[calc(100vh-120px)] w-[360px] sm:w-[460px] bg-white dark:bg-slate-900 rounded-[24px] shadow-[0_25px_60px_-15px_rgba(27,54,93,0.22)] border border-gray-100/80 dark:border-slate-800 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#1B365D] via-[#214373] to-[#A30F27] p-6 text-white relative overflow-hidden shrink-0">
              {/* Premium geometric abstract mesh background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="absolute top-0 right-0 p-8 opacity-[0.08]">
                <Globe className="h-32 w-32 animate-[spin_32s_linear_infinite]" />
              </div>
              {/* Premium Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFB81C]/5 to-transparent backdrop-blur-[1px]" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="bg-gradient-to-tr from-[#FFB81C] to-[#E39D0C] p-2.5 rounded-2xl shadow-[0_4px_16px_rgba(255,184,28,0.25)] border border-white/20 overflow-hidden w-12 h-12 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Bot className="h-6 w-6 text-[#1B365D]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg tracking-tight leading-none mb-1.5 text-white">HR EDU PRO</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#FFB81C] relative flex items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFB81C] opacity-75 animate-ping" />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#FFB81C]">Academic Assistant</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 relative z-10">
                  <button 
                    onClick={() => setMessages([{ role: 'model', content: "Hello! How can I assist you with your HR studies today?" }])}
                    className="hover:bg-white/10 p-2.5 rounded-xl transition-all group/reset active:scale-95 border border-white/5"
                    title="New Chat"
                  >
                    <RefreshCcw className="h-4.5 w-4.5 text-white/90 group-hover/reset:rotate-180 transition-transform duration-500" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/10 p-2.5 rounded-xl transition-all active:scale-95 border border-white/5"
                  >
                    <X className="h-4.5 w-4.5 text-white/90" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 bg-gradient-to-b from-[#FAFBFD] to-[#F1F5F9] dark:from-[#111827] dark:to-[#0f172a] scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex gap-3 items-start group transition-all duration-300 w-full",
                    msg.role === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
                  )}
                >
                  {msg.role === 'model' && (
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#1B365D] via-[#214373] to-[#A30F27] flex items-center justify-center flex-shrink-0 border border-white/20 self-start mt-1 text-white shadow-[0_4px_10px_rgba(27,54,93,0.15)]">
                      <Bot className="h-4.5 w-4.5 text-[#FFB81C]" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "flex flex-col",
                    msg.role === 'user' ? "items-end max-w-[85%]" : "items-start max-w-[calc(100%-40px)]"
                  )}>
                    <div className={cn(
                      "p-4 rounded-[20px] text-[13.5px] leading-relaxed transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]",
                      msg.role === 'user' 
                        ? "bg-gradient-to-br from-[#1B365D] to-[#254B82] text-white rounded-tr-none font-medium border border-[#1B365D]/20 shadow-[0_4px_15px_rgba(27,54,93,0.15)]" 
                        : "bg-white dark:bg-slate-800 border border-gray-100/90 dark:border-slate-700/80 text-gray-800 dark:text-slate-100 rounded-tl-none prose prose-sm dark:prose-invert prose-p:my-1.5 prose-headings:text-primary-navy dark:prose-headings:text-primary-gold prose-strong:text-[#C41230] prose-ul:my-1.5 prose-li:my-1"
                    )}>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {msg.attachments.map((att, i) => (
                            <div key={i} className="relative group/att">
                              {att.mimeType.startsWith('image/') ? (
                                <img src={att.data} alt={att.name} className="h-16 w-16 object-cover rounded-xl border border-white/20 shadow-md" />
                              ) : (
                                <div className="h-16 w-16 flex flex-col items-center justify-center bg-white/10 rounded-xl border border-white/20 p-2 shadow-md">
                                  <FileText className="h-6 w-6 mb-1 text-white" />
                                  <span className="text-[7px] truncate w-full text-center text-white/95">{att.name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 px-2.5 opacity-0 group-hover:opacity-40 transition-opacity duration-200">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {msg.role === 'user' ? 'Scholar' : 'HR Advisor'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 items-start max-w-[95%] w-full mr-auto justify-start">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#1B365D] via-[#214373] to-[#A30F27] flex items-center justify-center flex-shrink-0 border border-white/20 self-start mt-1 text-white shadow-[0_4px_10px_rgba(27,54,93,0.15)]">
                    <Bot className="h-4.5 w-4.5 text-[#FFB81C]" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-gray-100/90 dark:border-slate-700/80 p-4 rounded-2xl rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ scale: [0.93, 1.15, 0.93] }} transition={{ repeat: Infinity, duration: 1 }} className="h-1.5 w-1.5 bg-[#1B365D] rounded-full" />
                      <motion.div animate={{ scale: [0.93, 1.15, 0.93] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="h-1.5 w-1.5 bg-[#FFB81C] rounded-full" />
                      <motion.div animate={{ scale: [0.93, 1.15, 0.93] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="h-1.5 w-1.5 bg-[#A30F27] rounded-full" />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">Analyzing...</span>
                  </div>
                </div>
              )}

              {/* Suggestions Chips */}
              {!isLoading && messages.length <= 2 && (
                <div className="py-2 flex flex-col gap-2 relative">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#1B365D]/60 dark:text-slate-400 px-1 mb-1">Suggested Inquiries</div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SUGGESTIONS.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(s.query)}
                        className="px-4 py-2 bg-white/90 dark:bg-slate-800 backdrop-blur-sm border border-gray-200/80 dark:border-slate-700 rounded-xl text-xs font-semibold text-gray-700 dark:text-slate-200 hover:border-[#1B365D] dark:hover:border-primary-gold hover:text-[#1B365D] dark:hover:text-primary-gold hover:bg-[#1B365D]/5 dark:hover:bg-slate-700/50 transition-all duration-250 flex items-center gap-2 group shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(27,54,93,0.1)] hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <Sparkles className="h-3 w-3 text-[#FFB81C] group-hover:scale-110" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="p-5 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shrink-0 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.05)]"
            >
              {/* Attachment Preview */}
              {selectedAttachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3.5 p-2 bg-gray-50/60 rounded-xl border border-dashed border-gray-200">
                  {selectedAttachments.map((att, i) => (
                    <div key={i} className="relative group/preview">
                      {att.mimeType.startsWith('image/') ? (
                        <img src={att.data} alt={att.name} className="h-12 w-12 object-cover rounded-lg shadow-sm" />
                      ) : (
                        <div className="h-12 w-12 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-100 shadow-sm p-1">
                          <FileText className="h-5 w-5 text-[#1B365D]" />
                          <span className="text-[6px] truncate w-full text-center text-gray-500">{att.name}</span>
                        </div>
                      )}
                      <button 
                        type="button"
                        onClick={() => removeAttachment(i)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 shadow-md opacity-100 sm:opacity-0 group-hover/preview:opacity-100 transition-opacity"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-12 w-12 flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 text-gray-400 hover:text-primary-navy hover:bg-gray-100/50 transition-all"
                  >
                    <Paperclip className="h-4.5 w-4.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  multiple 
                  className="hidden" 
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                
                <div className="relative flex-1">
                  <input 
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={selectedAttachments.length > 0 ? "Add a descriptive caption..." : "Consult academic assistant..."}
                    className="w-full pl-5 pr-12 py-3.5 rounded-full bg-gray-50 dark:bg-slate-800 hover:bg-gray-50/40 dark:hover:bg-slate-755 border border-gray-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-[#1B365D]/30 dark:focus:border-primary-gold/40 focus:ring-4 focus:ring-[#1B365D]/5 dark:focus:ring-primary-gold/5 text-[13px] font-medium dark:text-slate-100 transition-all outline-none"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-primary-navy"
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={(!inputText.trim() && selectedAttachments.length === 0) || isLoading}
                  className="h-11 w-11 bg-gradient-to-tr from-[#1B365D] to-[#254B82] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#1B365D]/15 disabled:opacity-25 hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[8px] text-center mt-3 text-gray-400 font-extrabold uppercase tracking-[0.25em]">
                Faculty of Management & Finance • Ruhuna
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-16 w-16 rounded-[20px] flex items-center justify-center shadow-[0_15px_35px_-5px_rgba(27,54,93,0.3)] transition-all duration-500 overflow-hidden relative group border border-white/10",
          isOpen 
            ? "bg-white dark:bg-slate-900 text-[#1B365D] dark:text-[#FFB81C]" 
            : "bg-gradient-to-br from-[#1B365D] via-[#214373] to-[#A30F27] text-white"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5 animate-in spin-in-45 duration-200" />
        ) : (
          <div className="relative flex items-center justify-center h-full w-full">
            <Bot className="h-7 w-7 text-[#FFB81C] animate-pulse relative z-10" />
            <div className="absolute inset-x-0 bottom-0 top-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-md rounded-full" />
            {/* Ambient online dot */}
            <span className="absolute bottom-3 right-3 h-3.5 w-3.5 bg-emerald-500 border-2 border-[#214373] rounded-full shadow-md shadow-emerald-500/35 z-20" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
