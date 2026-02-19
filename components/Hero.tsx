import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { MacbookScroll } from './ui/macbook-scroll';
import { LeadModal } from './LeadModal';

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div className="relative bg-white w-full overflow-hidden pt-32 pb-20 md:pt-40 md:pb-0">

      {/* Subtle Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1000px] overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-50/30 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-50/20 blur-[100px] rounded-full" />
      </div>

      <div className="flex flex-col items-center text-center max-w-6xl mx-auto px-6 relative z-10">

        {/* Simplified Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-slate-100 bg-slate-50/50 backdrop-blur-sm mb-12 shadow-sm group cursor-default"
        >
          <div className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
          <span className="text-[10px] font-bold text-slate-600 tracking-[0.2em] uppercase">Vagas Limitadas • Fevereiro</span>
          <div className="h-3 w-px bg-slate-200 mx-1" />
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 opacity-60" />
        </motion.div>

        {/* Cleaner, Powerful Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8 text-slate-900 tracking-tight"
        >
          Sua clínica é de elite. <br />
          <span className="text-indigo-600">Por que seu site parece amador?</span>
        </motion.h1>

        {/* Elegant Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-3xl px-4"
        >
          Pare de perder pacientes para concorrentes piores que você. Construímos sua autoridade digital premium com design de luxo em apenas 72h.
        </motion.p>

        {/* Refined CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-24 w-full sm:w-auto px-4"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="
                w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl 
                font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 
                shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300
              "
          >
            Começar Agora
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="#portfolio"
            className="
                w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-2xl 
                font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 
                border border-slate-200 shadow-sm hover:bg-slate-50 transition-all duration-300
              "
          >
            <Play className="w-4 h-4 fill-slate-700" />
            Ver Portfólio
          </motion.a>
        </motion.div>

        {/* Minimal Proof Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400 px-4 relative"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            7 Dias de Garantia
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            Sem Fidelidade
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-slate-300" />
            Setup em 72h
          </div>
        </motion.div>
      </div>

      {/* Simplified 3D Showcase */}
      <div className="relative z-10 mt-12 md:-mt-16 w-full flex justify-center">
        <div className="pointer-events-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <MacbookScroll
              src="https://files.catbox.moe/1x5x5h.png"
              showGradient={false}
              badge={
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-3 z-50 border border-slate-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                  </div>
                  <div className="h-3 w-px bg-slate-100" />
                  <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Premium Studio</span>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};