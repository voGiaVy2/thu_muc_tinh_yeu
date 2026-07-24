import React from 'react';
import type { GiftItem } from '../../types/tiktok';

interface GiftAnimationProps {
  activeGift: GiftItem | null;
  senderName: string;
}

export const GiftAnimation: React.FC<GiftAnimationProps> = ({ activeGift, senderName }) => {
  if (!activeGift) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
      <div className="flex flex-col items-center floating-gift">
        <div className="text-6xl drop-shadow-[0_10px_20px_rgba(254,44,85,0.8)] animate-bounce">
          {activeGift.icon}
        </div>
        <div className="mt-2 glass-pill px-4 py-1.5 rounded-full border border-amber-400 text-amber-300 font-extrabold text-xs tracking-wide shadow-2xl flex items-center gap-2">
          <span>{senderName} đã tặng</span>
          <span className="text-white bg-[#fe2c55] px-2 py-0.5 rounded-full text-[10px]">
            {activeGift.name} ({activeGift.coins} 🪙)
          </span>
        </div>
      </div>
    </div>
  );
};
