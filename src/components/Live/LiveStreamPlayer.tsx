import React, { useState, useEffect } from 'react';
import { Radio, Users, Send, Sparkles } from 'lucide-react';
import type { LiveStream, GiftItem } from '../../types/tiktok';
import { INITIAL_LIVE_STREAMS, GIFTS } from '../../mock/initialData';
import { GiftAnimation } from './GiftAnimation';

export const LiveStreamPlayer: React.FC = () => {
  const [activeStream] = useState<LiveStream>(INITIAL_LIVE_STREAMS[0]);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; text: string; isGift?: boolean }>>([
    { id: '1', user: 'Thành Pro', text: 'Chào idol Linh Gaming! Săn deal 0K ở đâu thế?' },
    { id: '2', user: 'Minh Tuấn', text: 'Live mượt quá anh ơi 🚀' },
    { id: '3', user: 'Hải Yến', text: 'Đã share live cho xóm xem rồi ạ!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [activeGift, setActiveGift] = useState<GiftItem | null>(null);
  const [lastSender, setLastSender] = useState('');

  useEffect(() => {
    const randomUsers = ['Minh Trí', 'Ánh Tuyết', 'Hùng Cường', 'Gia Bảo', 'Quỳnh Anh'];
    const randomTexts = [
      'Giao lưu nhiệt tình quá idol!',
      'Quà tặng xịn đét 🎁',
      'TikTok Live xem thích mê!',
      'Hôm nay livestream mấy tiếng vậy ạ?',
      'Shop còn tai nghe Bluetooth không?'
    ];

    const interval = setInterval(() => {
      const u = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      const t = randomTexts[Math.floor(Math.random() * randomTexts.length)];
      setChatMessages((prev) => [...prev.slice(-15), { id: String(Date.now()), user: u, text: t }]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setChatMessages((prev) => [...prev, { id: String(Date.now()), user: 'Bạn', text: inputText }]);
    setInputText('');
  };

  const handleSendGift = (gift: GiftItem) => {
    setActiveGift(gift);
    setLastSender('Bạn');
    setChatMessages((prev) => [
      ...prev,
      { id: String(Date.now()), user: 'Bạn', text: `Đã tặng ${gift.name}`, isGift: true }
    ]);
    setTimeout(() => setActiveGift(null), 2500);
  };

  return (
    <div className="flex-1 h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-[#0b0c10]">
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <video
          src={activeStream.streamUrl}
          poster={activeStream.poster}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-auto">
          <div className="flex items-center gap-3 glass-panel px-3 py-1.5 rounded-full">
            <img src={activeStream.host.avatar} alt="host" className="w-8 h-8 rounded-full border border-[#fe2c55] object-cover" />
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1">
                {activeStream.host.name}
                <span className="w-3.5 h-3.5 rounded-full bg-[#fe2c55] text-white text-[9px] flex items-center justify-center font-bold">✓</span>
              </p>
              <p className="text-[10px] text-gray-400">{activeStream.host.handle}</p>
            </div>
            <button className="bg-[#fe2c55] text-white font-bold text-xs px-3 py-1 rounded-full ml-2">
              Follow
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#fe2c55] text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <Radio className="w-4 h-4" />
              <span>LIVE</span>
            </div>
            <div className="glass-panel px-3 py-1 rounded-full text-xs text-white font-bold flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#25f4ee]" />
              <span>{activeStream.viewerCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <GiftAnimation activeGift={activeGift} senderName={lastSender} />

        <div className="absolute bottom-4 left-4 z-30 max-w-lg glass-panel p-3 rounded-2xl">
          <h2 className="text-xs font-bold text-white leading-tight">{activeStream.title}</h2>
          <span className="text-[10px] text-[#25f4ee] font-semibold">{activeStream.category}</span>
        </div>
      </div>

      <div className="w-full lg:w-96 border-l border-white/10 glass-panel flex flex-col h-[50vh] lg:h-full">
        <div className="p-3 border-b border-white/10 flex items-center justify-between shrink-0">
          <h3 className="text-xs font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#25f4ee]" />
            <span>Trò chuyện trực tiếp</span>
          </h3>
          <span className="text-[10px] text-gray-400">Quy tắc cộng đồng TikTok</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {chatMessages.map((msg) => (
            <div key={msg.id} className="text-xs leading-snug">
              <span className="font-bold text-[#25f4ee]">{msg.user}: </span>
              <span className={msg.isGift ? 'text-amber-300 font-extrabold' : 'text-gray-200'}>{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-white/10 bg-black/40 shrink-0">
          <p className="text-[11px] font-bold text-gray-400 mb-2 flex items-center justify-between">
            <span>Tặng quà cho Creator</span>
            <span className="text-[#25f4ee] text-[10px]">Xu của bạn: 1,500 🪙</span>
          </p>
          <div className="flex justify-between gap-1 mb-3">
            {GIFTS.map((g) => (
              <button
                key={g.id}
                onClick={() => handleSendGift(g)}
                className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl hover:bg-white/10 transition-transform active:scale-95 text-center"
              >
                <span className="text-xl">{g.icon}</span>
                <span className="text-[9px] font-bold text-amber-400">{g.coins}🪙</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              placeholder="Gửi bình luận..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-9 px-3 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#fe2c55]"
            />
            <button type="submit" className="w-9 h-9 rounded-full bg-[#fe2c55] flex items-center justify-center text-white">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
