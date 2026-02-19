import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export const BrandMessageStep: React.FC = () => {
    const { nextStep, data, updateData } = useQuiz();

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full">
            <div className="mb-8 p-6 bg-brand-purple/10 rounded-full">
                <Quote className="w-12 h-12 text-brand-purple" />
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-2 text-center uppercase tracking-tight">
                Qual é a sua mensagem principal? ✍️
            </h1>
            <p className="text-slate-500 font-bold text-center mb-12 uppercase tracking-widest text-xs">
                A frase que seus pacientes verão primeiro ao entrar no site
            </p>

            <div className="w-full space-y-4">
                <textarea
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 text-slate-900 text-xl font-bold focus:outline-none focus:border-brand-purple transition-all min-h-[150px] placeholder:text-slate-300"
                    placeholder="Ex: Transformando sorrisos com tecnologia e carinho..."
                    value={data.slogan}
                    onChange={(e) => updateData({ slogan: e.target.value })}
                />

                <p className="text-center text-[10px] text-slate-400 font-bold uppercase italic">
                    Dica: Seja direto e focado no benefício para o paciente.
                </p>
            </div>

            <div className="mt-16 w-full flex justify-end px-4">
                <button
                    onClick={nextStep}
                    disabled={!data.slogan}
                    className="w-full md:w-auto px-12 py-5 bg-brand-purple hover:bg-brand-purple/90 disabled:bg-slate-200 disabled:shadow-none disabled:text-slate-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-[0_6px_0_0_#7C3AED] transition-all active:translate-y-1 active:shadow-none"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};
