import React, { useState } from 'react';
import { Upload, Video, CheckCircle2 } from 'lucide-react';
import type { VideoPost } from '../../types/tiktok';
import { AICaptionGenerator } from './AICaptionGenerator';
import confetti from 'canvas-confetti';

interface StudioPageProps {
  onPublishVideo: (newVid: VideoPost) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onPublishVideo }) => {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(['#TikTokPro', '#XuHuong']);
  const [category, setCategory] = useState<'Tech' | 'Fashion' | 'Gaming' | 'Food' | 'Music' | 'AI' | 'Comedy'>('Tech');
  const [videoFileUrl, setVideoFileUrl] = useState<string>('https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41527-large.mp4');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handleApplyAICaption = (aiCaption: string, aiHashtags: string[]) => {
    setCaption(aiCaption);
    setHashtags(aiHashtags);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setVideoFileUrl(url);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    setIsPublishing(true);

    setTimeout(() => {
      const newVideo: VideoPost = {
        id: `vid-${Date.now()}`,
        videoUrl: videoFileUrl,
        poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
        caption: caption,
        hashtags: hashtags,
        author: {
          id: 'usr-me',
          name: 'Kênh Của Bạn (Creator)',
          handle: 'your_pro_channel',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          verified: true,
          followerCount: '10.5K'
        },
        sound: {
          id: 'snd-new',
          title: 'Âm thanh gốc - your_pro_channel',
          artist: 'Kênh Của Bạn',
          coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        },
        stats: {
          likes: 1,
          comments: 0,
          shares: 0,
          bookmarks: 0,
          views: 12
        },
        timestamp: 'Vừa xong',
        category: category,
        isLiked: true
      };

      onPublishVideo(newVideo);
      setIsPublishing(false);
      setPublishedSuccess(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      setTimeout(() => setPublishedSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-8 bg-[#0b0c10] max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-[#fe2c55]" />
            <span>TikTok Studio Creator AI</span>
          </h1>
          <p className="text-xs text-gray-400">Tải lên video ngắn và tối ưu hóa nội dung để lên Xu Hướng TikTok</p>
        </div>
      </div>

      {publishedSuccess ? (
        <div className="glass-panel p-10 rounded-3xl text-center space-y-4 animate-in zoom-in-95">
          <CheckCircle2 className="w-20 h-20 text-[#25f4ee] mx-auto animate-bounce" />
          <h2 className="text-2xl font-black text-white">Đã đăng Video thành công lên Feed TikTok!</h2>
          <p className="text-sm text-gray-300">Video của bạn đã sẵn sàng tiếp cận hàng triệu khán giả.</p>
        </div>
      ) : (
        <form onSubmit={handlePublish} className="space-y-6">
          <AICaptionGenerator onApply={handleApplyAICaption} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 glass-panel rounded-3xl p-5 border border-white/10 flex flex-col items-center justify-center min-h-[320px] text-center relative overflow-hidden">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-20"
              />
              {videoFileUrl ? (
                <video src={videoFileUrl} controls className="w-full h-72 rounded-2xl object-cover" />
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#fe2c55]/20 text-[#fe2c55] flex items-center justify-center mx-auto">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Chọn video để tải lên</h3>
                  <p className="text-xs text-gray-400">MP4, WebM hoặc MOV (Tối đa 720p/1080p, dưới 60s)</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Mô tả Video & Caption</label>
                <textarea
                  rows={4}
                  placeholder="Nhập nội dung thu hút khán giả..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#fe2c55]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Danh mục nội dung</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full h-10 px-4 bg-[#14161d] border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#25f4ee]"
                >
                  {['Tech', 'Fashion', 'Gaming', 'Food', 'Music', 'AI', 'Comedy'].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isPublishing || !caption.trim()}
                  className="btn-primary py-3 px-8 text-sm font-extrabold disabled:opacity-50"
                >
                  {isPublishing ? 'Đang đăng video...' : 'Đăng Video Ngay'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
