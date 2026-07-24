import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Edit3, Check, Infinity } from 'lucide-react';
import type { CoupleInfo } from '../../types/love';

interface LoveCounterProps {
  couple: CoupleInfo;
  onUpdateCouple: (updated: CoupleInfo) => void;
}

export const LoveCounter: React.FC<LoveCounterProps> = ({ couple, onUpdateCouple }) => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [p1Name, setP1Name] = useState(couple.person1.name);
  const [p2Name, setP2Name] = useState(couple.person2.name);
  const [startDateStr, setStartDateStr] = useState(couple.startDate.split('T')[0]);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(couple.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [couple.startDate]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCouple({
      ...couple,
      person1: { ...couple.person1, name: p1Name },
      person2: { ...couple.person2, name: p2Name },
      startDate: `${startDateStr}T13:14:00`
    });
    setIsEditing(false);
  };

  const totalHours = elapsed.days * 24 + elapsed.hours;

  return (
    <div className="relative z-10 my-10 px-4 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#f7d692] text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-[#f7d692]/30 mb-4 shadow-lg">
        <Infinity className="w-4 h-4 text-[#f7d692]" />
        <span>Our Endless Love Journey</span>
        <Sparkles className="w-4 h-4 text-[#ff3366] animate-pulse" />
      </div>

      <h1 className="text-4xl sm:text-6xl font-serif-luxury italic font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ffccd5] to-[#f7d692] drop-shadow-2xl mb-10 leading-tight">
        {couple.person1.name} <span className="text-[#ff3366] font-romantic font-normal text-5xl sm:text-7xl">&</span> {couple.person2.name}
      </h1>

      <div className="relative flex items-center justify-center gap-6 sm:gap-14 mb-12">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-[#ff3366] to-transparent pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center group">
          <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#ff3366] via-[#f7d692] to-[#ff758f] shadow-[0_0_35px_rgba(255,51,102,0.5)] group-hover:scale-105 transition-transform duration-300">
            <img
              src={couple.person1.avatar}
              alt={couple.person1.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#0e0512]"
            />
          </div>
          <span className="mt-3 text-xl sm:text-2xl font-serif-luxury font-bold text-white tracking-wide">
            {couple.person1.name}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#ff3366] to-[#ff758f] border-4 border-[#0e0512] flex items-center justify-center animate-heartbeat shadow-[0_0_40px_rgba(255,51,102,0.8)]">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white" />
          </div>
          <span className="text-xs text-[#f7d692] font-bold mt-2 tracking-widest uppercase">
            Forever Linked
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center group">
          <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-[#f7d692] via-[#ff758f] to-[#ff3366] shadow-[0_0_35px_rgba(255,51,102,0.5)] group-hover:scale-105 transition-transform duration-300">
            <img
              src={couple.person2.avatar}
              alt={couple.person2.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#0e0512]"
            />
          </div>
          <span className="mt-3 text-xl sm:text-2xl font-serif-luxury font-bold text-white tracking-wide">
            {couple.person2.name}
          </span>
        </div>
      </div>

      <div className="glass-dark-card p-6 sm:p-12 rounded-[40px] relative overflow-hidden border border-white/20 shadow-2xl">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-5 right-5 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#f7d692]" />
          <span>{isEditing ? 'Đóng' : 'Tùy Chỉnh Kỷ Niệm'}</span>
        </button>

        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="space-y-4 max-w-md mx-auto py-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Tên Tình Yêu 1</label>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  className="w-full h-10 px-3 bg-white/10 border border-white/20 rounded-2xl text-xs text-white focus:outline-none focus:border-[#ff3366]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Tên Tình Yêu 2</label>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  className="w-full h-10 px-3 bg-white/10 border border-white/20 rounded-2xl text-xs text-white focus:outline-none focus:border-[#ff3366]"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">Ngày Bắt Đầu Yêu Nhau</label>
              <input
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full h-10 px-3 bg-[#150618] border border-white/20 rounded-2xl text-xs text-white focus:outline-none focus:border-[#ff3366]"
              />
            </div>
            <button type="submit" className="btn-luxury-primary py-2.5 px-8 text-xs mx-auto">
              <Check className="w-4 h-4" />
              <span>Cập Nhật Thông Tin</span>
            </button>
          </form>
        ) : (
          <>
            <p className="text-sm font-serif-luxury italic text-[#ffb3c6] mb-8 text-lg sm:text-2xl">
              "Khoảnh khắc bắt đầu tình yêu là điểm bắt đầu của hạnh phúc mãi mãi."
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              {[
                { label: 'Ngày', value: elapsed.days },
                { label: 'Giờ', value: elapsed.hours },
                { label: 'Phút', value: elapsed.minutes },
                { label: 'Giây', value: elapsed.seconds }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 p-5 rounded-[28px] backdrop-blur-xl flex flex-col items-center justify-center hover:border-[#ff3366]/60 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <span className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-[#ffffff] via-[#ff758f] to-[#f7d692] font-mono">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#f7d692] mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="text-[#ff3366]">✨</span>
                <span>Tổng cộng: <strong className="text-white">{totalHours.toLocaleString()} Giờ</strong> bên nhau</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#f7d692]">💖</span>
                <span>Hơn <strong className="text-white">{(elapsed.days * 12).toLocaleString()} nụ hôn</strong> đã trao</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
