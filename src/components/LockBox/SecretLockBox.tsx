import React, { useState } from 'react';
import { Lock, Unlock, Key, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SecretLockBoxProps {
  secretPin: string;
}

export const SecretLockBox: React.FC<SecretLockBoxProps> = ({ secretPin }) => {
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === secretPin || pinInput === '5201314') {
      setIsUnlocked(true);
      setErrorMsg('');
      confetti({ particleCount: 160, spread: 95, origin: { y: 0.6 } });
    } else {
      setErrorMsg('Mật mã chưa đúng! Gợi ý: Con số bí mật 5201314 💖');
    }
  };

  return (
    <div className="relative z-10 my-20 max-w-xl mx-auto px-4 text-center">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-white/10 text-[#f7d692] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-3 shadow-md">
          <Sparkles className="w-4 h-4 text-[#ff3366]" />
          <span>Secret Love Vault</span>
        </div>
        <h2 className="text-3xl font-serif-luxury font-bold text-white mt-2">
          Két Sắt Mật Mã Bí Mật 🎁
        </h2>
        <p className="text-sm text-gray-400 mt-1">Nhập con số kỷ niệm đặc biệt để mở khóa phần thưởng bí mật</p>
      </div>

      <div className="glass-dark-card p-8 sm:p-10 rounded-[40px] border border-white/20 shadow-2xl">
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#ff3366] to-[#f7d692] p-1 mx-auto shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#0e0512] flex items-center justify-center text-[#f7d692]">
                <Lock className="w-9 h-9" />
              </div>
            </div>

            <div className="max-w-xs mx-auto">
              <input
                type="password"
                placeholder="Mật mã bí mật (VD: 5201314)..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full h-12 px-5 bg-white/10 border border-white/20 rounded-2xl text-center text-base font-bold text-white placeholder-gray-400 focus:outline-none focus:border-[#ff3366]"
              />
              {errorMsg && <p className="text-xs text-[#ff3366] mt-2 font-bold">{errorMsg}</p>}
            </div>

            <button type="submit" className="btn-luxury-primary py-3 px-8 text-xs mx-auto">
              <Key className="w-4 h-4" />
              <span>Mở Khóa Món Quà 💖</span>
            </button>
          </form>
        ) : (
          <div className="space-y-5 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400/40 animate-bounce shadow-xl">
              <Unlock className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-white font-serif-luxury">Chúc Mừng Em Đã Mở Khóa Thành Công! 💖</h3>

            <div className="bg-white/10 p-5 rounded-3xl border border-white/10 text-left space-y-3">
              <p className="text-sm text-gray-200 leading-relaxed font-serif-luxury italic">
                🎁 Món quà vô giá dành riêng cho em: Chuyến nghỉ dưỡng lãng mạn 3 ngày 2 đêm cùng triệu nụ hôn và sự đồng hành trọn đời từ anh!
              </p>
              <div className="flex items-center justify-between text-xs text-[#f7d692] font-black pt-3 border-t border-white/10">
                <span>Voucher Có Hiệu Lực: Trọn Đời ✨</span>
                <span>Code: 5201314 💖</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
