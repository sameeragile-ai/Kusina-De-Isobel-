import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const [lampOn, setLampOn] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem('kusina_loader_viewed');
      if (!hasSeen) {
        setShouldShow(true);
        sessionStorage.setItem('kusina_loader_viewed', 'true');
      } else {
        if (onComplete) onComplete();
      }
    } catch {
      // If sessionStorage unavailable, show briefly
      setShouldShow(true);
    }
  }, [onComplete]);

  useEffect(() => {
    if (!shouldShow) return;

    // Lamp flickers on at 400ms
    const lampTimer = setTimeout(() => {
      setLampOn(true);
    }, 380);

    // Progress bar fills over 1.3s
    const start = Date.now();
    const duration = 1200;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
      }
    }, 20);

    // Curtain lifts at 1.7s max
    const exitTimer = setTimeout(() => {
      setShouldShow(false);
      if (onComplete) onComplete();
    }, 1750);

    return () => {
      clearTimeout(lampTimer);
      clearTimeout(exitTimer);
      clearInterval(interval);
    };
  }, [shouldShow, onComplete]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="intro-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center chalkboard-surface overflow-hidden pointer-events-auto"
          aria-label="Loading Kusina De Isobel"
          role="status"
        >
          {/* Subtle noise and radial background */}
          <div className="absolute inset-0 bg-radial from-[#1e3328]/40 via-transparent to-black/80 pointer-events-none" />

          {/* Hanging Brass Pendant Lamp Animation */}
          <div className="relative flex flex-col items-center">
            {/* Cord */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 110 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-[2px] bg-gradient-to-b from-[#A8701F] to-[#D9A441]"
            />

            {/* Lamp Shade & Bulb */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="relative flex flex-col items-center"
            >
              {/* Brass Shade */}
              <div className="w-14 h-7 rounded-t-full bg-brass-gradient shadow-md border-b border-[#A8701F]" />

              {/* Glowing Bulb */}
              <div
                className={`w-5 h-6 -mt-1 rounded-b-full transition-all duration-300 ${
                  lampOn
                    ? 'bg-[#FFF9D2] shadow-[0_0_30px_15px_rgba(246,220,142,0.85)]'
                    : 'bg-[#554020]'
                }`}
              />

              {/* Warm light cone spreading downwards */}
              <div
                className={`absolute top-6 w-[280px] h-[320px] pointer-events-none transition-opacity duration-700 ${
                  lampOn ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  background:
                    'radial-gradient(ellipse at top, rgba(246, 220, 142, 0.35) 0%, rgba(217, 164, 65, 0.08) 50%, transparent 80%)',
                }}
              />
            </motion.div>
          </div>

          {/* Neon Sign Reveal */}
          <div className="relative mt-8 text-center z-10 px-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: lampOn ? 1 : 0,
                y: lampOn ? 0 : 15,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="font-neon text-4xl sm:text-5xl md:text-6xl text-[#D8F26A] neon-glow neon-flicker">
                Kusina De Isobel
              </h1>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-[#8FCFB0]/90 font-medium font-sans">
                Baker Street · Weybridge
              </p>
            </motion.div>

            {/* Thin Brass Progress Line */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full mx-auto mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-brass-gradient"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <p className="mt-3 text-[11px] text-[#F7F1E3]/50 tracking-wider">
              Coffee · Good Food · Good Vibes
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
