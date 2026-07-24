import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  icon: string;
}

export const HeartParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const cuteIcons = ['🧸', '💖', '🌸', '🎀', '🐰', '🍓', '💌', '✨', '💗', '☁️', '🍬', '🌷'];
    const generated: Particle[] = [];

    for (let i = 0; i < 28; i++) {
      generated.push({
        id: i,
        x: Math.random() * 98,
        size: Math.random() * 18 + 16,
        duration: Math.random() * 9 + 7,
        delay: Math.random() * 6,
        icon: cuteIcons[Math.floor(Math.random() * cuteIcons.length)]
      });
    }
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
          className="floating-heart-particle opacity-60 select-none filter drop-shadow-[0_4px_10px_rgba(255,107,139,0.3)]"
        >
          {p.icon}
        </div>
      ))}
    </div>
  );
};
