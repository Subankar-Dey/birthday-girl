import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhotoMemory } from '../types';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin } from 'lucide-react';

interface PhotoModalProps {
  photos: PhotoMemory[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
  customPhotoMap?: Record<string, string>;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onSelectIndex,
  customPhotoMap = {},
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
      }
      if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onSelectIndex, photos.length]);

  if (currentIndex === null) return null;
  const currentPhoto = photos[currentIndex];

  const prev = () => onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  const next = () => onSelectIndex((currentIndex + 1) % photos.length);

  // Determine actual image source
  const customSrc = customPhotoMap[currentPhoto.number] || customPhotoMap[currentPhoto.photoUrl];
  const activeSrc = customSrc || currentPhoto.photoUrl;

  return (
    <AnimatePresence>
      <div 
        id="photo-memory-modal" 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          key={currentPhoto.id}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] glass-cyber-card rounded-2xl sm:rounded-3xl border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.3)] flex flex-col md:flex-row overflow-hidden"
        >
          {/* Close button */}
          <button
            id="close-photo-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/70 hover:text-white border border-white/15 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Photo Viewport */}
          <div className="relative flex-1 bg-black/50 flex items-center justify-center min-h-[300px] sm:min-h-[420px] md:min-h-[520px] overflow-hidden group">
            {!imageError ? (
              <img
                src={activeSrc}
                alt={`Sumi - ${currentPhoto.theme}`}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[75vh] transition-transform duration-500 group-hover:scale-102"
                style={{ objectPosition: currentPhoto.objectPosition || 'center' }}
              />
            ) : (
              /* Graceful visual portrait card if photo is awaiting local file drag/drop */
              <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-cyan-400 p-0.5 mb-4 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                  <div className="w-full h-full bg-[#0d0914] rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-pink-300" />
                  </div>
                </div>
                <span className="text-xl font-bold font-cinzel text-white">
                  Memory {currentPhoto.number}
                </span>
                <span className="text-xs text-pink-300/80 uppercase font-outfit tracking-widest mt-1">
                  {currentPhoto.emotionalLabel}
                </span>
                <p className="text-xs text-white/50 mt-3">
                  Photo source: <code className="text-cyan-300">{currentPhoto.photoUrl}</code>
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <button
              onClick={prev}
              id="prev-photo-btn"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
              aria-label="Previous memory"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              id="next-photo-btn"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/10 backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
              aria-label="Next memory"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Memory Number Overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-pink-400">{currentPhoto.number}</span>
              <span className="text-xs text-white/40">/ 09</span>
            </div>
          </div>

          {/* Right/Bottom Narrative Sidebar */}
          <div className="w-full md:w-[360px] lg:w-[400px] p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-gradient-to-b from-[#100b1a] to-[#08060d]">
            <div>
              {/* Emotional Label Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] tracking-[0.25em] font-semibold uppercase font-outfit mb-3">
                <Sparkles className="w-3 h-3 text-pink-400" />
                <span>{currentPhoto.emotionalLabel}</span>
              </div>

              {/* Memory Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white leading-tight mb-2">
                {currentPhoto.theme}
              </h3>

              {currentPhoto.locationHint && (
                <div className="flex items-center gap-1.5 text-xs text-cyan-300/80 mb-4 font-outfit">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentPhoto.locationHint}</span>
                </div>
              )}

              {/* Short Shayari Highlight */}
              <div className="my-4 p-4 rounded-xl bg-white/[0.03] border-l-2 border-pink-500 text-pink-100 font-medium text-sm sm:text-base italic leading-relaxed">
                "{currentPhoto.shortShayari}"
              </div>

              {/* Heartfelt detailed memory */}
              <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed font-light mt-3">
                {currentPhoto.detailedMemory}
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                <span>Subho & Sumi</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/40 tracking-wider">Use ← → keys</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
