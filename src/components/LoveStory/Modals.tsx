import React, { useState } from 'react';
import { X, MapPin, Sparkles, SlidersHorizontal, Check, Heart, MessageCircle } from 'lucide-react';

interface ModalsProps {
  activeModal: 'location' | 'filter' | 'premium' | 'messages' | null;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

const CITIES = ['Los Angeles', 'New York', 'San Francisco', 'Miami', 'Tokyo', 'Paris', 'London'];

export const LoveStoryModals: React.FC<ModalsProps> = ({
  activeModal,
  onClose,
  currentLocation,
  onSelectLocation
}) => {
  const [ageRange, setAgeRange] = useState(25);
  const [maxDistance, setMaxDistance] = useState(30);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* Location Selector Modal */}
      {activeModal === 'location' && (
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#ebd0d6] shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#d8526a]" />
              <h3 className="text-base font-extrabold text-[#241b21]">Select Location</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  onSelectLocation(city);
                  onClose();
                }}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                  currentLocation === city
                    ? 'bg-[#d8526a] text-white shadow-md'
                    : 'bg-[#fdf5f5] text-[#2e2329] hover:bg-[#f8eeee]'
                }`}
              >
                <span>{city}</span>
                {currentLocation === city && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Options Modal */}
      {activeModal === 'filter' && (
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#ebd0d6] shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#d8526a]" />
              <h3 className="text-base font-extrabold text-[#241b21]">Match Preferences</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5 text-xs text-[#3b2e35]">
            <div>
              <div className="flex justify-between font-bold mb-2">
                <span>Maximum Distance</span>
                <span className="text-[#d8526a]">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#d8526a]"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-2">
                <span>Preferred Age</span>
                <span className="text-[#d8526a]">18 - {ageRange}</span>
              </div>
              <input
                type="range"
                min="18"
                max="60"
                value={ageRange}
                onChange={(e) => setAgeRange(Number(e.target.value))}
                className="w-full accent-[#d8526a]"
              />
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#d8526a] hover:bg-[#c63f57] text-white font-bold rounded-2xl shadow-md transition-all mt-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Premium Subscription Modal */}
      {activeModal === 'premium' && (
        <div className="bg-gradient-to-b from-[#2e121d] to-[#17080f] text-white rounded-3xl p-6 w-full max-w-sm border border-[#ff758f]/30 shadow-2xl animate-in zoom-in-95 duration-200 text-center relative overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 bg-gradient-to-tr from-[#ff3366] to-[#ff758f] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#ff3366]/40">
            <Heart className="w-8 h-8 fill-white text-white animate-pulse" />
          </div>

          <h3 className="font-lovestory-script text-3xl font-bold text-pink-300">LoveStory Premium</h3>
          <p className="text-xs text-pink-100/80 mt-1 mb-5">Unlock unlimited likes, priority matches & global travel feature!</p>

          <div className="space-y-2 text-left text-xs mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>See who likes you instantly</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Unlimited chat requests & swipes</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Rewind accidental declines</span>
            </div>
          </div>

          <button
            onClick={() => {
              alert('Thank you for subscribing to LoveStory Premium!');
              onClose();
            }}
            className="w-full py-3.5 bg-gradient-to-r from-[#ff3366] to-[#ff758f] text-white font-extrabold rounded-2xl shadow-lg shadow-[#ff3366]/50 hover:scale-105 active:scale-95 transition-all text-sm"
          >
            Subscribe for $10.99 / month
          </button>
        </div>
      )}

      {/* Messages / Chat Drawer */}
      {activeModal === 'messages' && (
        <div className="bg-white rounded-3xl p-6 w-full max-w-sm border border-[#ebd0d6] shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#d8526a]" />
              <h3 className="text-base font-extrabold text-[#241b21]">Direct Messages</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-black">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {[
              { name: 'Amy Thumann', msg: 'Hey! Glad we connected 😊', time: '2m', online: true },
              { name: 'Sophia Martinez', msg: 'Are you free for coffee this weekend?', time: '1h', online: true },
              { name: 'Emma Collins', msg: 'I love your photos!', time: '3h', online: false }
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#fdf5f5] cursor-pointer transition-colors">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#f8eeee] text-[#d8526a] font-bold flex items-center justify-center border border-[#ebd0d6]">
                    {c.name[0]}
                  </div>
                  {c.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-[#241b21] truncate">{c.name}</h4>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{c.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
