import React, { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CountdownTime } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface CountdownViewProps {
  timeLeft: CountdownTime;
  onSimulateReveal?: () => void;
}

const DigitBox = memo(({ value, label }: { value: number; label: string }) => {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      {/* Futuristic Glass Container */}
      <div 
        id={`countdown-box-${label.toLowerCase()}`}
        className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 rounded-2xl sm:rounded-3xl glass-cyber border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.6)] group transition-transform duration-300 hover:scale-105"
      >
        {/* Subtle holographic top-light reflection */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

        {/* Ambient inner neon glow */}
        <div className="absolute inset-0 bg-radial from-white/[0.04] to-transparent pointer-events-none" />

        {/* Center line divider like digital split-flap */}
        <div className="absolute inset-x-2 top-1/2 h-[1px] bg-white/[0.08] z-10" />

        {/* Animate ONLY changing digits */}
        <div className="relative z-20 flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={formattedValue}
              initial={{ y: 24, opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ y: -24, opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
                mass: 0.8,
              }}
              className="font-mono text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(236,72,153,0.35)]"
            >
              {formattedValue}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Corner cyber brackets */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-cyan-400/40" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-pink-400/40" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-pink-400/40" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-cyan-400/40" />
      </div>

      {/* Label */}
      <span className="mt-3 text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-white/50 uppercase font-outfit">
        {label}
      </span>
    </div>
  );
});

DigitBox.displayName = 'DigitBox';

export const CountdownView: React.FC<CountdownViewProps> = ({ timeLeft, onSimulateReveal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 py-8 sm:py-12"
    >
      {/* Top Header / Portal Emblem */}
      <div className="w-full flex flex-col items-center text-center pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-pink-500/20 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span className="text-[11px] tracking-[0.35em] text-pink-300 font-medium uppercase font-outfit">
            CHRONO PORTAL · 19 SEPT 2026
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </motion.div>

        {/* FOR SUMI */}
        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-sm sm:text-base md:text-lg text-pink-300/80 font-light tracking-[0.45em] uppercase font-outfit"
        >
          FOR SUMI
        </motion.h2>

        {/* 21 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, type: 'spring', stiffness: 120 }}
          className="relative my-2 sm:my-3"
        >
          <h1 className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-cyan-300 text-glow-pink font-cinzel leading-none select-none">
            21
          </h1>
          <div className="absolute inset-0 bg-radial from-pink-500/20 via-transparent to-transparent blur-2xl pointer-events-none" />
        </motion.div>

        {/* HER SPECIAL DAY IS IN */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs sm:text-sm tracking-[0.35em] text-cyan-300/80 font-medium uppercase font-outfit mt-1"
        >
          HER SPECIAL DAY IS IN
        </motion.p>
      </div>

      {/* Center Countdown Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="my-auto py-8 sm:py-12 w-full max-w-4xl flex flex-col items-center"
      >
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-8 flex-wrap">
          <DigitBox value={timeLeft.days} label="DAYS" />
          <span className="hidden sm:inline-block text-2xl sm:text-4xl text-white/30 font-mono -mt-6">:</span>
          <DigitBox value={timeLeft.hours} label="HOURS" />
          <span className="hidden sm:inline-block text-2xl sm:text-4xl text-white/30 font-mono -mt-6">:</span>
          <DigitBox value={timeLeft.minutes} label="MINUTES" />
          <span className="hidden sm:inline-block text-2xl sm:text-4xl text-white/30 font-mono -mt-6">:</span>
          <DigitBox value={timeLeft.seconds} label="SECONDS" />
        </div>

        {/* Futuristic Glyphs */}
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center justify-center gap-3 text-pink-400/60 text-xs sm:text-sm tracking-[0.5em] mt-10"
        >
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
        </motion.div>

        {/* Anticipation Message */}
        <motion.p
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-6 text-center text-sm sm:text-base text-cyan-200/70 font-light tracking-[0.2em] max-w-md px-4"
        >
          "Something beautiful is almost here..."
        </motion.p>
      </motion.div>

      {/* Minimalistic Footer with Simulation Control */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between text-center gap-3 text-white/40 text-[11px] tracking-wider font-light max-w-5xl px-4 pt-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white/60">Target: 19 Sept 2026, 00:00:00 IST</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-pink-300/50 flex items-center gap-1">
            <Heart className="w-3 h-3 fill-pink-500/50 text-pink-400" /> Made for Sumi
          </span>
          {onSimulateReveal && (
            <button
              id="simulate-reveal-btn"
              onClick={onSimulateReveal}
              className="px-3 py-1 rounded-full text-[10px] tracking-wider bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Preview the exact moment the countdown reaches zero"
            >
              Simulate 00:00 Reveal ✨
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
