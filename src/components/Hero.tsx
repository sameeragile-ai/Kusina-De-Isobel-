import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, Clock, ChevronDown, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { IMAGES, ImageSlot } from '../data/images';
import { MENU_ITEMS, MenuItem } from '../data/menu';
import { getLiveCafeStatus } from '../utils/hours';
import { useCart } from '../context/CartContext';

interface HeroProps {
  onOrderClick: () => void;
  onBookClick: () => void;
}

interface HeroSlide {
  id: string;
  label: string;
  headlineFirst: string;
  headlineNeon: string;
  subline: string;
  image: ImageSlot;
  desktopPosition: string;
  mobilePosition: string;
  dishItem?: MenuItem;
}

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Kusina+De+Isobel/data=!4m2!3m1!1s0x0:0x1d21bf786b88a91e?sa=X&ved=1t:2428&ictx=111';

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onBookClick }) => {
  const cafeStatus = getLiveCafeStatus();
  const { addItem } = useCart();

  // Find exact menu items for dish tags
  const avocadoDish = MENU_ITEMS.find(i => i.id === 'avocado-poached-eggs');
  const fullEnglishDish = MENU_ITEMS.find(i => i.id === 'full-english');
  const sharingDish = MENU_ITEMS.find(i => i.id === 'sharing-platter-2');
  const latteDish = MENU_ITEMS.find(i => i.id === 'latte');

  const SLIDES: HeroSlide[] = [
    {
      id: 'slide-room',
      label: '01 / The Room',
      headlineFirst: 'Coffee. Good food.',
      headlineNeon: 'Good vibes.',
      subline:
        'Your cozy neighbourhood cafe on Baker Street, Weybridge. Breakfast, comfort food and proper coffee, to eat in or take away.',
      image: IMAGES.heroSlide1,
      desktopPosition: 'object-[center_35%]',
      mobilePosition: 'max-md:object-[center_25%]',
    },
    {
      id: 'slide-mornings',
      label: '02 / Mornings',
      headlineFirst: 'Breakfast worth',
      headlineNeon: 'getting up for.',
      subline:
        'Two free-range poached eggs with golden runny yolks, seasoned over crushed avocado on artisan grilled sourdough.',
      image: IMAGES.heroSlide2,
      desktopPosition: 'object-[center_45%]',
      mobilePosition: 'max-md:object-[center_40%]',
      dishItem: avocadoDish,
    },
    {
      id: 'slide-breakfast',
      label: '03 / The Full English',
      headlineFirst: 'Big plates.',
      headlineNeon: 'Zero fuss.',
      subline:
        'Thick grilled bacon, British sausage, two eggs, baked beans, sautéed mushrooms, golden hash brown and sourdough toast.',
      image: IMAGES.heroSlide3,
      desktopPosition: 'object-[center_50%]',
      mobilePosition: 'max-md:object-[center_45%]',
      dishItem: fullEnglishDish,
    },
    {
      id: 'slide-sharing',
      label: '04 / Sharing',
      headlineFirst: 'Bring your people.',
      headlineNeon: 'Bring your appetite.',
      subline:
        'Steak, gammon, chicken breast, kofte, sausage, fluffy rice, chips, crispy onion rings and tossed house salad.',
      image: IMAGES.heroSlide4,
      desktopPosition: 'object-[center_55%]',
      mobilePosition: 'max-md:object-[center_50%]',
      dishItem: sharingDish,
    },
    {
      id: 'slide-coffee',
      label: '05 / The Coffee',
      headlineFirst: 'Relax. Recharge.',
      headlineNeon: 'Enjoy.',
      subline:
        'Double ristretto espresso paired with velvety steamed milk and delicate cocoa dusting, served in our warm green room.',
      image: IMAGES.heroSlide5,
      desktopPosition: 'object-[center_50%]',
      mobilePosition: 'max-md:object-[center_45%]',
      dishItem: latteDish,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedTagId, setAddedTagId] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % SLIDES.length);
  }, [SLIDES.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, [SLIDES.length]);

  // Auto-advance every 6.8 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide, isPaused]);

  const handleDishTagAdd = (dish: MenuItem) => {
    addItem(dish);
    setAddedTagId(dish.id);
    setTimeout(() => {
      setAddedTagId(null);
    }, 1400);
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-[#0E3B2E] pt-20 pb-6 px-4 sm:px-8"
      aria-label="Welcome to Kusina De Isobel"
    >
      {/* Background Photograph Slider with Ken Burns (max 1.06 scale on images under 1600px) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeInOut' },
              scale: { duration: 7.5, ease: 'easeOut' },
            }}
            className="w-full h-full absolute inset-0"
          >
            <picture className="w-full h-full block">
              {currentSlide.image.mobile && (
                <source media="(max-width: 767px)" srcSet={currentSlide.image.mobile} />
              )}
              <img
                src={currentSlide.image.primary}
                alt={currentSlide.image.alt}
                className={`w-full h-full object-cover hero-image-filter ${currentSlide.desktopPosition} ${currentSlide.mobilePosition}`}
                loading={currentIndex === 0 ? 'eager' : 'lazy'}
                onError={e => {
                  // Fallback to secondary if local fails
                  const target = e.target as HTMLImageElement;
                  if (currentSlide.image.fallback) {
                    target.src = currentSlide.image.fallback;
                  }
                }}
              />
            </picture>
          </motion.div>
        </AnimatePresence>

        {/* Static Fine Film Grain Overlay using inline SVG feTurbulence at ~6% opacity */}
        <div className="absolute inset-0 hero-grain-overlay pointer-events-none z-10" />

        {/* Bottle Green Gradient Overlay: Lighter at top and centre of Slide 1 to keep mint walls, pendant lights and neon sign visible */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none z-10"
          style={{
            background:
              currentIndex === 0
                ? 'radial-gradient(ellipse at 40% 30%, rgba(14, 59, 46, 0.28) 0%, rgba(18, 26, 22, 0.72) 65%, #0E3B2E 100%), linear-gradient(180deg, rgba(14, 59, 46, 0.45) 0%, rgba(14, 59, 46, 0.25) 45%, #0E3B2E 100%)'
                : 'radial-gradient(ellipse at 30% 20%, rgba(14, 59, 46, 0.4) 0%, rgba(18, 26, 22, 0.85) 60%, #0E3B2E 100%), linear-gradient(180deg, rgba(14, 59, 46, 0.75) 0%, rgba(14, 59, 46, 0.45) 45%, #0E3B2E 100%)',
          }}
        />

        {/* Warm animated light pools from two hanging brass pendant lamps at the top */}
        <div className="absolute top-0 left-[22%] -translate-x-1/2 w-[340px] h-[400px] pointer-events-none pendant-glow opacity-80 z-10" />
        <div className="absolute top-0 right-[25%] -translate-x-1/2 w-[320px] h-[360px] pointer-events-none pendant-glow opacity-70 z-10" />

        {/* Subtle decorative cords */}
        <div className="absolute top-0 left-[22%] w-[1.5px] h-20 bg-gradient-to-b from-[#A8701F] to-[#D9A441]/50 z-10" />
        <div className="absolute top-0 right-[25%] w-[1.5px] h-28 bg-gradient-to-b from-[#A8701F] to-[#D9A441]/50 z-10" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            {/* Slide Label & Category Indicator */}
            <motion.div
              key={`label-${currentSlide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-3 text-xs sm:text-sm tracking-widest uppercase text-[#8FCFB0] font-mono font-medium"
            >
              <span className="text-[#F6DC8E]">{currentSlide.label}</span>
              <span aria-hidden="true" className="text-[#D9A441]">·</span>
              <span>34 Baker St, Weybridge</span>
            </motion.div>

            {/* Masked Rising Headline with Neon script accent */}
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F7F1E3] leading-[1.05] mb-5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`headline-${currentSlide.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  <span className="block">{currentSlide.headlineFirst}</span>
                  <span className="inline-block font-neon text-[#D8F26A] text-5xl sm:text-7xl md:text-8xl lg:text-9xl neon-glow neon-flicker not-italic pt-1">
                    {currentSlide.headlineNeon}
                  </span>
                </motion.span>
              </AnimatePresence>
            </h1>

            {/* Subline */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`subline-${currentSlide.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#F7F1E3]/85 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-6"
                style={{ textWrap: 'balance' }}
              >
                {currentSlide.subline}
              </motion.p>
            </AnimatePresence>

            {/* Interactive Dish Tag (Slide 2 - 5) */}
            {currentSlide.dishItem && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 flex items-center"
              >
                <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-black/50 border border-[#D9A441]/40 backdrop-blur-md shadow-lg">
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8FCFB0]">
                      Featured Specialty
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#F6DC8E]">
                      {currentSlide.dishItem.name} · <span className="font-mono text-white">£{currentSlide.dishItem.price.toFixed(2)}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => handleDishTagAdd(currentSlide.dishItem!)}
                    aria-label={`Add ${currentSlide.dishItem.name} to order`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow ${
                      addedTagId === currentSlide.dishItem.id
                        ? 'bg-[#8FCFB0] text-[#0E3B2E]'
                        : 'bg-brass-gradient text-[#121A16] hover:opacity-95 active:scale-95'
                    }`}
                  >
                    {addedTagId === currentSlide.dishItem.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Action Buttons (visible without scrolling on mobile) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
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
            </div>
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

              {/* Inner Round Photograph matching current slide */}
              <div className="w-44 h-44 xl:w-52 xl:h-52 rounded-full overflow-hidden border-2 border-[#D9A441]/60 shadow-[0_10px_35px_rgba(0,0,0,0.6)] relative group">
                <img
                  src={currentSlide.image.primary}
                  alt={currentSlide.image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 hero-image-filter"
                  onError={e => {
                    if (currentSlide.image.fallback) {
                      (e.target as HTMLImageElement).src = currentSlide.image.fallback;
                    }
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Controls & Progress Tabs */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          {/* Slide Tab Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SLIDES.map((slide, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8F26A] ${
                    isActive
                      ? 'bg-[#F6DC8E] text-[#121A16] font-bold shadow'
                      : 'bg-black/30 hover:bg-black/50 text-[#F7F1E3]/70 hover:text-white border border-white/10'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden md:inline">{slide.label.split('/ ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={prevSlide}
              aria-label="Previous hero slide"
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/15 text-[#F7F1E3] hover:text-[#D8F26A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8F26A]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next hero slide"
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/15 text-[#F7F1E3] hover:text-[#D8F26A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D8F26A]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#F7F1E3]/80">
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
