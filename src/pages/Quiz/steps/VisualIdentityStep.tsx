import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Type, Check, Globe, Sparkles, Layout } from 'lucide-react';

const colorPalettes = [
    { name: 'Elite Purple', primary: '#8B5CF6', secondary: '#10B981', bg: 'bg-violet-600' },
    { name: 'Pure Luxury', primary: '#1E40AF', secondary: '#F59E0B', bg: 'bg-blue-800' },
    { name: 'Ocean Breeze', primary: '#0EA5E9', secondary: '#2DD4BF', bg: 'bg-sky-500' },
    { name: 'Modern Dark', primary: '#1F2937', secondary: '#4B5563', bg: 'bg-slate-900' },
    { name: 'Health Mint', primary: '#10B981', secondary: '#D1FAE5', bg: 'bg-emerald-500' },
    { name: 'Royal Gold', primary: '#1E3A8A', secondary: '#FBBF24', bg: 'bg-indigo-950' },
    { name: 'Soft Rose', primary: '#F472B6', secondary: '#FDF2F8', bg: 'bg-pink-400' },
    { name: 'Deep Forest', primary: '#065F46', secondary: '#F0FDF4', bg: 'bg-emerald-900' },
    { name: 'Titanium Tech', primary: '#334155', secondary: '#94A3B8', bg: 'bg-slate-700' },
    { name: 'Earthy Clay', primary: '#9A3412', secondary: '#FFEDD5', bg: 'bg-orange-800' },
    { name: 'Serene Azure', primary: '#0369A1', secondary: '#E0F2FE', bg: 'bg-sky-700' },
    { name: 'Midnight Ruby', primary: '#991B1B', secondary: '#FEE2E2', bg: 'bg-red-900' },
    { name: 'Lavender Mist', primary: '#A78BFA', secondary: '#F5F3FF', bg: 'bg-violet-400' },
    { name: 'Sunset Peach', primary: '#FB923C', secondary: '#FFF7ED', bg: 'bg-orange-400' },
    { name: 'Obsidian Gold', primary: '#020617', secondary: '#EAB308', bg: 'bg-black' },
    { name: 'Clinic White', primary: '#6366F1', secondary: '#F8FAFC', bg: 'bg-white border' },
    { name: 'Fresh Lime', primary: '#84CC16', secondary: '#F7FEE7', bg: 'bg-lime-500' },
    { name: 'Cyber Neon', primary: '#D946EF', secondary: '#22D3EE', bg: 'bg-fuchsia-600' },
];

const fontStyles = [
    { id: 'modern', name: 'Inter Pro', desc: 'Moderno e Digital', style: 'font-modern' },
    { id: 'classic', name: 'Premium Serif', desc: 'Autoridade Tradicional', style: 'font-serif' },
    { id: 'geometric', name: 'Geometric Pro', desc: 'Limpo e Marcante', style: 'font-outfit' },
    { id: 'elegant', name: 'Classic Luxe', desc: 'Refinamento Puro', style: 'font-elegant' },
    { id: 'minimal', name: 'JetBrains Mono', desc: 'Tecnológico e Direto', style: 'font-mono' },
    { id: 'bold', name: 'Montserrat Elite', desc: 'Impacto e Presença', style: 'font-montserrat' },
    { id: 'soft', name: 'Nunito Round', desc: 'Amigável e Acolhedor', style: 'font-nunito' },
    { id: 'editorial', name: 'Editorial Lora', desc: 'Científico e Sério', style: 'font-lora' },
    { id: 'startup', name: 'DM Sans', desc: 'Minimalismo Moderno', style: 'font-dmsans' },
    { id: 'poppins', name: 'Poppins Original', desc: 'Versátil e Profissional', style: 'font-sans' },
];

