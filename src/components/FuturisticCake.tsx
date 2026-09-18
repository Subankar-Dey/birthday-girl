import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

interface FuturisticCakeProps {
  onWishMade?: () => void;
  wishMade?: boolean;
}

export const FuturisticCake: React.FC<FuturisticCakeProps> = ({ onWishMade, wishMade = false }) => {
  const [internalWishMade, setInternalWishMade] = useState(wishMade);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Smooth mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-200, 200], [12, -12]);
  const rotateY = useTransform(smoothX, [-200, 200], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const triggerCakeBurst = () => {
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ec4899', '#38bdf8', '#c084fc', '#ffffff'],
      scalar: 0.9,
    });
  };

  const handleMakeWish = () => {
    setInternalWishMade(true);
    if (onWishMade) onWishMade();

    // Large celebration burst with hearts and stars
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#a855f7', '#38bdf8', '#fbbf24'],
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 75,
        origin: { x: 0 },
        colors: ['#ec4899', '#c084fc'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 75,
        origin: { x: 1 },
        colors: ['#38bdf8', '#ec4899'],
      });
    }, 400);
  };

  // 21 Candles arranged in circular distribution on the tiers
  const totalCandles = 21;

  return (
    <div className="flex flex-col items-center justify-center select-none py-6">
      {/* 3D Cake Interactive Stage */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={triggerCakeBurst}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 40, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-80 sm:w-96 h-[420px] flex flex-col items-center justify-end cursor-pointer group"
      >
        {/* Floating Holographic "21" Orb Above Cake */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
            rotateZ: [-1, 1, -1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 z-40 flex flex-col items-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Halo Glow */}
            <div className="absolute w-28 h-28 rounded-full bg-pink-500/20 blur-xl animate-pulse" />
            <div className="absolute w-20 h-20 rounded-full border border-cyan-400/40 animate-spin" style={{ animationDuration: '12s' }} />
            
            <span className="relative z-10 text-5xl sm:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-200 to-cyan-300 text-glow-pink">
              21
            </span>
          </div>
          <span className="text-[10px] tracking-[0.4em] font-semibold text-cyan-300/80 uppercase font-outfit mt-1">
            SUMI'S GOLDEN YEAR
          </span>
        </motion.div>

        {/* Floating Candle Flames Row on Top Tier (21 Candles representation) */}
        <div className="absolute top-[130px] z-30 flex items-center justify-center gap-1.5 sm:gap-2 px-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={`c-top-${i}`} className="relative flex flex-col items-center">
              {/* Flame */}
              <motion.div
                animate={{
                  scale: internalWishMade ? [1.2, 1.8, 1.3] : [0.9, 1.25, 0.95],
                  opacity: [0.8, 1, 0.85],
                  y: [-1, 2, -1],
                }}
                transition={{
                  duration: 0.6 + (i % 4) * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2.5 h-4 sm:w-3 sm:h-5 rounded-full bg-gradient-to-t from-pink-500 via-amber-300 to-cyan-200 blur-[1px] shadow-[0_0_12px_rgba(236,72,153,0.8),0_0_20px_rgba(6,182,212,0.6)]"
              />
              {/* Wick & Candle Stem */}
              <div className="w-1 h-1 bg-white/80 rounded-full" />
              <div className="w-1.5 h-7 sm:h-9 bg-gradient-to-b from-white/90 via-pink-300/60 to-purple-500/80 rounded-t-sm shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
            </div>
          ))}
        </div>

        {/* Second Ring of Candles on Middle Tier */}
        <div className="absolute top-[195px] z-25 flex items-center justify-between w-[240px] px-3 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`c-mid-${i}`} className="relative flex flex-col items-center opacity-90">
              <motion.div
                animate={{
                  scale: internalWishMade ? [1.1, 1.5, 1.2] : [0.85, 1.15, 0.9],
                  opacity: [0.7, 0.95, 0.75],
                }}
                transition={{
                  duration: 0.5 + (i % 3) * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2 h-3.5 rounded-full bg-gradient-to-t from-cyan-400 via-pink-300 to-white blur-[1px] shadow-[0_0_10px_rgba(34,211,238,0.7)]"
              />
              <div className="w-1 h-5 bg-gradient-to-b from-white/80 to-cyan-500/70 rounded-t-sm" />
            </div>
          ))}
        </div>

        {/* 3-TIER HOLOGRAPHIC CYBER CAKE */}
        <div className="relative z-20 flex flex-col items-center w-full mb-8">
          {/* Top Tier */}
          <div className="relative w-44 sm:w-52 h-18 rounded-[50%] border-2 border-pink-400/80 bg-gradient-to-b from-purple-950/80 to-black/90 backdrop-blur-md shadow-[0_0_25px_rgba(236,72,153,0.5)_inset,0_0_25px_rgba(236,72,153,0.4)] flex items-center justify-center overflow-hidden -mb-7 z-30">
            <div className="absolute inset-0 bg-radial from-pink-400/20 via-transparent to-transparent" />
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent absolute top-1/2" />
            {/* Neon Frosting Accent */}
            <div className="text-[9px] font-mono tracking-[0.25em] text-pink-300/70">
              ✦ 21 ✦
            </div>
          </div>

          {/* Middle Tier */}
          <div className="relative w-60 sm:w-72 h-24 rounded-[50%] border-2 border-purple-400/80 bg-gradient-to-b from-purple-900/60 to-black/90 backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.5)_inset,0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden -mb-10 z-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
            <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent absolute top-1/2" />
            {/* Futuristic Rune Lines */}
            <div className="absolute inset-x-8 top-3 flex justify-between text-[8px] font-mono text-cyan-300/40">
              <span>◆ SUMI</span>
              <span>19·09·2026</span>
              <span>FOREVER ◆</span>
            </div>
          </div>

          {/* Base Tier */}
          <div className="relative w-76 sm:w-88 h-28 rounded-[50%] border-2 border-cyan-400/80 bg-gradient-to-b from-cyan-950/60 to-black/95 backdrop-blur-md shadow-[0_0_45px_rgba(6,182,212,0.5)_inset,0_0_35px_rgba(6,182,212,0.4)] flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 bg-radial from-cyan-500/20 via-pink-500/10 to-transparent" />
            <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-1/2" />
            
            {/* Ambient cyber grid rings */}
            <div className="absolute inset-4 rounded-[50%] border border-white/10" />
            <div className="absolute inset-8 rounded-[50%] border border-pink-400/20" />
          </div>
        </div>

        {/* Dark Glass Base Platform (Pedestal) */}
        <div className="absolute bottom-0 w-84 sm:w-96 h-12 rounded-[50%] bg-gradient-to-b from-white/10 via-black/80 to-black border-2 border-white/15 shadow-[0_0_50px_rgba(236,72,153,0.3)] flex items-center justify-center">
          <div className="w-full h-full rounded-[50%] bg-cyan-500/10 blur-md" />
        </div>

        {/* Floating Sparks Upward */}
        <motion.div
          animate={{ y: [-15, -45], opacity: [0, 0.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute left-1/4 top-1/3 w-1.5 h-1.5 rounded-full bg-cyan-300 blur-[0.5px]"
        />
        <motion.div
          animate={{ y: [-10, -50], opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: 0.8, ease: 'easeOut' }}
          className="absolute right-1/4 top-1/4 w-2 h-2 rounded-full bg-pink-400 blur-[0.5px]"
        />
      </motion.div>

      {/* Interactive Make a Wish Action Bar */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <motion.button
          id="cake-make-a-wish-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMakeWish}
          className={`relative px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase font-outfit transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
            internalWishMade
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
              : 'bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]'
          }`}
        >
          {internalWishMade ? (
            <>
              <Heart className="w-4 h-4 fill-emerald-300 text-emerald-300" />
              <span>WISH MADE ✨</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>MAKE A WISH ✨</span>
            </>
          )}
        </motion.button>
        <span className="text-[11px] text-white/40 tracking-wider font-light">
          Tap the cake or button to ignite celebration particles
        </span>
      </div>
    </div>
  );
};
