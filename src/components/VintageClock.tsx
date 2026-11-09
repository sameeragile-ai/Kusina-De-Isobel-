import React, { useEffect, useState } from 'react';
import { getLondonNow } from '../utils/hours';

export const VintageClock: React.FC<{ size?: number }> = ({ size = 220 }) => {
  const [time, setTime] = useState<Date>(getLondonNow());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getLondonNow());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondAngle = seconds * 6; // 360 / 60
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-lg"
          aria-label={`Vintage clock showing London time: ${hours}:${minutes}:${seconds}`}
        >
          <defs>
            <radialGradient id="clockDialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B2B23" />
              <stop offset="85%" stopColor="#101C17" />
              <stop offset="100%" stopColor="#0B1310" />
            </radialGradient>

            <linearGradient id="brassBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6DC8E" />
              <stop offset="50%" stopColor="#D9A441" />
              <stop offset="100%" stopColor="#784B12" />
            </linearGradient>

            <linearGradient id="handGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2C6" />
              <stop offset="100%" stopColor="#D9A441" />
            </linearGradient>
          </defs>

          {/* Outer Brass Bezel */}
          <circle cx="100" cy="100" r="98" fill="url(#brassBezelGrad)" />
          <circle cx="100" cy="100" r="92" fill="#0A100D" />
          <circle cx="100" cy="100" r="90" fill="url(#brassBezelGrad)" />
          <circle cx="100" cy="100" r="86" fill="url(#clockDialGrad)" />

          {/* Dial Inner Ring */}
          <circle cx="100" cy="100" r="68" stroke="#D9A441" strokeWidth="0.75" fill="none" opacity="0.35" />

          {/* Brand inscription */}
          <text
            x="100"
            y="65"
            textAnchor="middle"
            fill="#D9A441"
            fontSize="7.5"
            fontFamily="'Gloock', Georgia, serif"
            letterSpacing="1.5"
          >
            KUSINA DE ISOBEL
          </text>
          <text
            x="100"
            y="74"
            textAnchor="middle"
            fill="#8FCFB0"
            fontSize="5.5"
            fontFamily="'Figtree', sans-serif"
            letterSpacing="1"
            opacity="0.8"
          >
            LONDON GMT
          </text>

          {/* Hour tick marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + 78 * Math.sin(angle);
            const y1 = 100 - 78 * Math.cos(angle);
            const x2 = 100 + 84 * Math.sin(angle);
            const y2 = 100 - 84 * Math.cos(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#F6DC8E"
                strokeWidth={i % 3 === 0 ? '2.5' : '1.25'}
                strokeLinecap="round"
                opacity={i % 3 === 0 ? '1' : '0.6'}
              />
            );
          })}

          {/* Minute dots */}
          {[...Array(60)].map((_, i) => {
            if (i % 5 === 0) return null;
            const angle = (i * 6 * Math.PI) / 180;
            const cx = 100 + 81 * Math.sin(angle);
            const cy = 100 - 81 * Math.cos(angle);
            return <circle key={i} cx={cx} cy={cy} r="0.75" fill="#8FCFB0" opacity="0.4" />;
          })}

          {/* Vintage Numerals (XII, III, VI, IX) */}
          <text x="100" y="36" textAnchor="middle" fill="#F6DC8E" fontSize="13" fontFamily="'Gloock', serif" fontWeight="bold">XII</text>
          <text x="168" y="104" textAnchor="middle" fill="#F6DC8E" fontSize="13" fontFamily="'Gloock', serif" fontWeight="bold">III</text>
          <text x="100" y="172" textAnchor="middle" fill="#F6DC8E" fontSize="13" fontFamily="'Gloock', serif" fontWeight="bold">VI</text>
          <text x="32" y="104" textAnchor="middle" fill="#F6DC8E" fontSize="13" fontFamily="'Gloock', serif" fontWeight="bold">IX</text>

          {/* Hour Hand */}
          <g transform={`rotate(${hourAngle} 100 100)`}>
            <polygon points="98,100 100,50 102,100 100,110" fill="url(#handGrad)" />
            <circle cx="100" cy="62" r="3" fill="#D9A441" />
          </g>

          {/* Minute Hand */}
          <g transform={`rotate(${minuteAngle} 100 100)`}>
            <polygon points="98.5,100 100,34 101.5,100 100,115" fill="#F6DC8E" />
            <circle cx="100" cy="46" r="2.5" fill="#D9A441" />
          </g>

          {/* Second Hand */}
          <g transform={`rotate(${secondAngle} 100 100)`}>
            <line x1="100" y1="120" x2="100" y2="28" stroke="#D8F26A" strokeWidth="1" strokeLinecap="round" />
            <circle cx="100" cy="40" r="1.5" fill="#D8F26A" />
          </g>

          {/* Central Pivot Nut */}
          <circle cx="100" cy="100" r="5" fill="#D9A441" />
          <circle cx="100" cy="100" r="2" fill="#121A16" />
        </svg>
      </div>

      <div className="mt-3 text-center">
        <span className="font-mono text-xs text-[#8FCFB0] tracking-widest uppercase">
          Live London Time
        </span>
        <div className="font-mono text-base font-bold text-[#F6DC8E]">
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
