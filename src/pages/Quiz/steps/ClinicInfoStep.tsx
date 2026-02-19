import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { ArrowRight, User, Phone, Instagram, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ClinicInfoStep: React.FC = () => {
    const { nextStep, data, updateData } = useQuiz();
    const [subStep, setSubStep] = useState(0);

    const questions = [
        {
            id: 'clinicName',
            label: 'Nome da Clínica / Consultório',
            subLabel: 'Como os pacientes te chamam?',
            placeholder: 'Ex: Clínica Bem Estar ou Dr. João Silva',
            icon: User,
            field: 'clinicName',
            isValid: data.clinicName.length > 3
        },
        {
            id: 'city',
            label: 'Sua Cidade',
            subLabel: 'Onde seu consultório está localizado?',
            placeholder: 'Ex: São Paulo, SP',
            icon: MapPin,
            field: 'city',
            isValid: data.city.length > 2
        },
        {
            id: 'whatsapp',
            label: 'Seu WhatsApp de Agendamento',
            subLabel: 'Para onde os pacientes devem enviar mensagens?',
            placeholder: '(11) 99999-9999',
            icon: Phone,
            field: 'whatsapp',
            isValid: data.whatsapp.length > 8
        },
        {
            id: 'instagram',
            label: 'E o seu Instagram?',
            subLabel: 'Isso ajuda a humanizar o seu site (Opcional)',
            placeholder: '@suaclinica',
            icon: Instagram,
            field: 'instagram',
            isValid: true // Optional
        }
    ];

    const currentQ = questions[subStep];

    const handleNext = () => {
        if (subStep < questions.length - 1) {
            setSubStep(s => s + 1);
        } else {
            nextStep();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentQ.isValid) {
            handleNext();
        }
    };

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto w-full h-[400px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={subStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full"
                >
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
                        {subStep + 1} de {questions.length} • Informações Básicas
                    </label>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 text-center leading-tight">
                        {currentQ.label}
                    </h1>
                    <p className="text-slate-500 font-bold mb-10 text-center uppercase tracking-widest text-xs">
                        {currentQ.subLabel}
                    </p>

                    <div className="relative mb-12">
                        <div className="absolute left-8 top-1/2 -translate-y-1/2">
                            <currentQ.icon className="w-7 h-7 text-brand-purple opacity-50" />
                        </div>
                        <input
                            autoFocus
                            type="text"
                            value={(data as any)[currentQ.field]}
                            onChange={(e) => updateData({ [currentQ.field]: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2.5rem] py-8 pl-24 pr-8 text-xl font-black text-slate-900 placeholder:text-slate-200 focus:outline-none focus:border-brand-purple focus:bg-white shadow-[0_6px_0_0_#F1F5F9] focus:shadow-[0_6px_0_0_rgba(139,92,246,0.1)] transition-all"
                            placeholder={currentQ.placeholder}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="mt-auto w-full flex justify-center">
                <button
                    onClick={handleNext}
                    disabled={!currentQ.isValid}
                    className="w-full max-w-xs py-6 bg-brand-purple hover:bg-brand-purple/90 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-[0_8px_0_0_#7C3AED] transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
                >
                    {subStep === questions.length - 1 ? 'Quase lá!' : 'Continuar'}
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>

            <p className="mt-6 text-[10px] text-slate-400 font-black uppercase tracking-widest animate-pulse">
                Pressione <span className="text-slate-600">ENTER</span> para ir mais rápido
            </p>
        </div>
    );
};
