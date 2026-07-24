import React, { useState } from 'react';
import { Search, Plus, Smartphone, Monitor, ShoppingBag, Radio } from 'lucide-react';
import type { MainTab } from '../../types/tiktok';

interface HeaderProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  isMobileView: boolean;
  setIsMobileView: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMobileView,
  setIsMobileView,
  searchQuery,
  setSearchQuery,
  onOpenUpload,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchSuggestions = [
    '#Cyberpunk 2077',
    'Review Tai Nghe ANC',
    'Góc Setup Bàn Làm Việc',
    'CyberSound Pro',
    'Live Stream TikTok Shop'
  ];

  return (
    <header className="h-16 border-b border-[var(--border-glass)] glass-panel sticky top-0 z-50 flex items-center justify-between px-4 lg:px-8">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('for-you')}>
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#fe2c55] to-[#25f4ee] p-[2px]">
          <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center font-extrabold text-xl text-white tracking-tighter">
            <span className="text-[#fe2c55]">T</span>
            <span className="text-[#25f4ee]">K</span>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5 font-black text-xl tracking-tight text-white">
            TikTok <span className="bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] bg-clip-text text-transparent text-xs px-2 py-0.5 rounded-full border border-white/20 font-bold uppercase tracking-wider">Pro Max</span>
          </div>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-md mx-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm video, creator, âm nhạc hoặc sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchDropdown(true)}
            onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
            className="w-full h-10 pl-10 pr-10 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#fe2c55] focus:bg-white/10 transition-all"
          />
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {showSearchDropdown && (
          <div className="absolute top-12 left-0 right-0 glass-panel rounded-2xl p-3 shadow-2xl border border-white/10 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="text-xs font-semibold text-gray-400 px-3 py-1 mb-1">Xu hướng tìm kiếm 🔥</div>
            {searchSuggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSearchQuery(item);
                  setActiveTab('explore');
                }}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#25f4ee]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action Navigation & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setIsMobileView(!isMobileView)}
          title={isMobileView ? "Chuyển sang Giao diện Web Desktop" : "Chuyển sang Giả lập Smartphone Feed"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isMobileView
              ? 'bg-[#fe2c55]/20 border-[#fe2c55] text-[#fe2c55]'
              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
          }`}
        >
          {isMobileView ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
          <span className="hidden md:inline">{isMobileView ? 'Mobile Feed' : 'Desktop Feed'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('studio');
            onOpenUpload();
          }}
          className="btn-primary py-2 px-3 text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Tạo Video AI</span>
        </button>

        <button 
          onClick={() => setActiveTab('shop')}
          className={`p-2 rounded-full hover:bg-white/10 relative transition-colors ${activeTab === 'shop' ? 'text-[#25f4ee]' : 'text-gray-300'}`}
          title="TikTok Shop"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#25f4ee] rounded-full animate-ping" />
        </button>

        <button 
          onClick={() => setActiveTab('live')}
          className={`p-2 rounded-full hover:bg-white/10 relative transition-colors ${activeTab === 'live' ? 'text-[#fe2c55]' : 'text-gray-300'}`}
          title="Live Streams"
        >
          <Radio className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#fe2c55] rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="User avatar"
            className="w-8 h-8 rounded-full border border-[#25f4ee] cursor-pointer object-cover hover:scale-105 transition-transform"
            onClick={() => setActiveTab('analytics')}
          />
        </div>
      </div>
    </header>
  );
};
