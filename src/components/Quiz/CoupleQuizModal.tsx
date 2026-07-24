import React, { useState } from 'react';
import { Award, RefreshCw, X } from 'lucide-react';
import type { QuizQuestion } from '../../types/love';
import { QUIZ_QUESTIONS } from '../../mock/coupleData';
import confetti from 'canvas-confetti';

interface CoupleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoupleQuizModal: React.FC<CoupleQuizModalProps> = ({ isOpen, onClose }) => {
  const [questions] = useState<QuizQuestion[]>(QUIZ_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelect = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    if (optionIdx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="glass-dark-card p-6 sm:p-10 rounded-[44px] max-w-lg w-full relative text-center shadow-2xl border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        {!isCompleted ? (
          <>
            <div className="flex items-center justify-between text-xs font-bold text-[#f7d692] mb-6 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
              <span>Điểm số: {score} ✨</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-snug font-serif-luxury">{currentQ.question}</h3>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 font-semibold';
                if (selectedOption !== null) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-extrabold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-[#ff3366]/20 border-[#ff3366] text-[#ff3366] font-extrabold';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full p-4 rounded-2xl border text-xs text-left transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="animate-in fade-in space-y-4">
                <p className="text-xs text-gray-300 italic bg-white/5 p-3.5 rounded-2xl border border-white/10 font-medium">
                  {currentQ.explanation}
                </p>
                <button onClick={handleNext} className="btn-luxury-primary py-2.5 px-8 text-xs mx-auto">
                  <span>{currentIndex < questions.length - 1 ? 'Câu tiếp theo ➔' : 'Xem Kết Quả 🏆'}</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-5 py-4 animate-in zoom-in-95">
            <Award className="w-20 h-20 text-[#f7d692] mx-auto animate-bounce filter drop-shadow-[0_0_20px_rgba(247,214,146,0.6)]" />
            <h3 className="text-2xl font-bold text-white font-serif-luxury">Kết Quả Trắc Nghiệm Tình Yêu</h3>
            <p className="text-2xl font-black text-[#ff3366]">
              Bạn trả lời đúng {score} / {questions.length} câu! 💖
            </p>

            <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
              {score === questions.length
                ? 'Hai bạn là cặp đôi hoàn hảo & gắn kết nhất trên thế giới! 💖'
                : 'Thật ngọt ngào! Hãy cùng nhau tạo thêm thật nhiều kỷ niệm vô giá nhé! 🥰'}
            </p>

            <button onClick={handleReset} className="btn-luxury-primary py-2.5 px-8 text-xs mx-auto">
              <RefreshCw className="w-4 h-4" />
              <span>Thử Thách Lại</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
