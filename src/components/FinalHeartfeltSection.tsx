import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FINAL_SHAYARI_CARD } from '../data/birthdayData';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const FinalHeartfeltSection: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [heartCount, setHeartCount] = useState(0);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 60,
      y: rect.top,
      size: Math.random() * 20 + 20,
    };

    setHearts((prev) => [...prev.slice(-15), newHeart]);
    setHeartCount((c) => c + 1);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#ec4899', '#f43f5e', '#a855f7'],
      scalar: 1,
    });
  };

  return (
    <section id="final-heartfelt-section" className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">
      {/* Floating interactive hearts */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, y: h.y, x: h.x, scale: 0.5 }}
              animate={{ opacity: 0, y: h.y - 300, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
              className="absolute text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
            >
              <Heart className="w-8 h-8 fill-pink-500 text-pink-400" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HUGE FINAL CARD: ONE LAST SHAYARI */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-8 sm:p-14 md:p-16 glass-modal border border-pink-500/40 shadow-[0_0_80px_rgba(236,72,153,0.3),0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* Ambient Top Glow Line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 via-cyan-400 to-transparent animate-pulse" />

        {/* Heading */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-pink-500/30 text-pink-300 text-xs tracking-[0.3em] font-semibold uppercase font-outfit mb-6">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>{FINAL_SHAYARI_CARD.heading}</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        </div>

        {/* Poetry Content */}
        <div className="max-w-2xl mx-auto text-xl sm:text-2xl md:text-3xl text-slate-100 font-light leading-relaxed sm:leading-loose whitespace-pre-line text-glow-white font-serif">
          {FINAL_SHAYARI_CARD.text}
        </div>

        {/* Subheading: UNTIL THE NEXT MEMORY */}
        <div className="mt-10 mb-8">
          <span className="text-xs sm:text-sm tracking-[0.4em] font-semibold text-cyan-300 uppercase font-outfit">
            {FINAL_SHAYARI_CARD.subheading}
          </span>
        </div>

        {/* Interactive Glowing Heart */}
        <div className="flex flex-col items-center justify-center gap-3">
          <motion.button
            id="interactive-final-heart-btn"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
            className="relative p-5 rounded-full glass-cyber border border-pink-500/60 shadow-[0_0_35px_rgba(236,72,153,0.6)] cursor-pointer group hover:border-pink-400"
            aria-label="Send a heartbeat to Sumi"
          >
            <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-md group-hover:bg-pink-500/40 transition-colors animate-ping" style={{ animationDuration: '3s' }} />
            <Heart className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 text-pink-400 fill-pink-500 group-hover:text-pink-300 transition-transform" />
          </motion.button>
          
          <span className="text-[11px] sm:text-xs text-pink-300/60 font-outfit tracking-widest">
            {heartCount > 0 ? `${heartCount} Heartbeats Sent to Her ❤️` : 'Tap the heart to send love across the distance'}
          </span>
        </div>
      </motion.div>

      {/* GRAND ENDING VISUAL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="mt-28 sm:mt-36 flex flex-col items-center justify-center select-none"
      >
        <span className="text-xs sm:text-sm tracking-[0.5em] text-cyan-300/70 uppercase font-outfit mb-3">
          FOREVER & ALWAYS
        </span>

        <h3 className="text-3xl sm:text-5xl md:text-7xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-cyan-300 tracking-tight text-glow-pink">
          HAPPY 21ST BIRTHDAY
        </h3>

        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-cinzel text-pink-400 text-glow-pink mt-1">
          SUMI
        </h2>

        {/* 21 Number Display */}
        <div className="text-6xl sm:text-8xl md:text-9xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-500/40 my-2">
          21
        </div>

        {/* Glowing Heart Icon */}
        <div className="flex items-center gap-3 text-pink-500 mt-2">
          <span className="text-lg">✦</span>
          <Heart className="w-8 h-8 fill-pink-500 text-pink-400 animate-pulse" />
          <span className="text-lg">✦</span>
        </div>

        {/* Subtle Signature */}
        <p className="mt-12 text-xs text-white/30 tracking-[0.25em] uppercase font-outfit">
          Crafted with all my heart for your special day · 19 September 2026
        </p>
      </motion.div>
    </section>
  );
};
