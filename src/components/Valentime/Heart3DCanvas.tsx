import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, RotateCw } from 'lucide-react';

export interface HeartConfig {
  material: 'glass' | 'gold' | 'ruby' | 'chrome' | 'opal' | 'pearl' | 'bronze';
  color: string;
  frame: 'none' | 'ribbon' | 'crown' | 'wings' | 'floral' | 'lock';
  sticker: 'none' | 'rose' | 'arrow' | 'letter' | 'key' | 'seal' | 'sparkles';
}

interface Heart3DCanvasProps {
  config: HeartConfig;
}

export const Heart3DCanvas: React.FC<Heart3DCanvasProps> = ({ config }) => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Auto slow rotation when idle
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.8) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;

    setRotationY((prev) => prev + deltaX * 0.5);
    setRotationX((prev) => Math.max(-30, Math.min(30, prev + deltaY * 0.3)));

    dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Get material gradient and specular lighting settings based on config
  const getMaterialStyles = () => {
    switch (config.material) {
      case 'glass':
        return {
          fill1: '#ffffff',
          fill2: '#e2f1f8',
          fill3: '#a8d5e5',
          opacity: 0.85,
          gloss: 'rgba(255, 255, 255, 0.7)'
        };
      case 'gold':
        return {
          fill1: '#ffe680',
          fill2: '#e6ac00',
          fill3: '#997300',
          opacity: 1,
          gloss: 'rgba(255, 245, 179, 0.9)'
        };
      case 'ruby':
        return {
          fill1: '#ff5e7e',
          fill2: '#da0000',
          fill3: '#7a0000',
          opacity: 1,
          gloss: 'rgba(255, 180, 195, 0.85)'
        };
      case 'chrome':
        return {
          fill1: '#ffffff',
          fill2: '#8e9eab',
          fill3: '#475057',
          opacity: 1,
          gloss: 'rgba(255, 255, 255, 0.95)'
        };
      case 'opal':
        return {
          fill1: '#ffc6ff',
          fill2: '#b8c0ff',
          fill3: '#9bf6ff',
          opacity: 0.9,
          gloss: 'rgba(255, 255, 255, 0.85)'
        };
      case 'pearl':
        return {
          fill1: '#fff5eb',
          fill2: '#e6ccb2',
          fill3: '#b08968',
          opacity: 1,
          gloss: 'rgba(255, 255, 255, 0.9)'
        };
      case 'bronze':
        return {
          fill1: '#e0a96d',
          fill2: '#a47148',
          fill3: '#4c321b',
          opacity: 1,
          gloss: 'rgba(255, 220, 180, 0.8)'
        };
      default:
        return {
          fill1: '#ff5e7e',
          fill2: '#da0000',
          fill3: '#7a0000',
          opacity: 1,
          gloss: 'rgba(255, 255, 255, 0.8)'
        };
    }
  };

  const mat = getMaterialStyles();

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      className="relative w-full max-w-[420px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Soft Ambient Radial Light Glow */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-60 transition-colors duration-500 pointer-events-none"
        style={{ backgroundColor: config.color !== '#ffffff' ? config.color : '#ffadad' }}
      />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-10 left-12 w-4 h-4 text-[#f4c890] animate-pulse" />
        <Sparkles className="absolute bottom-12 right-14 w-5 h-5 text-[#ffadad] animate-pulse" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-20 right-10 w-3.5 h-3.5 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* 3D Heart Render SVG Group */}
      <div
        className="relative z-10 transition-transform duration-75"
        style={{
          transform: `perspective(800px) rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <svg width="280" height="260" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Dynamic Custom Material Gradient */}
            <linearGradient id="customMatGrad" x1="20" y1="10" x2="220" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={mat.fill1} />
              <stop offset="45%" stopColor={config.color !== '#ffffff' ? config.color : mat.fill2} />
              <stop offset="100%" stopColor={mat.fill3} />
            </linearGradient>

            {/* Specular Light Gradient Overlay */}
            <linearGradient id="glossGrad" x1="40" y1="20" x2="160" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={mat.gloss} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="heartShadow3D" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="22" stdDeviation="20" floodColor="#202020" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* MAIN HEART BODY SHAPE */}
          <path
            d="M120 200 C 20 125 -20 60 48 18 C 90 -8 115 22 120 34 C 125 22 150 -8 192 18 C 260 60 220 125 120 200 Z"
            fill="url(#customMatGrad)"
            opacity={mat.opacity}
            filter="url(#heartShadow3D)"
          />

          {/* 3D LIGHT REFLECTION HIGHLIGHT */}
          <path
            d="M115 38 C 110 25 90 8 60 25 C 20 52 45 105 115 170 C 102 115 65 75 90 44 C 100 32 110 34 115 38 Z"
            fill="url(#glossGrad)"
          />

          {/* OPTIONAL FRAME OVERLAY */}
          {config.frame === 'ribbon' && (
            <path
              d="M120 10 C 50 10 10 50 10 110 C 10 170 120 210 120 210 C 120 210 230 170 230 110 C 230 50 190 10 120 10 Z"
              stroke="#f4c890"
              strokeWidth="6"
              strokeDasharray="12 6"
              fill="none"
            />
          )}

          {config.frame === 'crown' && (
            <g transform="translate(70, -25) scale(0.7)">
              <polygon points="20,50 40,10 70,35 100,5 130,35 160,10 180,50" fill="#f4c890" stroke="#b08968" strokeWidth="2" />
              <circle cx="20" cy="50" r="5" fill="#da0000" />
              <circle cx="100" cy="5" r="6" fill="#da0000" />
              <circle cx="180" cy="50" r="5" fill="#da0000" />
            </g>
          )}

          {config.frame === 'wings' && (
            <g stroke="#ffffff" strokeWidth="3" fill="rgba(255,255,255,0.7)">
              {/* Left Wing */}
              <path d="M40 80 Q-20 40 10 110 Q-30 80 30 130" />
              {/* Right Wing */}
              <path d="M200 80 Q260 40 230 110 Q270 80 210 130" />
            </g>
          )}

          {config.frame === 'floral' && (
            <g stroke="#c2aaa8" strokeWidth="2" fill="none">
              <path d="M30 60 Q10 110 50 170" />
              <path d="M210 60 Q230 110 190 170" />
              <circle cx="25" cy="80" r="6" fill="#ffadad" />
              <circle cx="215" cy="80" r="6" fill="#ffadad" />
            </g>
          )}

          {config.frame === 'lock' && (
            <g transform="translate(105, 80) scale(0.6)">
              <rect x="10" y="25" width="40" height="35" rx="6" fill="#f4c890" stroke="#202020" strokeWidth="2" />
              <path d="M20 25 V15 A10 10 0 0 1 40 15 V25" stroke="#202020" strokeWidth="3" fill="none" />
              <circle cx="30" cy="40" r="4" fill="#202020" />
            </g>
          )}

          {/* OPTIONAL STICKER / DECAL */}
          {config.sticker === 'rose' && (
            <g transform="translate(145, 110) scale(0.65)">
              <path d="M12 25 C0 10 25 -5 25 15 C25 -5 50 10 38 25 C50 40 25 50 25 35 C25 50 0 40 12 25 Z" fill="#da0000" />
              <path d="M25 35 Q20 60 10 75" stroke="#2e7d32" strokeWidth="4" fill="none" />
            </g>
          )}

          {config.sticker === 'arrow' && (
            <g transform="translate(15, 15) rotate(45) scale(0.9)">
              <line x1="20" y1="100" x2="200" y2="100" stroke="#f4c890" strokeWidth="5" strokeLinecap="round" />
              <polygon points="200,100 180,90 180,110" fill="#f4c890" />
              <polygon points="20,100 5,90 5,110" fill="#da0000" />
            </g>
          )}

          {config.sticker === 'letter' && (
            <g transform="translate(85, 80) scale(0.7)">
              <rect x="0" y="0" width="70" height="50" rx="4" fill="#fef2ea" stroke="#c2aaa8" strokeWidth="2" />
              <path d="M0 0 L35 25 L70 0" stroke="#c2aaa8" strokeWidth="2" fill="none" />
              <circle cx="35" cy="25" r="6" fill="#da0000" />
            </g>
          )}

          {config.sticker === 'key' && (
            <g transform="translate(75, 75) rotate(-30) scale(0.6)">
              <circle cx="20" cy="20" r="14" stroke="#f4c890" strokeWidth="4" fill="none" />
              <line x1="32" y1="20" x2="80" y2="20" stroke="#f4c890" strokeWidth="5" />
              <line x1="65" y1="20" x2="65" y2="32" stroke="#f4c890" strokeWidth="4" />
              <line x1="75" y1="20" x2="75" y2="32" stroke="#f4c890" strokeWidth="4" />
            </g>
          )}

          {config.sticker === 'seal' && (
            <g transform="translate(100, 90) scale(0.7)">
              <circle cx="25" cy="25" r="22" fill="#da0000" stroke="#990000" strokeWidth="2" />
              <path d="M15 25 C15 15 35 15 35 25 C35 35 15 35 15 25" stroke="#f4c890" strokeWidth="2" fill="none" />
            </g>
          )}

          {config.sticker === 'sparkles' && (
            <g fill="#ffffff">
              <path d="M60 40 L64 50 L74 54 L64 58 L60 68 L56 58 L46 54 L56 50 Z" />
              <path d="M170 120 L173 128 L181 131 L173 134 L170 142 L167 134 L159 131 L167 128 Z" />
            </g>
          )}
        </svg>
      </div>

      {/* Drag Instruction Badge */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a6b68] bg-white/70 px-3 py-1 rounded-full border border-white/80 shadow-sm flex items-center gap-1">
          <RotateCw className="w-3 h-3 text-[#da0000]" />
          Drag to rotate 3D heart
        </span>
      </div>
    </div>
  );
};
