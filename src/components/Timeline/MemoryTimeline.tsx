import React, { useState } from 'react';
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';
import type { MemoryMilestone } from '../../types/love';
import { MEMORY_MILESTONES } from '../../mock/coupleData';

export const MemoryTimeline: React.FC = () => {
  const [milestones] = useState<MemoryMilestone[]>(MEMORY_MILESTONES);
  const [selectedMilestone, setSelectedMilestone] = useState<MemoryMilestone | null>(null);

  const tilts = ['-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2'];

  return (
    <div className="relative z-10 my-20 max-w-5xl mx-auto px-4">
      {/* Title Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/10 text-[#f7d692] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-[#ff3366]" />
          <span>Timeline Of Precious Memories</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white mt-2">
          Những Cột Mốc Tình Yêu Thăng Hoa ✨
        </h2>
        <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
          Mỗi bước chân cùng nhau là một trang ký ức vô giá được khắc ghi trọn đời
        </p>
      </div>

      {/* Timeline Grid & Vertical Guide */}
      <div className="relative border-l-2 border-gradient-to-b from-[#ff3366] via-[#f7d692] to-transparent ml-4 sm:ml-36 space-y-16">
        {milestones.map((item, idx) => (
          <div key={item.id} className="relative pl-6 sm:pl-10 group">
            {/* Heart Emblem */}
            <div className="absolute -left-[19px] top-4 w-9 h-9 rounded-full bg-[#0e0512] border-2 border-[#ff3366] flex items-center justify-center text-[#ff3366] shadow-[0_0_20px_rgba(255,51,102,0.8)] group-hover:scale-125 transition-transform duration-300">
              <Heart className="w-4.5 h-4.5 fill-[#ff3366]" />
            </div>

            {/* Left Date Label for Desktop */}
            <div className="hidden sm:block absolute -left-40 top-5 text-right w-32 text-sm font-bold text-[#f7d692] font-mono tracking-wider">
              {item.date}
            </div>

            {/* 3D Polaroid Card */}
            <div className={`polaroid-card ${tilts[idx % tilts.length]} max-w-2xl text-left`}>
              <div className="sm:hidden text-xs font-bold text-[#ff3366] mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <div className="relative overflow-hidden rounded-xl md:w-56 h-48 shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onClick={() => setSelectedMilestone(item)}
                    className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#ff3366] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.tag}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between pt-1">
                  <div>
                    {item.location && (
                      <div className="text-xs text-gray-500 flex items-center gap-1 font-bold mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#ff3366]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-[#2b121d] leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed font-medium">{item.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-handwriting text-2xl text-[#ff3366] font-bold">Kỷ niệm ngọt ngào</span>
                    <button
                      onClick={() => setSelectedMilestone(item)}
                      className="text-xs font-bold text-[#ff3366] hover:underline"
                    >
                      Phóng to hình ảnh ➔
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full glass-dark-card p-6 rounded-[36px] text-center border border-white/20">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
            >
              ✕
            </button>
            <img
              src={selectedMilestone.imageUrl}
              alt={selectedMilestone.title}
              className="w-full max-h-[65vh] object-cover rounded-2xl mb-4 border border-white/10"
            />
            <h3 className="text-xl font-bold text-white font-serif-luxury">{selectedMilestone.title}</h3>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed max-w-xl mx-auto">{selectedMilestone.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
