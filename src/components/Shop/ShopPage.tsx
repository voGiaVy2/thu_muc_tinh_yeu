import React, { useState } from 'react';
import { Flame, ShieldCheck } from 'lucide-react';
import type { ProductTag } from '../../types/tiktok';
import { INITIAL_PRODUCTS } from '../../mock/initialData';
import { ProductDetailModal } from './ProductDetailModal';

export const ShopPage: React.FC = () => {
  const [products] = useState<ProductTag[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<ProductTag | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');

  const categories = ['Tất cả', 'Công nghệ', 'Thời trang', 'Góc Setup', 'Phụ kiện', 'Đồ gia dụng'];

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-8 bg-[#0b0c10]">
      <div className="relative rounded-3xl bg-gradient-to-r from-[#fe2c55]/30 via-purple-900/30 to-[#25f4ee]/20 border border-white/10 p-6 lg:p-10 mb-8 overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-[#fe2c55] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 animate-bounce" />
            <span>TikTok Shop Flash Sale 2026</span>
          </div>
          <h1 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight">
            Săn Deal Độc Quyền Giá <span className="text-[#25f4ee]">0 Đồng</span>
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Hàng ngàn sản phẩm hot trend từ các Creator được giảm tới 50% cùng Voucher Freeship toàn quốc!
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6 overflow-x-auto pb-2">
        <div className="flex items-center gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-gradient-to-r from-[#fe2c55] to-pink-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((prod) => (
          <div
            key={prod.id}
            onClick={() => setSelectedProduct(prod)}
            className="glass-panel rounded-3xl p-3 border border-white/10 hover:border-[#25f4ee]/50 cursor-pointer group transition-all hover:-translate-y-1"
          >
            <div className="relative overflow-hidden rounded-2xl mb-3">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-[#fe2c55] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                -{prod.discountPercentage}%
              </div>
            </div>

            <div className="px-1">
              <div className="flex items-center gap-1 text-[11px] text-[#25f4ee] font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{prod.sellerName}</span>
              </div>
              <h3 className="text-xs font-bold text-gray-100 line-clamp-2 leading-snug mb-2">{prod.title}</h3>

              <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-white/5">
                <div>
                  <div className="text-base font-black text-[#fe2c55]">
                    {prod.price.toLocaleString('vi-VN')}₫
                  </div>
                  <div className="text-[10px] text-gray-500 line-through">
                    {prod.originalPrice.toLocaleString('vi-VN')}₫
                  </div>
                </div>
                <button className="btn-cyan py-1.5 px-3 text-xs">
                  Xem ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
