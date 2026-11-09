import React from 'react';
import { ArrowUp, Star } from 'lucide-react';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Kusina+De+Isobel/data=!4m2!3m1!1s0x0:0x1d21bf786b88a91e?sa=X&ved=1t:2428&ictx=111';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#121A16] text-[#F7F1E3] pt-0 pb-12 overflow-hidden border-t border-[#D9A441]/20">
      {/* Grey & White Checkerboard Strip echoing the cafe's authentic floor */}
      <div className="checkerboard-strip w-full mb-12 shadow-sm" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Wordmark & Phrase */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="font-neon text-4xl sm:text-5xl md:text-6xl text-[#D8F26A] neon-glow block mb-2">
              Kusina De Isobel
            </span>
            <p className="font-heading text-xl sm:text-2xl text-[#F6DC8E]">
              Relax. Recharge. Enjoy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-[#8FCFB0] hover:text-white transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-[#D9A441] text-[#D9A441]" />
              <span className="font-bold text-white">4.7</span>
              <span>(246 Google Reviews)</span>
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#F7F1E3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Columns: About / Navigation / Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-b border-white/10 text-sm">
          {/* About */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading text-lg text-[#F7F1E3]">
              Your Cozy Neighbourhood Cafe
            </h4>
            <p className="text-xs sm:text-sm text-[#F7F1E3]/70 leading-relaxed max-w-md font-sans">
              Breakfast, brunch, comfort foods, and artisan coffee in our mint green dining room on Baker Street. Available to eat in or take away.
            </p>
            <p className="text-xs text-[#8FCFB0] font-mono">
              Coffee · Good Food · Good Vibes
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D9A441] mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F7F1E3]/80">
              <li><a href="#menu" className="hover:text-[#D8F26A] transition-colors">Kitchen Menu</a></li>
              <li><a href="#story" className="hover:text-[#D8F26A] transition-colors">Our Story & Ambience</a></li>
              <li><a href="#gallery" className="hover:text-[#D8F26A] transition-colors">Photo Gallery</a></li>
              <li><a href="#booking" className="hover:text-[#D8F26A] transition-colors">Save Your Seat</a></li>
              <li><a href="#visit" className="hover:text-[#D8F26A] transition-colors">Opening Hours & Map</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#D9A441] mb-3">
              Contact
            </h4>
            <address className="not-italic text-xs sm:text-sm text-[#F7F1E3]/80 space-y-2 font-sans">
              <div>
                34 Baker St, Weybridge<br />
                Surrey KT13 8AU, UK
              </div>
              <div>
                Tel:{' '}
                <a href="tel:+447747223705" className="text-[#F6DC8E] font-medium hover:underline font-mono">
                  +44 7747 223705
                </a>
              </div>
              <div className="text-[11px] text-[#8FCFB0]/70 font-mono">
                Avg. £10–£20 per person
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F1E3]/60">
          <p>© {new Date().getFullYear()} Kusina De Isobel. All rights reserved.</p>

          <p className="text-center sm:text-right text-[11px] text-[#8FCFB0]/70 font-mono">
            Preview concept. Images and some prices are placeholders.
          </p>
        </div>
      </div>
    </footer>
  );
};
