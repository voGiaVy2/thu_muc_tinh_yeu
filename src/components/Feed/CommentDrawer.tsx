import React, { useState } from 'react';
import { Heart, Send, Smile, MessageSquare, CheckCircle } from 'lucide-react';
import type { Comment } from '../../types/tiktok';

interface CommentDrawerProps {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (text: string) => void;
  totalCount: number;
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({
  comments,
  isOpen,
  onClose,
  onAddComment,
  totalCount,
}) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [commentList, setCommentList] = useState<Comment[]>(comments);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      user: {
        name: 'Bạn (Người dùng)',
        handle: '@user_pro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        verified: true
      },
      text: newCommentText,
      timestamp: 'Vừa xong',
      likes: 0,
      isLiked: false
    };

    setCommentList([newComment, ...commentList]);
    onAddComment(newCommentText);
    setNewCommentText('');
  };

  const toggleCommentLike = (id: string) => {
    setCommentList(
      commentList.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            isLiked: !c.isLiked,
            likes: c.isLiked ? c.likes - 1 : c.likes + 1
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="absolute inset-x-0 bottom-0 bg-[#12141d]/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-4 z-40 animate-in slide-in-from-bottom duration-300 h-[65%] flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#fe2c55]" />
          <span>Bình luận ({totalCount})</span>
        </h3>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
        {commentList.map((c) => (
          <div key={c.id} className="flex gap-3">
            <img
              src={c.user.avatar}
              alt={c.user.name}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-200">{c.user.name}</span>
                {c.user.verified && <CheckCircle className="w-3 h-3 text-[#25f4ee]" />}
                <span className="text-[10px] text-gray-500">• {c.timestamp}</span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5 leading-snug">{c.text}</p>

              <div className="flex items-center gap-4 mt-1.5 text-[11px] text-gray-400 font-semibold">
                <button className="hover:text-white">Trả lời</button>
              </div>
            </div>

            <button
              onClick={() => toggleCommentLike(c.id)}
              className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-[#fe2c55] self-start"
            >
              <Heart
                className={`w-3.5 h-3.5 ${c.isLiked ? 'fill-[#fe2c55] text-[#fe2c55]' : ''}`}
              />
              <span className="text-[10px]">{c.likes}</span>
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="pt-3 border-t border-white/10 flex items-center gap-2 shrink-0">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Viết bình luận công khai..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full h-10 pl-4 pr-10 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#fe2c55]"
          />
          <Smile className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 cursor-pointer hover:text-amber-400" />
        </div>
        <button
          type="submit"
          disabled={!newCommentText.trim()}
          className="w-10 h-10 rounded-full bg-[#fe2c55] disabled:opacity-40 flex items-center justify-center text-white shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
