import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../data/images';
import { SafeImage } from './SafeImage';

export const StorySection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Lamps glow intensity responds to scroll
  const lampGlow = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.3, 1, 0.4]);
  const lampOffset = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#8FCFB0] text-[#0E3B2E] overflow-hidden"
      aria-labelledby="story-heading"
    >
      {/* Hanging Brass Pendant Lamps with dynamic glow */}
      <div className="absolute top-0 left-[18%] z-20 flex flex-col items-center pointer-events-none">
        <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-[#A8701F] to-[#D9A441]" />
        <div className="w-10 h-5 rounded-t-full bg-brass-gradient shadow-md" />
        <div className="w-4 h-4 -mt-0.5 rounded-full bg-[#FFF9D2] shadow-[0_0_20px_10px_rgba(246,220,142,0.8)]" />
        <motion.div
          style={{ opacity: lampGlow, y: lampOffset }}
          className="absolute top-20 -left-28 w-64 h-64 rounded-full pointer-events-none bg-radial from-[#F6DC8E]/40 via-[#D9A441]/10 to-transparent blur-xl"
        />
      </div>

      <div className="absolute top-0 right-[22%] z-20 hidden md:flex flex-col items-center pointer-events-none">
        <div className="w-[1.5px] h-32 bg-gradient-to-b from-[#A8701F] to-[#D9A441]" />
        <div className="w-12 h-6 rounded-t-full bg-brass-gradient shadow-md" />
        <div className="w-4 h-5 -mt-0.5 rounded-full bg-[#FFF9D2] shadow-[0_0_24px_12px_rgba(246,220,142,0.85)]" />
        <motion.div
          style={{ opacity: lampGlow, y: lampOffset }}
          className="absolute top-28 -left-32 w-72 h-72 rounded-full pointer-events-none bg-radial from-[#F6DC8E]/40 via-[#D9A441]/10 to-transparent blur-xl"
        />
      </div>

      {/* Subtle organic light wash on the mint background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A8E6C4]/50 via-[#8FCFB0] to-[#6FB998] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#0E3B2E]/70 mb-3">
              <span>03</span>
              <span>/</span>
              <span>The Green Room</span>
            </div>

            <h2 id="story-heading" className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#0E3B2E] tracking-tight leading-[1.1] mb-6">
              Your Cozy Neighbourhood Cafe on Baker Street
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#0E3B2E]/85 leading-relaxed font-sans">
              <p>
                Step inside our mint-green dining room in Weybridge, where the checkerboard floor meets warm tan leather chairs, brass pendant lights, and the soft glow of our neon sign.
              </p>
              <p>
                We built Kusina De Isobel around three simple ideas:{' '}
                <strong className="text-[#0E3B2E] font-semibold">Coffee. Good food. Good vibes.</strong>{' '}
                Whether you’re catching up over a velvety flat white, tucking into freshly poached eggs on smashed avocado toast, or gathering family for our sizzling sharing platters, there’s always a warm seat waiting.
              </p>
              <p className="font-medium text-[#0E3B2E]">
                Comfort foods made with care — available to eat in or take away.
              </p>
            </div>

            {/* Signature Quotes / Details */}
            <div className="mt-8 pt-6 border-t border-[#0E3B2E]/20 flex flex-wrap items-center gap-6">
              <div>
                <span className="block font-neon text-3xl text-[#0E3B2E]">
                  Relax. Recharge. Enjoy.
                </span>
                <span className="text-xs uppercase tracking-wider text-[#0E3B2E]/70 font-mono">
                  Every Day on Baker St
                </span>
              </div>

              <div className="h-10 w-[1px] bg-[#0E3B2E]/20 hidden sm:block" />

              <div className="text-xs text-[#0E3B2E]/80 font-mono">
                <span className="block font-bold text-[#0E3B2E]">34 Baker Street</span>
                <span>Weybridge KT13 8AU</span>
              </div>
            </div>
          </div>

          {/* Overlapping Images Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image: Interior view */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 aspect-4/3 relative z-10">
                <SafeImage
                  image={IMAGES.interiorPendant}
                  dishName="Cafe Dining Room"
                  aspectRatioClass="aspect-4/3"
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Overlapping Secondary Image: Chalkboard / coffee detail */}
              <div className="absolute -bottom-10 -left-6 sm:-left-10 w-44 sm:w-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-square z-20">
                <SafeImage
                  image={IMAGES.flatWhite}
                  dishName="Artisan Coffee"
                  aspectRatioClass="aspect-square"
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Overlapping Tertiary Badge */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-[#0E3B2E] text-[#F7F1E3] p-4 sm:p-5 rounded-2xl shadow-xl border border-[#D9A441]/40 z-20 max-w-[170px] text-center">
                <span className="font-heading text-2xl text-[#F6DC8E] block leading-none mb-1">
                  £10–£20
                </span>
                <span className="text-[11px] text-[#8FCFB0] font-sans block leading-tight">
                  Per person breakfast, brunch & grill
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
