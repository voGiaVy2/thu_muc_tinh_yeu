import React, { useState } from 'react';
import { Sparkles, Wand2, RefreshCw } from 'lucide-react';

interface AICaptionGeneratorProps {
  onApply: (caption: string, hashtags: string[]) => void;
}

export const AICaptionGenerator: React.FC<AICaptionGeneratorProps> = ({ onApply }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{ caption: string; hashtags: string[] } | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const mockResults: Record<string, { caption: string; hashtags: string[] }> = {
        default: {
          caption: `🔥 Khám phá ngay ${topic} siêu đỉnh năm 2026! Đừng bỏ lỡ vì video này sẽ thay đổi cách bạn tư duy. Thấy hay nhớ thả tim & follow mình nhé! 🚀✨`,
          hashtags: [`#${topic.replace(/\s+/g, '')}`, '#ViralTikTok', '#XuHuong2026', '#TikTokTech', '#MustWatch']
        }
      };

      setGeneratedResult(mockResults.default);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-[#25f4ee]/30 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#25f4ee] to-blue-500 flex items-center justify-center text-black font-bold">
          <Wand2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            Trợ lý AI Tạo Caption & Hashtags Viral
            <span className="text-[10px] bg-[#25f4ee]/20 text-[#25f4ee] px-2 py-0.5 rounded-full font-bold">AI Pro</span>
          </h3>
          <p className="text-xs text-gray-400">Nhập chủ đề video của bạn để AI tự động tối ưu hóa kịch bản và hashtag lên xu hướng</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ví dụ: Review bàn phím cơ custom 75%, góc setup chill, tai nghe ANC..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 h-10 px-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#25f4ee]"
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="btn-cyan py-2 px-4 text-xs font-bold flex items-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isGenerating ? 'AI Đang viết...' : 'Tạo Kịch Bản AI'}</span>
        </button>
      </div>

      {generatedResult && (
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 animate-in fade-in">
          <p className="text-xs text-gray-200 font-medium mb-3 leading-relaxed">{generatedResult.caption}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {generatedResult.hashtags.map((h, i) => (
              <span key={i} className="text-xs text-[#25f4ee] font-bold">{h}</span>
            ))}
          </div>
          <button
            onClick={() => onApply(generatedResult.caption, generatedResult.hashtags)}
            className="btn-primary py-1.5 px-4 text-xs font-bold"
          >
            Áp dụng vào Video
          </button>
        </div>
      )}
    </div>
  );
};
