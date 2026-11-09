import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, MenuCategory, MenuItem } from '../data/menu';
import { SafeImage } from './SafeImage';
import { useCart } from '../context/CartContext';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedCheese, setSelectedCheese] = useState<boolean>(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const { addItem } = useCart();

  const filteredItems =
    selectedCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    let optName: string | undefined;
    let optPrice = 0;

    if (item.id === 'beef-burger' && selectedCheese) {
      optName = 'With Melted Cheddar Cheese';
      optPrice = 1.00;
    }

    addItem(item, optName, optPrice);

    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section
      id="menu"
      className="relative py-20 sm:py-28 chalkboard-surface text-[#F7F1E3] overflow-hidden border-y border-[#D9A441]/20"
      aria-labelledby="menu-heading"
    >
      {/* Decorative brass corner framing */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 w-12 h-12 border-t-2 border-l-2 border-[#D9A441]/40 pointer-events-none" />
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 border-t-2 border-r-2 border-[#D9A441]/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-12 h-12 border-b-2 border-l-2 border-[#D9A441]/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 border-b-2 border-r-2 border-[#D9A441]/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header with human chalkboard styling */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D9A441]/30 bg-black/40 text-xs font-mono text-[#D9A441] uppercase tracking-widest mb-3">
            <span>02</span>
            <span>·</span>
            <span>The Chalkboard</span>
          </div>

          <h2 id="menu-heading" className="font-heading text-4xl sm:text-6xl text-[#F7F1E3] tracking-tight">
            Our Kitchen Menu
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#8FCFB0]/90">
            Available to eat in or take away · Cooked fresh daily on Baker Street
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D9A441] to-transparent mx-auto mt-4" />
        </div>

        {/* Animated Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map(category => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] ${
                  isSelected
                    ? 'bg-brass-gradient text-[#121A16] font-semibold shadow-md'
                    : 'bg-black/30 hover:bg-black/50 text-[#F7F1E3]/80 border border-white/10 hover:border-[#D9A441]/30'
                }`}
              >
                <span>{category.label}</span>

                {/* Berry Red Ribbon on Grill and Sharing tabs */}
                {category.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-tight uppercase whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#9E1F2C] text-white'
                        : 'bg-[#9E1F2C] text-white'
                    }`}
                  >
                    {category.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Varied Menu Grid with Asymmetric Accents */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => {
              const isAdded = !!addedItems[item.id];
              const isFeatured = item.category === 'sharing' || item.id === 'sirloin-steak';

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`group relative rounded-2xl overflow-hidden bg-[#18231E]/90 border border-[#D9A441]/25 hover:border-[#D9A441]/60 transition-all duration-300 shadow-md flex flex-col justify-between ${
                    isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Top Image Banner */}
                  <div className="relative overflow-hidden aspect-16/10">
                    <SafeImage
                      image={item.image}
                      dishName={item.name}
                      aspectRatioClass="aspect-16/10"
                      className="transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18231E] via-transparent to-transparent opacity-90" />

                    {/* Category Label */}
                    <span className="absolute top-3 left-3 text-[11px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-black/60 text-[#8FCFB0] border border-white/10">
                      {item.category}
                    </span>

                    {/* Special Red Note if any */}
                    {item.specialNote && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-[#9E1F2C] text-white shadow-sm">
                        Thu, Fri, Sat
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title and Price */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-heading text-lg sm:text-xl text-[#F6DC8E] group-hover:text-white transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-mono text-base font-bold text-white shrink-0">
                          £{item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#F7F1E3]/75 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Optional Burger Cheese Addon */}
                      {item.options && (
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                          <label className="flex items-center gap-2 text-xs text-[#8FCFB0] cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={selectedCheese}
                              onChange={e => setSelectedCheese(e.target.checked)}
                              className="rounded border-[#D9A441] text-[#D9A441] focus:ring-0 w-3.5 h-3.5 accent-[#D9A441]"
                            />
                            <span>Add melted cheddar cheese (+£1.00)</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Action */}
                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] text-[#8FCFB0]/70 font-mono">
                        Freshly prepared
                      </span>

                      <button
                        onClick={() => handleAddToCart(item)}
                        aria-label={`Add ${item.name} to order`}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] ${
                          isAdded
                            ? 'bg-[#8FCFB0] text-[#0E3B2E] scale-105'
                            : 'bg-brass-gradient text-[#121A16] hover:opacity-95 active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Added to Order</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
