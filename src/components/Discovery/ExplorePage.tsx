import React, { useState } from 'react';
import { Compass, Music2, Flame, Play, Heart } from 'lucide-react';
import { INITIAL_VIDEOS, SOUND_TRACKS } from '../../mock/initialData';
import type { VideoPost } from '../../types/tiktok';

interface ExplorePageProps {
  onSelectVideo: (vid: VideoPost) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onSelectVideo }) => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [playingSoundId, setPlayingSoundId] = useState<string | null>(null);

  const categories = ['Tất cả', 'Tech & AI', 'Fashion', 'Gaming', 'Music', 'Food'];

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-8 bg-[#0b0c10]">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#25f4ee]" />
          <span>Khám Phá Xu Hướng TikTok 2026</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Tìm kiếm nội dung thịnh hành, âm thanh viral và Creator nổi tiếng</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === c
                ? 'bg-gradient-to-r from-[#25f4ee] to-blue-500 text-black shadow-lg'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mb-8 glass-panel p-5 rounded-3xl border border-white/10">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Music2 className="w-4 h-4 text-[#fe2c55]" />
          <span>Âm Nhạc & Sound Tracks Viral Hot Nhất</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOUND_TRACKS.map((sound) => (
            <div
              key={sound.id}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-[#25f4ee]/40 transition-colors cursor-pointer"
            >
              <div className="relative group shrink-0">
                <img src={sound.coverUrl} alt={sound.title} className="w-12 h-12 rounded-xl object-cover" />
                <button
                  onClick={() => setPlayingSoundId(playingSoundId === sound.id ? null : sound.id)}
                  className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center text-white"
                >
                  <Play className="w-5 h-5 fill-white" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-white truncate">{sound.title}</h3>
                <p className="text-[10px] text-gray-400 truncate">{sound.artist}</p>
                <span className="text-[9px] text-[#25f4ee] font-semibold">{sound.useCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
        <Flame className="w-4 h-4 text-amber-400" />
        <span>Video Được Đề Xuất Nổi Bật</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {INITIAL_VIDEOS.map((vid) => (
          <div
            key={vid.id}
            onClick={() => onSelectVideo(vid)}
            className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-[#fe2c55]/50 transition-all"
          >
            <img src={vid.poster} alt={vid.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] text-white font-bold">
                <span className="bg-[#fe2c55] px-2 py-0.5 rounded-full text-[9px]">{vid.category}</span>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-[#fe2c55] text-[#fe2c55]" />
                  <span>{(vid.stats.likes / 1000).toFixed(1)}k</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-white line-clamp-2 leading-snug drop-shadow">{vid.caption}</p>
                <p className="text-[10px] text-gray-300 mt-1">@{vid.author.handle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
