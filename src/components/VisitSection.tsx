import React from 'react';
import { MapPin, Phone, ArrowUpRight, Compass } from 'lucide-react';
import { WEEKLY_HOURS, getLiveCafeStatus } from '../utils/hours';
import { VintageClock } from './VintageClock';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Kusina+De+Isobel/data=!4m2!3m1!1s0x0:0x1d21bf786b88a91e?sa=X&ved=1t:2428&ictx=111';

const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=34+Baker+St,+Weybridge+KT13+8AU&output=embed';

export const VisitSection: React.FC = () => {
  const cafeStatus = getLiveCafeStatus();
  const currentDayIndex = cafeStatus.dayIndex;

  return (
    <section
      id="visit"
      className="relative py-24 sm:py-32 bg-[#0E3B2E] text-[#F7F1E3] overflow-hidden"
      aria-labelledby="visit-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D9A441]/30 bg-black/40 text-xs font-mono text-[#D9A441] uppercase tracking-widest mb-3">
            <span>06</span>
            <span>·</span>
            <span>Find Our Green Room</span>
          </div>

          <h2 id="visit-heading" className="font-heading text-4xl sm:text-6xl text-[#F7F1E3] tracking-tight">
            Visit Kusina De Isobel
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#8FCFB0]/90">
            Conveniently situated on Baker Street, in the heart of Weybridge.
          </p>
        </div>

        {/* 3-Column Layout: Contact & Hours Table | Vintage Clock | Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Address, Phone & Full Weekly Hours Table */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-[#121A16] border border-white/10 p-6 sm:p-8 shadow-xl">
            <div>
              {/* Address Lockup */}
              <div className="flex items-start gap-3.5 mb-6">
                <div className="p-3 rounded-xl bg-[#0E3B2E] border border-[#D9A441]/30 text-[#D8F26A] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-[#F6DC8E] mb-1">
                    34 Baker Street
                  </h3>
                  <p className="text-sm text-[#F7F1E3]/80 leading-relaxed font-sans">
                    Weybridge, Surrey KT13 8AU<br />
                    United Kingdom
                  </p>
                </div>
              </div>

              {/* Phone Lockup */}
              <div className="flex items-start gap-3.5 mb-8">
                <div className="p-3 rounded-xl bg-[#0E3B2E] border border-[#D9A441]/30 text-[#D8F26A] shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-[#F6DC8E] mb-1">
                    Call Ahead
                  </h3>
                  <a
                    href="tel:+447747223705"
                    className="text-base text-[#F7F1E3] hover:text-[#D8F26A] font-semibold underline underline-offset-4 transition-colors font-mono"
                  >
                    +44 7747 223705
                  </a>
                  <p className="text-xs text-[#8FCFB0]/80 mt-0.5 font-sans">
                    For collection orders & reservations
                  </p>
                </div>
              </div>

              {/* Full Hours Table */}
              <div className="border-t border-white/10 pt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#D9A441] mb-3 flex items-center justify-between">
                  <span>Weekly Opening Hours</span>
                  <span className="text-[11px] text-[#8FCFB0] normal-case">
                    {cafeStatus.isOpen ? '● Open now' : '○ Closed now'}
                  </span>
                </h4>

                <div className="divide-y divide-white/5 text-xs sm:text-sm">
                  {WEEKLY_HOURS.map(h => {
                    const isToday = h.dayIndex === currentDayIndex;
                    return (
                      <div
                        key={h.day}
                        className={`py-2.5 px-3 flex items-center justify-between rounded-lg transition-colors ${
                          isToday
                            ? 'bg-[#0E3B2E] border border-[#D9A441]/40 font-semibold text-[#F6DC8E]'
                            : 'text-[#F7F1E3]/80'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{h.day}</span>
                          {isToday && (
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#D9A441] text-[#121A16] font-bold">
                              Today
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs">{h.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <div className="mt-8 pt-4 border-t border-white/10">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-[#121A16] bg-brass-gradient hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md group"
              >
                <Compass className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Middle Column: Vintage SVG Clock & Ambience */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center rounded-3xl bg-[#14201A] border border-[#D9A441]/25 p-6 sm:p-8 shadow-xl text-center">
            <VintageClock size={200} />

            <div className="mt-6 pt-6 border-t border-white/10 w-full text-xs text-[#8FCFB0] font-sans leading-relaxed">
              <p className="font-heading text-lg text-[#F7F1E3] mb-1">
                Warm Welcome
              </p>
              <p>
                Freshly grounded coffee and comfort food prepared throughout opening hours.
              </p>
            </div>
          </div>

          {/* Right Column: Embedded Google Maps Iframe */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden bg-[#121A16] border border-white/10 shadow-xl flex flex-col">
            <div className="relative w-full flex-1 min-h-[320px]">
              <iframe
                title="Kusina De Isobel Google Map Location"
                src={MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px]"
              />
            </div>
            <div className="p-4 bg-[#121A16] border-t border-white/10 flex items-center justify-between text-xs text-[#8FCFB0]">
              <span>Baker St, Weybridge KT13</span>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F6DC8E] font-medium hover:underline flex items-center gap-1"
              >
                <span>View Full Map</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
