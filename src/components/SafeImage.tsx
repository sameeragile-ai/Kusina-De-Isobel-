import React, { useState } from 'react';
import { ImageSlot } from '../data/images';
import { Utensils } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  image?: ImageSlot;
  dishName?: string;
  fallbackUrl?: string;
  priority?: boolean;
  aspectRatioClass?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Kusina De Isobel culinary specialty',
  image,
  dishName,
  fallbackUrl,
  priority = false,
  aspectRatioClass = 'aspect-4/3',
  containerClassName = '',
  className = '',
  ...props
}) => {
  const primarySrc = image ? image.primary : src;
  const secondarySrc = fallbackUrl || (image ? image.fallback : undefined);
  const displayName = dishName || (image ? image.dishName : 'Specialty Dish');
  const displayAlt = alt || (image ? image.alt : displayName);

  // Status: 0 = primary, 1 = secondary/loremflickr, 2 = gradient fallback
  const [attempt, setAttempt] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleError = () => {
    if (attempt === 0) {
      if (secondarySrc) {
        setAttempt(1);
      } else {
        // Fallback to loremflickr
        const keyword = encodeURIComponent(displayName.toLowerCase().replace(/[^a-z0-9]+/g, ','));
        setAttempt(1);
      }
    } else {
      setAttempt(2);
    }
  };

  const getActiveSrc = (): string | undefined => {
    if (attempt === 0) return primarySrc;
    if (attempt === 1) {
      if (secondarySrc && secondarySrc !== primarySrc) {
        return secondarySrc;
      }
      const keyword = encodeURIComponent(displayName.toLowerCase().replace(/[^a-z0-9]+/g, ','));
      return `https://loremflickr.com/900/700/${keyword}?lock=42`;
    }
    return undefined;
  };

  const activeSrc = getActiveSrc();

  return (
    <div
      className={`relative overflow-hidden bg-[#121A16] ${aspectRatioClass} ${containerClassName}`}
      style={{ isolation: 'isolate' }}
    >
      {attempt < 2 && activeSrc ? (
        <>
          <img
            src={activeSrc}
            alt={displayAlt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${className}`}
            {...props}
          />
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#121A16] via-[#1a2d24] to-[#0E3B2E] animate-pulse" />
          )}
        </>
      ) : (
        /* Branded Gradient Panel Fallback (Zero-Broken-Image Guarantee) */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0E3B2E] via-[#1a2d24] to-[#121A16] border border-[#D9A441]/20">
          <div className="w-12 h-12 rounded-full bg-[#8FCFB0]/10 border border-[#8FCFB0]/30 flex items-center justify-center mb-3 text-[#D8F26A]">
            <Utensils className="w-5 h-5 opacity-80" />
          </div>
          <span className="font-heading text-xl text-[#F6DC8E] tracking-wide mb-1 leading-tight">
            {displayName}
          </span>
          <span className="text-xs uppercase tracking-widest text-[#8FCFB0]/70 font-sans">
            Kusina De Isobel
          </span>
        </div>
      )}
    </div>
  );
};
