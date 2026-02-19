import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Star, Loader2, Rocket } from 'lucide-react';

const voiceTags = [
    'Autoridade', 'Acolhedora', 'Científica', 'Sofisticada',
    'Acessível', 'Inovadora', 'Tradicional', 'Holística'
];

export const FinalStep: React.FC = () => {
    const { data, submitQuiz, nextStep, isLoading, updateData } = useQuiz();

    const toggleTag = (tag: string) => {
        const current = data.brandVoice || [];
        const updated = current.includes(tag)
            ? current.filter(t => t !== tag)
            : current.length < 3 ? [...current, tag] : current;
        updateData({ brandVoice: updated });
    };

    const handleFinalize = async () => {
        await submitQuiz();
        nextStep();
    };

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full h-full">
            <h1 className="text-3xl font-black text-slate-900 mb-2 text-center uppercase tracking-tight">
                Toques Finais ✨
            </h1>
            <p className="text-slate-500 font-bold text-center mb-10 uppercase tracking-widest text-xs">
                Defina sua voz e diferenciais
            </p>

            <div className="space-y-10 w-full flex-grow overflow-y-auto pr-2 custom-scrollbar pb-10">

                {/* Voice Section */}
                <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                        <MessageSquare className="w-4 h-4" /> Tom de Voz (Até 3)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {voiceTags.map((tag) => {
                            const isSelected = data.brandVoice.includes(tag);
                            return (
                                <motion.button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2
                                        ${isSelected
                                            ? 'bg-brand-purple border-brand-purple text-white shadow-[0_4px_0_0_#7C3AED]'
                                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300 shadow-[0_4px_0_0_#F1F5F9]'}
                                    `}
                                >
                                    {tag}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Differentials Section */}
                <div className="space-y-4">
                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                        <Star className="w-4 h-4" /> Seus Diferenciais
                    </label>
                    <textarea
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 text-slate-900 text-sm font-bold focus:outline-none focus:border-brand-purple transition-all min-h-[120px] placeholder:text-slate-300"
                        placeholder="Ex: Atendimento humanizado, equipamentos de última geração..."
                        value={data.differentials}
                        onChange={(e) => updateData({ differentials: e.target.value })}
                    />
                </div>

            </div>

            <div className="mt-8 w-full flex justify-end">
                <button
                    disabled={isLoading || data.brandVoice.length === 0}
                    onClick={handleFinalize}
                    className="w-full md:w-auto px-12 py-5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-200 disabled:shadow-none disabled:text-slate-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_6px_0_0_#059669] transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Gerar Meu Ecossistema
                            <Rocket className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};
