import type { VideoPost, LiveStream, ProductTag, SoundTrack, GiftItem } from '../types/tiktok';

export const INITIAL_PRODUCTS: ProductTag[] = [
  {
    id: 'prod-1',
    title: 'Tai nghe Bluetooth Không Dây CyberSound Pro - Chống Ồn ANC 45dB',
    price: 499000,
    originalPrice: 890000,
    rating: 4.9,
    salesCount: '12.4k',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    discountPercentage: 44,
    sellerName: 'CyberSound Official Store',
    inStock: true
  },
  {
    id: 'prod-2',
    title: 'Đèn Led RGB Decor Bàn Làm Việc 16 Triệu Màu Cảm Biến Theo Nhạc',
    price: 289000,
    originalPrice: 450000,
    rating: 4.8,
    salesCount: '25.8k',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    discountPercentage: 35,
    sellerName: 'GlowTech Studio',
    inStock: true
  },
  {
    id: 'prod-3',
    title: 'Áo Hoodie Streetwear Form Rộng Nam Nữ Unisex Chất Nỉ Bông Hàn Quốc',
    price: 320000,
    originalPrice: 550000,
    rating: 4.9,
    salesCount: '48.1k',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    discountPercentage: 41,
    sellerName: 'UrbanVibe Fashion',
    inStock: true
  },
  {
    id: 'prod-4',
    title: 'Bàn Phím Cơ Không Dây Custom Mechanical Keyboard 75% Hotswap',
    price: 1190000,
    originalPrice: 1890000,
    rating: 5.0,
    salesCount: '8.9k',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    discountPercentage: 37,
    sellerName: 'KeyCrafter Gear',
    inStock: true
  }
];

export const INITIAL_VIDEOS: VideoPost[] = [
  {
    id: 'v-1',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-landscape-at-night-42867-large.mp4',
    poster: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    caption: 'Thành phố tương lai Cyberpunk 2077 với công nghệ AI chiếu sáng cực đỉnh! Mọi người thấy thế nào? 🚀✨',
    hashtags: ['#Cyberpunk', '#AITech', '#FutureVibes', '#TikTokTech', '#Xuhuong'],
    author: {
      id: 'usr-1',
      name: 'TechVision AI',
      handle: 'techvision_ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      followerCount: '1.8M',
      bio: 'Chia sẻ công nghệ đỉnh cao & Xu hướng AI tương lai 🔥'
    },
    sound: {
      id: 'snd-1',
      title: 'Midnight Cyber Drive - Remix Tech Beats',
      artist: 'Synthwave Labs',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80'
    },
    stats: {
      likes: 248900,
      comments: 3420,
      shares: 15400,
      bookmarks: 42100,
      views: 1250000
    },
    shopProducts: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]],
    timestamp: '2 giờ trước',
    category: 'Tech',
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'v-2',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-42936-large.mp4',
    poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Một ngày làm việc Setup góc bàn máy tính với Bàn phím cơ & Đèn RGB cực chill 🎧💻',
    hashtags: ['#DeskSetup', '#Keyboard', '#ChillVibes', '#Workstation', '#Productivity'],
    author: {
      id: 'usr-2',
      name: 'Minh Chill Corner',
      handle: 'minh_chill_desk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      followerCount: '950K',
      bio: 'Decor góc làm việc & Đánh giá công nghệ độc lạ ✨'
    },
    sound: {
      id: 'snd-2',
      title: 'Lofi Study Chill Beats 2026',
      artist: 'Coffee & Code',
      coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=200&q=80'
    },
    stats: {
      likes: 185400,
      comments: 1980,
      shares: 8900,
      bookmarks: 31200,
      views: 890000
    },
    shopProducts: [INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[3]],
    timestamp: '5 giờ trước',
    category: 'Tech',
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 'v-3',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41527-large.mp4',
    poster: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=800&q=80',
    caption: 'Review Tai nghe Bluetooth chống ồn ANC siêu đỉnh giá sinh viên. Mua ngay ở TikTok Shop nhé! 👇🛍️',
    hashtags: ['#ReviewGiare', '#TaiNgheBluetooth', '#TikTokShop', '#MuaNgay'],
    author: {
      id: 'usr-3',
      name: 'Ngọc Reviewer',
      handle: 'ngoc_review_all',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      verified: false,
      followerCount: '520K',
      bio: 'Săn deal ngon & Review đồ công nghệ hot nhất 🛒'
    },
    sound: {
      id: 'snd-3',
      title: 'TikTok Viral Bass Boost 2026',
      artist: 'DJ Trending',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80'
    },
    stats: {
      likes: 98400,
      comments: 1240,
      shares: 4300,
      bookmarks: 18900,
      views: 450000
    },
    shopProducts: [INITIAL_PRODUCTS[0]],
    timestamp: '1 ngày trước',
    category: 'Fashion',
    isLiked: false,
    isBookmarked: false
  }
];

export const INITIAL_LIVE_STREAMS: LiveStream[] = [
  {
    id: 'live-1',
    host: {
      id: 'usr-live-1',
      name: 'Streamer Linh Gaming',
      handle: 'linh_game_live',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      followerCount: '2.5M'
    },
    title: '🔴 LIVE: Săn Deal Sốc TikTok Shop 0K & Leo Rank Cao Thủ!',
    category: 'Gaming & Shopping',
    viewerCount: 14520,
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-41527-large.mp4',
    giftCount: 89400
  },
  {
    id: 'live-2',
    host: {
      id: 'usr-live-2',
      name: 'DJ Sunset Session',
      handle: 'sunset_dj_vibes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      followerCount: '810K'
    },
    title: '🎵 Live Music Party: EDM & Deep House Chill Night',
    category: 'Music',
    viewerCount: 8930,
    poster: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    streamUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-landscape-at-night-42867-large.mp4',
    giftCount: 34100
  }
];

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: 'snd-1',
    title: 'Midnight Cyber Drive',
    artist: 'Synthwave Labs',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    duration: '0:30',
    useCount: '1.2M video',
    category: 'Cyberpunk / Tech'
  },
  {
    id: 'snd-2',
    title: 'Lofi Study Chill Beats 2026',
    artist: 'Coffee & Code',
    coverUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=200&q=80',
    duration: '0:45',
    useCount: '890K video',
    category: 'Relax & Chill'
  },
  {
    id: 'snd-3',
    title: 'TikTok Viral Bass Boost 2026',
    artist: 'DJ Trending',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=200&q=80',
    duration: '0:15',
    useCount: '3.4M video',
    category: 'EDM & Dance'
  }
];

export const GIFTS: GiftItem[] = [
  { id: 'g-1', name: 'Hoa Hồng 🌹', icon: '🌹', coins: 1, effect: 'rose' },
  { id: 'g-2', name: 'Trái Tim 💖', icon: '💖', coins: 10, effect: 'heart' },
  { id: 'g-3', name: 'Kim Cương 💎', icon: '💎', coins: 99, effect: 'rocket' },
  { id: 'g-4', name: 'Vương Miện 👑', icon: '👑', coins: 499, effect: 'crown' },
  { id: 'g-5', name: 'Tên Lửa 🚀', icon: '🚀', coins: 999, effect: 'fireworks' }
];
