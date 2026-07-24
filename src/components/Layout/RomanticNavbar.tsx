import React from 'react';
import { Heart, Sparkles, HelpCircle } from 'lucide-react';
import type { CoupleInfo } from '../../types/love';

interface RomanticNavbarProps {
  couple: CoupleInfo;
  onOpenQuiz: () => void;
}

export const RomanticNavbar: React.FC<RomanticNavbarProps> = ({ couple, onOpenQuiz }) => {
  return (
    <header className="sticky top-0 z-40 h-16 glass-dark-card border-b border-white/10 px-4 lg:px-8 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#ff3366] to-[#f7d692] p-[1.5px] flex items-center justify-center shadow-lg">
          <div className="w-full h-full bg-[#0e0512] rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 fill-[#ff3366] text-[#ff3366] animate-heartbeat" />
          </div>
        </div>
        <span className="font-serif-luxury font-bold text-xl sm:text-2xl text-white tracking-wide">
          {couple.person1.name} <span className="text-[#ff3366] font-romantic text-2xl font-normal">&</span> {couple.person2.name}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenQuiz}
          className="bg-white/10 hover:bg-white/20 py-2 px-4 rounded-full text-xs font-bold text-[#f7d692] flex items-center gap-2 border border-white/20 shadow-md transition-all hover:scale-105"
        >
          <HelpCircle className="w-4 h-4 text-[#ff3366]" />
          <span>Quiz Tình Yêu ✨</span>
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#f7d692] font-extrabold bg-[#ff3366]/20 px-4 py-2 rounded-full border border-[#ff3366]/40 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#f7d692]" />
          <span>Forever & Always</span>
        </div>
      </div>
    </header>
  );
};
