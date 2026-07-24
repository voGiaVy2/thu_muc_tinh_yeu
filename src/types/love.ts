export interface CoupleInfo {
  person1: {
    name: string;
    avatar: string;
    birthdate?: string;
  };
  person2: {
    name: string;
    avatar: string;
    birthdate?: string;
  };
  startDate: string; // ISO date string e.g. "2024-05-20T00:00:00"
  secretPin: string; // e.g. "5201314"
}

export interface MemoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  location?: string;
  tag?: string;
}

export interface LoveLetter {
  id: string;
  sender: string;
  receiver: string;
  title: string;
  content: string[];
  writtenDate: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
