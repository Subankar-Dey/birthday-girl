import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BirthdayPhase, CountdownTime } from './types';
import { BIRTHDAY_TARGET_ISO, BIRTHDAY_GIRL_NAME } from './data/birthdayData';
import { ParticleBackground } from './components/ParticleBackground';
import { CountdownView } from './components/CountdownView';
import { CinematicRevealTransition } from './components/CinematicRevealTransition';
import { FuturisticCake } from './components/FuturisticCake';
import { BirthdayPopup } from './components/BirthdayPopup';
import { HandwrittenNoteSection } from './components/HandwrittenNoteSection';
import { PhotoMemorySection } from './components/PhotoMemorySection';
import { ShayariSection } from './components/ShayariSection';
import { FinalHeartfeltSection } from './components/FinalHeartfeltSection';
import { ambientAudio } from './utils/ambientAudio';
import { Volume2, VolumeX, Sparkles, Eye, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const targetDate = new Date(BIRTHDAY_TARGET_ISO).getTime();

  // Helper to compute time left
  const calculateTimeLeft = useCallback((): CountdownTime => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isOver: true,
        totalMilliseconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      isOver: false,
      totalMilliseconds: difference,
    };
  }, [targetDate]);

  // Determine initial state: if already past target date, open directly in celebration
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);
  const [phase, setPhase] = useState<BirthdayPhase>(() => {
    const initialTime = calculateTimeLeft();
    return initialTime.isOver ? 'BIRTHDAY_EXPERIENCE' : 'BEFORE_BIRTHDAY';
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [customPhotoMap, setCustomPhotoMap] = useState<Record<string, string>>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Load any user-saved photos from localStorage
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('sumi_photos_cache');
      if (savedPhotos) {
        setCustomPhotoMap(JSON.parse(savedPhotos));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handlePhotoUpload = (photoKey: string, dataUrl: string) => {
    setCustomPhotoMap((prev) => {
      const next = { ...prev, [photoKey]: dataUrl };
      try {
        localStorage.setItem('sumi_photos_cache', JSON.stringify(next));
      } catch {
        // storage quota fallback
      }
      return next;
    });
  };

  // Real-time countdown timer loop
  useEffect(() => {
    if (phase !== 'BEFORE_BIRTHDAY') return;

    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      // Trigger transition sequence when reaching zero
      if (newTime.isOver) {
        clearInterval(interval);
        setPhase('CELEBRATION_TRIGGER');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, calculateTimeLeft]);

  // Listen to scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handler to manually simulate countdown reaching 00:00:00
  const handleSimulateReveal = () => {
    ambientAudio.playCelebrationMelody();
    setPhase('CELEBRATION_TRIGGER');
  };

  // Called when cinematic transition completes
  const handleTransitionComplete = () => {
    setPhase('BIRTHDAY_REVEAL');
    setIsPopupOpen(true);
    // Large confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#38bdf8', '#c084fc', '#ffffff'],
    });
  };

  // Direct switch to celebration experience
  const handleEnterCelebrationMode = () => {
    setPhase('BIRTHDAY_EXPERIENCE');
    setIsPopupOpen(true);
  };

  // Switch back to countdown portal (for testing)
  const handleBackToCountdown = () => {
    setPhase('BEFORE_BIRTHDAY');
    setIsPopupOpen(false);
  };

  const handleEnterMemories = () => {
    setIsPopupOpen(false);
    setPhase('BIRTHDAY_EXPERIENCE');
    // Smooth scroll down to the handwritten note & audio section
    setTimeout(() => {
      const el = document.getElementById('handwritten-note-section') || document.getElementById('photo-memory-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 250);
  };

  const toggleAudio = () => {
    const active = ambientAudio.toggle();
    setIsAudioActive(active);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#040207] text-white selection:bg-pink-500/30 selection:text-white">
      {/* Dynamic Cosmic Background */}
      <ParticleBackground />

      {/* Floating Ambient Controls (Top Header Bar) */}
      <header className="fixed top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-none max-w-7xl mx-auto">
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full glass-cyber border border-white/10 flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-xs font-cinzel font-bold tracking-widest text-pink-200">
              FOR SUMI
            </span>
          </div>
        </div>

        {/* Right Tools: Audio & Mode Toggle */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Ambient Music Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={toggleAudio}
            className={`p-2.5 rounded-full glass-cyber border transition-all hover:scale-105 cursor-pointer backdrop-blur-md ${
              isAudioActive
                ? 'border-pink-500 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                : 'border-white/10 text-white/50 hover:text-white'
            }`}
            title={isAudioActive ? 'Mute celestial ambience' : 'Enable celestial ambience'}
            aria-label="Toggle celestial audio"
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Test / Mode Switcher Badge */}
          <div className="flex items-center rounded-full glass-cyber border border-white/10 p-0.5 backdrop-blur-md">
            <button
              id="mode-countdown-btn"
              onClick={handleBackToCountdown}
              className={`px-3 py-1 rounded-full text-[10px] tracking-wider font-semibold font-outfit transition-all cursor-pointer ${
                phase === 'BEFORE_BIRTHDAY'
                  ? 'bg-pink-500/30 text-pink-200 border border-pink-400/40 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Countdown
            </button>
            <button
              id="mode-celebration-btn"
              onClick={handleEnterCelebrationMode}
              className={`px-3 py-1 rounded-full text-[10px] tracking-wider font-semibold font-outfit transition-all cursor-pointer ${
                phase !== 'BEFORE_BIRTHDAY'
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Celebration ✨
            </button>
          </div>
        </div>
      </header>

      {/* STATE 1 — BEFORE THE BIRTHDAY: Futuristic Countdown Experience */}
      <AnimatePresence mode="wait">
        {phase === 'BEFORE_BIRTHDAY' && (
          <CountdownView
            key="countdown-portal"
            timeLeft={timeLeft}
            onSimulateReveal={handleSimulateReveal}
          />
        )}

        {/* EXACT MOMENT: Cinematic Transition Sequence */}
        {phase === 'CELEBRATION_TRIGGER' && (
          <CinematicRevealTransition
            key="cinematic-transition"
            onComplete={handleTransitionComplete}
          />
        )}

        {/* STATE 2 — AFTER THE BIRTHDAY: Complete Celebration Experience */}
        {(phase === 'BIRTHDAY_REVEAL' || phase === 'BIRTHDAY_EXPERIENCE') && (
          <motion.main
            key="birthday-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 flex flex-col items-center pt-24 sm:pt-32"
          >
            {/* HERO SECTION: Futuristic Birthday Cake & 21st Celebration */}
            <section id="hero-celebration" className="w-full max-w-5xl px-4 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full glass-cyber border border-pink-500/40 text-pink-300 text-xs tracking-[0.35em] font-semibold uppercase font-outfit mb-4"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>OFFICIALLY 21 · 19 SEPT 2026</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-cyan-300 tracking-tight leading-none text-glow-pink"
              >
                HAPPY 21ST BIRTHDAY
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black font-cinzel text-pink-400 text-glow-pink mt-2"
              >
                {BIRTHDAY_GIRL_NAME} ❤️
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 text-sm sm:text-base text-cyan-200/80 font-light tracking-[0.25em] uppercase font-outfit"
              >
                "You are the most wonderful girl I have ever seen."
              </motion.p>

              {/* View Special Wish Button */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  id="reopen-birthday-popup-btn"
                  onClick={() => setIsPopupOpen(true)}
                  className="text-xs text-pink-300/80 hover:text-pink-200 underline underline-offset-4 tracking-wider flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Read Sumi's Birthday Card
                </button>
              </div>

              {/* THE 3D FUTURISTIC NEON CAKE */}
              <div className="w-full mt-4">
                <FuturisticCake
                  wishMade={wishMade}
                  onWishMade={() => setWishMade(true)}
                />
              </div>
            </section>

            {/* HANDWRITTEN NOTE & VOICE NOTE (BEFORE THE PHOTOS) */}
            <HandwrittenNoteSection />

            {/* THE 9-PHOTO MEMORY EXPERIENCE */}
            <PhotoMemorySection
              customPhotoMap={customPhotoMap}
              onPhotoUpload={handlePhotoUpload}
            />

            {/* DEDICATED SHAYARI SECTION: DOORI SIRF JAGAHON KI HAI */}
            <ShayariSection />

            {/* FINAL HEARTFELT SECTION & CLOSING VISUAL */}
            <FinalHeartfeltSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Holographic Birthday Popup Modal */}
      <BirthdayPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onEnterMemories={handleEnterMemories}
        onMakeWish={() => setWishMade(true)}
        wishMade={wishMade}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          id="back-to-top-btn"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full glass-cyber border border-pink-500/40 text-pink-300 hover:text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
