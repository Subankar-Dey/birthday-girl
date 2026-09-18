import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowDown, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterMemories: () => void;
  onMakeWish: () => void;
  wishMade: boolean;
}

export const BirthdayPopup: React.FC<BirthdayPopupProps> = ({
  isOpen,
  onClose,
  onEnterMemories,
  onMakeWish,
  wishMade,
}) => {
  if (!isOpen) return null;

  const handleWish = () => {
    onMakeWish();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#f43f5e', '#a855f7', '#38bdf8', '#fbbf24'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dim backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity cursor-pointer"
      />

      {/* Holographic Popup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className="relative z-10 w-full max-w-xl glass-modal rounded-3xl p-6 sm:p-10 border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.35),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto"
      >
        {/* Top glowing ambient line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-pink-500" />

        {/* Ambient background glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="close-birthday-popup-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close message"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-[11px] tracking-[0.35em] text-pink-300 font-semibold uppercase font-outfit">
            A VERY SPECIAL MESSAGE
          </span>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-4xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-cyan-200 tracking-tight leading-tight">
            HAPPY 21ST BIRTHDAY
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-3xl sm:text-5xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 text-glow-pink">
              SUMI
            </span>
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Heartfelt Birthday Message Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-slate-200/90 font-light leading-relaxed text-center px-1 sm:px-4">
          <p className="tracking-wide">
            May your special day be filled with happiness, beautiful moments, sweet surprises, and lots of smiles.
          </p>
          <p className="text-pink-200 font-normal tracking-wide text-glow-white">
            You are the most wonderful girl I have ever seen.
          </p>
          <p className="tracking-wide text-slate-300">
            May this new chapter of your life bring you success, joy, beautiful memories, and everything your heart wishes for.
          </p>
          <p className="text-cyan-200 tracking-wide font-medium">
            Keep smiling, keep shining, and have the happiest birthday ever.
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 my-6 text-pink-400/50 text-xs">
          <span>✧</span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
          <Heart className="w-3.5 h-3.5 fill-pink-400/50" />
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent" />
          <span>✧</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          {!wishMade ? (
            <button
              id="popup-make-wish-btn"
              onClick={handleWish}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-[0.2em] bg-white/10 hover:bg-white/15 text-pink-200 border border-pink-400/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-outfit"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              MAKE A WISH ✨
            </button>
          ) : (
            <div className="px-4 py-2 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 flex items-center gap-1.5 font-outfit">
              <Sparkles className="w-3.5 h-3.5" />
              WISH MADE ✨
            </div>
          )}

          <button
            id="enter-the-memories-btn"
            onClick={onEnterMemories}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.25em] bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-outfit"
          >
            <span>ENTER THE MEMORIES</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
