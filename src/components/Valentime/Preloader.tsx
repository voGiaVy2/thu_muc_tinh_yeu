import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400);
    }, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#eae0d9] flex flex-col items-center justify-center transition-opacity duration-500 animate-out fade-out duration-300">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Heart Logo */}
        <div className="w-16 h-16 rounded-full bg-[#da0000] text-white flex items-center justify-center shadow-xl shadow-[#da0000]/30 animate-pulse">
          <Heart className="w-9 h-9 fill-white" />
        </div>

        {/* Brand Text */}
        <span className="font-serif-editorial text-3xl font-bold tracking-widest text-[#202020] uppercase">
          HỒ SƠ TÌNH YÊU
        </span>

        {/* Preloader Text */}
        <p className="text-xs font-semibold tracking-widest uppercase text-[#7a6b68] flex items-center gap-1">
          <span>đang mở hồ sơ tình yêu</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
        </p>
      </div>
    </div>
  );
};
