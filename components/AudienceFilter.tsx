import React from 'react';
import { Ban, Check, X, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AudienceFilter: React.FC = () => {
    return (
        <section className="py-32 bg-[#050505] border-b border-white/5 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                        O filtro da <span className="text-brand-purple">Excelência.</span>
                    </h2>
                    <p className="text-gray-500 mt-4">Nosso modelo não funciona para todos. Descubra se somos o match ideal.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">

                    {/* LEFT: The "NO" (Warning/Obsolete) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group relative rounded-3xl p-8 md:p-12 border border-white/5 bg-[#0a0a0a] overflow-hidden transition-all duration-500 hover:border-red-900/30"
                    >
                        {/* Warning Glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8 opacity-70 group-hover:opacity-100 transition-opacity">
                                <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/10 group-hover:border-red-500/30 transition-colors">
                                    <Ban className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-400 group-hover:text-red-400 transition-colors">
                                    Não é para você se...
                                </h3>
                            </div>

                            <ul className="space-y-6">
                                {[
                                    "Você gosta de micromanenciar designers e aprovar cada pixel.",
                                    "Você acredita que 'sobrinhos' entregam resultado profissional de graça.",
                                    "Você prefere brigar por preço baixo ao invés de cobrar alto ticket.",
                                    "Você tem tempo sobrando para aprender programação e design."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
                                        <X className="w-5 h-5 text-red-900/50 mt-0.5 shrink-0 group-hover:text-red-500 transition-colors" />
                                        <span className="leading-tight text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* RIGHT: The "YES" (Premium/VIP) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-3xl p-8 md:p-12 border border-brand-purple/30 bg-[#0f0f11] overflow-hidden shadow-[0_0_40px_-10px_rgba(139,92,246,0.15)] group"
                    >
                        {/* Premium Glow Effect */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-purple/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-purple/20 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-brand-purple/10 rounded-xl border border-brand-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                    <Sparkles className="w-6 h-6 text-brand-purple" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    É <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">PERFEITO</span> para você se...
                                </h3>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    { text: "Você é um profissional ocupado que exige resultados rápidos.", highlight: "resultados rápidos" },
                                    { text: "Você entende que design premium atrai pacientes particulares.", highlight: "design premium" },
                                    { text: "Você quer uma solução 'chave na mão' que funcione sozinha.", highlight: "funcione sozinha" },
                                    { text: "Você valoriza sua autoridade e quer ser líder na região.", highlight: "líder na região" }
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-brand-purple/30 hover:translate-x-1 transition-all duration-300 cursor-default"
                                    >
                                        <div className="mt-0.5 p-1 bg-green-500/10 rounded-full">
                                            <Check className="w-3 h-3 text-green-500 shrink-0" />
                                        </div>
                                        <span className="leading-tight text-gray-300 text-sm">
                                            {item.text.split(item.highlight).map((part, index, array) => (
                                                <React.Fragment key={index}>
                                                    {part}
                                                    {index < array.length - 1 && (
                                                        <strong className="text-white font-semibold border-b border-brand-purple/50 pb-0.5">{item.highlight}</strong>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Subtle CTA inside card */}
                            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-brand-purple uppercase font-bold tracking-widest">Match Confirmado</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};