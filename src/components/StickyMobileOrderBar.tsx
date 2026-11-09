import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const StickyMobileOrderBar: React.FC = () => {
  const { totalItems, subtotal, isCartOpen, openCart } = useCart();

  const shouldShow = totalItems > 0 && !isCartOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="sticky-mobile-cart-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-3 left-3 right-3 z-30 lg:hidden"
        >
          <button
            onClick={openCart}
            aria-label={`View order with ${totalItems} items, total £${subtotal.toFixed(2)}`}
            className="w-full py-3.5 px-5 rounded-2xl bg-brass-gradient text-[#121A16] font-bold text-sm shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-between active:scale-98 transition-transform border border-[#FFF0B8]/40"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-black/20 text-[#121A16]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-heading text-base font-semibold">
                View Order
              </span>
              <span className="text-xs bg-black/15 px-2 py-0.5 rounded-full font-mono">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold">
                £{subtotal.toFixed(2)}
              </span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
