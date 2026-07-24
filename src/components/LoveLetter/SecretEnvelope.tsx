import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X } from 'lucide-react';
import type { LoveLetter } from '../../types/love';
import { SECRET_LOVE_LETTER } from '../../mock/coupleData';
import confetti from 'canvas-confetti';

export const SecretEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [letter] = useState<LoveLetter>(SECRET_LOVE_LETTER);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    confetti({
      particleCount: 120,
      spread: 85,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="relative z-10 my-20 max-w-3xl mx-auto px-4 text-center">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-white/10 text-[#f7d692] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-[#ff3366]" />
          <span>Interactive Secret Love Letter</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mt-2">
          Bức Thư Tình Trân Quý ✉️❤️
        </h2>
        <p className="text-sm text-gray-400 mt-2">Mở phong thư để cảm nhận từng nhịp đập từ trái tim anh dành cho em</p>
      </div>

      {!isOpen ? (
        <div
          onClick={handleOpenEnvelope}
          className="relative glass-dark-card p-10 sm:p-14 rounded-[40px] border border-white/20 cursor-pointer hover:scale-105 transition-all duration-300 shadow-[0_20px_60px_rgba(255,51,102,0.3)] group"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#ff3366] via-[#ff758f] to-[#f7d692] p-1 mx-auto shadow-2xl group-hover:rotate-12 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#0e0512] flex items-center justify-center text-[#f7d692]">
              <Mail className="w-11 h-11" />
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#ff3366]/20 text-[#ff758f] text-xs font-extrabold px-4 py-1.5 rounded-full border border-[#ff3366]/40">
              <Sparkles className="w-4 h-4 text-[#f7d692]" />
              <span>Chạm nhẹ vào dấu ấn sáp để mở thư</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-handwriting font-bold text-[#f7d692]">{letter.title}</h3>
            <p className="text-xs text-gray-400 font-semibold">Gửi trao: {letter.receiver} ❤️</p>
          </div>
        </div>
      ) : (
        <div className="glass-luxury-card p-8 sm:p-12 rounded-[44px] border-4 border-white relative text-left animate-in zoom-in-95 duration-500 shadow-2xl bg-[#fffcf7]">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 text-[#ff3366] font-bold flex items-center justify-center hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-rose-100">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#ff3366]">
              <Heart className="w-6 h-6 fill-[#ff3366]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#2b121d]">{letter.title}</h3>
              <p className="text-xs text-gray-400">Gửi người con gái anh thương nhất</p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#3d1f2b] leading-relaxed font-serif-luxury italic">
            {letter.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-rose-100 flex items-center justify-between font-handwriting text-2xl text-[#ff3366]">
            <span>Ngày viết: {letter.writtenDate}</span>
            <span className="font-bold">Mãi yêu em, {letter.sender} ❤️</span>
          </div>
        </div>
      )}
    </div>
  );
};
