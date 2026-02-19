import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Users, Award, Star, Heart } from 'lucide-react';

const goals = [
    { id: 'patients', name: 'Atrair mais Pacientes', desc: 'Aumentar o volume de consultas diárias.', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'authority', name: 'Aumentar Autoridade', desc: 'Ser reconhecido como referência na região.', icon: Award, color: 'text-brand-purple', bg: 'bg-brand-purple/5' },
    { id: 'retention', name: 'Fidelizar Pacientes', desc: 'Melhorar a experiência e o retorno.', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'premium', name: 'Atrair Público High-End', desc: 'Focar em procedimentos de alto ticket.', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'brand', name: 'Fortalecer a Marca', desc: 'Presença digital forte e profissional.', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
];

export const MarketingGoalsStep: React.FC = () => {
    const { nextStep, data, updateData } = useQuiz();

    const toggleGoal = (id: string) => {
        const current = data.marketingGoals || [];
        const updated = current.includes(id)
            ? current.filter(g => g !== id)
            : [...current, id];
        updateData({ marketingGoals: updated });
    };

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full h-full">
            <h1 className="text-3xl font-black text-slate-900 mb-2 text-center uppercase tracking-tight">
                Quais seus Objetivos? 🎯
            </h1>
            <p className="text-slate-500 font-bold text-center mb-10 uppercase tracking-widest text-xs">
                Selecione tudo o que você deseja alcançar
            </p>

            <div className="grid grid-cols-1 gap-4 w-full flex-grow overflow-y-auto pr-2 custom-scrollbar pb-10">
                {goals.map((goal) => {
                    const isSelected = data.marketingGoals?.includes(goal.id);
                    return (
                        <motion.button
                            key={goal.id}
                            onClick={() => toggleGoal(goal.id)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`
                                relative flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left
                                ${isSelected
                                    ? 'border-brand-purple bg-brand-purple/5 shadow-[0_4px_0_0_#8B5CF6]'
                                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-[0_4px_0_0_#E2E8F0]'}
                            `}
                        >
                            <div className={`p-4 rounded-2xl ${goal.bg}`}>
                                <goal.icon className={`w-6 h-6 ${goal.color}`} />
                            </div>
                            <div className="flex-1">
                                <div className="font-black text-slate-800 uppercase text-sm tracking-tight">{goal.name}</div>
                                <div className="text-xs text-slate-500 font-medium">{goal.desc}</div>
                            </div>
                            {isSelected && (
                                <div className="bg-brand-purple rounded-full p-1.5 shadow-lg">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            <div className="mt-8 w-full flex justify-end">
                <button
                    onClick={nextStep}
                    disabled={!data.marketingGoals || data.marketingGoals.length === 0}
                    className="w-full md:w-auto px-12 py-5 bg-brand-purple hover:bg-brand-purple/90 disabled:bg-slate-200 disabled:shadow-none disabled:text-slate-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_6px_0_0_#7C3AED] transition-all active:translate-y-1 active:shadow-none"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
