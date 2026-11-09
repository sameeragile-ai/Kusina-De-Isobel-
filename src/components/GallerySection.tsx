import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { IMAGES, ImageSlot } from '../data/images';
import { SafeImage } from './SafeImage';

interface GalleryItem {
  slot: ImageSlot;
  tag: string;
  title: string;
  aspectClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    slot: IMAGES.heroInterior,
    tag: 'Cafe Ambience',
    title: 'The Green Room with Neon Sign & Balloons',
    aspectClass: 'aspect-4/3 md:aspect-16/10',
  },
  {
    slot: IMAGES.avocadoPoachedEggs,
    tag: 'Breakfast',
    title: 'Poached Eggs on Smashed Avocado Toast',
    aspectClass: 'aspect-square',
  },
  {
    slot: IMAGES.fullEnglish,
    tag: 'Breakfast',
    title: 'The Full English with Sourdough & Beans',
    aspectClass: 'aspect-4/3',
  },
  {
    slot: IMAGES.flatWhite,
    tag: 'Coffee',
    title: 'Artisan Latte Art in White Ceramic',
    aspectClass: 'aspect-square',
  },
  {
    slot: IMAGES.sharingPlatter,
    tag: 'Evening Grill',
    title: 'Signature Sharing Platter of Grilled Meats',
    aspectClass: 'aspect-4/3 md:aspect-16/10',
  },
  {
    slot: IMAGES.smokedSalmonPlate,
    tag: 'Brunch',
    title: 'Smoked Salmon Plate with Avocado & Eggs',
    aspectClass: 'aspect-4/3',
  },
  {
    slot: IMAGES.icedLatte,
    tag: 'Drinks',
    title: 'Iced Latte in Rustic Mason Jar',
    aspectClass: 'aspect-square',
  },
  {
    slot: IMAGES.sirloinSteak,
    tag: 'Grill',
    title: 'Sirloin Steak with Onion Rings & Chips',
    aspectClass: 'aspect-4/3',
  },
  {
    slot: IMAGES.chalkboardSign,
    tag: 'Chalkboard',
    title: 'Hand-Lettered Chalkboard Specialities',
    aspectClass: 'aspect-4/3',
  },
];

export const GallerySection: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Close lightbox on Escape key, navigate with Arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex(prev => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex(prev =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeImageIndex]);

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 bg-[#0E3B2E] text-[#F7F1E3] overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D9A441]/30 bg-black/30 text-xs font-mono text-[#D9A441] uppercase tracking-widest mb-3">
            <span>04</span>
            <span>·</span>
            <span>Gallery</span>
          </div>

          <h2 id="gallery-heading" className="font-heading text-4xl sm:text-5xl text-[#F7F1E3] tracking-tight">
            Life Inside the Cafe
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#8FCFB0]/90">
            From early morning espresso pulls to sizzling evening grill plates.
          </p>
        </div>

        {/* Masonry-Style Varied Grid with Staggered Parallax Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#121A16] border border-white/10 hover:border-[#D9A441]/50 transition-all duration-300 shadow-md"
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${item.title}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveImageIndex(idx);
                }
              }}
            >
              <div className={`w-full ${item.aspectClass} overflow-hidden relative`}>
                <SafeImage
                  image={item.slot}
                  dishName={item.title}
                  aspectRatioClass={item.aspectClass}
                  className="transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Hover Scrim & Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between text-[#F6DC8E] mb-1">
                    <span className="text-xs uppercase font-mono tracking-wider text-[#D8F26A]">
                      {item.tag}
                    </span>
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg text-[#F7F1E3] leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged photo preview"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImageIndex(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={e => {
                e.stopPropagation();
                setActiveImageIndex(prev =>
                  prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0
                );
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={e => {
                e.stopPropagation();
                setActiveImageIndex(prev =>
                  prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
                );
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[75vh]">
                <img
                  src={GALLERY_ITEMS[activeImageIndex].slot.primary}
                  alt={GALLERY_ITEMS[activeImageIndex].title}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl"
                  onError={e => {
                    // Fallback to secondary if primary fails
                    const target = e.target as HTMLImageElement;
                    if (GALLERY_ITEMS[activeImageIndex].slot.fallback) {
                      target.src = GALLERY_ITEMS[activeImageIndex].slot.fallback;
                    }
                  }}
                />
              </div>

              {/* Caption & Counter */}
              <div className="mt-4 text-center">
                <p className="font-heading text-lg sm:text-xl text-[#F6DC8E]">
                  {GALLERY_ITEMS[activeImageIndex].title}
                </p>
                <p className="text-xs text-[#8FCFB0] font-mono mt-1">
                  {activeImageIndex + 1} of {GALLERY_ITEMS.length} · Kusina De Isobel, Baker St
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
