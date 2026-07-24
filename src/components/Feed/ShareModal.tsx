import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import type { VideoPost } from '../../types/tiktok';

interface ShareModalProps {
  video: VideoPost;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ video, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#14161d] border border-white/10 rounded-3xl p-6 w-full max-w-sm text-center relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <Share2 className="w-10 h-10 text-[#25f4ee] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-1">Chia sẻ video này</h3>
        <p className="text-xs text-gray-400 mb-6">Lan tỏa nội dung của {video.author.name} đến bạn bè</p>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Messenger', bg: 'bg-blue-600', icon: '💬' },
            { label: 'WhatsApp', bg: 'bg-emerald-600', icon: '📲' },
            { label: 'Mã QR', bg: 'bg-purple-600', icon: '🔲' },
            { label: 'Nhúng', bg: 'bg-amber-600', icon: '</>' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 cursor-pointer group">
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-[11px] text-gray-300 font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-xs text-gray-300 px-3 flex-1 focus:outline-none overflow-hidden text-ellipsis"
          />
          <button
            onClick={handleCopy}
            className={`btn-primary text-xs py-2 px-4 ${copied ? 'bg-emerald-500' : ''}`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
