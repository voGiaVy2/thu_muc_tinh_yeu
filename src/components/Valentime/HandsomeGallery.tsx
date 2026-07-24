import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Crown, Sparkles, Maximize2, X, Video } from 'lucide-react';

// Use Vite's import.meta.glob to load both images and videos dynamically
const imageGlob = import.meta.glob<{ default: string }>('/src/product/anh_GiaVy_thay_dep/*.{jpg,jpeg,png,webp}', { eager: true });
const videoGlob = import.meta.glob<{ default: string }>('/src/product/anh_GiaVy_thay_dep/*.{mp4,webm}', { eager: true });

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  ...Object.values(imageGlob).map((mod, i) => ({ id: `img-${i}`, type: 'image' as const, url: mod.default })),
  ...Object.values(videoGlob).map((mod, i) => ({ id: `vid-${i}`, type: 'video' as const, url: mod.default }))
];

export const HandsomeGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomMedia, setZoomMedia] = useState<MediaItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardEl = container.children[index] as HTMLElement;
      if (cardEl) {
        const targetScroll = cardEl.offsetLeft - container.clientWidth / 2 + cardEl.clientWidth / 2;
        container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    // Initial scroll to first item on mount
    handleSelect(0);
  }, []);

  const handlePrev = () => {
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : MEDIA_ITEMS.length - 1;
    handleSelect(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = selectedIndex < MEDIA_ITEMS.length - 1 ? selectedIndex + 1 : 0;
    handleSelect(nextIndex);
  };

  return (
    <section className="w-full min-h-[85vh] pt-28 pb-16 px-4 sm:px-8 flex flex-col items-center justify-between select-none relative overflow-hidden">
      
      {/* Ambient Lighting Background */}
      <div className="absolute w-[450px] h-[450px] bg-[#f4c890]/25 rounded-full blur-3xl top-16 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-8 z-10">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#da0000] uppercase mb-1.5 flex items-center justify-center gap-1.5">
          <Crown className="w-4 h-4 text-[#f4c890] fill-[#f4c890]" />
          BỘ SƯU TẬP TOP VISUAL
        </span>
        <h2 className="font-serif-editorial text-4xl sm:text-6xl font-normal text-[#202020] tracking-tight">
          Top Peak Vicieo
        </h2>
      </div>

      {/* Main Interactive Showcase Carousel */}
      <div className="w-full max-w-6xl relative my-auto z-10 flex flex-col items-center">
        
        {/* Navigation Buttons */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#202020] hover:text-[#da0000] border border-[#c2aaa8]/50 shadow-lg flex items-center justify-center transition-all active:scale-90"
            title="Trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#202020] hover:text-[#da0000] border border-[#c2aaa8]/50 shadow-lg flex items-center justify-center transition-all active:scale-90"
            title="Tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Cards Container without justify-center overflow bug */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto py-10 px-[calc(50%-150px)] flex items-center justify-start gap-5 sm:gap-8 no-scrollbar custom-app-scrollbar scroll-smooth"
        >
          {MEDIA_ITEMS.map((item, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={`relative shrink-0 cursor-pointer transition-all duration-500 ease-out group overflow-hidden ${
                  isSelected
                    ? 'w-[270px] sm:w-[340px] h-[390px] sm:h-[460px] z-20 scale-105 rounded-3xl shadow-2xl ring-4 ring-[#f4c890] border-2 border-[#da0000]'
                    : 'w-[190px] sm:w-[230px] h-[280px] sm:h-[340px] z-10 opacity-75 hover:opacity-100 hover:scale-100 rounded-2xl shadow-md grayscale-[15%] hover:grayscale-0'
                }`}
              >
                {/* Media Element: Image or Video */}
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Top Peak Vicieo item ${idx + 1}`}
                    className="w-full h-full object-cover rounded-2xl sm:rounded-3xl border border-white/60"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <video
                      src={item.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl sm:rounded-3xl border border-white/60 pointer-events-none"
                    />
                    {/* Video Indicator Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      <Video className="w-3 h-3 text-[#f4c890]" />
                      <span>VIDEO</span>
                    </div>
                  </div>
                )}

                {/* Selected Active Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomMedia(item);
                        }}
                        className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#202020] shadow-md transition-transform hover:scale-110"
                        title="Xem phóng to"
                      >
                        <Maximize2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white">
                      <Crown className="w-5 h-5 fill-[#f4c890] text-[#f4c890]" />
                      <span className="text-xs font-extrabold tracking-widest uppercase text-[#f4c890]">
                        {item.type === 'video' ? 'Top Peak Video 🔥' : 'Top Peak Visual 🔥'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Counter Badge */}
        <div className="mt-6 flex items-center gap-2 bg-white/80 px-4 py-1.5 rounded-full border border-[#c2aaa8]/50 shadow-sm text-xs font-bold text-[#635552]">
          <Sparkles className="w-3.5 h-3.5 text-[#da0000]" />
          <span>Mục {selectedIndex + 1} / {MEDIA_ITEMS.length}</span>
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {zoomMedia && (
        <div
          onClick={() => setZoomMedia(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setZoomMedia(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {zoomMedia.type === 'image' ? (
            <img
              src={zoomMedia.url}
              alt="Enlarged top peak vicieo"
              className="max-w-full max-h-[90vh] object-contain rounded-3xl shadow-2xl border-2 border-white/20 animate-in zoom-in-95 duration-200"
            />
          ) : (
            <video
              src={zoomMedia.url}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl border-2 border-white/20 animate-in zoom-in-95 duration-200"
            />
          )}
        </div>
      )}

    </section>
  );
};
