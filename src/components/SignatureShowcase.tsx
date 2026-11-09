import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { SIGNATURE_DISHES, MenuItem } from '../data/menu';
import { SafeImage } from './SafeImage';
import { useCart } from '../context/CartContext';

export const SignatureShowcase: React.FC = () => {
  const { addItem } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (dish: MenuItem) => {
    addItem(dish);
    setAddedIds(prev => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -360 : 360;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="relative py-16 sm:py-24 bg-[#0E3B2E] overflow-hidden" aria-labelledby="signatures-heading">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#8FCFB0]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#D9A441] mb-2 font-mono">
              <span>01</span>
              <span>/</span>
              <span>Signature Dishes</span>
            </div>
            <h2 id="signatures-heading" className="font-heading text-3xl sm:text-5xl text-[#F7F1E3] tracking-tight">
              Honest Comfort Food
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8FCFB0]/80 max-w-xl">
              Cooked fresh to order using British produce, generous cuts, and honest recipes.
            </p>
          </div>

          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-3 rounded-xl border border-white/10 bg-black/20 text-[#F7F1E3] hover:text-[#D8F26A] hover:border-[#D9A441]/50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-3 rounded-xl border border-white/10 bg-black/20 text-[#F7F1E3] hover:text-[#D8F26A] hover:border-[#D9A441]/50 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll-Snap Horizontal Reel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SIGNATURE_DISHES.map((dish, index) => {
            const isAdded = !!addedIds[dish.id];
            return (
              <div
                key={dish.id}
                className="w-[82vw] sm:w-[340px] md:w-[380px] shrink-0 snap-center flex flex-col rounded-2xl overflow-hidden bg-[#121A16] border border-white/10 hover:border-[#D9A441]/40 transition-all duration-300 group shadow-lg"
              >
                {/* Dish Photo */}
                <div className="relative overflow-hidden aspect-4/3">
                  <SafeImage
                    image={dish.image}
                    dishName={dish.name}
                    aspectRatioClass="aspect-4/3"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121A16] via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[11px] font-mono text-[#D8F26A] uppercase tracking-wider">
                    Signature #{index + 1}
                  </div>

                  {/* Quick Add floating button */}
                  <button
                    onClick={() => handleQuickAdd(dish)}
                    aria-label={`Quick add ${dish.name} to order`}
                    className={`absolute bottom-3 right-3 p-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] ${
                      isAdded
                        ? 'bg-[#8FCFB0] text-[#0E3B2E] scale-105'
                        : 'bg-brass-gradient text-[#121A16] hover:opacity-95 active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span className="text-xs">Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                        <span className="text-xs">Quick Add</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dish Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-heading text-xl text-[#F7F1E3] group-hover:text-[#F6DC8E] transition-colors leading-snug">
                        {dish.name}
                      </h3>
                      <span className="font-mono text-base font-bold text-[#F6DC8E] shrink-0">
                        £{dish.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#F7F1E3]/70 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {dish.specialNote && (
                    <div className="mt-3 text-[11px] text-[#9E1F2C] font-semibold bg-[#9E1F2C]/10 py-1 px-2.5 rounded border border-[#9E1F2C]/30 w-fit">
                      {dish.specialNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
