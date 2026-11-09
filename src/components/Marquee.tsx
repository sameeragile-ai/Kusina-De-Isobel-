import React from 'react';

const MARQUEE_ITEMS = [
  'Coffee',
  'Good Food',
  'Good Vibes',
  'Eat In',
  'Take Away',
  'Relax',
  'Recharge',
  'Enjoy',
  'Weybridge KT13',
  'Breakfast & Brunch',
  'Comfort Foods',
];

export const Marquee: React.FC = () => {
  return (
    <div
      className="relative w-full py-2.5 overflow-hidden bg-brass-gradient text-[#121A16] select-none shadow-inner border-y border-[#A8701F]/40"
      aria-hidden="true"
    >
      <div className="flex w-max items-center animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Repeated chunks for seamless loop */}
        {[0, 1, 2, 3].map(loopIndex => (
          <div key={loopIndex} className="flex items-center shrink-0">
            {MARQUEE_ITEMS.map((item, idx) => (
              <span key={`${loopIndex}-${idx}`} className="flex items-center">
                <span className="font-heading text-sm sm:text-base font-semibold tracking-wider uppercase px-4 sm:px-6">
                  {item}
                </span>
                <span className="text-xs opacity-75 font-mono">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_28s_linear_infinite\\] {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};
