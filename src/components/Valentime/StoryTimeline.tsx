import React, { useState } from 'react';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

interface StoryTimelineProps {
  onStartCustomizing: () => void;
  isLightsOff?: boolean;
}

const STORY_STEPS = [
  {
    number: '01',
    text: 'Giữa biển người bao la và hàng triệu quỹ đạo lướt qua nhau, sự xuất hiện dịu dàng của em chính là món quà kỳ diệu nhất mà vũ trụ này đã ưu ái dành riêng cho anh.',
    accent: 'CẢM ƠN VÌ EM XUẤT HIỆN'
  },
  {
    number: '02',
    text: 'Em đã không ngần ngại vượt qua những khoảng cách, khẽ mở khoảng trời riêng để từng bước dịu dàng bước đến bên anh, thắp sáng và lấp đầy những ngày anh đơn độc.',
    accent: 'BƯỚC ĐẾN BÊN ANH'
  },
  {
    number: '03',
    text: 'Cảm ơn em vì đã chọn gạt bỏ những nghi ngại, dịu dàng bao dung lấy những nốt trầm trong anh và kiên nhẫn chịu ở lại bên anh qua muôn vàn giông bão.',
    accent: 'CHỊU Ở LẠI VỚI ANH'
  },
  {
    number: '04',
    text: 'Có em ở lại, mỗi góc nhỏ trong tâm hồn anh đều tìm thấy bến đỗ, mỗi nhịp đập tim anh đều đặn tìm thấy giai điệu của sự bình yên và ấm áp.',
    accent: 'BÌNH YÊN KHI CÓ EM'
  },
  {
    number: '05',
    text: 'Tình yêu em dành cho anh không chỉ là lời nói, mà là ánh mắt bao dung, là cái ôm siết chặt và là tình yêu chân thành đẹp đẽ nhất đời anh.',
    accent: 'TRỌN VẸN YÊU ANH'
  },
  {
    number: '06',
    text: 'Cảm ơn em vì đã xuất hiện, bước đến, ở lại và trao trọn tình yêu cho anh. Anh nguyện dùng cả đời này để trân trọng và yêu em nhiều hơn mỗi ngày.',
    accent: 'MÃI MÃI YÊU EM'
  }
];

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onStartCustomizing, isLightsOff }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNextStep = () => {
    if (currentStepIndex < STORY_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onStartCustomizing();
    }
  };

  const activeStep = STORY_STEPS[currentStepIndex];

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-between pt-28 pb-12 px-6 text-center select-none z-20">
      
      {/* Editorial Chapter Header */}
      <div className="flex flex-col items-center mb-8">
        <span className={`text-xs font-extrabold tracking-[0.25em] uppercase mb-2 ${isLightsOff ? 'text-[#ff4d6d]' : 'text-[#da0000]'}`}>
          HÀNH TRÌNH TÌNH YÊU
        </span>
        <h1 className={`font-serif-editorial font-bold tracking-tight max-w-3xl leading-tight transition-all ${
          isLightsOff
            ? 'text-5xl sm:text-7xl text-[#ff4d6d] drop-shadow-[0_0_20px_rgba(255,77,109,0.7)]'
            : 'text-4xl sm:text-6xl text-[#202020]'
        }`}>
          Hồ Sơ Tình Yêu
        </h1>
        <p className={`text-sm sm:text-base max-w-lg mt-3 font-semibold transition-colors ${
          isLightsOff ? 'text-[#ffadad]' : 'text-[#7a6b68]'
        }`}>
          Những thước phim đẹp nhất ghi dấu sự xuất hiện, đồng hành và tình yêu chân thành em dành cho anh.
        </p>
      </div>

      {/* Main Story Container with Red Diamond Lines */}
      <div className="w-full max-w-2xl my-auto relative">
        <div className={`story-border-box rounded-3xl border py-12 px-8 transition-all duration-500 ${
          isLightsOff
            ? 'bg-[#120917]/90 border-[#ff4d6d]/60 shadow-[0_0_40px_rgba(255,77,109,0.35)]'
            : 'bg-[#f5ebe6]/60 border-[#c2aaa8]/40 shadow-xl'
        }`}>
          
          {/* Top Diamond Line Accent */}
          <div className="story-border-line-top" />
          <div className="story-diamond-center story-diamond-center-top">
            <div className="story-diamond-red-dot" />
          </div>

          {/* Chapter Step Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 ${
            isLightsOff ? 'bg-[#210c24] border-[#ff4d6d]/50 text-[#ff4d6d]' : 'bg-[#eae0d9] border-[#c2aaa8]/50 text-[#da0000]'
          }`}>
            <span className="text-xs font-extrabold tracking-widest uppercase">
              CHƯƠNG {activeStep.number} / 06
            </span>
            <span className="text-gray-400">•</span>
            <span className={`text-xs font-extrabold uppercase tracking-wider ${isLightsOff ? 'text-[#ffadad]' : 'text-[#635552]'}`}>
              {activeStep.accent}
            </span>
          </div>

          {/* Story Quote Text */}
          <blockquote className={`font-serif-editorial font-bold leading-relaxed italic my-4 min-h-[140px] flex items-center justify-center px-2 transition-all ${
            isLightsOff
              ? 'text-3xl sm:text-4xl text-[#ff4d6d] drop-shadow-[0_0_14px_rgba(255,77,109,0.8)]'
              : 'text-2xl sm:text-3xl text-[#202020]'
          }`}>
            “{activeStep.text}”
          </blockquote>

          {/* Bottom Diamond Line Accent */}
          <div className="story-border-line-bottom" />
          <div className="story-diamond-center story-diamond-center-bottom">
            <div className="story-diamond-red-dot" />
          </div>
        </div>

        {/* Step Navigation Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {STORY_STEPS.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setCurrentStepIndex(idx)}
              className={`transition-all ${
                currentStepIndex === idx
                  ? 'w-8 h-2.5 bg-[#ff4d6d] rounded-full shadow-lg shadow-[#ff4d6d]/50'
                  : 'w-2.5 h-2.5 bg-[#c2aaa8] hover:bg-[#8e7a78] rounded-full'
              }`}
              title={`Chuyển đến chương ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="flex flex-col items-center gap-4 mt-8">
        {currentStepIndex === STORY_STEPS.length - 1 ? (
          <button
            onClick={onStartCustomizing}
            className="btn-valentime-primary animate-bounce duration-1000"
          >
            <Sparkles className="w-4 h-4 text-[#f4c890]" />
            <span>Tạo Trái Tim 3D Dành Riêng Cho Em</span>
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="btn-valentime-secondary"
          >
            <span>Chương Tiếp Theo</span>
            <ChevronDown className="w-4 h-4 text-[#da0000] -rotate-90" />
          </button>
        )}

        <button
          onClick={onStartCustomizing}
          className={`text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 ${
            isLightsOff ? 'text-[#ffadad] hover:text-[#ff4d6d]' : 'text-[#7a6b68] hover:text-[#da0000]'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-[#da0000] text-[#da0000]" />
          <span>Đến Xưởng Tùy Biến Trái Tim 3D</span>
        </button>
      </div>

    </section>
  );
};
