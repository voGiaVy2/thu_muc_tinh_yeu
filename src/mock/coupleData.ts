import type { CoupleInfo, MemoryMilestone, LoveLetter, QuizQuestion } from '../types/love';

export const INITIAL_COUPLE: CoupleInfo = {
  person1: {
    name: 'Minh Anh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    birthdate: '15/08'
  },
  person2: {
    name: 'Thu Hà',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    birthdate: '20/10'
  },
  startDate: '2024-05-20T13:14:00', // 520 13:14 (Anh Yêu Em 5201314)
  secretPin: '5201314'
};

export const MEMORY_MILESTONES: MemoryMilestone[] = [
  {
    id: 'm-1',
    date: '20/05/2024',
    title: 'Lần Đầu Gặp Nhau Ở Quán Cà Phê Mưa',
    description: 'Ngày hôm đó trời mưa tầm tã, hai đứa cùng trú mưa dưới hiên quán cà phê nhỏ. Nụ cười đầu tiên ấy làm anh xao xuyến cả đời.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    location: 'Hà Nội',
    tag: 'Gặp Nhau'
  },
  {
    id: 'm-2',
    date: '14/02/2025',
    title: 'Buổi Hẹn Hò Valentine Đầu Tiên',
    description: 'Bữa tối lãng mạn dưới ánh nến và bông hoa hồng đỏ thắm. Cùng nắm tay bước đi dưới hàng cây thắp sáng đèn thăng hoa cảm xúc.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    location: 'Đà Nẵng',
    tag: 'Valentine'
  },
  {
    id: 'm-3',
    date: '30/04/2025',
    title: 'Chuyến Du Lịch Biển Đà Lạt & Nắng Vàng',
    description: 'Cùng nhau ngắm bình minh trên đỉnh đồi thông mờ sương, thưởng thức tách trà nóng và trao nhau cái ôm thật chặt.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    location: 'Đà Lạt',
    tag: 'Du Lịch'
  },
  {
    id: 'm-4',
    date: '20/05/2025',
    title: 'Kỷ Niệm 1 Năm Ngày Chính Thức Yêu Nhau',
    description: 'Cùng nhìn lại chặng đường 365 ngày ngọt ngào, cùng khóc cùng cười và hứa sẽ luôn bên nhau dù bất cứ điều gì xảy ra.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    location: 'Trái Tim Anh',
    tag: 'Kỷ Niệm'
  }
];

export const SECRET_LOVE_LETTER: LoveLetter = {
  id: 'letter-1',
  sender: 'Minh Anh',
  receiver: 'Thu Hà',
  title: 'Gửi Em - Người Con Gái Anh Yêu Nhất Chiều Nay & Cả Đời 🌹',
  content: [
    'Gửi Thu Hà yêu dấu của anh,',
    'Từ giây phút đầu tiên nhìn thấy nụ cười của em, anh đã biết trái tim mình đã tìm thấy bến đỗ bình yên nhất.',
    'Cảm ơn em vì đã luôn ở bên cạnh anh, cùng anh chia sẻ những niềm vui nho nhỏ và cả những bộn bề trong cuộc sống. Mỗi ngày có em đều là một ngày nắng ấm.',
    'Anh hứa sẽ luôn thương yêu, lắng nghe và bảo vệ em mỗi ngày. Mong rằng chặng đường tương lai của chúng ta sẽ luôn ngập tràn tiếng cười và tình yêu thắm thiết.',
    'Yêu em nhiều hơn những gì từ ngữ có thể diễn tả! ❤️'
  ],
  writtenDate: '20/05/2026'
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Lần đầu tiên hai đứa gặp nhau là ở đâu?',
    options: ['Quán Cà Phê Mưa', 'Rạp Chiếu Phim', 'Công Viên', 'Trường Đại Học'],
    correctIndex: 0,
    explanation: 'Chính xác! Ngày hôm đó trời mưa tầm tã và hai đứa đã trú mưa cùng nhau ❤️'
  },
  {
    id: 2,
    question: 'Món ăn nào là món cả 2 người cùng nghiện nhất?',
    options: ['Lẩu Thái Hải Sản', 'Bún Đậu Mắm Tôm', 'Pizza Hải Sản', 'Trà Sữa Matcha'],
    correctIndex: 0,
    explanation: 'Chuẩn luôn! Lẩu Thái chua cay cuối tuần là món ruột của hai đứa 🍲'
  },
  {
    id: 3,
    question: 'Địa điểm du lịch lãng mạn nhất hai đứa từng đi?',
    options: ['Đà Lạt Đồi Thông', 'Phú Quốc Biển Xanh', 'Sapa Sương Mù', 'Nha Trang'],
    correctIndex: 0,
    explanation: 'Đúng rồi! Đà Lạt mờ sương với tách trà nóng và cái ôm thật chặt ✨'
  },
  {
    id: 4,
    question: 'Con số kỷ niệm đặc biệt bí mật của chúng mình là gì?',
    options: ['5201314', '1314520', '9999999', '1234567'],
    correctIndex: 0,
    explanation: '5201314 - Anh Yêu Em Trọn Đời Trọn Kiếp! 💖'
  }
];

export const BACKGROUND_SONGS = [
  {
    id: 'song-1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-11357.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'song-[#2]',
    title: 'Perfect Piano Melody',
    artist: 'Romantic Strings',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a8d11b.mp3?filename=soft-piano-romantic-10255.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=80'
  }
];
