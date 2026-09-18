import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SHAYARIS } from '../data/birthdayData';
import { Heart, Sparkles, Languages, Copy, Check } from 'lucide-react';

export const ShayariSection: React.FC = () => {
  const [showTranslations, setShowTranslations] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="shayari-section" className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-900/10 via-purple-900/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-pink-500/30 text-pink-300 text-xs tracking-[0.3em] font-semibold uppercase font-outfit mb-4"
        >
          <Heart className="w-3.5 h-3.5 fill-pink-500/50 text-pink-400" />
          <span>ECHOES OF THE HEART</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500/50 text-pink-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-cyan-200 tracking-tight leading-tight"
        >
          DOORI SIRF JAGAHON KI HAI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-300/80 font-light tracking-wide max-w-xl mx-auto"
        >
          "Distance separates places, not hearts."
        </motion.p>

        {/* Translation Toggle */}
        <div className="mt-6 flex justify-center">
          <button
            id="toggle-shayari-translations-btn"
            onClick={() => setShowTranslations(!showTranslations)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-white/15 text-xs text-white/70 hover:text-white hover:border-pink-500/40 transition-all cursor-pointer font-outfit"
          >
            <Languages className="w-3.5 h-3.5 text-pink-400" />
            <span>{showTranslations ? 'Hide English Meaning' : 'Show English Translation'}</span>
          </button>
        </div>
      </div>

      {/* Grid of 8 Shayari Verses */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {SHAYARIS.map((item, idx) => {
          const isBirthdaySpecial = item.id === 8;
          return (
            <motion.div
              key={item.id}
              id={`shayari-card-${item.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (idx % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`relative rounded-3xl p-7 sm:p-9 glass-cyber-card border transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
                isBirthdaySpecial
                  ? 'border-pink-500/60 shadow-[0_0_35px_rgba(236,72,153,0.3)] bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-black/80 md:col-span-2'
                  : 'border-white/10 hover:border-pink-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-pink-400">VERSE 0{item.id}</span>
                  {isBirthdaySpecial && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-semibold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      BIRTHDAY SPECIAL DUA
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleCopy(item.id, item.hindi)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Copy verse"
                  aria-label="Copy verse"
                >
                  {copiedId === item.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Hindi Poetry Text */}
              <div className="text-lg sm:text-xl md:text-2xl text-slate-100 font-light leading-relaxed sm:leading-loose whitespace-pre-line text-glow-white font-serif tracking-wide">
                {item.hindi}
              </div>

              {/* English Translation (Optional Accordion/Toggle) */}
              {showTranslations && item.translation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-5 pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-cyan-200/80 font-light italic leading-relaxed"
                >
                  {item.translation}
                </motion.div>
              )}

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/40 font-outfit">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>{isBirthdaySpecial ? "For Sumi's 21st" : "Written with love"}</span>
                </span>
                <span className="text-pink-400/60 font-serif">dil se...</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
