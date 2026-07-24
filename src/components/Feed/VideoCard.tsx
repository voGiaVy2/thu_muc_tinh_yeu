import React, { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Heart } from 'lucide-react';
import type { VideoPost, ProductTag } from '../../types/tiktok';
import { VideoOverlay } from './VideoOverlay';
import { CommentDrawer } from './CommentDrawer';
import { ProductShelf } from './ProductShelf';
import { ShareModal } from './ShareModal';

interface VideoCardProps {
  video: VideoPost;
  isActive: boolean;
  onBuyProduct?: (prod: ProductTag) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isActive, onBuyProduct }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [post, setPost] = useState<VideoPost>(video);

  const [showComments, setShowComments] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const [heartPops, setHeartPops] = useState<{ id: number; x: number; y: number }[]>([]);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  const handleVideoTap = (e: React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setHeartPops((prev) => [...prev, { id: Date.now(), x, y }]);
      if (!post.isLiked) {
        setPost((prev) => ({
          ...prev,
          isLiked: true,
          stats: { ...prev.stats, likes: prev.stats.likes + 1 }
        }));
      }
    } else {
      togglePlay();
    }
    lastTapRef.current = now;
  };

  const handleLikeToggle = () => {
    setPost((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      stats: {
        ...prev.stats,
        likes: prev.isLiked ? prev.stats.likes - 1 : prev.stats.likes + 1
      }
    }));
  };

  const handleBookmarkToggle = () => {
    setPost((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
      stats: {
        ...prev.stats,
        bookmarks: prev.isBookmarked ? prev.stats.bookmarks - 1 : prev.stats.bookmarks + 1
      }
    }));
  };

  return (
    <div className="video-snap-item w-full h-full bg-black relative flex items-center justify-center overflow-hidden select-none">
      <video
        ref={videoRef}
        src={post.videoUrl}
        poster={post.poster}
        loop
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoTap}
        className="w-full h-full object-cover cursor-pointer"
      />

      {heartPops.map((heart) => (
        <div
          key={heart.id}
          style={{ left: heart.x, top: heart.y }}
          className="absolute pointer-events-none heart-pop-animation z-30"
        >
          <Heart className="w-20 h-20 fill-[#fe2c55] text-[#fe2c55] drop-shadow-2xl" />
        </div>
      ))}

      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-auto cursor-pointer z-10"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-110 shadow-2xl">
            <Play className="w-8 h-8 fill-white ml-1" />
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-30 pointer-events-auto">
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#25f4ee]" />}
        </button>
      </div>

      <VideoOverlay
        video={post}
        onLikeToggle={handleLikeToggle}
        onBookmarkToggle={handleBookmarkToggle}
        onOpenComments={() => setShowComments(true)}
        onOpenShop={() => setShowShop(true)}
        onOpenShare={() => setShowShare(true)}
      />

      <div
        onClick={handleSeek}
        className="absolute bottom-0 inset-x-0 h-1.5 bg-white/20 hover:h-3 transition-all cursor-pointer z-30"
      >
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-[#fe2c55] to-[#25f4ee] rounded-r-full"
        />
      </div>

      <CommentDrawer
        comments={[
          {
            id: 'c1',
            user: { name: 'Hoàng Nam', handle: '@nam_tech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', verified: true },
            text: 'Video quá chất lượng luôn shop ơi! Đã chốt đơn tai nghe rồi nha 🔥',
            timestamp: '10 phút trước',
            likes: 42
          },
          {
            id: 'c2',
            user: { name: 'Thanh Hà', handle: '@ha_decor', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
            text: 'Đèn RGB cảm biến nhạc mua ở đâu vậy ạ?',
            timestamp: '25 phút trước',
            likes: 18
          }
        ]}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        onAddComment={() => {
          setPost((prev) => ({
            ...prev,
            stats: { ...prev.stats, comments: prev.stats.comments + 1 }
          }));
        }}
        totalCount={post.stats.comments}
      />

      {post.shopProducts && (
        <ProductShelf
          products={post.shopProducts}
          isOpen={showShop}
          onClose={() => setShowShop(false)}
          onBuyNow={(prod) => {
            setShowShop(false);
            if (onBuyProduct) onBuyProduct(prod);
          }}
        />
      )}

      <ShareModal
        video={post}
        isOpen={showShare}
        onClose={() => setShowShare(false)}
      />
    </div>
  );
};
