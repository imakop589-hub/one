import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, ArrowRight, MousePointer2 } from 'lucide-react';

interface UpgradeVideoSectionProps {
  onStartTrial: () => void;
  onExplore: () => void;
}

export const UpgradeVideoSection: React.FC<UpgradeVideoSectionProps> = ({
  onStartTrial,
  onExplore,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMode, setActiveMode] = useState<'create' | 'modernise'>('create');
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="bg-[#062c21] text-white py-20 border-t border-emerald-900/50" id="video-demo">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-screen-2xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-4">
          A smarter way to create or upgrade your website to generate more revenue
        </h2>

        <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          See how Aida turns a concept or an outdated website into a fully built, ready to publish site in just a few steps.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onStartTrial}
            className="bg-[#fed000] hover:bg-[#ebbe00] active:scale-[0.98] text-gray-950 font-bold px-6 py-3 rounded-full text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            id="upgrade-start-trial-btn"
          >
            <span>Start free trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExplore}
            className="border border-white/30 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all cursor-pointer"
            id="upgrade-explore-btn"
          >
            Explore Aida AI Website Builder
          </button>
        </div>

        {/* Interactive Video Showcase Frame */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0d3f31] border border-emerald-700/50 shadow-2xl aspect-16/9 max-w-6xl mx-auto flex flex-col justify-between group">
          
          {/* Main Visual Display Content (Modernise vs Create) */}
          <div className="relative w-full h-full flex items-center justify-center p-6 sm:p-12 overflow-hidden">
            {/* Background glowing aura */}
            <div className="absolute inset-0 bg-radial from-emerald-600/20 via-transparent to-transparent"></div>

            {/* Simulated Website Switcher View */}
            {activeMode === 'create' ? (
              <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                  <div className="bg-[#fed000] text-gray-950 font-extrabold text-2xl sm:text-4xl md:text-5xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl shadow-2xl tracking-tight border-2 border-yellow-300 transform -rotate-1">
                    Modernise
                  </div>
                  <div className="bg-[#fed000] text-gray-950 font-extrabold text-2xl sm:text-4xl md:text-5xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl sm:rounded-3xl shadow-2xl tracking-tight border-2 border-yellow-300 transform rotate-1">
                    Create
                  </div>
                </div>

                {/* Animated Mouse Cursor Icon */}
                <div className="absolute bottom-[-10px] right-[25%] pointer-events-none animate-bounce">
                  <div className="relative">
                    <MousePointer2 className="w-10 h-10 text-gray-950 fill-black stroke-white stroke-2 drop-shadow-xl" />
                    <span className="absolute left-6 top-4 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                      Aida AI Fast-Build
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 w-full max-w-lg bg-white/95 text-gray-900 rounded-2xl p-6 shadow-2xl backdrop-blur-md animate-in fade-in duration-300 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="font-bold text-sm text-[#008a45]">Aida Instant Moderniser</span>
                  <span className="text-xs bg-[#e6f4ea] text-[#008a45] font-bold px-2 py-0.5 rounded-full">Score: 99/100</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="p-3 bg-stone-100 rounded-xl">
                    <div className="font-bold text-stone-500">Before</div>
                    <div className="text-red-500 font-semibold mt-1">Slow load (4.2s)</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">Non-responsive UI</div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="font-bold text-[#008a45]">After with Aida</div>
                    <div className="text-emerald-700 font-bold mt-1">Ultra-fast (0.3s)</div>
                    <div className="text-[#008a45] text-[10px] mt-0.5">Automated SEO & Store</div>
                  </div>
                </div>
              </div>
            )}

            {/* Mode Switch Pills */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={() => setActiveMode('create')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                  activeMode === 'create' ? 'bg-white text-gray-950' : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                Create New
              </button>
              <button
                onClick={() => setActiveMode('modernise')}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${
                  activeMode === 'modernise' ? 'bg-white text-gray-950' : 'bg-black/40 text-white hover:bg-black/60'
                }`}
              >
                Modernise Existing
              </button>
            </div>
          </div>

          {/* Video Control Bar at Bottom */}
          <div className="bg-black/80 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-4 border-t border-white/10 text-xs text-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <span className="font-mono text-emerald-200 text-xs">
                {isPlaying ? `0:0${Math.floor(progress / 3)}` : '0:01'} / 0:33
              </span>
            </div>

            {/* Scrubber track */}
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                setProgress(newProgress);
              }}
              className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
            >
              <div 
                className="h-full bg-[#fed000] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-3 text-white/80">
              <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
              <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
            </div>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
};
