import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

interface SignInScreenProps {
  onSignIn: (username: string) => void;
  onRegisterClick?: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onRegisterClick }) => {
  const [username, setUsername] = useState('SamanthaAdams13');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignIn(username || 'SamanthaAdams13');
    }, 600);
  };

  return (
    <div className="w-full h-full min-h-[780px] bg-[#fdf5f5] flex flex-col justify-between select-none relative overflow-hidden font-sans">
      {/* Top Header Background with Layered Clouds & 3D Heart */}
      <div className="relative w-full h-[320px] bg-gradient-to-b from-[#f9d7de] via-[#fae0e5] to-[#fdf5f5] flex items-center justify-center overflow-hidden">
        
        {/* Ambient Soft Glow Behind Heart */}
        <div className="absolute w-44 h-44 bg-[#ff6b8b]/20 rounded-full blur-2xl top-12" />

        {/* Small Decorative Floating Clouds */}
        <div className="absolute top-12 left-6 w-10 h-6 bg-white/75 rounded-full blur-[1px] shadow-sm animate-bounce" style={{ animationDuration: '4s' }} />
        <div className="absolute top-20 right-8 w-14 h-7 bg-white/80 rounded-full blur-[1px] shadow-sm animate-bounce" style={{ animationDuration: '6s' }} />
        <div className="absolute top-36 left-10 w-12 h-6 bg-white/60 rounded-full blur-[1px]" />
        
        {/* Main 3D Floating Heart Graphic */}
        <div className="relative z-10 heart-3d-graphic transition-transform hover:scale-105 duration-300">
          <svg width="170" height="155" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heartGradient3D" x1="20" y1="10" x2="180" y2="170" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ff5e7e" />
                <stop offset="0.5" stopColor="#e84c6f" />
                <stop offset="1" stopColor="#c92a52" />
              </linearGradient>
              <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#ce3a5e" floodOpacity="0.3" />
              </filter>
              <linearGradient id="heartHighlight" x1="50" y1="20" x2="120" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Heart Shadow & Main Shape */}
            <path
              d="M100 165 C 20 105 -15 50 40 15 C 75 -5 95 20 100 30 C 105 20 125 -5 160 15 C 215 50 180 105 100 165 Z"
              fill="url(#heartGradient3D)"
              filter="url(#heartShadow)"
            />
            {/* Heart 3D Curved Light Reflection Overlay */}
            <path
              d="M95 32 C 90 20 75 5 50 20 C 15 45 40 90 95 140 C 85 95 55 60 75 35 C 83 25 91 28 95 32 Z"
              fill="url(#heartHighlight)"
            />
          </svg>
        </div>

        {/* Paper-cut Layered Clouds Effect at bottom of header */}
        <div className="absolute bottom-0 inset-x-0 h-24 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="w-full h-full text-white/50 fill-current">
            <path d="M0,80 Q75,30 150,60 T300,50 T450,70 T500,40 L500,120 L0,120 Z" fill="#f8e5e8" opacity="0.6" />
            <path d="M0,90 Q100,50 200,80 T400,60 T500,80 L500,120 L0,120 Z" fill="#fdf5f5" />
          </svg>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="flex-1 px-7 pt-2 pb-6 flex flex-col justify-between z-10">
        
        {/* Title & Social Icons */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[28px] font-extrabold text-[#241c22] tracking-tight">Sign In</h1>
          
          <div className="flex items-center gap-2.5">
            {/* Instagram Social Icon */}
            <button
              type="button"
              className="w-10 h-10 rounded-xl border border-[#ebd0d6] bg-white/70 hover:bg-white text-[#70646a] hover:text-[#d8526a] flex items-center justify-center transition-all shadow-sm active:scale-95"
              title="Sign in with Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </button>

            {/* Facebook Social Icon */}
            <button
              type="button"
              className="w-10 h-10 rounded-xl border border-[#ebd0d6] bg-white/70 hover:bg-white text-[#70646a] hover:text-[#d8526a] flex items-center justify-center transition-all shadow-sm active:scale-95 font-black text-sm"
              title="Sign in with Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Inputs Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Username Field */}
          <div>
            <label className="block text-xs font-semibold text-[#8b7d85] mb-1.5 ml-1">Username</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#a3949d]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full h-12 pl-11 pr-4 bg-[#f8eeee] text-[#2c2229] font-medium text-sm rounded-2xl border border-[#eedad9] focus:border-[#d8526a] focus:bg-white focus:outline-none transition-all placeholder:text-[#b5a7af]"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-[#8b7d85] mb-1.5 ml-1">Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-4 text-[#a3949d]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full h-12 pl-11 pr-11 bg-white text-[#2c2229] font-medium text-sm rounded-2xl border-2 border-[#d8526a] focus:outline-none shadow-sm transition-all tracking-wider"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-[#a3949d] hover:text-[#d8526a] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={() => alert('Reset password email sent!')}
              className="text-xs font-bold text-[#d8526a] hover:text-[#b83c53] transition-colors"
            >
              Forgot password
            </button>
          </div>

          {/* Big Pink Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-4 bg-gradient-to-r from-[#e85b74] to-[#d84b65] hover:from-[#d84b65] hover:to-[#c63953] active:scale-[0.98] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#d8526a]/30 transition-all flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer Registration Link */}
        <div className="text-center pt-5 pb-2 text-xs text-[#7d7077]">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={onRegisterClick || (() => alert('Registration screen coming soon!'))}
            className="font-extrabold text-[#d8526a] hover:underline transition-all"
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
};
