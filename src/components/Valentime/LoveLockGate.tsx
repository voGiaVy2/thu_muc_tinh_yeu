import React, { useState } from 'react';
import { Lock, Heart, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

interface LoveLockGateProps {
  onUnlock: () => void;
}

const PRESET_OPTIONS = [
  'Táo đáng iu',
  'Bà xã Thanh Trúc đại nhân',
  'cục húi chửi tui như con'
];

const VALID_PASSWORDS = PRESET_OPTIONS.map((opt) => opt.toLowerCase());

export const LoveLockGate: React.FC<LoveLockGateProps> = ({ onUnlock }) => {
  const [inputName, setInputName] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const checkPassword = (name: string): boolean => {
    const cleanName = name.trim().toLowerCase();
    return (
      VALID_PASSWORDS.some((pass) => cleanName === pass) ||
      cleanName.includes('táo') ||
      cleanName.includes('thanh trúc') ||
      cleanName.includes('bà xã') ||
      cleanName.includes('cục húi') ||
      cleanName.includes('chửi tui') ||
      cleanName.includes('vợ anh')
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) {
      setErrorMessage('Vui lòng nhập tên để mở khóa!');
      return;
    }

    if (checkPassword(inputName)) {
      onUnlock();
    } else {
      setHasAttempted(true);
      setErrorMessage('Sai rồi, phải nhập tên vợ anh! 😝');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setInputName(text);
    setCopiedIndex(index);
    setErrorMessage('');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c0814]/90 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-in fade-in duration-300">
      
      {/* Background Floating Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] bg-[#da0000]/20 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-[#f4c890]/20 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      {/* Main Lock Card Container */}
      <div
        className={`w-full max-w-md bg-[#160e22]/90 border border-[#da0000]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#da0000]/20 relative z-10 text-center transition-all ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#da0000] to-[#ff5e7e] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#da0000]/40">
          <Lock className="w-8 h-8" />
        </div>

        {/* Title */}
        <h2 className="font-serif-editorial text-3xl sm:text-4xl text-white font-bold tracking-tight mb-1">
          Hồ Sơ Tình Yêu
        </h2>
        <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#f4c890] uppercase block mb-6">
          YÊU CẦU ĐĂNG NHẬP BẢO MẬT
        </span>

        {/* Form Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setErrorMessage('');
              }}
              placeholder="nhập tên bạn để vào web"
              className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm font-medium focus:outline-none focus:border-[#da0000] focus:ring-2 focus:ring-[#da0000]/50 transition-all text-center"
              autoFocus
            />
            <Heart className="w-4 h-4 text-[#da0000] absolute right-4 top-1/2 -translate-y-1/2 fill-[#da0000]/40" />
          </div>

          {/* Error Warning Message */}
          {errorMessage && (
            <div className="text-xs font-bold text-[#ff4d6d] bg-[#ff4d6d]/15 border border-[#ff4d6d]/30 px-4 py-2 rounded-xl flex items-center justify-center gap-1.5 animate-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#da0000] to-[#ff2a5f] hover:from-[#ff2a5f] hover:to-[#da0000] text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#da0000]/30 transition-all active:scale-95 flex items-center justify-center gap-2 mt-1 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#f4c890]" />
            <span>Đăng Nhập Vào Web</span>
          </button>
        </form>

        {/* Copyable Passwords Box (Appears after 1st attempt) */}
        {hasAttempted && (
          <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-bold text-[#f4c890] mb-3 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#f4c890]" />
              <span>Danh Sách Tên Vợ Anh Hợp Lệ (Bấm để Copy):</span>
            </p>

            <div className="flex flex-col gap-2">
              {PRESET_OPTIONS.map((option, idx) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleCopy(option, idx)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-left text-xs font-medium text-gray-200 flex items-center justify-between transition-all group active:scale-98"
                >
                  <span className="group-hover:text-white transition-colors">{option}</span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#ff758f] bg-[#ff758f]/10 px-2.5 py-1 rounded-lg">
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#ff758f]" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
