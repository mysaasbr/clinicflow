import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';

const styles = [
    { id: 'modern', name: 'Moderno & Clean', desc: 'Design minimalista e direto ao ponto.', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'luxury', name: 'Luxuoso & Premium', desc: 'Foco em exclusividade e elegância.', icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'tech', name: 'Tecnológico & Futuro', desc: 'Inovação e tecnologia de ponta.', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'minimal', name: 'Acolhedor & Humano', desc: 'Focado em empatia e conexão.', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
];

export const BrandStyleStep: React.FC = () => {
    const { nextStep, data, updateData } = useQuiz();

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full">
            <h1 className="text-3xl font-black text-slate-900 mb-2 text-center uppercase tracking-tight">
                Qual é a "vibe" do seu consultório? 🎨
            </h1>
            <p className="text-slate-500 font-bold text-center mb-12 uppercase tracking-widest text-xs">
                Isso definirá o design geral do seu site
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {styles.map((style) => (
                    <motion.button
                        key={style.id}
                        onClick={() => updateData({ visualStyle: style.id })}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                            relative flex items-center gap-4 p-6 rounded-3xl border-2 transition-all text-left
                            ${data.visualStyle === style.id
                                ? 'border-brand-purple bg-brand-purple/5 shadow-[0_4px_0_0_#8B5CF6]'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-[0_4px_0_0_#E2E8F0]'}
                        `}
                    >
                        <div className={`p-4 rounded-2xl ${style.bg}`}>
                            <style.icon className={`w-6 h-6 ${style.color}`} />
                        </div>
                        <div>
                            <div className="font-black text-slate-800 uppercase text-sm tracking-tight">{style.name}</div>
                            <div className="text-xs text-slate-500 font-medium leading-tight">{style.desc}</div>
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className="mt-16 w-full flex justify-end px-4">
                <button
                    onClick={nextStep}
                    className="w-full md:w-auto px-12 py-5 bg-brand-purple hover:bg-brand-purple/90 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_6px_0_0_#7C3AED] transition-all active:translate-y-1 active:shadow-none"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
