export interface Author {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
  followerCount: string;
  isFollowing?: boolean;
  bio?: string;
}

export interface SoundTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration?: string;
  useCount?: string;
  category?: string;
}

export interface ProductTag {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  salesCount: string;
  imageUrl: string;
  discountPercentage: number;
  sellerName: string;
  inStock: boolean;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export interface VideoPost {
  id: string;
  videoUrl: string;
  poster: string;
  caption: string;
  hashtags: string[];
  author: Author;
  sound: SoundTrack;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
    views: number;
  };
  shopProducts?: ProductTag[];
  timestamp: string;
  category: 'Tech' | 'Fashion' | 'Gaming' | 'Food' | 'Music' | 'AI' | 'Comedy';
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface LiveStream {
  id: string;
  host: Author;
  title: string;
  category: string;
  viewerCount: number;
  poster: string;
  streamUrl: string;
  giftCount: number;
}

export interface GiftItem {
  id: string;
  name: string;
  icon: string;
  coins: number;
  effect: 'rose' | 'heart' | 'rocket' | 'crown' | 'fireworks';
}

export type MainTab = 'for-you' | 'following' | 'shop' | 'live' | 'explore' | 'studio' | 'analytics';
