import React from 'react';
import { ShoppingBag, Star, ShieldCheck } from 'lucide-react';
import type { ProductTag } from '../../types/tiktok';

interface ProductShelfProps {
  products: ProductTag[];
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (prod: ProductTag) => void;
}

export const ProductShelf: React.FC<ProductShelfProps> = ({
  products,
  isOpen,
  onClose,
  onBuyNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 bg-[#12141d]/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl p-5 z-40 animate-in slide-in-from-bottom duration-300 max-h-[70%] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#25f4ee]/20 text-[#25f4ee] flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">TikTok Shop Pick</h3>
            <p className="text-xs text-gray-400">Sản phẩm có trong video ({products.length})</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#25f4ee]/50 transition-colors"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-24 h-24 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-[#25f4ee] font-semibold mb-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{product.sellerName}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-100 line-clamp-2 leading-snug">{product.title}</h4>
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-extrabold text-[#fe2c55]">
                  {product.price.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-[11px] text-gray-500 line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
                <span className="text-[10px] bg-[#fe2c55]/20 text-[#fe2c55] px-1.5 py-0.5 rounded font-bold">
                  -{product.discountPercentage}%
                </span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-[11px] text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-500">({product.salesCount} đã bán)</span>
                </div>

                <button
                  onClick={() => onBuyNow(product)}
                  className="btn-primary py-1.5 px-3 text-xs"
                >
                  Mua Ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
