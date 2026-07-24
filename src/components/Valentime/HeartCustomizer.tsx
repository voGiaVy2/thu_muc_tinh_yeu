import React, { useState } from 'react';
import { Heart3DCanvas } from './Heart3DCanvas';
import type { HeartConfig } from './Heart3DCanvas';
import { Layers, Palette, Frame, Sticker, Heart, ArrowRight } from 'lucide-react';

interface HeartCustomizerProps {
  onProceedToLetter: (config: HeartConfig) => void;
}

const MATERIALS: { id: HeartConfig['material']; label: string; bg: string }[] = [
  { id: 'ruby', label: 'Thạch Anh Đỏ', bg: 'bg-gradient-to-r from-red-600 to-red-800' },
  { id: 'gold', label: 'Vàng Ánh Kim', bg: 'bg-gradient-to-r from-amber-300 to-yellow-600' },
  { id: 'glass', label: 'Thủy Tinh Pha Lê', bg: 'bg-gradient-to-r from-sky-100 to-sky-300' },
  { id: 'chrome', label: 'Bạc Bạch Kim', bg: 'bg-gradient-to-r from-gray-200 to-gray-400' },
  { id: 'opal', label: 'Ngọc Trai Opal', bg: 'bg-gradient-to-r from-pink-200 to-purple-300' },
  { id: 'pearl', label: 'Ngọc Trai Hồng', bg: 'bg-gradient-to-r from-amber-50 to-orange-100' },
  { id: 'bronze', label: 'Đồng Cổ Điển', bg: 'bg-gradient-to-r from-amber-700 to-yellow-900' }
];

const COLORS = [
  { hex: '#ffffff', name: 'Trắng Ngọc' },
  { hex: '#b7ffe3', name: 'Xanh Mint' },
  { hex: '#ff97f7', name: 'Hồng Phấn' },
  { hex: '#ffaf91', name: 'Cam San Hô' },
  { hex: '#f9e4a4', name: 'Vàng Champagne' },
  { hex: '#da0000', name: 'Đỏ Thẫm' }
];

const FRAMES: { id: HeartConfig['frame']; label: string }[] = [
  { id: 'none', label: 'Không Khung' },
  { id: 'ribbon', label: 'Ruy Băng Vàng' },
  { id: 'crown', label: 'Vương Miện Kim Cương' },
  { id: 'wings', label: 'Cánh Thiên Thần' },
  { id: 'floral', label: 'Dây Leo Hoa' },
  { id: 'lock', label: 'Khóa Tình Yêu' }
];

const STICKERS: { id: HeartConfig['sticker']; label: string }[] = [
  { id: 'none', label: 'Không Nhãn Dán' },
  { id: 'rose', label: 'Hoa Hồng Đỏ' },
  { id: 'arrow', label: 'Mũi Tên Cupid' },
  { id: 'letter', label: 'Phong Bì Thư' },
  { id: 'key', label: 'Chìa Khóa Vàng' },
  { id: 'seal', label: 'Dấu Ấn Sáp' },
  { id: 'sparkles', label: 'Ngôi Sao Lấp Lánh' }
];

