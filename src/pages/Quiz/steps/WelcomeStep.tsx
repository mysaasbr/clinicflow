import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { ArrowRight, Sparkles, Wand2, Stars, Zap, Trophy, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingIcon = ({ children, delay, x, y, size = "w-6 h-6" }: any) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            x: [0, x, 0],
            y: [0, y, 0],
        }}
        transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut"
        }}
        className={`absolute ${size} text-brand-purple/20`}
    >
        {children}
    </motion.div>
);

export const WelcomeStep: React.FC = () => {
    const { nextStep } = useQuiz();

    return (
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-12 min-h-[600px] overflow-hidden">
            {/* Immersive Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[120px]" />
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-400/10 rounded-full blur-[60px]" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-[80px]" />
            </div>

            {/* Floating Decorative Elements */}
            <FloatingIcon delay={0} x={40} y={-30} size="w-8 h-8" style={{ top: '15%', left: '10%' }}>
                <Stars />
            </FloatingIcon>
            <FloatingIcon delay={1} x={-30} y={40} style={{ top: '20%', right: '15%' }}>
                <Sparkles />
            </FloatingIcon>
            <FloatingIcon delay={2} x={25} y={25} style={{ bottom: '25%', left: '15%' }}>
                <Zap />
            </FloatingIcon>
            <FloatingIcon delay={0.5} x={-20} y={-40} style={{ bottom: '20%', right: '20%' }}>
                <Trophy />
            </FloatingIcon>

            {/* Mascot Area - High Impact */}
            <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mb-12 relative"
            >
                {/* Layered Glows */}
                <div className="absolute inset-0 bg-brand-purple/30 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -inset-4 border-2 border-brand-purple/10 rounded-full animate-[spin_10s_linear_infinite]" />

                {/* Central Circle */}
                <div className="w-44 h-44 bg-gradient-to-br from-brand-purple to-indigo-600 rounded-full flex items-center justify-center shadow-[0_12px_0_0_#7C3AED] relative z-10 border-4 border-white/20">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <Wand2 className="w-24 h-24 text-white drop-shadow-lg" />
                    </motion.div>
                </div>

                {/* Magical Badge */}
                <motion.div
                    initial={{ scale: 0, x: 20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute -top-4 -right-6 bg-emerald-500 text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-[0_4px_0_0_#059669] z-20 uppercase tracking-[0.2em] flex items-center gap-2"
                >
                    <Sparkles className="w-3 h-3" />
                    IA Ativada
                </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-none"
                >
                    É hora de criar algo <br />
                    <span className="bg-gradient-to-r from-brand-purple via-indigo-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                        Incrível! 🚀
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.6 }}
                    className="text-slate-500 text-lg md:text-xl font-bold mb-14 max-w-lg mx-auto leading-relaxed uppercase tracking-widest"
                >
                    Responda algumas perguntas e nossa <span className="text-brand-purple font-black underline decoration-brand-purple/30 underline-offset-4">IA Criativa</span> fará toda a mágica em segundos.
                </motion.p>

                <div className="w-full max-w-md mx-auto relative group">
                    {/* Button Back Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-indigo-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                    <motion.button
                        onClick={nextStep}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95, y: 0 }}
                        className="relative w-full py-8 bg-brand-purple overflow-hidden text-white rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.2em] shadow-[0_12px_0_0_#7C3AED] transition-all hover:bg-brand-purple/95 flex items-center justify-center gap-4"
                    >
                        {/* Shine Effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />

                        Vamos Começar!
                        <ArrowRight className="w-8 h-8" />
                    </motion.button>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-2"
                    >
                        <Heart className="w-3 h-3 text-brand-purple" />
                        Leva menos de 2 minutos
                    </motion.p>
                </div>
            </div>
        </div>
    );
};
