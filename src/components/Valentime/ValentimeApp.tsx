import React, { useState, useRef } from 'react';
import { Preloader } from './Preloader';
import { Header } from './Header';
import { StoryTimeline } from './StoryTimeline';
import { CuteGallery } from './CuteGallery';
import { HandsomeGallery } from './HandsomeGallery';
import { HeartCustomizer } from './HeartCustomizer';
import { LoveLetterCard } from './LoveLetterCard';
import { StarryNightParticles } from './StarryNightParticles';
import { LoveLockGate } from './LoveLockGate';
import type { HeartConfig } from './Heart3DCanvas';

export const ValentimeApp: React.FC = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLightsOff, setIsLightsOff] = useState(false);
  const [activeSection, setActiveSection] = useState<'story' | 'cute' | 'handsome' | 'customizer' | 'letter'>('story');
  const [heartConfig, setHeartConfig] = useState<HeartConfig>({
    material: 'ruby',
    color: '#ffffff',
    frame: 'none',
    sticker: 'rose'
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleLights = () => {
    setIsLightsOff((prev) => {
      const nextState = !prev;
      if (audioRef.current) {
        if (nextState) {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return nextState;
    });
  };

  const handleProceedToLetter = (config: HeartConfig) => {
    setHeartConfig(config);
    setActiveSection('letter');
  };

  return (
    <div
      className={`w-full min-h-screen relative overflow-x-hidden font-sans transition-colors duration-700 ${
        isLightsOff ? 'lights-off bg-[#090a15] text-[#ff4d6d]' : 'bg-[#eae0d9] text-[#202020]'
      }`}
    >
      {/* Required Love Lock Login Gate */}
      {isLocked && <LoveLockGate onUnlock={() => setIsLocked(false)} />}

      {/* Ambient Audio Player */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/02/10/audio-11024.mp3?filename=romantic-piano-11024.mp3"
      />

      {/* Initial Preloader Screen */}
      {!isLocked && isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Tắt Đèn Mode: Starry Night Sky & 35 Floating Hearts Particle Layer */}
      {isLightsOff && <StarryNightParticles />}

      {/* Navigation Header */}
      <Header
        isLightsOff={isLightsOff}
        onToggleLights={toggleLights}
        onNavigate={(sec) => setActiveSection(sec as any)}
        activeSection={activeSection}
      />

      {/* Main Content View Switcher */}
      <main className="w-full relative z-20">
        {activeSection === 'story' && (
          <StoryTimeline isLightsOff={isLightsOff} onStartCustomizing={() => setActiveSection('cute')} />
        )}

        {activeSection === 'cute' && (
          <CuteGallery />
        )}

        {activeSection === 'handsome' && (
          <HandsomeGallery />
        )}

        {activeSection === 'customizer' && (
          <HeartCustomizer onProceedToLetter={handleProceedToLetter} />
        )}

        {activeSection === 'letter' && (
          <LoveLetterCard
            heartConfig={heartConfig}
            onCustomizeAgain={() => setActiveSection('customizer')}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        className={`w-full py-8 text-center text-xs relative z-20 border-t transition-colors duration-500 ${
          isLightsOff ? 'bg-[#090a15]/90 border-white/10 text-[#ff85a1]' : 'bg-[#eae0d9] border-[#c2aaa8]/30 text-[#7a6b68]'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <p className={`font-serif-editorial text-lg font-bold ${isLightsOff ? 'text-[#ff4d6d]' : 'text-[#202020]'}`}>
            HỒ SƠ TÌNH YÊU — HÀNH TRÌNH KỂ CHUYỆN TÌNH YÊU VĨNH CỬU
          </p>
          <p className="text-[11px] font-medium">
            Thiết kế riêng cho em với tất cả tình yêu ❤️
          </p>
        </div>
      </footer>

    </div>
  );
};