export const VisualIdentityStep: React.FC = () => {
    const { nextStep, data, updateData } = useQuiz();

    const currentFont = fontStyles.find(f => f.id === data.fontStyle) || fontStyles[0];

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Left Side: Options */}
                <div className="flex-1 w-full space-y-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                            Identidade Visual ✨
                        </h1>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                            Crie a "Vibe" perfeita para atrair seus pacientes ideais
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Colors Grid */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group">
                                <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                1. Estilo de Cores (Selecione um)
                            </label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                {colorPalettes.map((palette) => {
                                    const isSelected = data.primaryColor === palette.primary;
                                    return (
                                        <motion.button
                                            key={palette.name}
                                            onClick={() => updateData({ primaryColor: palette.primary, secondaryColor: palette.secondary })}
                                            whileHover={{ scale: 1.1, zIndex: 10 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`
                                                relative p-1.5 rounded-2xl border-2 transition-all flex flex-col items-center
                                                ${isSelected
                                                    ? 'border-brand-purple bg-brand-purple/5 shadow-[0_4px_0_0_#8B5CF6]'
                                                    : 'border-slate-100 hover:border-slate-200 bg-slate-50 shadow-[0_4px_0_0_#F1F5F9]'}
                                            `}
                                        >
                                            <div className={`w-full aspect-square rounded-xl ${palette.bg} shadow-sm mb-1 relative overflow-hidden`}>
                                                {isSelected && (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center bg-brand-purple/20">
                                                        <Check className="w-5 h-5 text-white drop-shadow-md" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter truncate w-full text-center">
                                                {palette.name.split(' ')[0]}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Fonts Grid */}
                        <div className="space-y-4 pb-20">
                            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 group">
                                <Type className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                2. Coleção de Fontes
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {fontStyles.map((font) => {
                                    const isSelected = data.fontStyle === font.id;
                                    return (
                                        <motion.button
                                            key={font.id}
                                            onClick={() => updateData({ fontStyle: font.id })}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
                                                relative p-4 rounded-3xl border-2 transition-all text-left
                                                ${isSelected
                                                    ? 'border-brand-purple bg-brand-purple/10 shadow-[0_4px_0_0_#8B5CF6]'
                                                    : 'border-slate-100 hover:border-slate-200 bg-slate-50 shadow-[0_4px_0_0_#F1F5F9]'}
                                            `}
                                        >
                                            <div className={`text-2xl mb-1 font-black leading-tight ${font.style} ${isSelected ? 'text-brand-purple' : 'text-slate-900'}`}>Aa</div>
                                            <div className="text-[9px] font-black text-slate-800 uppercase tracking-tight">{font.name}</div>
                                            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{font.desc}</div>
                                            {isSelected && (
                                                <div className="absolute top-3 right-3">
                                                    <Sparkles className="w-3 h-3 text-brand-purple animate-pulse" />
                                                </div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Live Preview (Dopaminergic Card) */}
                <div className="hidden lg:block w-80 sticky top-8">
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                            <Layout className="w-4 h-4" /> Live Preview
                        </label>
                        <motion.div
                            layout
                            className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                            style={{ fontVariant: 'none' }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: data.primaryColor }} />
                                <div className="space-y-1">
                                    <div className="h-2 w-20 bg-slate-100 rounded" />
                                    <div className="h-1.5 w-12 bg-slate-50 rounded" />
                                </div>
                            </div>

                            <motion.h3
                                key={data.fontStyle + data.primaryColor}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-2xl font-black mb-4 leading-tight ${currentFont.style}`}
                                style={{ color: data.primaryColor }}
                            >
                                {data.clinicName || 'Sua Clínica'}
                            </motion.h3>

                            <p className={`text-[10px] text-slate-500 leading-relaxed mb-8 ${currentFont.style} font-medium`}>
                                Oferecemos o que há de mais moderno em tratamentos personalizados para sua saúde e bem-estar.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${currentFont.style}`}
                                style={{ backgroundColor: data.primaryColor, boxShadow: `0 8px 0 0 ${data.primaryColor}88` }}
                            >
                                Agendar Consulta
                            </motion.button>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-10 bg-brand-purple blur-3xl" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Float Button Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex justify-center z-50">
                <button
                    onClick={nextStep}
                    className="w-full max-w-sm py-6 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-3xl font-black text-xl uppercase tracking-widest shadow-[0_8px_0_0_#7C3AED] transition-all active:translate-y-1 active:shadow-none flex items-center justify-center gap-3"
                >
                    Ficou Perfeito!
                    <Sparkles className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};
