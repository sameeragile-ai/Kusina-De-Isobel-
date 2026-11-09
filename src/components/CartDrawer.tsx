import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';
import { generateCollectionSlots } from '../utils/hours';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderError, setOrderError] = useState('');
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');
  const [confirmedSlotsLabel, setConfirmedSlotsLabel] = useState('');

  const slotData = generateCollectionSlots();

  // Set default slot when available
  useEffect(() => {
    if (slotData.slots.length > 0 && !selectedSlot) {
      setSelectedSlot(slotData.slots[0]);
    }
  }, [slotData.slots, selectedSlot]);

  // Reset checkout step when drawer re-opens if empty
  useEffect(() => {
    if (isCartOpen && items.length === 0 && checkoutStep !== 'confirmation') {
      setCheckoutStep('cart');
    }
  }, [isCartOpen, items.length, checkoutStep]);

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setOrderError('Please enter your name for collection');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setOrderError('Please enter a valid UK contact number');
      return;
    }
    if (!selectedSlot) {
      setOrderError('Please select a collection time');
      return;
    }

    setOrderError('');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `#KD-${randomNum}`;
    setConfirmedOrderNumber(orderNum);
    setConfirmedSlotsLabel(`${slotData.dayLabel} at ${selectedSlot}`);
    setCheckoutStep('confirmation');
    clearCart();
  };

  const handleFinish = () => {
    setCheckoutStep('cart');
    setCustomerName('');
    setCustomerPhone('');
    setOrderNotes('');
    closeCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Order Cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Drawer: Slide in from right on desktop, bottom sheet on mobile */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#121A16] border-l border-[#D9A441]/30 shadow-2xl flex flex-col justify-between pointer-events-auto h-full text-[#F7F1E3]"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#18231E]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#D8F26A]" />
                  <h2 className="font-heading text-xl text-[#F6DC8E]">
                    {checkoutStep === 'confirmation'
                      ? 'Order Confirmed'
                      : checkoutStep === 'checkout'
                      ? 'Collection Details'
                      : `Your Order (${totalItems})`}
                  </h2>
                </div>

                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="p-2 rounded-xl text-[#F7F1E3]/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                {checkoutStep === 'cart' && (
                  <>
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-16">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8FCFB0] mb-4">
                          <ShoppingBag className="w-8 h-8 opacity-40" />
                        </div>
                        <h3 className="font-heading text-xl text-[#F7F1E3] mb-2">
                          Your cart is empty
                        </h3>
                        <p className="text-xs sm:text-sm text-[#F7F1E3]/60 max-w-xs mb-6 font-sans">
                          Explore our sourdough breakfast plates, signature grill cuts, or fresh artisan coffee.
                        </p>
                        <button
                          onClick={closeCart}
                          className="px-5 py-2.5 rounded-xl bg-brass-gradient text-[#121A16] font-semibold text-xs shadow-md"
                        >
                          Explore Menu
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <AnimatePresence initial={false}>
                          {items.map(cartItem => (
                            <motion.div
                              key={cartItem.cartId}
                              layout
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex items-center gap-3.5 p-3 rounded-xl bg-black/30 border border-white/10"
                            >
                              {/* Thumbnail */}
                              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                <SafeImage
                                  image={cartItem.item.image}
                                  dishName={cartItem.item.name}
                                  aspectRatioClass="aspect-square"
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-heading text-sm text-[#F7F1E3] truncate">
                                  {cartItem.item.name}
                                </h4>
                                {cartItem.selectedOption && (
                                  <span className="text-[11px] text-[#8FCFB0] block truncate">
                                    {cartItem.selectedOption}
                                  </span>
                                )}
                                <span className="font-mono text-xs text-[#F6DC8E] font-bold">
                                  £{(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                                </span>
                              </div>

                              {/* Steppers */}
                              <div className="flex items-center gap-1.5 shrink-0 bg-white/5 rounded-lg p-1 border border-white/10">
                                <button
                                  onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                                  aria-label="Decrease quantity"
                                  className="p-1 hover:text-[#D8F26A] text-[#F7F1E3]/80 transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-5 text-center font-mono text-xs font-bold text-white">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                                  aria-label="Increase quantity"
                                  className="p-1 hover:text-[#D8F26A] text-[#F7F1E3]/80 transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(cartItem.cartId)}
                                aria-label={`Remove ${cartItem.item.name}`}
                                className="p-1.5 text-white/40 hover:text-[#FF8E8E] transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {/* Order Type Notice */}
                        <div className="p-3 rounded-xl bg-[#0E3B2E]/60 border border-[#8FCFB0]/20 text-xs text-[#8FCFB0] flex items-center gap-2">
                          <Clock className="w-4 h-4 shrink-0 text-[#D8F26A]" />
                          <span>Collection from 34 Baker Street, Weybridge</span>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Checkout Step */}
                {checkoutStep === 'checkout' && (
                  <form id="collection-form" onSubmit={handlePlaceOrder} className="space-y-5">
                    {/* Notice about collection time */}
                    <div className="p-3.5 rounded-xl bg-[#0E3B2E] border border-[#D9A441]/40 text-xs text-[#F7F1E3] space-y-1">
                      <div className="font-semibold text-[#F6DC8E] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slotData.dayLabel}</span>
                      </div>
                      <p className="text-[#8FCFB0]">
                        {slotData.isTomorrow
                          ? "We are currently closed for today's orders. Please choose a collection time for tomorrow!"
                          : "Orders are prepared fresh. Please pick your collection window:"}
                      </p>
                    </div>

                    {orderError && (
                      <div className="p-3 rounded-lg bg-[#9E1F2C]/30 border border-[#9E1F2C] text-xs text-[#FFC4C4]">
                        {orderError}
                      </div>
                    )}

                    {/* Time Slot Select */}
                    <div className="flex flex-col">
                      <label htmlFor="slot-select" className="text-xs font-mono uppercase text-[#F6DC8E] mb-1.5">
                        Collection Time Slot *
                      </label>
                      <select
                        id="slot-select"
                        value={selectedSlot}
                        onChange={e => setSelectedSlot(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/40 border border-white/20 text-[#F7F1E3] text-sm focus:border-[#D9A441] focus:outline-none"
                      >
                        {slotData.slots.map(slot => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Customer Name */}
                    <div className="flex flex-col">
                      <label htmlFor="checkout-name" className="text-xs font-mono uppercase text-[#F6DC8E] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="checkout-name"
                        type="text"
                        placeholder="e.g. David Ross"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/40 border border-white/20 text-[#F7F1E3] placeholder-white/30 text-sm focus:border-[#D9A441] focus:outline-none"
                      />
                    </div>

                    {/* Customer Phone */}
                    <div className="flex flex-col">
                      <label htmlFor="checkout-phone" className="text-xs font-mono uppercase text-[#F6DC8E] mb-1.5">
                        UK Mobile Phone *
                      </label>
                      <input
                        id="checkout-phone"
                        type="tel"
                        placeholder="e.g. 07747 123456"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/40 border border-white/20 text-[#F7F1E3] placeholder-white/30 text-sm focus:border-[#D9A441] focus:outline-none"
                      />
                    </div>

                    {/* Order Notes */}
                    <div className="flex flex-col">
                      <label htmlFor="checkout-notes" className="text-xs font-mono uppercase text-[#F6DC8E] mb-1.5">
                        Kitchen Note (Optional)
                      </label>
                      <input
                        id="checkout-notes"
                        type="text"
                        placeholder="e.g. Oat milk in latte, extra crispy toast"
                        value={orderNotes}
                        onChange={e => setOrderNotes(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-black/40 border border-white/20 text-[#F7F1E3] placeholder-white/30 text-sm focus:border-[#D9A441] focus:outline-none"
                      />
                    </div>
                  </form>
                )}

                {/* Confirmation Step */}
                {checkoutStep === 'confirmation' && (
                  <div className="text-center py-6 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#8FCFB0]/20 border-2 border-[#8FCFB0] flex items-center justify-center text-[#D8F26A] mb-4">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <h3 className="font-heading text-2xl text-[#F6DC8E] mb-1">
                      Order Placed!
                    </h3>

                    <div className="font-mono text-xl font-bold text-white bg-black/40 py-1.5 px-4 rounded-lg border border-[#D9A441]/40 my-3">
                      {confirmedOrderNumber}
                    </div>

                    <p className="text-xs sm:text-sm text-[#F7F1E3]/85 leading-relaxed mb-6 font-sans">
                      Thank you, <strong className="text-white">{customerName}</strong>! Your order is being sent to the kitchen.
                    </p>

                    <div className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-xs text-left space-y-2 mb-6 font-mono text-[#8FCFB0]">
                      <div>Collection: {confirmedSlotsLabel}</div>
                      <div>Address: 34 Baker St, Weybridge KT13 8AU</div>
                      <div>Contact: +44 7747 223705</div>
                      <div>Payment: Pay at counter upon collection</div>
                    </div>

                    <button
                      onClick={handleFinish}
                      className="w-full py-3.5 rounded-xl bg-brass-gradient text-[#121A16] font-bold text-sm shadow-md"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && checkoutStep !== 'confirmation' && (
                <div className="p-5 sm:p-6 border-t border-white/10 bg-[#18231E] space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#F7F1E3]/70 font-sans">Subtotal</span>
                    <span className="font-mono text-xl font-bold text-[#F6DC8E]">
                      £{subtotal.toFixed(2)}
                    </span>
                  </div>

                  {checkoutStep === 'cart' ? (
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full py-4 px-6 rounded-xl bg-brass-gradient text-[#121A16] font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all"
                    >
                      <span>Proceed to Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="py-3 px-4 rounded-xl border border-white/20 text-[#F7F1E3] hover:bg-white/5 text-xs font-semibold"
                      >
                        Back
                      </button>
                      <button
                        form="collection-form"
                        type="submit"
                        className="flex-1 py-3.5 px-4 rounded-xl bg-brass-gradient text-[#121A16] font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
                      >
                        <span>Place Order ({totalItems} items)</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
