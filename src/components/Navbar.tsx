import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Clock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getLiveCafeStatus } from '../utils/hours';

interface NavbarProps {
  onBookClick: () => void;
}

const NAV_LINKS = [
  { href: '#menu', label: 'Menu', id: 'menu' },
  { href: '#story', label: 'Our Story', id: 'story' },
  { href: '#gallery', label: 'Gallery', id: 'gallery' },
  { href: '#visit', label: 'Visit', id: 'visit' },
];

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const { totalItems, openCart, lastAddedKey } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cafeStatus, setCafeStatus] = useState(getLiveCafeStatus());

  // Update cafe status every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCafeStatus(getLiveCafeStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener for sticky glass transition & progress line
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / winHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'menu', 'story', 'gallery', 'visit'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-20% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  // Body scroll lock during mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out flex justify-center ${
          isScrolled
            ? 'py-2 px-3 sm:px-6'
            : 'py-4 sm:py-5 px-4 sm:px-8'
        }`}
      >
        <div
          className={`w-full transition-all duration-500 relative ${
            isScrolled
              ? 'max-w-6xl glass-nav rounded-2xl py-2.5 px-4 sm:px-6'
              : 'max-w-7xl bg-transparent py-1 px-2'
          }`}
        >
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left: Brand Logo Wordmark */}
            <a
              href="#hero"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A] rounded-lg"
              aria-label="Kusina De Isobel - Back to Top"
            >
              <span className="font-neon text-2xl sm:text-3xl text-[#D8F26A] neon-glow tracking-wide transition-transform duration-300 group-hover:scale-105 whitespace-nowrap">
                Kusina De Isobel
              </span>
            </a>

            {/* Centre: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`relative py-1 text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-[#F6DC8E]'
                        : isScrolled
                        ? 'text-[#F7F1E3]/90 hover:text-[#D8F26A]'
                        : 'text-[#F7F1E3] hover:text-[#D8F26A]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brass-gradient rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Status chip, Cart icon, Book CTA */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              {/* Live Open Status Chip */}
              <div
                className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-black/20 text-[#F7F1E3]/90 whitespace-nowrap"
                title={cafeStatus.statusText}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      cafeStatus.isOpen ? 'bg-[#8FCFB0]' : 'bg-[#D9A441]'
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      cafeStatus.isOpen ? 'bg-[#8FCFB0]' : 'bg-[#D9A441]'
                    }`}
                  />
                </span>
                <span>{cafeStatus.isOpen ? 'Open today' : 'Closed now'}</span>
              </div>

              {/* Cart Icon Button with bouncing badge */}
              <button
                onClick={openCart}
                aria-label={`Open shopping cart with ${totalItems} items`}
                className="relative p-2 rounded-xl text-[#F7F1E3] hover:text-[#D8F26A] bg-black/20 hover:bg-black/30 border border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441]"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    key={lastAddedKey || totalItems}
                    initial={{ scale: 0.5, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-brass-gradient text-[#121A16] font-bold text-[11px] flex items-center justify-center shadow-md font-mono"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Primary Book CTA */}
              <button
                onClick={onBookClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#121A16] bg-brass-gradient hover:opacity-95 active:scale-95 transition-all shadow-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
              >
                <span>Book a Table</span>
              </button>

              {/* Mobile Animated Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                className="lg:hidden p-2 rounded-xl text-[#F7F1E3] bg-black/20 hover:bg-black/30 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Thin Brass Scroll Progress Line along bottom edge */}
          {isScrolled && (
            <div className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-white/5 overflow-hidden rounded-full">
              <div
                className="h-full bg-brass-gradient transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 lg:hidden bg-[#0E3B2E] flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Background ambiance */}
            <div className="absolute inset-0 bg-radial from-[#1e4e3f]/40 via-transparent to-black/60 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="border-b border-white/10 pb-4">
                <span className="font-neon text-3xl text-[#D8F26A] neon-glow">
                  Kusina De Isobel
                </span>
                <p className="text-xs text-[#8FCFB0] mt-1 font-sans">
                  34 Baker St, Weybridge KT13 8AU
                </p>
              </div>

              {/* Staggered Navigation Links */}
              <nav className="flex flex-col gap-5 py-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading text-3xl text-[#F7F1E3] hover:text-[#D8F26A] flex items-center justify-between py-1 transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-5 h-5 text-[#D9A441] opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Book Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3.5 px-6 rounded-xl bg-brass-gradient text-[#121A16] font-bold text-base shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                <span>Book a Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom details inside mobile menu */}
            <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-[#F7F1E3]/70 space-y-2">
              <div className="flex items-center gap-2 text-[#D8F26A]">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{cafeStatus.statusText}</span>
              </div>
              <p>
                Phone:{' '}
                <a href="tel:+447747223705" className="text-[#F6DC8E] font-medium underline">
                  +44 7747 223705
                </a>
              </p>
              <p className="text-[#8FCFB0]/70 text-[11px]">
                Coffee · Good food · Good vibes · Eat in or take away
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
