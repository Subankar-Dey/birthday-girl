import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface CinematicRevealTransitionProps {
  onComplete: () => void;
}

export const CinematicRevealTransition: React.FC<CinematicRevealTransitionProps> = ({ onComplete }) => {
  useEffect(() => {
    // 1. Initial screen darkening is handled by motion backdrop
    // 2. Burst confetti at peak light explosion
    const t1 = setTimeout(() => {
      // Light burst explosion + celebration colors
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#ec4899', '#38bdf8', '#a855f7', '#ffffff', '#fbbf24'],
        scalar: 1.2,
      });
    }, 1200);

    const t2 = setTimeout(() => {
      // Soft secondary heart / star confetti drift
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { y: 0.4 },
        colors: ['#f472b6', '#c084fc', '#67e8f9'],
        ticks: 250,
        gravity: 0.7,
      });
    }, 2000);

    const tEnd = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tEnd);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* 1. Screen briefly darkens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95, 0.1, 0] }}
        transition={{ duration: 2.8, times: [0, 0.25, 0.8, 1], ease: 'easeInOut' }}
        className="absolute inset-0 bg-black"
      />

      {/* 2. Large central light burst */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.2, 45],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.6,
          delay: 0.8,
          times: [0, 0.4, 0.85, 1],
          ease: 'easeInOut',
        }}
        className="w-16 h-16 rounded-full bg-white shadow-[0_0_120px_60px_rgba(255,255,255,1),0_0_200px_100px_rgba(236,72,153,0.9),0_0_300px_150px_rgba(6,182,212,0.8)]"
      />

      {/* 3. Glowing 21 appearance during reveal */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0, filter: 'blur(20px)' }}
        animate={{ scale: [0.4, 1.2, 1], opacity: [0, 1, 0], filter: ['blur(20px)', 'blur(0px)', 'blur(10px)'] }}
        transition={{ duration: 2.2, delay: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="text-8xl sm:text-[10rem] font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-cyan-300 drop-shadow-[0_0_50px_rgba(236,72,153,0.9)]">
          21
        </span>
        <span className="text-sm tracking-[0.5em] text-pink-300 uppercase font-outfit mt-4">
          WELCOME TO 21, SUMI
        </span>
      </motion.div>
    </div>
  );
};