export const HeartCustomizer: React.FC<HeartCustomizerProps> = ({ onProceedToLetter }) => {
  const [config, setConfig] = useState<HeartConfig>({
    material: 'ruby',
    color: '#ffffff',
    frame: 'none',
    sticker: 'rose'
  });

  const [activeTab, setActiveTab] = useState<'materials' | 'colors' | 'frames' | 'stickers'>('materials');

  return (
    <section className="w-full min-h-[90vh] pt-24 pb-16 px-6 flex flex-col items-center justify-between select-none">
      
      {/* Studio Title */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#da0000] uppercase mb-1 block">
          XƯỞNG TÙY BIẾN TRÁI TIM 3D
        </span>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#202020] tracking-tight">
          Tạo Tác Trái Tim Dành Riêng Cho Em
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6b68] mt-1 font-medium">
          Tùy chỉnh chất liệu, màu sắc, khung trang trí và chi tiết cho món quà đặc biệt.
        </p>
      </div>

      {/* Main Studio Workspace: Left 3D Canvas, Right Control Tabs */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        
        {/* Left: 3D Interactive Canvas Display */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#f5ebe6]/50 rounded-3xl p-6 border border-[#c2aaa8]/40 shadow-inner relative overflow-hidden">
          <Heart3DCanvas config={config} />
        </div>

        {/* Right: Studio Customization Panel */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-[#c2aaa8]/50 shadow-xl flex flex-col justify-between h-full min-h-[460px]">
          
          <div>
            {/* Customization Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-[#eae0d9] p-1 rounded-2xl mb-6 border border-[#c2aaa8]/30">
              <button
                onClick={() => setActiveTab('materials')}
                className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'materials'
                    ? 'bg-[#202020] text-[#ebe0da] shadow-sm'
                    : 'text-[#635552] hover:text-[#202020]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Chất Liệu</span>
              </button>

              <button
                onClick={() => setActiveTab('colors')}
                className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'colors'
                    ? 'bg-[#202020] text-[#ebe0da] shadow-sm'
                    : 'text-[#635552] hover:text-[#202020]'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Màu Sắc</span>
              </button>

              <button
                onClick={() => setActiveTab('frames')}
                className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'frames'
                    ? 'bg-[#202020] text-[#ebe0da] shadow-sm'
                    : 'text-[#635552] hover:text-[#202020]'
                }`}
              >
                <Frame className="w-3.5 h-3.5" />
                <span>Khung Họa Tiết</span>
              </button>

              <button
                onClick={() => setActiveTab('stickers')}
                className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
                  activeTab === 'stickers'
                    ? 'bg-[#202020] text-[#ebe0da] shadow-sm'
                    : 'text-[#635552] hover:text-[#202020]'
                }`}
              >
                <Sticker className="w-3.5 h-3.5" />
                <span>Nhãn Dán</span>
              </button>
            </div>

            {/* TAB 1: MATERIALS */}
            {activeTab === 'materials' && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#635552] uppercase tracking-wider mb-2">Chọn Chất Liệu & Bề Mặt</h4>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {MATERIALS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setConfig((prev) => ({ ...prev, material: m.id }))}
                      className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all flex items-center gap-2.5 ${
                        config.material === m.id
                          ? 'border-[#da0000] bg-[#fef2ea] text-[#da0000] shadow-sm'
                          : 'border-[#c2aaa8]/40 bg-[#f5ebe6]/50 text-[#202020] hover:bg-[#f5ebe6]'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${m.bg} shadow-sm border border-white`} />
                      <span className="truncate">{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: COLORS */}
            {activeTab === 'colors' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#635552] uppercase tracking-wider mb-2">Chọn Tông Màu Sắc</h4>
                <div className="grid grid-cols-3 gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setConfig((prev) => ({ ...prev, color: c.hex }))}
                      className={`p-3 rounded-2xl border text-center text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                        config.color === c.hex
                          ? 'border-[#da0000] bg-[#fef2ea] shadow-sm'
                          : 'border-[#c2aaa8]/40 bg-[#f5ebe6]/50 hover:bg-[#f5ebe6]'
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[11px] text-[#202020] truncate w-full">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FRAMES */}
            {activeTab === 'frames' && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#635552] uppercase tracking-wider mb-2">Chọn Khung Viền Trang Trí</h4>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {FRAMES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setConfig((prev) => ({ ...prev, frame: f.id }))}
                      className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all ${
                        config.frame === f.id
                          ? 'border-[#da0000] bg-[#fef2ea] text-[#da0000] shadow-sm'
                          : 'border-[#c2aaa8]/40 bg-[#f5ebe6]/50 text-[#202020] hover:bg-[#f5ebe6]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: STICKERS */}
            {activeTab === 'stickers' && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-[#635552] uppercase tracking-wider mb-2">Chọn Chi Tiết Nhãn Dán</h4>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {STICKERS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setConfig((prev) => ({ ...prev, sticker: s.id }))}
                      className={`p-3 rounded-2xl text-left border text-xs font-bold transition-all ${
                        config.sticker === s.id
                          ? 'border-[#da0000] bg-[#fef2ea] text-[#da0000] shadow-sm'
                          : 'border-[#c2aaa8]/40 bg-[#f5ebe6]/50 text-[#202020] hover:bg-[#f5ebe6]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={() => onProceedToLetter(config)}
            className="w-full mt-6 btn-valentime-primary justify-center py-3.5 text-xs font-extrabold tracking-widest shadow-lg"
          >
            <Heart className="w-4 h-4 text-[#ffadad] fill-[#ffadad]" />
            <span>Gắn Trái Tim Vào Thư Tình</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

        </div>

      </div>

    </section>
  );
};
