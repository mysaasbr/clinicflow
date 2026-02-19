
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Play, Eye, Heart, BarChart3, Activity } from "lucide-react";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Adjusted offsets to make animation finish sooner, fixing the "stopped working" feeling
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "center start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Animation values refined for Open -> Close effect
  // 0 (Start): Lid Open (0deg)
  // 1 (End): Lid Closed (105deg)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 105]);
  const rotateBase = useTransform(scrollYProgress, [0, 1], [15, 0]); // Base levels out
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 50]); // Slight downward movement
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 1]); // Keep opacity longer

  return (
    <div
      ref={ref}
      // Fixed: Improved mobile responsiveness. Removed extreme h-[180vw] gap.
      // Adjusted scaling to be more visible on mobile while keeping the 3D effect.
      className="flex flex-col items-center py-10 md:py-20 justify-start flex-shrink-0 [perspective:1500px] transform md:scale-90 scale-[0.7] sm:scale-85 origin-top md:origin-center h-[90vw] sm:h-[70vw] md:h-[55rem] w-full"
    >
      <motion.div
        style={{
          perspective: "1500px",
          translateY,
          opacity,
          rotateX: rotateBase,
        }}
        className="flex flex-col items-center justify-center relative"
      >
        {/* LID (Screen Assembly) */}
        <motion.div
          style={{
            rotateX: rotate,
          }}
          className="relative rounded-[30px] w-[90vw] md:w-[64rem] h-[55vw] md:h-[40rem] bg-[#0d0d0d] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] origin-bottom preserve-3d border border-[#1f1f1f]"
        >
          {/* FRONT FACE (Screen) */}
          <div
            className="absolute inset-0 bg-[#0d0d0d] rounded-[28px] overflow-hidden border-[8px] border-[#0d0d0d] backface-hidden flex flex-col items-center shadow-inner"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Display Panel (The Screen itself) */}
            <div className="relative w-full h-full bg-black rounded-[20px] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] ring-1 ring-white/10">

              {/* Camera Notch Area */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20%] md:w-40 h-5 md:h-7 bg-[#0d0d0d] rounded-b-[14px] z-50 flex justify-center items-center border-b border-l border-r border-white/5 shadow-lg">
                <div className="flex gap-3">
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#1a1a1a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                  <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#0f1936] shadow-[inset_0_0_4px_rgba(255,255,255,0.3)] ring-1 ring-white/5"></div>
                </div>
              </div>

              {/* Main Content Image */}
              {src && (
                <img
                  src={src}
                  alt="ClinicFlow Dashboard"
                  className="absolute inset-0 w-full h-full object-cover z-10 opacity-95"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                  decoding="sync"
                />
              )}

              {/* Screen Gloss/Reflection - Improved */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent z-20 pointer-events-none"></div>
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent rotate-45 z-20 pointer-events-none blur-3xl"></div>

              {/* Floating Widgets (Enhanced Glassmorphism) */}

              {/* Widget 1: Analytics (Top Left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="absolute top-10 left-4 md:top-28 md:left-16 z-30"
              >
                <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 p-3 md:p-5 rounded-xl md:rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] w-[160px] md:w-[240px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex justify-between items-start mb-2 md:mb-4 relative z-10">
                    <div className="p-1.5 md:p-2 bg-brand-purple/20 rounded-lg border border-brand-purple/20">
                      <Activity className="w-3 h-3 md:w-4 md:h-4 text-brand-purple" />
                    </div>
                    <div className="bg-green-500/10 text-green-400 rounded-full px-2 py-0.5 md:px-2.5 md:py-1 text-[9px] md:text-[11px] font-bold flex items-center gap-1 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                      <TrendingUp className="w-2 h-2 md:w-3 md:h-3" /> +124%
                    </div>
                  </div>

                  <div className="relative z-10">
                    <p className="text-[9px] md:text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5 md:mb-1">Novos Pacientes</p>
                    <h4 className="text-white font-display font-bold text-xl md:text-3xl tracking-tight">28 <span className="text-[10px] md:text-sm text-gray-500 font-sans font-normal">/mês</span></h4>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2 md:mt-4 h-1 md:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-purple to-pink-500 w-[75%] rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                  </div>
                </div>
              </motion.div>

              {/* Widget 2: Social Post (Bottom Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                className="absolute bottom-6 right-4 md:bottom-16 md:right-16 z-30"
              >
                <div className="bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] w-[140px] md:w-[200px] group">
                  {/* Header */}
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-brand-purple to-pink-500 p-[1.5px]">
                      <div className="w-full h-full bg-black rounded-full overflow-hidden border border-black">
                        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-white font-bold leading-none">Dr. Matheus</div>
                      <div className="text-[8px] md:text-[10px] text-gray-400 mt-0.5">@drmatheus</div>
                    </div>
                  </div>

                  {/* Content Mockup */}
                  <div className="relative aspect-square rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-3 border border-white/5">
                    <img src="https://images.unsplash.com/photo-1588776813186-600f9561b55b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-2 flex gap-1">
                      <Heart className="w-3 h-3 md:w-4 md:h-4 text-white fill-white/20" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[8px] md:text-[10px] text-gray-400 font-medium">
                    <span>Ver Insights</span>
                    <div className="flex items-center gap-1 text-white">
                      <BarChart3 className="w-2.5 h-2.5 md:w-3 md:h-3" /> 1.2k
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* BACK FACE (Lid Cover) */}
          <div
            className="absolute inset-0 bg-[#0d0d0d] rounded-[28px] flex items-center justify-center border border-[#1f1f1f] shadow-inner"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Metallic Texture on Back */}
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#1a1a1a] to-[#050505] opacity-80"></div>

            {/* Apple Logo Placeholder (Geometric) */}
            <div className="relative w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] border border-white/5">
              <div className="w-8 h-8 md:w-10 md:h-10 border-[3px] border-brand-purple/30 rotate-45"></div>
              <div className="absolute w-8 h-8 md:w-10 md:h-10 border-[3px] border-white/10 -rotate-12"></div>
            </div>
          </div>

        </motion.div>

        {/* BASE (Keyboard Deck) */}
        <motion.div
          className="relative w-[95vw] md:w-[68rem] h-[1.2rem] md:h-[1.5rem] bg-[#0f0f0f] rounded-b-[20px] rounded-t-[4px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-t border-[#333] flex justify-center -mt-[4px] origin-top z-10"
        >
          {/* Aluminum Texture */}
          <div className="absolute inset-0 rounded-b-[20px] bg-gradient-to-b from-[#1a1a1a] to-[#050505]"></div>

          {/* Trackpad Opening Notch */}
          <div className="absolute top-0 w-32 md:w-56 h-1.5 md:h-2 bg-[#0a0a0a] rounded-b-lg border-b border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"></div>

          {/* Side Ports (Visual Detail) */}
          <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-[#333] rounded-r"></div>
          <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-3 bg-[#333] rounded-l"></div>
        </motion.div>

        {/* Ambient Shadow/Glow under laptop */}
        <div className="absolute -bottom-20 w-[60%] h-32 bg-brand-purple/10 blur-[100px] rounded-full pointer-events-none"></div>
      </motion.div>
    </div>
  );
};
