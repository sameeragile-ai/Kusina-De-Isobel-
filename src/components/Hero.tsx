import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, Clock, ChevronDown } from 'lucide-react';
import { IMAGES } from '../data/images';
import { SafeImage } from './SafeImage';
import { getLiveCafeStatus } from '../utils/hours';

interface HeroProps {
  onOrderClick: () => void;
  onBookClick: () => void;
}

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Kusina+De+Isobel/data=!4m2!3m1!1s0x0:0x1d21bf786b88a91e?sa=X&ved=1t:2428&ictx=111';

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onBookClick }) => {
  const cafeStatus = getLiveCafeStatus();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0E3B2E] pt-20 pb-6 px-4 sm:px-8"
      aria-label="Welcome to Kusina De Isobel"
    >
      {/* Background Photograph with subtle slow zoom & bottle green gradient overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={IMAGES.heroInterior.primary}
            alt="Kusina De Isobel cozy cafe interior"
            className="w-full h-full object-cover object-center opacity-40 brightness-95"
            loading="eager"
            decoding="sync"
          />
        </motion.div>

        {/* Cinematic Multi-layered Bottle Green & Dark Gradient Scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(14, 59, 46, 0.4) 0%, rgba(18, 26, 22, 0.85) 60%, #0E3B2E 100%), linear-gradient(180deg, rgba(14, 59, 46, 0.8) 0%, rgba(14, 59, 46, 0.45) 45%, #0E3B2E 100%)',
          }}
        />

        {/* Warm animated light pools from two hanging brass pendant lamps at the top */}
        <div className="absolute top-0 left-[22%] -translate-x-1/2 w-[340px] h-[400px] pointer-events-none pendant-glow opacity-80" />
        <div className="absolute top-0 right-[25%] -translate-x-1/2 w-[320px] h-[360px] pointer-events-none pendant-glow opacity-70" />

        {/* Subtle decorative cords */}
        <div className="absolute top-0 left-[22%] w-[1.5px] h-20 bg-gradient-to-b from-[#A8701F] to-[#D9A441]/50" />
        <div className="absolute top-0 right-[25%] w-[1.5px] h-28 bg-gradient-to-b from-[#A8701F] to-[#D9A441]/50" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            {/* Small human editorial location tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-3 text-xs sm:text-sm tracking-widest uppercase text-[#8FCFB0] font-medium"
            >
              <span>34 Baker St, Weybridge</span>
              <span aria-hidden="true" className="text-[#D9A441]">·</span>
              <span>Independent Cafe</span>
            </motion.div>

            {/* Masked Rising Headline: "Coffee. Good food. Good vibes." */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F7F1E3] leading-[1.05] mb-5">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Coffee.
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Good food.
                </motion.span>
              </span>

              <span className="block overflow-hidden pt-1">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block font-neon text-[#D8F26A] text-5xl sm:text-7xl md:text-8xl lg:text-9xl neon-glow neon-flicker not-italic"
                >
                  Good vibes.
                </motion.span>
              </span>
            </h1>

            {/* Cafe Subline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-[#F7F1E3]/85 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
              style={{ textWrap: 'balance' }}
            >
              Your cozy neighbourhood cafe on Baker Street, Weybridge. Breakfast, comfort food and proper coffee, to eat in or take away.
            </motion.p>

            {/* Two Action Buttons (visible without scrolling on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Order for Collection Button with magnetic arrow effect */}
              <button
                onClick={onOrderClick}
                className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-[#121A16] bg-brass-gradient shadow-[0_8px_25px_rgba(217,164,65,0.35)] hover:shadow-[0_12px_32px_rgba(217,164,65,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
              >
                <span>Order for Collection</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Book a Table Outline Button */}
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base text-[#F7F1E3] border border-[#D9A441]/50 bg-black/25 hover:bg-[#D9A441]/15 hover:border-[#D9A441] transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6DC8E]"
              >
                <span>Book a Table</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Rotating Circular Text Badge around dish photo */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="relative w-64 h-64 xl:w-72 xl:h-72 flex items-center justify-center"
            >
              {/* Rotating Circular Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                  <path
                    id="heroBadgePath"
                    d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                    fill="none"
                  />
                  <text className="text-[12px] uppercase font-bold tracking-[0.24em] fill-[#F6DC8E]">
                    <textPath href="#heroBadgePath" startOffset="0%">
                      Relax. Recharge. Enjoy. · Kusina De Isobel ·
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Inner Round Photograph */}
              <div className="w-44 h-44 xl:w-52 xl:h-52 rounded-full overflow-hidden border-2 border-[#D9A441]/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative group">
                <SafeImage
                  image={IMAGES.heroBadgeDish}
                  dishName="Avocado & Poached Eggs"
                  aspectRatioClass="aspect-square"
                  containerClassName="w-full h-full rounded-full"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#F7F1E3]/80">
        {/* Google Reviews Badge */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#D8F26A] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8F26A] rounded py-1 px-1.5"
          title="View reviews on Google Maps"
        >
          <div className="flex items-center text-[#D9A441]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#D9A441]" />
            ))}
          </div>
          <span className="font-semibold text-[#F7F1E3] font-mono">4.7</span>
          <span className="text-[#8FCFB0]/90">on Google (246 reviews)</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#D9A441] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </a>

        {/* Live Open Status & Hours */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#8FCFB0]">
          <Clock className="w-4 h-4 text-[#D8F26A]" />
          <span>{cafeStatus.statusText}</span>
        </div>

        {/* Scroll cue */}
        <a
          href="#menu"
          aria-label="Scroll to menu section"
          className="hidden md:flex items-center gap-1 text-xs text-[#F7F1E3]/60 hover:text-[#D8F26A] transition-colors py-1 px-2"
        >
          <span>Explore Menu</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
