import React, { useState } from 'react';
import { SignInScreen } from './SignInScreen';
import { HomeScreen } from './HomeScreen';
import { LoveStoryModals } from './Modals';
import { Smartphone, LayoutGrid, RotateCcw, Sparkles } from 'lucide-react';

export const MockupContainer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'dual' | 'interactive'>('dual');
  const [activeScreen, setActiveScreen] = useState<'signin' | 'home'>('home');
  const [currentLocation, setCurrentLocation] = useState('Los Angeles');
  const [activeModal, setActiveModal] = useState<'location' | 'filter' | 'premium' | 'messages' | null>(null);

  const handleSignIn = () => {
    setActiveScreen('home');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#fceef0] via-[#fae6ea] to-[#f9dde3] flex flex-col items-center py-6 px-4 font-sans select-none overflow-x-hidden">
      
      {/* Top Header Control Toolbar */}
      <header className="w-full max-w-5xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-white/80 shadow-md">
        
        {/* App Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#e85b74] to-[#ff758f] flex items-center justify-center text-white shadow-md shadow-[#e85b74]/30">
            <Sparkles className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-[#241c22] tracking-tight flex items-center gap-2">
              LoveStory Mobile UI Showcase
              <span className="text-[10px] font-bold uppercase bg-[#e85b74] text-white px-2 py-0.5 rounded-full">
                Pixel-Perfect
              </span>
            </h1>
            <p className="text-xs text-[#7e6d76]">
              Interactive dual-screen presentation matching your design screenshot
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Toggle Dual Showcase vs Interactive Single View */}
          <div className="bg-[#f8eeee] p-1 rounded-2xl flex items-center border border-[#ebd0d6]">
            <button
              onClick={() => setViewMode('dual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                viewMode === 'dual'
                  ? 'bg-[#e85b74] text-white shadow-sm'
                  : 'text-[#6e5d66] hover:text-[#241c22]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Dual Screenshot View</span>
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                viewMode === 'interactive'
                  ? 'bg-[#e85b74] text-white shadow-sm'
                  : 'text-[#6e5d66] hover:text-[#241c22]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Interactive App View</span>
            </button>
          </div>

          {/* Reset Demo Button */}
          <button
            onClick={() => {
              setActiveScreen('signin');
              setCurrentLocation('Los Angeles');
              setActiveModal(null);
            }}
            className="p-2 rounded-2xl bg-white hover:bg-pink-50 border border-[#ebd0d6] text-[#7e6d76] hover:text-[#e85b74] transition-all shadow-sm"
            title="Reset to Sign In screen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Presentation Area */}
      {viewMode === 'dual' ? (
        /* DUAL SCREEN SHOWCASE (Matching reference image layout exactly) */
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-4">
          
          {/* Screen 1: Sign In (Elevated Left Frame) */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-[#9e8b95] uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-white">
                Screen 1 • Sign In
              </span>
            </div>
            
            {/* Phone Shell Frame */}
            <div className="phone-mockup-frame transform transition-transform hover:-translate-y-2 duration-300">
              <SignInScreen
                onSignIn={handleSignIn}
                onRegisterClick={() => alert('Register feature clicked!')}
              />
            </div>
          </div>

          {/* Screen 2: Home Dashboard (Elevated Right Frame) */}
          <div className="flex flex-col items-center">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-[#9e8b95] uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-white">
                Screen 2 • Home Dashboard
              </span>
            </div>
            
            {/* Phone Shell Frame */}
            <div className="phone-mockup-frame transform transition-transform hover:-translate-y-2 duration-300">
              <HomeScreen
                currentLocation={currentLocation}
                onOpenLocation={() => setActiveModal('location')}
                onOpenFilter={() => setActiveModal('filter')}
                onOpenPremium={() => setActiveModal('premium')}
                onOpenMessagesTab={() => setActiveModal('messages')}
                onOpenRequestsTab={() => alert('Requests tab clicked!')}
              />
            </div>
          </div>

        </div>
      ) : (
        /* SINGLE PHONE INTERACTIVE APP VIEW */
        <div className="flex flex-col items-center py-4">
          <div className="flex items-center gap-3 mb-4 bg-white/80 px-4 py-1.5 rounded-full border border-white shadow-sm">
            <button
              onClick={() => setActiveScreen('signin')}
              className={`text-xs font-extrabold px-3 py-1 rounded-full transition-all ${
                activeScreen === 'signin' ? 'bg-[#e85b74] text-white' : 'text-[#7e6d76]'
              }`}
            >
              Sign In Screen
            </button>
            <span className="text-gray-300">•</span>
            <button
              onClick={() => setActiveScreen('home')}
              className={`text-xs font-extrabold px-3 py-1 rounded-full transition-all ${
                activeScreen === 'home' ? 'bg-[#e85b74] text-white' : 'text-[#7e6d76]'
              }`}
            >
              Home Dashboard
            </button>
          </div>

          <div className="phone-mockup-frame shadow-2xl">
            {activeScreen === 'signin' ? (
              <SignInScreen
                onSignIn={() => {
                  setActiveScreen('home');
                }}
              />
            ) : (
              <HomeScreen
                currentLocation={currentLocation}
                onOpenLocation={() => setActiveModal('location')}
                onOpenFilter={() => setActiveModal('filter')}
                onOpenPremium={() => setActiveModal('premium')}
                onOpenMessagesTab={() => setActiveModal('messages')}
                onOpenRequestsTab={() => setActiveModal('messages')}
              />
            )}
          </div>
        </div>
      )}

      {/* Global App Modals */}
      <LoveStoryModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

    </div>
  );
};
