import React, { useState } from 'react';
import { ShoppingBag, Star, ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import type { ProductTag } from '../../types/tiktok';
import confetti from 'canvas-confetti';

interface ProductDetailModalProps {
  product: ProductTag | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [purchased, setPurchased] = useState(false);

  if (!isOpen || !product) return null;

  const handleCheckout = () => {
    setPurchased(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setPurchased(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#14161d] border border-white/10 rounded-3xl p-6 w-full max-w-lg relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {purchased ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 className="w-20 h-20 text-[#25f4ee] mx-auto animate-bounce" />
            <h3 className="text-2xl font-black text-white">Đặt hàng TikTok Shop thành công!</h3>
            <p className="text-sm text-gray-300">Cảm ơn bạn đã mua sắm. Đơn hàng đang được chuẩn bị giao đến bạn!</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-5 mb-6">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full sm:w-48 h-48 rounded-2xl object-cover border border-white/10 shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#25f4ee] font-bold flex items-center gap-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {product.sellerName}
                  </span>
                  <h2 className="text-base font-bold text-white leading-snug">{product.title}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">• Đã bán {product.salesCount}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#fe2c55]">
                      {product.price.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      {product.originalPrice.toLocaleString('vi-VN')}₫
                    </span>
                    <span className="text-xs bg-[#fe2c55]/20 text-[#fe2c55] px-2 py-0.5 rounded-full font-bold">
                      -{product.discountPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4 mb-6">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-2">Phân loại hàng</label>
                <div className="flex gap-2">
                  {['Đen Cyber', 'Trắng Neon', 'Xám Bạc'].map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedSize(variant)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        selectedSize === variant
                          ? 'bg-[#25f4ee]/20 border-[#25f4ee] text-[#25f4ee] font-bold'
                          : 'bg-white/5 border-white/10 text-gray-300'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-3 space-y-2 text-xs text-gray-300 border border-white/5">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#25f4ee]" />
                  <span>Miễn phí vận chuyển toàn quốc cho đơn hàng TikTok Shop</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#fe2c55]" />
                  <span>Thanh toán khi nhận hàng (COD) hoặc Ví MoPo/ZaloPay</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold text-sm py-3 rounded-2xl border border-white/10">
                Thêm vào giỏ
              </button>
              <button onClick={handleCheckout} className="btn-primary flex-1 py-3 text-sm font-extrabold">
                <ShoppingBag className="w-4 h-4" />
                <span>Mua Với Voucher</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
