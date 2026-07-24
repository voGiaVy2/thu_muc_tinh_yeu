import React, { useState } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, ShoppingBag, Music2, Plus } from 'lucide-react';
import type { VideoPost } from '../../types/tiktok';

interface VideoOverlayProps {
  video: VideoPost;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
  onOpenComments: () => void;
  onOpenShop: () => void;
  onOpenShare: () => void;
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  video,
  onLikeToggle,
  onBookmarkToggle,
  onOpenComments,
  onOpenShop,
  onOpenShare,
}) => {
  const [isFollowing, setIsFollowing] = useState(video.author.isFollowing || false);
  const [expandedCaption, setExpandedCaption] = useState(false);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6 z-20">
      {/* Top Bar Overlay (Category Pill) */}
      <div className="pointer-events-auto flex items-center justify-between">
        <div className="glass-pill px-3 py-1 rounded-full text-xs font-semibold text-white/90 flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#fe2c55] animate-ping" />
          <span>{video.category}</span>
        </div>
      </div>

      {/* Main Content & Bottom Right Actions */}
      <div className="flex items-end justify-between gap-4">
        {/* Left Creator Info & Caption */}
        <div className="pointer-events-auto flex-1 max-w-[80%] space-y-3 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={video.author.avatar}
                alt={video.author.name}
                className="w-11 h-11 rounded-full border-2 border-[#fe2c55] object-cover"
              />
              {!isFollowing && (
                <button
                  onClick={() => setIsFollowing(true)}
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#fe2c55] flex items-center justify-center text-white text-xs font-bold shadow-lg hover:scale-110 transition-transform"
                  title="Theo dõi"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white drop-shadow-md">{video.author.name}</span>
                {video.author.verified && (
                  <span className="w-4 h-4 rounded-full bg-[#25f4ee] text-black text-[10px] font-black flex items-center justify-center">✓</span>
                )}
              </div>
              <p className="text-xs text-gray-300 drop-shadow">@{video.author.handle}</p>
            </div>

            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`ml-2 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                isFollowing
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-[#fe2c55] border-[#fe2c55] text-white hover:bg-[#fe2c55]/90'
              }`}
            >
              {isFollowing ? 'Đang Follow' : 'Follow'}
            </button>
          </div>

          {video.shopProducts && video.shopProducts.length > 0 && (
            <button
              onClick={onOpenShop}
              className="bg-amber-400 text-black font-extrabold text-xs px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span>Sản phẩm trong video ({video.shopProducts.length}) • Giảm tới {video.shopProducts[0].discountPercentage}%</span>
            </button>
          )}

          <div>
            <p className={`text-xs sm:text-sm text-gray-100 font-medium leading-relaxed drop-shadow-md ${!expandedCaption && 'line-clamp-2'}`}>
              {video.caption}
            </p>
            {video.caption.length > 60 && (
              <button
                onClick={() => setExpandedCaption(!expandedCaption)}
                className="text-xs font-bold text-gray-300 hover:text-white mt-0.5"
              >
                {expandedCaption ? 'Ẩn bớt' : '...Xem thêm'}
              </button>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {video.hashtags.map((tag, idx) => (
                <span key={idx} className="text-xs font-bold text-[#25f4ee] hover:underline cursor-pointer drop-shadow">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-200 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-fit max-w-full">
            <Music2 className="w-3.5 h-3.5 text-[#25f4ee] animate-bounce" />
            <span className="truncate font-semibold">{video.sound.title} - {video.sound.artist}</span>
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col items-center gap-5 text-white">
          <button
            onClick={onLikeToggle}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-all group-active:scale-125 ${
              video.isLiked ? 'bg-[#fe2c55]/20 border-[#fe2c55]' : 'hover:bg-white/20'
            }`}>
              <Heart
                className={`w-6 h-6 transition-all ${
                  video.isLiked ? 'fill-[#fe2c55] text-[#fe2c55] scale-110' : 'text-white'
                }`}
              />
            </div>
            <span className="text-xs font-extrabold drop-shadow">
              {video.stats.likes >= 1000 ? `${(video.stats.likes / 1000).toFixed(1)}k` : video.stats.likes}
            </span>
          </button>

          <button
            onClick={onOpenComments}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-all group-active:scale-125">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-extrabold drop-shadow">
              {video.stats.comments >= 1000 ? `${(video.stats.comments / 1000).toFixed(1)}k` : video.stats.comments}
            </span>
          </button>

          <button
            onClick={onBookmarkToggle}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <div className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center transition-all group-active:scale-125 ${
              video.isBookmarked ? 'bg-amber-400/20 border-amber-400' : 'hover:bg-white/20'
            }`}>
              <Bookmark
                className={`w-6 h-6 transition-all ${
                  video.isBookmarked ? 'fill-amber-400 text-amber-400 scale-110' : 'text-white'
                }`}
              />
            </div>
            <span className="text-xs font-extrabold drop-shadow">
              {video.stats.bookmarks >= 1000 ? `${(video.stats.bookmarks / 1000).toFixed(1)}k` : video.stats.bookmarks}
            </span>
          </button>

          <button
            onClick={onOpenShare}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/20 transition-all group-active:scale-125">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-extrabold drop-shadow">
              {video.stats.shares >= 1000 ? `${(video.stats.shares / 1000).toFixed(1)}k` : video.stats.shares}
            </span>
          </button>

          <div className="relative mt-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-900 to-gray-700 p-1 border-2 border-white/30 shadow-xl animate-spin-disc flex items-center justify-center">
              <img
                src={video.sound.coverUrl}
                alt={video.sound.title}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
