import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { BACKGROUND_SONGS } from '../../mock/coupleData';

export const RomanticMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong] = useState(BACKGROUND_SONGS[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 glass-dark-card p-2 pr-5 rounded-full border border-white/20 shadow-2xl backdrop-blur-xl">
      <audio ref={audioRef} src={currentSong.audioUrl} loop />

      <div
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#ff3366] via-[#f7d692] to-[#ff758f] cursor-pointer shadow-lg ${
          isPlaying ? 'animate-spin-disc' : ''
        }`}
      >
        <img
          src={currentSong.coverUrl}
          alt={currentSong.title}
          className="w-full h-full rounded-full object-cover border-2 border-[#0e0512]"
        />
      </div>

      <div className="hidden sm:block text-left text-xs leading-tight">
        <p className="font-bold text-white max-w-[130px] truncate">{currentSong.title}</p>
        <p className="text-[10px] text-[#f7d692] font-semibold max-w-[130px] truncate">{currentSong.artist}</p>
      </div>

      <div className="flex items-center gap-1.5 ml-1">
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff3366] to-[#ff758f] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/10 text-gray-300 flex items-center justify-center hover:text-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f7d692]" />}
        </button>
      </div>
    </div>
  );
};
