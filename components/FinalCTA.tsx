import React from 'react';
import { ArrowRight, Check, X, Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalCTA: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-white border-t border-slate-100 relative overflow-hidden">

            {/* Dynamic Background Spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-widest mb-6 shadow-sm"
                    >
                        <Lock className="w-3 h-3 text-indigo-500" />
                        Zona de Decisão
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight mb-6 tracking-tight">
                        Sua clínica merece <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">brilhar na internet.</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium">
                        Pare de se sabotar. Enquanto você espera "o momento ideal", seus concorrentes estão ocupando o espaço que deveria ser seu. Vamos mudar isso hoje?
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 items-stretch">

                    {/* OPTION 1: The Pain (Greyed out) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 relative group overflow-hidden"
                    >
                        <div className="relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                    <X className="w-6 h-6 text-slate-400" strokeWidth={3} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-400">Ficar como está</h3>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Depender só da indicação",
                                    "Ter um site que trava ou é lento",
                                    "Postar 'qualquer coisa' no Insta",
                                    "Ser trocado por clínicas mais bonitas",
                                    "Viver dando desconto pra atrair gente"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                                        <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" strokeWidth={3} />
                                        <span className="line-through decoration-slate-300">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-4 bg-white rounded-xl border border-slate-200 text-center shadow-sm">
                                <span className="text-slate-400 text-sm font-bold uppercase tracking-wide">Custo: Ser invisível no mercado</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* OPTION 2: The Solution (Highlighted) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-indigo-600 p-8 md:p-10 rounded-[2.5rem] border border-indigo-500 relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(79,70,229,0.4)] ring-4 ring-indigo-50"
                    >
                        {/* Shiny Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="absolute top-0 right-0">
                                <span className="bg-white text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                                    Caminho do Sucesso
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                                    <Check className="w-6 h-6 text-white" strokeWidth={4} />
                                </div>
                                <h3 className="text-2xl font-black text-white">Dominar o Mercado</h3>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Ser referência na sua região",
                                    "Site de luxo rodando em 72h",
                                    "Instagram impecável todo mês",
                                    "Atrair pacientes que não pedem desconto",
                                    "Paz mental pra focar nos pacientes"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-indigo-50 font-bold">
                                        <div className="mt-0.5 p-0.5 rounded-full bg-white/20">
                                            <Check className="w-3 h-3 text-white shrink-0" strokeWidth={4} />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-4 bg-white/10 rounded-xl border border-white/10 text-center backdrop-blur-sm">
                                <span className="text-white text-sm font-mono font-bold tracking-tight">Investimento: R$ 59/mês</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Big CTA Button Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                >
                    <a
                        href="https://wa.me/5512996170618?text=Ol%C3%A1!%20Quero%20profissionalizar%20minha%20cl%C3%ADnica%20com%20o%20ClinicFlow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full md:w-auto min-w-[320px] bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 rounded-2xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(15,23,42,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95"
                    >
                        <span className="relative z-10">SIM! Quero Profissionalizar Minha Clínica</span>
                        <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                    </a>

                    <div className="mt-8 flex flex-col md:flex-row items-center gap-6 text-sm text-slate-500 font-medium relative">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>Garantia incondicional de 7 dias</span>
                        </div>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-slate-400" />
                            <span>Pagamento Seguro Encrypt®</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};