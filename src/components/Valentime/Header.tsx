import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  isLightsOff: boolean;
  onToggleLights: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  isLightsOff,
  onToggleLights,
  onNavigate,
  activeSection
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div
        className={`w-full px-6 lg:px-12 py-4 flex items-center justify-between transition-colors duration-500 border-b ${
          isLightsOff
            ? 'bg-[#090a15]/80 backdrop-blur-md border-white/10 text-white'
            : 'bg-[#eae0d9]/90 backdrop-blur-md border-[#c2aaa8]/30 text-[#202020]'
        }`}
      >
        
        {/* Left: Hồ Sơ Tình Yêu Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('story')}>
          <div className="w-9 h-9 rounded-full bg-[#da0000] text-white flex items-center justify-center shadow-md shadow-[#da0000]/30 hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif-editorial font-bold text-xl tracking-wider uppercase leading-none ${
                isLightsOff ? 'text-white' : 'text-[#202020]'
              }`}
            >
              HỒ SƠ TÌNH YÊU
            </span>
            <span
              className={`text-[9px] font-semibold tracking-widest uppercase mt-0.5 ${
                isLightsOff ? 'text-[#ffadad]' : 'text-[#7a6b68]'
              }`}
            >
              LOVE ARCHIVES
            </span>
          </div>
        </div>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          
          {/* Story Link */}
          <button
            onClick={() => handleNavClick('story')}
            className={`valentime-link text-xs font-semibold uppercase tracking-widest transition-colors ${
              isLightsOff
                ? activeSection === 'story'
                  ? 'text-[#ffadad]'
                  : 'text-gray-200 hover:text-[#ffadad]'
                : activeSection === 'story'
                ? 'text-[#da0000]'
                : 'text-[#202020] hover:text-[#da0000]'
            }`}
          >
            Hành Trình Tình Yêu
            <span className="line-svg">
              <svg width="120" height="4" viewBox="0 0 120 4" fill="none">
                <path d="M0 2 Q60 0 120 2" stroke={isLightsOff ? '#ffadad' : '#da0000'} strokeWidth="2" />
              </svg>
            </span>
          </button>

          {/* Cute Photos Gallery Link */}
          <button
            onClick={() => handleNavClick('cute')}
            className={`valentime-link text-xs font-semibold uppercase tracking-widest transition-colors ${
              isLightsOff
                ? activeSection === 'cute'
                  ? 'text-[#ffadad]'
                  : 'text-gray-200 hover:text-[#ffadad]'
                : activeSection === 'cute'
                ? 'text-[#da0000]'
                : 'text-[#202020] hover:text-[#da0000]'
            }`}
          >
            Ảnh Gia Vỹ Thấy Cute
            <span className="line-svg">
              <svg width="130" height="4" viewBox="0 0 130 4" fill="none">
                <path d="M0 2 Q65 0 130 2" stroke={isLightsOff ? '#ffadad' : '#da0000'} strokeWidth="2" />
              </svg>
            </span>
          </button>

          {/* Top Peak Vicieo Gallery Link */}
          <button
            onClick={() => handleNavClick('handsome')}
            className={`valentime-link text-xs font-semibold uppercase tracking-widest transition-colors ${
              isLightsOff
                ? activeSection === 'handsome'
                  ? 'text-[#ffadad]'
                  : 'text-gray-200 hover:text-[#ffadad]'
                : activeSection === 'handsome'
                ? 'text-[#da0000]'
                : 'text-[#202020] hover:text-[#da0000]'
            }`}
          >
            Top Peak Vicieo
            <span className="line-svg">
              <svg width="120" height="4" viewBox="0 0 120 4" fill="none">
                <path d="M0 2 Q60 0 120 2" stroke={isLightsOff ? '#ffadad' : '#da0000'} strokeWidth="2" />
              </svg>
            </span>
          </button>

          {/* 3D Heart Studio Link */}
          <button
            onClick={() => handleNavClick('customizer')}
            className={`valentime-link text-xs font-semibold uppercase tracking-widest transition-colors ${
              isLightsOff
                ? activeSection === 'customizer'
                  ? 'text-[#ffadad]'
                  : 'text-gray-200 hover:text-[#ffadad]'
                : activeSection === 'customizer'
                ? 'text-[#da0000]'
                : 'text-[#202020] hover:text-[#da0000]'
            }`}
          >
            Xưởng Trái Tim 3D
            <span className="line-svg">
              <svg width="110" height="4" viewBox="0 0 110 4" fill="none">
                <path d="M0 2 Q55 0 110 2" stroke={isLightsOff ? '#ffadad' : '#da0000'} strokeWidth="2" />
              </svg>
            </span>
          </button>

          {/* Love Letter Link */}
          <button
            onClick={() => handleNavClick('letter')}
            className={`valentime-link text-xs font-semibold uppercase tracking-widest transition-colors ${
              isLightsOff
                ? activeSection === 'letter'
                  ? 'text-[#ffadad]'
                  : 'text-gray-200 hover:text-[#ffadad]'
                : activeSection === 'letter'
                ? 'text-[#da0000]'
                : 'text-[#202020] hover:text-[#da0000]'
            }`}
          >
            Gửi Thư Tình
            <span className="line-svg">
              <svg width="90" height="4" viewBox="0 0 90 4" fill="none">
                <path d="M0 2 Q45 0 90 2" stroke={isLightsOff ? '#ffadad' : '#da0000'} strokeWidth="2" />
              </svg>
            </span>
          </button>
        </nav>

        {/* Right: Tắt Đèn / Bật Đèn Toggle & Mobile Menu */}
        <div className="flex items-center gap-4">
          
          {/* Tắt Đèn / Bật Đèn Toggle Button */}
          <button
            onClick={onToggleLights}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer ${
              isLightsOff
                ? 'bg-white/20 hover:bg-white/30 text-white border-white/40 shadow-lg shadow-pink-500/20'
                : 'bg-white/80 hover:bg-white text-[#202020] border-[#c2aaa8]/50 shadow-sm'
            }`}
            title={isLightsOff ? 'Chuyển sang chế độ Bật Đèn' : 'Chuyển sang chế độ Tắt Đèn Đêm Đầy Sao'}
          >
            <span>{isLightsOff ? 'Bật Đèn' : 'Tắt Đèn'}</span>
            {isLightsOff ? (
              <Sun className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            ) : (
              <Moon className="w-4 h-4 text-[#da0000]" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isLightsOff ? 'text-white hover:bg-white/10' : 'text-[#202020] hover:bg-white/50'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 ${
            isLightsOff ? 'bg-[#090a15] border-white/10 text-white' : 'bg-[#eae0d9] border-[#c2aaa8]/50 text-[#202020]'
          }`}
        >
          <button
            onClick={() => handleNavClick('story')}
            className="text-left font-serif-editorial text-2xl hover:text-[#da0000]"
          >
            Hành Trình Tình Yêu
          </button>
          <button
            onClick={() => handleNavClick('cute')}
            className="text-left font-serif-editorial text-2xl hover:text-[#da0000]"
          >
            Ảnh Gia Vỹ Thấy Cute
          </button>
          <button
            onClick={() => handleNavClick('handsome')}
            className="text-left font-serif-editorial text-2xl hover:text-[#da0000]"
          >
            Top Peak Vicieo
          </button>
          <button
            onClick={() => handleNavClick('customizer')}
            className="text-left font-serif-editorial text-2xl hover:text-[#da0000]"
          >
            Xưởng Trái Tim 3D
          </button>
          <button
            onClick={() => handleNavClick('letter')}
            className="text-left font-serif-editorial text-2xl hover:text-[#da0000]"
          >
            Gửi Thư Tình
          </button>
        </div>
      )}
    </header>
  );
};
