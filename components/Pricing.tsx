import React from 'react';
import { Check, X, ShieldCheck, Zap, Calculator, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-widest mb-6 shadow-sm"
                    >
                        <Calculator className="w-3 h-3 text-indigo-600" />
                        Matemática Simples
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-display font-black mb-6 text-slate-900 leading-tight tracking-tight">
                        Sejamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">sinceros</span> <br />por um segundo.
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                        Você tem dois caminhos: continuar queimando dinheiro com agências lentas ou assinar o ClinicFlow. Os números não mentem.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">

                    {/* LEFT: The "Old Way" (Invoice Style) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative h-full bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 flex flex-col opacity-80 hover:opacity-100 transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/5 group-hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                                <h3 className="text-xl font-bold text-slate-400">Modelo Tradicional</h3>
                                <span className="text-xs font-bold font-mono text-red-500 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">Custo Variável</span>
                            </div>

                            <div className="space-y-4 mb-8 font-medium text-sm">
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Desenvolvimento Web</span>
                                    <span className="text-slate-600 font-bold">R$ 3.500,00</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Social Media (Agência)</span>
                                    <span className="text-slate-600 font-bold">R$ 1.500,00</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Copywriter</span>
                                    <span className="text-slate-600 font-bold">R$ 800,00</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Hospedagem AWS</span>
                                    <span className="text-slate-600 font-bold">R$ 60,00</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500">
                                    <span>Manutenção</span>
                                    <span className="text-slate-600 font-bold">R$ 200,00</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-dashed border-slate-200">
                                <div className="flex justify-between items-end">
                                    <span className="text-slate-400 text-sm font-bold">Investimento Inicial</span>
                                    <div className="text-right">
                                        <div className="text-xs text-red-500 mb-1 font-black uppercase tracking-wide">Alto Risco</div>
                                        <span className="text-3xl font-mono font-bold text-slate-300 decoration-red-500/40 line-through decoration-4">R$ 6.060</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stamp */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[4px] border-red-500/20 text-red-500/20 font-black text-6xl uppercase p-4 -rotate-12 select-none pointer-events-none tracking-widest">
                                Caro
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: The "New Way" (Premium Card) */}
                    <div className="relative">
                        {/* Glowing Gradient Border Effect - Subtle for Light Mode */}
                        <div className="absolute -inset-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 rounded-[2.8rem] opacity-20 blur-[2px]"></div>

                        <div className="relative h-full bg-white rounded-[2.5rem] p-1 overflow-hidden shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]">
                            {/* Inner Content */}
                            <div className="h-full bg-white rounded-[2.3rem] p-8 md:p-10 flex flex-col relative overflow-hidden ring-1 ring-slate-100">

                                {/* Background Noise & Light */}
                                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50/80 blur-[80px] rounded-full pointer-events-none"></div>

                                <div className="relative z-10 flex items-center justify-between mb-8">
                                    <div>
                                        <div className="text-indigo-600 font-black tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                                            <Zap className="w-3 h-3 fill-current" /> Oferta de Lançamento
                                        </div>
                                        <h3 className="text-3xl font-display font-black text-slate-900 tracking-tight">ClinicFlow Studio</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 mb-1 shadow-sm">
                                            Restam 4 vagas
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 mb-8 flex items-baseline gap-2">
                                    <span className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter">R$ 59</span>
                                    <span className="text-xl text-slate-400 font-bold">/mês</span>
                                </div>

                                <p className="relative z-10 text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                                    Tenha acesso a tecnologia de R$ 6.000 por menos do que você gasta no McDonald's.
                                </p>

                                <div className="relative z-10 space-y-4 mb-10">
                                    {[
                                        "Site Premium (No ar em 72h)",
                                        "20 Posts Prontos todo mês",
                                        "Hospedagem AWS inclusa",
                                        "Gerador de Legendas com IA"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200">
                                                <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[3]" />
                                            </div>
                                            <span className="text-slate-700 font-bold text-sm bg-slate-50 px-2 py-0.5 rounded-md">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <a href="https://wa.me/5512996170618?text=Ol%C3%A1!%20Quero%20aproveitar%20a%20promo%C3%A7%C3%A3o%20de%20R%24%2059%2Fm%C3%AAs" target="_blank" rel="noopener noreferrer" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 font-black py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_20px_30px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2 group active:scale-[0.98]">
                                        Quero Minha Clínica Premium
                                        <Lock className="w-4 h-4 group-hover:hidden" />
                                        <Zap className="w-4 h-4 hidden group-hover:block animate-pulse fill-white" />
                                    </a>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span>Garantia de 7 dias ou seu dinheiro de volta.</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                {/* Urgent Note below Pricing */}
                <div className="mt-16 text-center space-y-6">
                    {/* Main Urgency Badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-50 border-2 border-amber-100 px-6 py-3 rounded-2xl shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
                        <span className="text-sm text-amber-600 font-black uppercase tracking-wide">
                            O preço vai subir para R$ 147 nos próximos dias
                        </span>
                    </div>

                    {/* Lifetime Price Guarantee */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto"
                    >
                        <div className="bg-white border-2 border-indigo-50 rounded-[2rem] p-8 shadow-xl shadow-slate-200/40">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                                <span className="text-indigo-600 font-black uppercase text-xs tracking-[0.2em]">
                                    Garantia de Preço Vitalício
                                </span>
                                <svg className="w-5 h-5 text-indigo-500 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                <strong className="text-slate-900">Atenção:</strong> Quem assinar agora por <span className="text-indigo-600 font-bold bg-indigo-50 px-1 rounded">R$ 59/mês</span> vai
                                <span className="text-slate-900 font-bold"> travar esse valor para sempre</span>.
                                Quando o preço subir, você continua pagando o valor promocional.
                            </p>
                            <div className="mt-6 flex items-center justify-center gap-3">
                                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 font-bold">
                                    <span className="text-lg">♾️</span>
                                    <span>Preço travado <span className="text-indigo-600">para sempre</span></span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};