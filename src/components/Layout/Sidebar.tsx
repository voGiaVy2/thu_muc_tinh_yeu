import React from 'react';
import { Home, Users, ShoppingBag, Radio, Compass, Video, BarChart2, TrendingUp } from 'lucide-react';
import type { MainTab } from '../../types/tiktok';

interface SidebarProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const mainNav = [
    { id: 'for-you', label: 'Dành cho bạn', icon: Home, badge: null },
    { id: 'following', label: 'Đang theo dõi', icon: Users, badge: null },
    { id: 'shop', label: 'TikTok Shop', icon: ShoppingBag, badge: 'HOT' },
    { id: 'live', label: 'LIVE Stream', icon: Radio, badge: 'LIVE' },
    { id: 'explore', label: 'Khám phá', icon: Compass, badge: null },
    { id: 'studio', label: 'Studio AI', icon: Video, badge: 'AI' },
    { id: 'analytics', label: 'Phân tích Channel', icon: BarChart2, badge: null },
  ];

  const trendingHashtags = [
    { tag: '#Cyberpunk2077', views: '1.2B' },
    { tag: '#TikTokShopDeal0k', views: '890M' },
    { tag: '#AIGeneratedArt', views: '540M' },
    { tag: '#DeskSetup2026', views: '320M' },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-64px)] hidden lg:flex flex-col border-r border-[var(--border-glass)] glass-panel p-4 overflow-y-auto shrink-0">
      <div className="space-y-1">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as MainTab)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#fe2c55]/20 to-transparent text-[#fe2c55] border-l-4 border-[#fe2c55]'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#fe2c55]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.badge === 'LIVE'
                      ? 'bg-[#fe2c55] text-white animate-pulse'
                      : item.badge === 'AI'
                      ? 'bg-gradient-to-r from-[#25f4ee] to-blue-500 text-black'
                      : 'bg-amber-400 text-black'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <hr className="my-6 border-white/10" />

      <div className="mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-2">Tài khoản đề xuất</h4>
        <div className="space-y-2">
          {[
            { name: 'TechVision AI', handle: '@techvision_ai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
            { name: 'Minh Chill Corner', handle: '@minh_chill_desk', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
            { name: 'Ngọc Reviewer', handle: '@ngoc_review_all', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' }
          ].map((acc, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <img src={acc.avatar} alt={acc.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="text-left leading-tight">
                  <p className="text-xs font-bold text-gray-200 group-hover:text-white">{acc.name}</p>
                  <p className="text-[11px] text-gray-400">{acc.handle}</p>
                </div>
              </div>
              <button className="text-[11px] font-bold text-[#fe2c55] hover:underline">Follow</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-3 px-2">
          <TrendingUp className="w-4 h-4 text-[#25f4ee]" />
          <span>Xu hướng nổi bật</span>
        </div>
        <div className="space-y-2">
          {trendingHashtags.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-2 py-1 hover:bg-white/5 rounded-lg cursor-pointer">
              <span className="text-xs text-gray-300 font-medium hover:text-[#25f4ee]">{item.tag}</span>
              <span className="text-[10px] text-gray-500">{item.views}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
