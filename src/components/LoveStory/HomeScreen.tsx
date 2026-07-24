import React, { useState } from 'react';
import {
  SlidersHorizontal,
  MapPin,
  MessageCircle,
  Send,
  MoreVertical,
  Bell,
  MessageSquare,
  Users,
  Sparkles,
  X
} from 'lucide-react';

export interface ChatRequest {
  id: string;
  name: string;
  avatar: string;
  time: string;
  bio?: string;
}

const INITIAL_REQUESTS: ChatRequest[] = [
  {
    id: 'req-1',
    name: 'Amy Thumann',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    time: '2m ago',
    bio: 'Loves photography & espresso ☕'
  },
  {
    id: 'req-2',
    name: 'Emma Collins',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    time: '15m ago',
    bio: 'Architectural designer in LA 🏛️'
  },
  {
    id: 'req-3',
    name: 'Lauren Miller',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    time: '1h ago',
    bio: 'Sunset lover & beach volleyball 🏐'
  },
  {
    id: 'req-4',
    name: 'Sophia Martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    time: '3h ago',
    bio: 'Art director & dog mom 🐶'
  }
];

interface HomeScreenProps {
  onOpenFilter?: () => void;
  onOpenLocation?: () => void;
  onOpenPremium?: () => void;
  onOpenMessagesTab?: () => void;
  onOpenRequestsTab?: () => void;
  currentLocation?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenFilter,
  onOpenLocation,
  onOpenPremium,
  onOpenMessagesTab,
  onOpenRequestsTab,
  currentLocation = 'Los Angeles'
}) => {
  const [requests, setRequests] = useState<ChatRequest[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<'home' | 'notifications' | 'chat' | 'profile'>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAccept = (req: ChatRequest) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    showToast(`Accepted chat request from ${req.name} 💕`);
  };

  const handleDecline = (req: ChatRequest) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    showToast(`Declined request from ${req.name}`);
  };

  return (
    <div className="w-full h-full min-h-[780px] bg-[#fdf5f5] flex flex-col justify-between select-none relative overflow-hidden font-sans">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="absolute top-4 inset-x-4 z-50 bg-[#251b22] text-white px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center justify-between text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e85b74]" />
            {toastMessage}
          </span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Scrollable Dashboard Content Area */}
      <div className="flex-1 px-5 pt-4 pb-20 overflow-y-auto custom-app-scrollbar">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-5">
          
          {/* Sliders Filter Button */}
          <button
            onClick={onOpenFilter}
            className="w-11 h-11 rounded-2xl bg-white border border-[#ebd0d6] hover:border-[#d8526a] flex items-center justify-center text-[#4a3b43] transition-all shadow-sm active:scale-95"
            title="Filter Preferences"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Location Badge Dropdown */}
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/60 hover:bg-white border border-[#f0d5db] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <MapPin className="w-4 h-4 text-[#d8526a] fill-[#d8526a]/20" />
            <span className="text-xs font-bold text-[#d8526a]">{currentLocation}</span>
          </button>

          {/* User Profile Avatar */}
          <div className="relative group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="User Avatar"
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
        </div>

        {/* LoveStory Premium Curved Banner Card */}
        <div
          onClick={onOpenPremium}
          className="relative w-full h-[142px] rounded-[32px] lovestory-banner-gradient p-5 flex flex-col justify-between text-white cursor-pointer group shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] mb-5"
        >
          {/* Decorative Cute 3D Hearts Graphics on Banner */}
          <div className="absolute -left-2 top-4 w-12 h-12 text-[#ffb3c6] opacity-95 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 85 C 10 50 -10 20 20 5 C 40 -5 50 15 50 15 C 50 15 60 -5 80 5 C 110 20 90 50 50 85 Z" fill="#ffa4b8" />
              <circle cx="35" cy="25" r="4" fill="#2b121d" />
              <circle cx="65" cy="25" r="4" fill="#2b121d" />
              <path d="M42 35 Q50 42 58 35" stroke="#2b121d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute -right-2 top-3 w-12 h-12 text-[#ffc2d1] opacity-95 group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 85 C 10 50 -10 20 20 5 C 40 -5 50 15 50 15 C 50 15 60 -5 80 5 C 110 20 90 50 50 85 Z" fill="#ffb7c5" />
              <circle cx="35" cy="25" r="4" fill="#2b121d" />
              <circle cx="65" cy="25" r="4" fill="#2b121d" />
              <path d="M42 35 Q50 42 58 35" stroke="#2b121d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Banner Typography */}
          <div className="text-center z-10">
            <h2 className="font-lovestory-script text-2xl tracking-wide font-bold text-pink-100 drop-shadow-sm">
              LoveStory Premium
            </h2>
            <p className="text-[11px] font-semibold text-white/90 mt-0.5">
              Get LoveStory Premium
            </p>
          </div>

          {/* Banner Button */}
          <div className="flex justify-center z-10">
            <button className="px-5 py-1.5 bg-white text-[#d84b65] hover:bg-pink-50 text-xs font-extrabold rounded-full shadow-md transition-transform group-hover:scale-105">
              Get for $10.99
            </button>
          </div>
        </div>

        {/* 2-Column Action Cards Grid (Messages & Requests) */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          
          {/* Messages Card */}
          <div
            onClick={onOpenMessagesTab}
            className="bg-white rounded-[26px] p-4 border border-[#f0dcdb] hover:border-[#d8526a]/40 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between h-[125px] relative group"
          >
            <div className="flex items-center justify-between">
              {/* Pink Chat Bubble Icon with Indicator Dot */}
              <div className="relative w-10 h-10 rounded-full bg-[#e85b74] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#e85b74]" />
              </div>
              <button className="text-[#a8959e] hover:text-[#2c2229]">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#271d23]">Messages</h3>
              <p className="text-xs font-semibold text-[#8b7a83] mt-0.5">
                <span className="font-extrabold text-[#271d23]">24</span> unread
              </p>
            </div>
          </div>

          {/* Requests Card */}
          <div
            onClick={onOpenRequestsTab}
            className="bg-white rounded-[26px] p-4 border border-[#f0dcdb] hover:border-[#d8526a]/40 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between h-[125px] relative group"
          >
            <div className="flex items-center justify-between">
              {/* Icon Container with Party Icon */}
              <div className="relative w-10 h-10 rounded-full bg-[#fce4e8] text-[#e85b74] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Send className="w-4 h-4 fill-[#e85b74] stroke-[#e85b74] -rotate-12 transform" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#e85b74] rounded-full animate-ping" />
              </div>
              <button className="text-[#a8959e] hover:text-[#2c2229]">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#271d23]">Requests</h3>
              <p className="text-xs font-semibold text-[#8b7a83] mt-0.5">
                <span className="font-extrabold text-[#271d23]">{requests.length + 95}</span> new
              </p>
            </div>
          </div>
        </div>

        {/* Latest Requests List Section */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3.5 px-1">
            <h3 className="text-lg font-extrabold text-[#241b21] tracking-tight">
              Latest Requests
            </h3>
            <button
              onClick={onOpenRequestsTab}
              className="text-[#241b21] hover:text-[#d8526a] flex items-center font-extrabold text-sm transition-colors"
            >
              <span>&gt;&gt;</span>
            </button>
          </div>

          {/* Requests List */}
          <div className="space-y-3">
            {requests.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-[#f0dcdb]">
                <Sparkles className="w-8 h-8 text-[#e85b74] mx-auto mb-2 opacity-80" />
                <p className="text-xs font-bold text-[#4a3b43]">All caught up!</p>
                <p className="text-[11px] text-gray-500 mt-1">No new pending chat requests right now.</p>
              </div>
            ) : (
              requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-transparent hover:bg-white/60 p-1.5 rounded-2xl transition-colors flex items-center justify-between"
                >
                  {/* User Profile Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={req.avatar}
                      alt={req.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#ebd0d6] shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-extrabold text-[#251c22] truncate">{req.name}</h4>
                      <p className="text-[11px] font-medium text-[#7e6d76] truncate mt-0.5">
                        requested to chat with you
                      </p>
                    </div>
                  </div>

                  {/* Accept & Decline Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {/* Accept Button */}
                    <button
                      onClick={() => handleAccept(req)}
                      className="px-3.5 py-1.5 bg-[#d8526a] hover:bg-[#c23f56] active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      Accept
                    </button>

                    {/* Decline Button */}
                    <button
                      onClick={() => handleDecline(req)}
                      className="px-3.5 py-1.5 bg-white hover:bg-pink-50 active:scale-95 text-[#d8526a] border border-[#d8526a] font-bold text-xs rounded-xl transition-all"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Bottom Floating Navigation Bar */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-[#ebd8dc] px-6 flex items-center justify-between z-40 shadow-lg">
        
        {/* Home Tab */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home' ? 'text-[#d8526a]' : 'text-[#a3939b] hover:text-[#6b5a63]'
          }`}
        >
          <span className="text-xs font-bold text-[#d8526a]">Home</span>
          <span className="w-1.5 h-1.5 bg-[#d8526a] rounded-full" />
        </button>

        {/* Notifications Tab */}
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'notifications' ? 'text-[#d8526a]' : 'text-[#a3939b] hover:text-[#6b5a63]'
          }`}
        >
          <Bell className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Chat Tab */}
        <button
          onClick={() => {
            setActiveTab('chat');
            if (onOpenMessagesTab) onOpenMessagesTab();
          }}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'chat' ? 'text-[#d8526a]' : 'text-[#a3939b] hover:text-[#6b5a63]'
          }`}
        >
          <MessageSquare className="w-5 h-5 stroke-[2]" />
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center transition-all ${
            activeTab === 'profile' ? 'text-[#d8526a]' : 'text-[#a3939b] hover:text-[#6b5a63]'
          }`}
        >
          <Users className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

    </div>
  );
};
