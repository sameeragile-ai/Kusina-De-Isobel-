import React, { useEffect, useState } from 'react';
import { Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/Kusina+De+Isobel/data=!4m2!3m1!1s0x0:0x1d21bf786b88a91e?sa=X&ved=1t:2428&ictx=111';

export const RatingBand: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // Animate rating from 0 to 4.7
    const duration = 1200;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);

      setRating(Number((eased * 4.7).toFixed(1)));
      setReviews(Math.round(eased * 246));

      if (progress >= 1) {
        clearInterval(interval);
        setRating(4.7);
        setReviews(246);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 bg-[#121A16] border-y border-[#D9A441]/20 overflow-hidden"
      aria-label="Google Customer Rating"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial from-[#1e3328]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 text-center lg:text-left">
          {/* Left: Star cluster & Real verified score */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1 text-[#D9A441] mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 sm:w-7 sm:h-7 fill-[#D9A441]" />
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-heading text-5xl sm:text-7xl font-bold text-[#F7F1E3] tabular-nums font-mono">
                  {rating.toFixed(1)}
                </span>
                <span className="text-xl sm:text-2xl text-[#8FCFB0] font-sans">
                  / 5.0
                </span>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-white/10 hidden sm:block" />

            {/* Total reviews count-up */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase tracking-wider text-[#D8F26A]">
                <CheckCircle2 className="w-4 h-4 text-[#8FCFB0]" />
                <span>Verified Google Rating</span>
              </div>
              <p className="font-heading text-2xl sm:text-3xl text-[#F6DC8E] font-bold mt-1">
                <span className="tabular-nums font-mono">{reviews}</span> Real Reviews
              </p>
              <p className="text-xs sm:text-sm text-[#F7F1E3]/70 font-sans">
                By Weybridge neighbours and visitors on Baker Street
              </p>
            </div>
          </div>

          {/* Right: Direct Link Button */}
          <div className="shrink-0">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-[#121A16] bg-brass-gradient hover:opacity-95 active:scale-95 transition-all shadow-[0_6px_20px_rgba(217,164,65,0.3)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8F26A]"
            >
              <span>Read Our Reviews on Google</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
