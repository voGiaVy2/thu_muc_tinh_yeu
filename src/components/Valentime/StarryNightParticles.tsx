import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  left: number; // percentage 0-100
  size: number; // px size 28-60 (increased as requested!)
  duration: number; // seconds 7-14
  delay: number; // seconds 0-8
  opacity: number; // 0.6 - 0.95
  color: string;
  blur: number; // px for depth effect
  rotation: number; // deg
}

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const HEART_COLORS = [
  '#ff2a5f', // Radiant Red
  '#ff4d6d', // Vivid Crimson Red
  '#da0000', // Classic Deep Red
  '#ff758f', // Bright Rose Red
  '#ffadad', // Pastel Soft Pink
  '#ffffff'  // Glowing White
];

export const StarryNightParticles: React.FC = () => {
  // Generate 35 randomized larger hearts (28px - 60px)
  const hearts = useMemo<FloatingHeart[]>(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 94) + 3,
      size: Math.floor(Math.random() * 32) + 28, // 28px to 60px!
      duration: Math.floor(Math.random() * 7) + 8,
      delay: Number((Math.random() * 8).toFixed(1)),
      opacity: Number((Math.random() * 0.4 + 0.55).toFixed(2)),
      color: HEART_COLORS[i % HEART_COLORS.length],
      blur: i % 6 === 0 ? 2 : 0,
      rotation: Math.floor(Math.random() * 40) - 20
    }));
  }, []);

  // Generate 60 twinkling stars
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      top: Math.floor(Math.random() * 95),
      left: Math.floor(Math.random() * 98),
      size: Math.floor(Math.random() * 3) + 1,
      duration: Math.floor(Math.random() * 3) + 2,
      delay: Number((Math.random() * 4).toFixed(1))
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      
      {/* Deep Night Ambient Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090a15] via-[#101428] to-[#1c0b1a] opacity-95 transition-opacity duration-1000" />

      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: 0.85,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              boxShadow: s.size > 2 ? '0 0 8px rgba(255, 255, 255, 0.9)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Randomized Larger Floating Hearts (28px - 60px) Rising From Bottom */}
      <div className="absolute inset-0">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute animate-float-heart-sway"
            style={{
              left: `${h.left}%`,
              bottom: '-70px',
              opacity: h.opacity,
              filter: h.blur > 0 ? `blur(${h.blur}px)` : `drop-shadow(0 0 14px ${h.color})`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              transform: `rotate(${h.rotation}deg)`
            }}
          >
            <Heart
              style={{ width: `${h.size}px`, height: `${h.size}px`, fill: h.color, color: h.color }}
            />
          </div>
        ))}
      </div>

    </div>
  );
};
