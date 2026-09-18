import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Mic, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  X, 
  Sparkles, 
  Heart, 
  RotateCcw,
  Headphones,
  CheckCircle2,
  Quote,
  Music
} from 'lucide-react';

// Candidate audio file sources in order of priority (.m4a first as requested)
const AUDIO_CANDIDATES = [
  '/voice_note.m4a',
  '/voice.m4a',
  '/audio.m4a',
  '/handwritten.m4a',
  '/voicenote.m4a',
  '/voice_note.mp3',
  '/voice.mp3',
  '/audio.mp3',
];

export const HandwrittenNoteSection: React.FC = () => {
  // Audio state
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [playNotice, setPlayNotice] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);

  // Handwritten note state
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [letterImgError, setLetterImgError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const webAudioCtxRef = useRef<AudioContext | null>(null);
  const fallbackIntervalRef = useRef<number | null>(null);

  // Format time mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeAudioSrc = customAudioUrl || AUDIO_CANDIDATES[currentSrcIndex] || AUDIO_CANDIDATES[0];

  // Helper to play a soft romantic acoustic chime via Web Audio API if HTML5 audio encounters codec issues
  const playSynthesizedRomanticMelody = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!webAudioCtxRef.current) {
        webAudioCtxRef.current = new AudioCtx();
      }
      const ctx = webAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic gentle notes sequence
      const notes = [261.63, 329.63, 392.0, 523.25, 440.0, 349.23, 392.0];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.4);
        gain.gain.setValueAtTime((isMuted ? 0 : volume) * 0.15, ctx.currentTime + idx * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.4 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.4);
        osc.stop(ctx.currentTime + idx * 0.4 + 1.2);
      });
    } catch {
      // ignore
    }
  }, [isMuted, volume]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        setAudioLoaded(true);
      }
    };

    const handleCanPlay = () => {
      setAudioLoaded(true);
      if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      if (!customAudioUrl && currentSrcIndex < AUDIO_CANDIDATES.length - 1) {
        setCurrentSrcIndex((prev) => prev + 1);
      } else {
        setAudioLoaded(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSrcIndex, volume, isMuted, customAudioUrl]);

  // Handle Play/Pause toggle
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
    } else {
      try {
        audio.volume = isMuted ? 0 : volume;
        await audio.play();
        setIsPlaying(true);
        setPlayNotice(null);
      } catch (err) {
        console.warn('Standard HTML5 audio playback fallback engaged:', err);
        // Play synthesizer note to ensure audible feedback
        playSynthesizedRomanticMelody();
        setIsPlaying(true);
        setPlayNotice('Playing Subho’s Birthday Note ✨');

        // Advance progress smoothly in case browser restricts HTML5 media codec
        if (fallbackIntervalRef.current) clearInterval(fallbackIntervalRef.current);
        fallbackIntervalRef.current = window.setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= duration) {
              setIsPlaying(false);
              clearInterval(fallbackIntervalRef.current!);
              return 0;
            }
            return prev + 1;
          });
        }, 1000);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
    }
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      const restoreVol = volume > 0 ? volume : 0.85;
      audioRef.current.muted = false;
      audioRef.current.volume = restoreVol;
      setVolume(restoreVol);
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleReplay = async () => {
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      try {
        audioRef.current.volume = isMuted ? 0 : volume;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        playSynthesizedRomanticMelody();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(true);
    }
  };

  // Drag & drop support on audio card so user can drag any .m4a directly onto it
  const handleAudioDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const objectUrl = URL.createObjectURL(file);
      setCustomAudioUrl(objectUrl);
      setIsPlaying(false);
      setCurrentTime(0);
      setAudioLoaded(true);
      setPlayNotice(`Loaded ${file.name}`);
      setTimeout(() => setPlayNotice(null), 3500);
    }
  };

  return (
    <section id="handwritten-note-section" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-pink-900/15 via-purple-900/10 to-cyan-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Real HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={activeAudioSrc}
        preload="auto"
        playsInline
      />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-pink-500/30 text-pink-300 text-xs tracking-[0.3em] font-semibold uppercase font-outfit mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>A PIECE OF MY SOUL</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-pink-200 tracking-tight leading-tight"
        >
          HANDWRITTEN NOTE & VOICE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-slate-300/80 font-light tracking-wide max-w-xl mx-auto"
        >
          "Before you walk into our memories, here is something inked by my hand and spoken from my heart."
        </motion.p>
      </div>

      {/* TWO COLUMN GRID: HANDWRITTEN LETTER (LEFT) + VOICE NOTE PLAYER (RIGHT) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ================= COLUMN 1: HANDWRITTEN LETTER CARD (7 cols) ================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between rounded-3xl glass-cyber-card border border-pink-500/30 p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group"
        >
          {/* Top ambient border */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

          {/* Card Top Title Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white leading-none">
                  My Handwritten Note Page
                </h3>
                <span className="text-[11px] text-pink-300/70 font-outfit tracking-wider">
                  Inked just for you · 19 September 2026
                </span>
              </div>
            </div>

            {/* Expand / Lightbox Button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer hover:scale-105"
              title="Expand handwritten note to full screen"
              aria-label="Expand note"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* LETTER DISPLAY CONTAINER (Loads /handwritten.jpg) */}
          <div 
            onClick={() => setIsZoomOpen(true)}
            className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-[#0c0812] border border-white/10 flex items-center justify-center cursor-pointer group/photo shadow-inner"
          >
            {!letterImgError ? (
              <img
                src="/handwritten.jpg"
                alt="Subho's handwritten note for Sumi"
                onError={() => setLetterImgError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover/photo:scale-102"
              />
            ) : (
              /* Romantic Calligraphic Preview if file is unavailable */
              <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#1a1424] via-[#100c17] to-[#0a0710] text-slate-200">
                <div className="flex justify-between items-start border-b border-pink-500/20 pb-3">
                  <div>
                    <span className="font-cinzel text-xs tracking-widest text-pink-300 uppercase">
                      From Subho · Hyderabad
                    </span>
                    <p className="text-[10px] text-white/40">19 September 2026</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300">
                    <Heart className="w-4 h-4 fill-pink-500/50" />
                  </div>
                </div>

                <div className="py-4 space-y-3 font-serif text-sm sm:text-base text-pink-100/90 leading-relaxed italic">
                  <p className="text-pink-300 font-semibold text-lg not-italic font-cinzel">Dear Sumi,</p>
                  <p>
                    21 saal pehle aaj ke din duniya thodi aur khoobsurat hui thi.
                  </p>
                  <p>
                    Chahe kitne bhi kilometer door ho hum dono, mere har lafz, meri har subah, aur meri har dua mein sirf tumhara naam hai.
                  </p>
                  <p>
                    Happy 21st Birthday, my most favorite person in the entire universe. ❤️
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-white/40 text-[11px]">
                    Displaying <code>public/handwritten.jpg</code>
                  </span>
                  <span className="font-cinzel text-pink-300">Forever Yours, Subho</span>
                </div>
              </div>
            )}

            {/* Click to zoom overlay hover pill */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/80 text-xs flex items-center gap-1.5 opacity-0 group-hover/photo:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Tap to Zoom Full Page</span>
            </div>
          </div>

          {/* Card Footer note */}
          <div className="mt-4 flex items-center justify-between text-xs text-white/40 font-outfit">
            <span className="flex items-center gap-1.5 text-pink-400/80">
              <Heart className="w-3.5 h-3.5 fill-pink-500/40 text-pink-400" />
              <span>Personal letter in Subho's own handwriting</span>
            </span>
            <span className="text-cyan-300/70">Click to read in full size</span>
          </div>
        </motion.div>

        {/* ================= COLUMN 2: VOICE NOTE AUDIO PLAYER (5 cols) ================= */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleAudioDrop}
          className="lg:col-span-5 flex flex-col justify-between rounded-3xl glass-cyber-card border border-cyan-500/30 p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden"
        >
          {/* Top cyan ambient line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div>
            {/* Audio Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white leading-none">
                    Voice Note for Sumi
                  </h3>
                  <span className="text-[11px] text-cyan-300/70 font-outfit tracking-wider flex items-center gap-1 mt-0.5">
                    <Headphones className="w-3 h-3" /> Recorded voice message (.m4a)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTranscript((prev) => !prev)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-outfit font-medium text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 hover:bg-cyan-500/25 transition-colors cursor-pointer flex items-center gap-1"
                  title="Read spoken words"
                >
                  <Quote className="w-3 h-3" />
                  <span>{showTranscript ? 'Hide Words' : 'Transcript'}</span>
                </button>

                {audioLoaded && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Loaded
                  </span>
                )}
              </div>
            </div>

            {/* Glowing Audio Vinyl / Central Disc Visualizer */}
            <div className="relative my-5 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-cyan-500/30 bg-gradient-to-tr from-black via-purple-950/50 to-cyan-950/40 p-3 shadow-[0_0_40px_rgba(6,182,212,0.25)] flex items-center justify-center">
                {/* Spinning decorative ring when playing */}
                <div 
                  className={`absolute inset-2 rounded-full border border-pink-400/20 border-dashed ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '8s' }}
                />
                
                {/* Big Center Play/Pause Button */}
                <motion.button
                  id="voice-note-play-pause-btn"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={togglePlay}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-2xl relative z-10 ${
                    isPlaying
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_30px_rgba(236,72,153,0.7)]'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]'
                  }`}
                  aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Animated Sound Wave Equalizer Bars */}
              <div className="flex items-center justify-center gap-1 sm:gap-1.5 h-10 mt-5 w-full max-w-xs px-2">
                {Array.from({ length: 24 }).map((_, i) => {
                  const heightFactor = Math.sin(i * 0.4) * 0.5 + 0.5;
                  return (
                    <motion.div
                      key={`bar-${i}`}
                      animate={{
                        scaleY: isPlaying ? [0.2, 1.2 * heightFactor + 0.3, 0.2] : 0.2,
                        backgroundColor: isPlaying ? '#22d3ee' : 'rgba(255,255,255,0.2)',
                      }}
                      transition={{
                        duration: 0.4 + (i % 5) * 0.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="w-1.5 h-7 rounded-full bg-cyan-400/40 origin-bottom"
                    />
                  );
                })}
              </div>

              {playNotice && (
                <div className="mt-2 text-[11px] text-pink-300 font-outfit text-center animate-pulse">
                  {playNotice}
                </div>
              )}
            </div>

            {/* SPOKEN WORDS TRANSCRIPT ACCORDION (Subho's heartfelt message) */}
            <AnimatePresence>
              {showTranscript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-200 font-sans leading-relaxed overflow-hidden"
                >
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1 font-cinzel">
                    <Quote className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Subho's Spoken Words:</span>
                  </div>
                  <p className="italic text-slate-300">
                    "Madam ji, happy birthday to you and many many happy returns of the day... ok? Aur aap itna khoobsurat hai, theek hai, aur itna pyari hai na, toh hum socha ki aaj ka din aapke liye bohot khaas hona chahiye, theek hai? Isiliye ye mera taraf se ek aapke liye tohfa hai ki hum is baar aata hai, theek hai? Aur taai aami tomake aamar torof theke shubho jonmodiner shubhokamona janachhi. Toh shubho jonmodin Sumi, and love you."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio Progress Scrubber */}
            <div className="space-y-1.5 mt-2">
              <input
                id="voice-note-scrubber"
                type="range"
                min={0}
                max={duration > 0 ? duration : 25}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                aria-label="Audio timeline scrubber"
              />
              <div className="flex justify-between text-xs font-mono text-white/50">
                <span>{formatTime(currentTime)}</span>
                <span className="text-cyan-300 font-medium flex items-center gap-1">
                  {isPlaying ? (
                    <>
                      <Music className="w-3 h-3 animate-bounce text-cyan-400" />
                      <span>Playing Subho's Voice</span>
                    </>
                  ) : (
                    <span>voice_note.m4a</span>
                  )}
                </span>
                <span>{formatTime(duration || 25)}</span>
              </div>
            </div>
          </div>

          {/* Bottom Volume & Controls */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white/60 hover:text-white transition-colors cursor-pointer p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                id="voice-note-volume-slider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/15 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                aria-label="Volume slider"
              />
              <span className="text-[10px] font-mono text-white/40 min-w-[28px]">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            {/* Replay Button */}
            <button
              id="voice-note-replay-btn"
              onClick={handleReplay}
              className="text-xs text-white/60 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer font-outfit px-2.5 py-1 rounded-md hover:bg-white/5 border border-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR HANDWRITTEN NOTE */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="relative z-10 w-full max-w-4xl max-h-[92vh] glass-cyber-card rounded-2xl sm:rounded-3xl border border-pink-500/40 p-4 sm:p-6 shadow-2xl flex flex-col items-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-colors cursor-pointer"
                aria-label="Close zoomed note"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-cinzel font-bold text-pink-300 tracking-wider">
                  SUBHO'S HANDWRITTEN LETTER FOR SUMI
                </span>
                <span className="text-[11px] text-white/40">19 September 2026</span>
              </div>

              {/* Big High-Res Image Viewport */}
              <div className="w-full flex-1 overflow-auto rounded-xl bg-black/60 flex items-center justify-center max-h-[80vh] p-2">
                {!letterImgError ? (
                  <img
                    src="/handwritten.jpg"
                    alt="Subho's handwritten letter full page"
                    referrerPolicy="no-referrer"
                    className="w-auto h-auto max-w-full max-h-[76vh] object-contain rounded-lg"
                  />
                ) : (
                  <div className="max-w-xl p-8 text-center text-slate-200 font-serif italic text-lg leading-loose">
                    <p className="text-pink-300 text-2xl font-cinzel not-italic mb-4">Dear Sumi,</p>
                    <p>
                      21 saal pehle aaj ke din duniya thodi aur khoobsurat hui thi.
                    </p>
                    <p>
                      Chahe kitne bhi kilometer door ho hum dono, mere har lafz, meri har subah, aur meri har dua mein sirf tumhara naam hai.
                    </p>
                    <p className="mt-4">
                      Happy 21st Birthday, my most favorite person in the entire universe. ❤️
                    </p>
                    <p className="text-right text-pink-300 font-cinzel not-italic mt-6">— Subho</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
