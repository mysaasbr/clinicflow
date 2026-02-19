import React, { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export const SuccessStep: React.FC = () => {
    const { data } = useQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        // Highly dopaminergic confetti!
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center text-center px-4">
            <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-8 p-8 bg-emerald-500 rounded-full inline-flex items-center justify-center shadow-[0_12px_0_0_#059669]"
            >
                <Check className="w-16 h-16 text-white stroke-[4px]" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-none bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                Parabéns! 🎉
            </h1>

            <p className="text-slate-500 text-xl font-bold mb-12 max-w-lg leading-relaxed uppercase tracking-wide text-sm">
                Sua clínica <span className="text-slate-900 font-black px-2 bg-emerald-100 rounded-lg">{data.clinicName}</span> está pronta para dominar o mercado digital!
            </p>

            <div className="w-full max-w-sm">
                <motion.button
                    onClick={handleGoToDashboard}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-[0_8px_0_0_#7C3AED] transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
                >
                    Acessar Meu Painel
                    <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </div>
    );
};
