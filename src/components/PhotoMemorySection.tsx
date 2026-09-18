import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PHOTO_MEMORIES } from '../data/birthdayData';
import { PhotoCard } from './PhotoCard';
import { PhotoModal } from './PhotoModal';
import { UntilWeMeetCard } from './UntilWeMeetCard';
import { Sparkles, UploadCloud, Heart, Image as ImageIcon } from 'lucide-react';

interface PhotoMemorySectionProps {
  customPhotoMap?: Record<string, string>;
  onPhotoUpload?: (photoKey: string, dataUrl: string) => void;
}

export const PhotoMemorySection: React.FC<PhotoMemorySectionProps> = ({
  customPhotoMap = {},
  onPhotoUpload,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [showUploadDrawer, setShowUploadDrawer] = useState(false);

  const handleFileUpload = (numberStr: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onPhotoUpload) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onPhotoUpload(numberStr, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="photo-memory-section" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      {/* Background Vertical Timeline Line */}
      <div className="absolute left-1/2 top-40 bottom-40 w-[1px] bg-gradient-to-b from-transparent via-pink-500/20 via-cyan-500/20 to-transparent -translate-x-1/2 pointer-events-none hidden lg:block" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-cyber border border-pink-500/30 text-pink-300 text-xs tracking-[0.3em] font-semibold uppercase font-outfit mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>CHRONICLES OF HER</span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-pink-200 tracking-tight leading-tight"
        >
          9 MOMENTS. ONE SPECIAL PERSON.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-300/80 font-light tracking-wide max-w-2xl mx-auto"
        >
          "Some memories are too beautiful to be measured in distance."
        </motion.p>

        {/* Optional Custom Photo Assistant Badge */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            id="toggle-photo-assistant-btn"
            onClick={() => setShowUploadDrawer(!showUploadDrawer)}
            className="text-xs text-white/50 hover:text-pink-300 flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 hover:border-pink-500/40 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>{showUploadDrawer ? 'Hide Photo Quick-Attach' : 'Photo Manager (9 Slots)'}</span>
          </button>
        </div>

        {/* Expandable Quick Drop / Photo Mapper */}
        {showUploadDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 rounded-2xl glass-cyber border border-pink-500/30 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-300">
                Attach Sumi's 9 Photos for Instant Preview
              </span>
              <span className="text-[11px] text-white/50">
                For Vercel deployment, simply place <code>photo1.jpeg</code> to <code>photo9.jpeg</code> in <code>/public/</code>
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {PHOTO_MEMORIES.map((m) => (
                <label
                  key={m.id}
                  className="flex flex-col items-center p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-pink-400/50 cursor-pointer text-center group transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-pink-400">Photo {m.number}</span>
                  <span className="text-[9px] text-white/50 truncate w-full group-hover:text-white">
                    {customPhotoMap[m.number] ? '✓ Attached' : 'Select'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(m.number, e)}
                  />
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* 9-PHOTO UNIFORM ELEGANT GRID LAYOUT */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {PHOTO_MEMORIES.map((memory, idx) => (
          <PhotoCard
            key={memory.id}
            memory={memory}
            index={idx}
            customSrc={customPhotoMap[memory.number] || customPhotoMap[memory.photoUrl]}
            onClick={() => setSelectedPhotoIndex(idx)}
          />
        ))}
      </div>

      {/* SPECIAL LONG-DISTANCE CARD (Directly after the 9 photos) */}
      <UntilWeMeetCard />

      {/* FULLSCREEN PHOTO LIGHTBOX MODAL */}
      <PhotoModal
        photos={PHOTO_MEMORIES}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onSelectIndex={(index) => setSelectedPhotoIndex(index)}
        customPhotoMap={customPhotoMap}
      />
    </section>
  );
};
