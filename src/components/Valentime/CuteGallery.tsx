import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Maximize2, X } from 'lucide-react';

// Use Vite's import.meta.glob to load all 20 images dynamically
const cuteImagesGlob = import.meta.glob<{ default: string }>('/src/product/anh_GiaVy_thay_cute/*.jpg', { eager: true });
const CUTE_IMAGES: string[] = Object.values(cuteImagesGlob).map((mod) => mod.default);

export const CuteGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
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
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : CUTE_IMAGES.length - 1;
    handleSelect(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = selectedIndex < CUTE_IMAGES.length - 1 ? selectedIndex + 1 : 0;
    handleSelect(nextIndex);
  };

  return (
    <section className="w-full min-h-[85vh] pt-28 pb-16 px-4 sm:px-8 flex flex-col items-center justify-between select-none relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 bg-[#ffadad]/20 rounded-full blur-3xl top-20 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-8 z-10">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#da0000] uppercase mb-1.5 block">
          BỘ SƯU TẬP ĐẶC BIỆT
        </span>
        <h2 className="font-serif-editorial text-4xl sm:text-6xl font-normal text-[#202020] tracking-tight">
          Những Ảnh Gia Vỹ Thấy Cute
        </h2>
      </div>

      {/* Main Interactive Carousel Showcase */}
      <div className="w-full max-w-6xl relative my-auto z-10 flex flex-col items-center">
        
        {/* Navigation Buttons */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#202020] hover:text-[#da0000] border border-[#c2aaa8]/50 shadow-lg flex items-center justify-center transition-all active:scale-90"
            title="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#202020] hover:text-[#da0000] border border-[#c2aaa8]/50 shadow-lg flex items-center justify-center transition-all active:scale-90"
            title="Ảnh tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Cards Container without justify-center overflow bug */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto py-10 px-[calc(50%-140px)] flex items-center justify-start gap-4 sm:gap-6 no-scrollbar custom-app-scrollbar scroll-smooth"
        >
          {CUTE_IMAGES.map((imgSrc, idx) => {
            const isSelected = selectedIndex === idx;

            return (
              <div
                key={imgSrc}
                onClick={() => handleSelect(idx)}
                className={`relative shrink-0 cursor-pointer transition-all duration-500 ease-out group ${
                  isSelected
                    ? 'w-[260px] sm:w-[320px] h-[380px] sm:h-[450px] z-20 scale-105 rounded-3xl shadow-2xl ring-4 ring-[#da0000]/40'
                    : 'w-[180px] sm:w-[220px] h-[270px] sm:h-[330px] z-10 opacity-70 hover:opacity-100 hover:scale-100 rounded-2xl shadow-md grayscale-[20%] hover:grayscale-0'
                }`}
              >
                {/* Photo Image */}
                <img
                  src={imgSrc}
                  alt={`Gia Vỹ cute photo ${idx + 1}`}
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl border border-white/60"
                  loading="lazy"
                />

                {/* Selected Active Badge Overlay */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomImage(imgSrc);
                        }}
                        className="p-2 rounded-full bg-white/80 hover:bg-white text-[#202020] shadow-md transition-transform hover:scale-110"
                        title="Xem phóng to"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="w-4 h-4 fill-[#da0000] text-[#da0000]" />
                      <span className="text-xs font-bold tracking-wider uppercase">Siêu Cute 💕</span>
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
          <span>Bức ảnh {selectedIndex + 1} / {CUTE_IMAGES.length}</span>
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setZoomImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={zoomImage}
            alt="Enlarged cute photo"
            className="max-w-full max-h-[90vh] object-contain rounded-3xl shadow-2xl border-2 border-white/20 animate-in zoom-in-95 duration-200"
          />
        </div>
      )}

    </section>
  );
};
