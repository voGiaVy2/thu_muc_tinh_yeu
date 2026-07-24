import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import type { HeartConfig } from './Heart3DCanvas';
import { Send, Heart, RefreshCw, CheckCircle2, Loader2, Download, AlertCircle } from 'lucide-react';

interface LoveLetterCardProps {
  heartConfig: HeartConfig;
  onCustomizeAgain: () => void;
}

export const LoveLetterCard: React.FC<LoveLetterCardProps> = ({ heartConfig, onCustomizeAgain }) => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [renderedCardImgUrl, setRenderedCardImgUrl] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Material style calculator matching Heart3DCanvas
  const getCardMaterialStyles = (material: string) => {
    switch (material) {
      case 'glass':
        return { fill1: '#ffffff', fill2: '#e2f1f8', fill3: '#a8d5e5', gloss: 'rgba(255, 255, 255, 0.85)' };
      case 'gold':
        return { fill1: '#ffe680', fill2: '#e6ac00', fill3: '#997300', gloss: 'rgba(255, 245, 179, 0.9)' };
      case 'ruby':
        return { fill1: '#ff5e7e', fill2: '#da0000', fill3: '#7a0000', gloss: 'rgba(255, 180, 195, 0.85)' };
      case 'chrome':
        return { fill1: '#ffffff', fill2: '#8e9eab', fill3: '#475057', gloss: 'rgba(255, 255, 255, 0.95)' };
      case 'opal':
        return { fill1: '#ffc6ff', fill2: '#b8c0ff', fill3: '#9bf6ff', gloss: 'rgba(255, 255, 255, 0.85)' };
      case 'pearl':
        return { fill1: '#fff5eb', fill2: '#e6ccb2', fill3: '#b08968', gloss: 'rgba(255, 255, 255, 0.9)' };
      case 'bronze':
        return { fill1: '#e0a96d', fill2: '#a47148', fill3: '#4c321b', gloss: 'rgba(255, 220, 180, 0.8)' };
      default:
        return { fill1: '#ff5e7e', fill2: '#da0000', fill3: '#7a0000', gloss: 'rgba(255, 255, 255, 0.8)' };
    }
  };

  const cardMat = getCardMaterialStyles(heartConfig.material);
  const customColor = heartConfig.color && heartConfig.color !== '#ffffff' ? heartConfig.color : cardMat.fill2;

  const handleSendCardBackground = async () => {
    // Validate that ALL 3 fields are filled out completely
    if (!recipient.trim() || !message.trim() || !sender.trim()) {
      setValidationError('Vui lòng điền đầy đủ cả 3 mục (Tên người nhận, Lời nhắn & Chữ ký) trước khi gửi thư!');
      return;
    }

    setValidationError('');
    setIsSending(true);

    const targetRecipient = recipient.trim();

    try {
      // 1. Capture high-res PNG image of the exact letter card element with custom 3D heart
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: '#fef2ea',
          useCORS: true,
          logging: false
        });

        const cardImageDataUrl = canvas.toDataURL('image/png');
        setRenderedCardImgUrl(cardImageDataUrl);

        // 2. Convert Canvas to Blob File and attach to FormSubmit <input type="file" name="attachment" />
        canvas.toBlob((blob) => {
          if (blob && fileInputRef.current) {
            const file = new File([blob], `Buc-Thu-Tinh-Gui-${targetRecipient}.png`, { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;

            // Submit native multipart form to FormSubmit
            if (formRef.current) {
              formRef.current.submit();
            }
          }
        }, 'image/png');
      } else {
        if (formRef.current) {
          formRef.current.submit();
        }
      }

      setTimeout(() => {
        setIsSending(false);
        setIsSentSuccess(true);
        setShowSuccessModal(true);

        // Festive Heart Confetti Explosion
        confetti({
          particleCount: 170,
          spread: 110,
          origin: { y: 0.6 },
          colors: ['#da0000', '#ff5e7e', '#f4c890', '#ffffff']
        });
      }, 1200);

    } catch (err) {
      if (formRef.current) {
        formRef.current.submit();
      }
      setIsSending(false);
      setIsSentSuccess(true);
      setShowSuccessModal(true);

      confetti({
        particleCount: 170,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#da0000', '#ff5e7e', '#f4c890', '#ffffff']
      });
    }
  };

  const handleDownloadCardImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#fef2ea',
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `Buc-Thu-Tinh-Gui-${recipient.trim() || 'Gia-Vy'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {}
  };

  return (
    <section className="w-full min-h-[90vh] pt-24 pb-16 px-6 flex flex-col items-center justify-between select-none">
      
      {/* Invisible Hidden Form & Iframe for FormSubmit Multipart File Upload */}
      <iframe name="hidden_email_iframe" id="hidden_email_iframe" className="hidden" style={{ display: 'none' }} />
      <form
        ref={formRef}
        action="https://formsubmit.co/06f8e7c03556825aeb6cebb74c96322b"
        method="POST"
        target="hidden_email_iframe"
        encType="multipart/form-data"
        className="hidden"
      >
        <input type="hidden" name="_subject" value={`[Hồ Sơ Tình Yêu] HÌNH BỨC THƯ TÌNH GỬI ${recipient.trim().toUpperCase()} ❤️`} />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_captcha" value="false" />
        <input ref={fileInputRef} type="file" name="attachment" accept="image/png" className="hidden" />
        <input type="hidden" name="GUI_TOI" value={recipient.trim()} />
        <input type="hidden" name="NOI_DUNG_THU" value={message.trim()} />
        <input type="hidden" name="CHUKY_NGUOIGUI" value={sender.trim()} />
        <input type="hidden" name="CHAT_LIEU_TRAI_TIM_3D" value={heartConfig.material} />
        <input type="hidden" name="THOI_GIAN" value={new Date().toLocaleString('vi-VN')} />
      </form>

      {/* Section Heading */}
      <div className="text-center mb-6 z-10">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#da0000] uppercase mb-1 block">
          BỨC THƯ TÌNH CÁ NHÂN HÓA
        </span>
        <h2 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#202020] tracking-tight">
          Viết Lời Yêu Thương Gửi Gia Vỹ
        </h2>
        <p className="text-xs sm:text-sm text-[#7a6b68] mt-1 font-medium max-w-md mx-auto">
          Điền đầy đủ thông tin bên dưới để gửi lá thư tình lãng mạn dành riêng cho Gia Vỹ.
        </p>
      </div>

      {/* Main Grid: Left Form Controls, Right Card Preview */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto z-10">
        
        {/* Left: Input Form */}
        <div className="lg:col-span-5 bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-[#c2aaa8]/40 shadow-xl space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-[#635552] uppercase tracking-wider mb-1">
              Gửi Tới (Tên Người Nhận) <span className="text-[#da0000]">*</span>
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => {
                setRecipient(e.target.value);
                setValidationError('');
              }}
              placeholder="Nhập tên người nhận (VD: Gia Vỹ)..."
              className="w-full py-2.5 px-4 bg-[#f5ebe6]/60 text-[#202020] font-medium text-sm rounded-2xl border border-[#c2aaa8]/50 focus:border-[#da0000] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#635552] uppercase tracking-wider mb-1">
              Lời Nhắn Lãng Mạn Gửi Gia Vỹ <span className="text-[#da0000]">*</span>
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setValidationError('');
              }}
              placeholder="Viết những lời ngọt ngào nhất dành riêng cho Gia Vỹ..."
              className="w-full p-4 bg-[#f5ebe6]/60 text-[#202020] font-medium text-sm rounded-2xl border border-[#c2aaa8]/50 focus:border-[#da0000] focus:bg-white focus:outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#635552] uppercase tracking-wider mb-1">
              Chữ Ký (Người Gửi) <span className="text-[#da0000]">*</span>
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => {
                setSender(e.target.value);
                setValidationError('');
              }}
              placeholder="Nhập tên hoặc biệt danh của bạn..."
              className="w-full py-2.5 px-4 bg-[#f5ebe6]/60 text-[#202020] font-medium text-sm rounded-2xl border border-[#c2aaa8]/50 focus:border-[#da0000] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Validation Warning Alert */}
          {validationError && (
            <div className="text-xs font-bold text-[#ff4d6d] bg-[#ff4d6d]/10 border border-[#ff4d6d]/30 px-3.5 py-2.5 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-1">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#ff4d6d]" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Action Controls */}
          <div className="pt-2 space-y-2.5">
            <button
              onClick={handleSendCardBackground}
              disabled={isSending}
              className="w-full btn-valentime-primary justify-center py-3.5 text-xs font-bold tracking-widest shadow-lg cursor-pointer disabled:opacity-75"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Đang Gửi Lá Thư...</span>
                </>
              ) : isSentSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Đã Gửi Thành Công! 🎉</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#ffadad]" />
                  <span>Gửi Lá Thư</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDownloadCardImage}
                className="btn-valentime-secondary justify-center py-2.5 text-[11px] font-bold"
              >
                <Download className="w-3.5 h-3.5 text-[#da0000]" />
                <span>Tải Hình Lá Thư</span>
              </button>

              <button
                onClick={onCustomizeAgain}
                className="btn-valentime-secondary justify-center py-2.5 text-[11px] font-bold text-[#635552]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Sửa Trái Tim 3D</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right: Live Editorial Valentine Card Preview (Dynamically reflects customized 3D heart!) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-md bg-[#fef2ea] rounded-3xl p-8 border-2 border-[#c2aaa8]/60 shadow-2xl relative overflow-hidden transition-transform hover:scale-[1.01] duration-300"
          >
            
            {/* Top & Bottom Line Borders */}
            <div className="story-border-line-top" />
            <div className="story-diamond-center story-diamond-center-top">
              <div className="story-diamond-red-dot" />
            </div>

            {/* Card Header Stamp */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#da0000]">HỒ SƠ TÌNH YÊU</span>
                <p className="font-serif-editorial text-2xl font-bold text-[#202020] mt-0.5">
                  Gửi {recipient || '...'}
                </p>
              </div>

              {/* Red Wax Seal Badge */}
              <div className="w-12 h-12 rounded-full bg-[#da0000] text-white flex items-center justify-center shadow-md shadow-[#da0000]/40 border-2 border-[#990000]">
                <Heart className="w-6 h-6 fill-white text-white" />
              </div>
            </div>

            {/* Dynamic Custom 3D Heart Render inside Letter Card */}
            <div className="my-6 flex justify-center">
              <div className="w-44 h-40 relative flex items-center justify-center">
                <svg width="170" height="155" viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="cardCustomMatGrad" x1="20" y1="10" x2="220" y2="210" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={cardMat.fill1} />
                      <stop offset="45%" stopColor={customColor} />
                      <stop offset="100%" stopColor={cardMat.fill3} />
                    </linearGradient>

                    <linearGradient id="cardGlossGrad" x1="40" y1="20" x2="160" y2="140" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={cardMat.gloss} stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>

                    <filter id="cardHeartShadow3D" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="16" stdDeviation="15" floodColor="#202020" floodOpacity="0.22" />
                    </filter>
                  </defs>

                  {/* Main Heart Body */}
                  <path
                    d="M120 200 C 20 125 -20 60 48 18 C 90 -8 115 22 120 34 C 125 22 150 -8 192 18 C 260 60 220 125 120 200 Z"
                    fill="url(#cardCustomMatGrad)"
                    filter="url(#cardHeartShadow3D)"
                  />

                  {/* Gloss Specular Light Reflection */}
                  <path
                    d="M115 38 C 110 25 90 8 60 25 C 20 52 45 105 115 170 C 102 115 65 75 90 44 C 100 32 110 34 115 38 Z"
                    fill="url(#cardGlossGrad)"
                  />

                  {/* FRAME OVERLAY FROM 3D WORKSHOP */}
                  {heartConfig.frame === 'ribbon' && (
                    <path
                      d="M120 10 C 50 10 10 50 10 110 C 10 170 120 210 120 210 C 120 210 230 170 230 110 C 230 50 190 10 120 10 Z"
                      stroke="#f4c890"
                      strokeWidth="6"
                      strokeDasharray="12 6"
                      fill="none"
                    />
                  )}

                  {heartConfig.frame === 'crown' && (
                    <g transform="translate(70, -25) scale(0.7)">
                      <polygon points="20,50 40,10 70,35 100,5 130,35 160,10 180,50" fill="#f4c890" stroke="#b08968" strokeWidth="2" />
                      <circle cx="20" cy="50" r="5" fill="#da0000" />
                      <circle cx="100" cy="5" r="6" fill="#da0000" />
                      <circle cx="180" cy="50" r="5" fill="#da0000" />
                    </g>
                  )}

                  {heartConfig.frame === 'wings' && (
                    <g stroke="#ffffff" strokeWidth="3" fill="rgba(255,255,255,0.7)">
                      <path d="M40 80 Q-20 40 10 110 Q-30 80 30 130" />
                      <path d="M200 80 Q260 40 230 110 Q270 80 210 130" />
                    </g>
                  )}

                  {heartConfig.frame === 'floral' && (
                    <g stroke="#c2aaa8" strokeWidth="2" fill="none">
                      <path d="M30 60 Q10 110 50 170" />
                      <path d="M210 60 Q230 110 190 170" />
                      <circle cx="25" cy="80" r="6" fill="#ffadad" />
                      <circle cx="215" cy="80" r="6" fill="#ffadad" />
                    </g>
                  )}

                  {heartConfig.frame === 'lock' && (
                    <g transform="translate(105, 80) scale(0.6)">
                      <rect x="10" y="25" width="40" height="35" rx="6" fill="#f4c890" stroke="#202020" strokeWidth="2" />
                      <path d="M20 25 V15 A10 10 0 0 1 40 15 V25" stroke="#202020" strokeWidth="3" fill="none" />
                      <circle cx="30" cy="40" r="4" fill="#202020" />
                    </g>
                  )}

                  {/* STICKER OVERLAY FROM 3D WORKSHOP */}
                  {heartConfig.sticker === 'rose' && (
                    <g transform="translate(145, 110) scale(0.65)">
                      <path d="M12 25 C0 10 25 -5 25 15 C25 -5 50 10 38 25 C50 40 25 50 25 35 C25 50 0 40 12 25 Z" fill="#da0000" />
                      <path d="M25 35 Q20 60 10 75" stroke="#2e7d32" strokeWidth="4" fill="none" />
                    </g>
                  )}

                  {heartConfig.sticker === 'arrow' && (
                    <g transform="translate(15, 15) rotate(45) scale(0.9)">
                      <line x1="20" y1="100" x2="200" y2="100" stroke="#f4c890" strokeWidth="5" strokeLinecap="round" />
                      <polygon points="200,100 180,90 180,110" fill="#f4c890" />
                      <polygon points="20,100 5,90 5,110" fill="#da0000" />
                    </g>
                  )}

                  {heartConfig.sticker === 'letter' && (
                    <g transform="translate(85, 80) scale(0.7)">
                      <rect x="0" y="0" width="70" height="50" rx="4" fill="#fef2ea" stroke="#c2aaa8" strokeWidth="2" />
                      <path d="M0 0 L35 25 L70 0" stroke="#c2aaa8" strokeWidth="2" fill="none" />
                      <circle cx="35" cy="25" r="6" fill="#da0000" />
                    </g>
                  )}

                  {heartConfig.sticker === 'key' && (
                    <g transform="translate(75, 75) rotate(-30) scale(0.6)">
                      <circle cx="20" cy="20" r="14" stroke="#f4c890" strokeWidth="4" fill="none" />
                      <line x1="32" y1="20" x2="80" y2="20" stroke="#f4c890" strokeWidth="5" />
                      <line x1="65" y1="20" x2="65" y2="32" stroke="#f4c890" strokeWidth="4" />
                      <line x1="75" y1="20" x2="75" y2="32" stroke="#f4c890" strokeWidth="4" />
                    </g>
                  )}

                  {heartConfig.sticker === 'seal' && (
                    <g transform="translate(100, 90) scale(0.7)">
                      <circle cx="25" cy="25" r="22" fill="#da0000" stroke="#990000" strokeWidth="2" />
                      <path d="M15 25 C15 15 35 15 35 25 C35 35 15 35 15 25" stroke="#f4c890" strokeWidth="2" fill="none" />
                    </g>
                  )}

                  {heartConfig.sticker === 'sparkles' && (
                    <g fill="#ffffff">
                      <path d="M60 40 L64 50 L74 54 L64 58 L60 68 L56 58 L46 54 L56 50 Z" />
                      <path d="M170 120 L173 128 L181 131 L173 134 L170 142 L167 134 L159 131 L167 128 Z" />
                    </g>
                  )}
                </svg>
              </div>
            </div>

            {/* Letter Body Message */}
            <blockquote className="font-serif-editorial text-xl text-[#202020] italic text-center leading-relaxed my-4 min-h-[90px] px-2">
              “{message || 'Nhập nội dung lời nhắn để xem trước bức thư...' }”
            </blockquote>

            {/* Sender Signature */}
            <div className="text-right pt-4 border-t border-[#c2aaa8]/40 mt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7a6b68]">MÃI MÃI YÊU GIA VỸ,</p>
              <p className="font-script-romantic text-3xl text-[#da0000] font-bold mt-1">
                {sender || '...'}
              </p>
            </div>

            {/* Bottom Diamond Line Accent */}
            <div className="story-border-line-bottom" />
            <div className="story-diamond-center story-diamond-center-bottom">
              <div className="story-diamond-red-dot" />
            </div>

          </div>
        </div>

      </div>

      {/* Email Sent Success Modal displaying captured letter image preview */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#160e22] border border-[#da0000]/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-editorial text-2xl text-white font-bold">
              Bức thư đã gửi thành công
            </h3>

            {/* Rendered Card Image Preview */}
            {renderedCardImgUrl && (
              <div className="my-2 rounded-2xl overflow-hidden border border-white/20 shadow-lg max-h-48">
                <img src={renderedCardImgUrl} alt="Hình bức thư đã gửi" className="w-full h-full object-contain" />
              </div>
            )}

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-2xl bg-[#da0000] hover:bg-[#ff2a5f] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Hoàn Tất & Cảm Ơn
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
