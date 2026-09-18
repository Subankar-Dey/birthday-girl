import React from 'react';
import { motion } from 'motion/react';
import { UNTIL_WE_MEET_CARD } from '../data/birthdayData';
import { Heart, Compass, Sparkles } from 'lucide-react';

export const UntilWeMeetCard: React.FC = () => {
  return (
    <motion.div
      id="until-we-meet-card"
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-4xl mx-auto my-16 sm:my-24 rounded-3xl p-8 sm:p-14 glass-modal border border-pink-500/30 shadow-[0_0_60px_rgba(236,72,153,0.25),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-center"
    >
      {/* Ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      {/* Top Animated Pulse Line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" />

      {/* Distance & Compass Icon Emblem */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full glass-cyber border border-pink-400/40 flex items-center justify-center text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
          <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '24s' }} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl sm:text-4xl md:text-5xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-cyan-200 tracking-wider">
        {UNTIL_WE_MEET_CARD.title}
      </h3>

      <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.4em] text-pink-400/80 uppercase font-outfit mt-2 mb-8">
        ACROSS CITIES · ONE CONSTANT HEARTBEAT
      </span>

      {/* Heartfelt Poetry Text */}
      <div className="max-w-2xl mx-auto text-base sm:text-xl md:text-2xl text-slate-100 font-light leading-relaxed sm:leading-loose whitespace-pre-line text-glow-white px-2">
        {UNTIL_WE_MEET_CARD.text}
      </div>

      {/* Bottom Subtle Signature */}
      <div className="mt-10 flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-300/70 font-outfit tracking-widest">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <span>Subho & Sumi · From Andaman to Tomorrow</span>
        <Sparkles className="w-4 h-4 text-pink-400" />
      </div>
    </motion.div>
  );
};
