import React from 'react';
import { Eye, Heart, DollarSign, TrendingUp, Users, Award, PlaySquare } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const stats = [
    { title: 'Tổng Lượt Xem 28 Ngày', value: '4.8M', change: '+24.5%', icon: Eye, color: 'text-[#25f4ee]' },
    { title: 'Lượt Thích & Tương Tác', value: '890.2K', change: '+18.2%', icon: Heart, color: 'text-[#fe2c55]' },
    { title: 'Doanh Thu TikTok Shop & Gifts', value: '45,800,000₫', change: '+32.0%', icon: DollarSign, color: 'text-emerald-400' },
    { title: 'Follower Mới', value: '+12,450', change: '+14.1%', icon: Users, color: 'text-purple-400' }
  ];

  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-y-auto p-4 lg:p-8 bg-[#0b0c10]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-[#25f4ee]" />
          <span>Creator Analytics & Channel Performance</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Báo cáo chỉ số chi tiết hiệu suất kênh TikTok 2026</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400">{item.title}</span>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="text-2xl font-black text-white">{item.value}</div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{item.change} so với tháng trước</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & Top Videos Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Graph Bar Representation */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10">
          <h3 className="text-sm font-bold text-white mb-4">Biểu đồ Lượt xem theo ngày (7 ngày qua)</h3>
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b border-white/10">
            {[
              { day: 'T2', height: '60%', views: '540k' },
              { day: 'T3', height: '80%', views: '780k' },
              { day: 'T4', height: '45%', views: '390k' },
              { day: 'T5', height: '95%', views: '980k' },
              { day: 'T6', height: '70%', views: '650k' },
              { day: 'T7', height: '100%', views: '1.2M' },
              { day: 'CN', height: '85%', views: '890k' }
            ].map((bar, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-gray-400 group-hover:text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.views}
                </span>
                <div
                  style={{ height: bar.height }}
                  className="w-full bg-gradient-to-t from-[#fe2c55] to-[#25f4ee] rounded-t-xl group-hover:brightness-125 transition-all"
                />
                <span className="text-xs text-gray-400 font-bold">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Video Grid */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-white/10">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <PlaySquare className="w-4 h-4 text-[#fe2c55]" />
            <span>Top Video Xu Hướng</span>
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Review Bàn Phím Cơ Custom 75%', views: '1.2M', likes: '248K' },
              { title: 'Góc Setup Đèn RGB Cảm Biến Nhạc', views: '890K', likes: '185K' },
              { title: 'Săn Deal Tai Nghe Bluetooth 0K', views: '450K', likes: '98K' }
            ].map((v, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-xs font-bold text-white line-clamp-1">{v.title}</p>
                  <p className="text-[10px] text-gray-400">{v.views} lượt xem • {v.likes} tim</p>
                </div>
                <span className="text-xs font-bold text-[#25f4ee]">#0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
