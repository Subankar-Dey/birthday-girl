import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PhotoMemory } from '../types';
import { Sparkles, Maximize2, Heart } from 'lucide-react';

interface PhotoCardProps {
  memory: PhotoMemory;
  index: number;
  onClick: () => void;
  customSrc?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  memory,
  index,
  onClick,
  customSrc,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const activeSrc = customSrc || memory.photoUrl;

  return (
    <motion.div
      id={`memory-card-${memory.number}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={onClick}
      className="group relative rounded-2xl sm:rounded-3xl glass-cyber-card border border-white/10 hover:border-pink-500/50 transition-all duration-500 overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.3)] flex flex-col justify-between col-span-1"
    >
      {/* Top Ambient Glow Line */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent group-hover:via-cyan-400 transition-all duration-500 z-20" />

      {/* PHOTO CONTAINER */}
      <div className="relative w-full overflow-hidden bg-black/40 h-64 sm:h-72">
        {!imageError ? (
          <img
            src={activeSrc}
            alt={`Sumi - ${memory.theme}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 ${
              imageLoaded ? 'opacity-100 filter-none' : 'opacity-0 filter blur-md'
            }`}
            style={{ objectPosition: memory.objectPosition || 'center 20%' }}
          />
        ) : (
          /* Graceful Visual Card if awaiting upload */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-pink-950/30 via-black to-purple-950/30">
            <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-pink-300" />
            </div>
            <span className="text-xs font-mono text-pink-300 uppercase tracking-wider">
              {memory.emotionalLabel}
            </span>
            <span className="text-[10px] text-white/40 mt-1 font-mono">
              {memory.photoUrl}
            </span>
          </div>
        )}

        {/* Gradient Shadow Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08060d] via-[#08060d]/30 to-transparent z-10" />

        {/* Memory Number Badge */}
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full glass-cyber border border-white/15 flex items-center gap-1.5 backdrop-blur-md">
          <span className="text-xs font-mono font-bold text-pink-400">{memory.number}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-outfit">MEMORY</span>
        </div>

        {/* Expand Action Indicator */}
        <div className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md">
          <Maximize2 className="w-3.5 h-3.5 text-white/90" />
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-20 p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Subtle Emotional Label */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-pink-300/90 uppercase font-outfit mb-2">
            <Sparkles className="w-3 h-3 text-pink-400" />
            <span>{memory.emotionalLabel}</span>
          </div>

          {/* Theme Title */}
          <h4 className="text-base sm:text-lg font-bold font-cinzel text-white leading-snug line-clamp-1 group-hover:text-pink-100 transition-colors">
            {memory.theme}
          </h4>

          {/* Short Shayari / Line */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-light italic leading-relaxed line-clamp-2">
            "{memory.shortShayari}"
          </p>
        </div>

        {/* Bottom Card Footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-white/40">
          <span className="text-cyan-300/70 font-outfit tracking-wider">
            {memory.locationHint || 'Forever Moment'}
          </span>
          <span className="flex items-center gap-1 text-pink-400/80 group-hover:text-pink-300 transition-colors">
            <Heart className="w-3 h-3 fill-pink-500/40 text-pink-400" /> View Memory
          </span>
        </div>
      </div>
    </motion.div>
  );
};
