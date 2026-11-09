import React from 'react';
import { CartProvider } from './context/CartContext';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { SignatureShowcase } from './components/SignatureShowcase';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { RatingBand } from './components/RatingBand';
import { GallerySection } from './components/GallerySection';
import { BookingFormSection } from './components/BookingFormSection';
import { VisitSection } from './components/VisitSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { StickyMobileOrderBar } from './components/StickyMobileOrderBar';

export default function App() {
  const handleScrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      {/* Session-aware Fullscreen Entrance Loader */}
      <Loader />

      <div className="relative min-h-screen bg-[#0E3B2E] text-[#F7F1E3] flex flex-col font-sans selection:bg-[#D9A441] selection:text-[#121A16]">
        {/* Fixed Navbar with Floating Glass Transition */}
        <Navbar onBookClick={handleScrollToBooking} />

        <main id="main-content" className="flex-1">
          {/* 1. Hero Section */}
          <Hero
            onOrderClick={handleScrollToMenu}
            onBookClick={handleScrollToBooking}
          />

          {/* 2. Thin Infinite Brass Marquee */}
          <Marquee />

          {/* 3. Signature Dishes Scroll-Snap Reel */}
          <SignatureShowcase />

          {/* 4. Menu on Chalkboard Surface with Filter Tabs */}
          <MenuSection />

          {/* 5. Our Story Split Layout on Mint with Hanging Lamps */}
          <StorySection />

          {/* 6. Google Rating Band with Animated Count-Up */}
          <RatingBand />

          {/* 7. Gallery with Parallax Masonry & Lightbox */}
          <GallerySection />

          {/* 8. Table Reservation CTA Form: 'Save your seat.' */}
          <BookingFormSection />

          {/* 9. Visit: Address, Full Hours, Live SVG Clock & Map */}
          <VisitSection />
        </main>

        {/* 10. Footer with Checkerboard Strip & Disclaimer */}
        <Footer />

        {/* Sliding Cart Drawer & Checkout */}
        <CartDrawer />

        {/* Mobile Sticky Order Bar when Cart has items */}
        <StickyMobileOrderBar />
      </div>
    </CartProvider>
  );
}
