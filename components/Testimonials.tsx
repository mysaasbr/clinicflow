import React from 'react';
import { Star, MessageCircle, Play, Quote, TrendingUp, CheckCircle2, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header with Aggregate Social Proof */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 mb-6 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm"
                    >
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-slate-600 border-l border-slate-200 pl-2 ml-1">
                            4.9/5 de satisfação (500+ Clínicas)
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 tracking-tight">
                        A única opinião que importa: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            A de quem paga.
                        </span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                        Não acredite na nossa palavra. Veja o que acontece nos grupos de WhatsApp dos nossos clientes.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Card 1: The "WhatsApp Audio" (Interactive Feel) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 bg-white border border-slate-200 p-6 rounded-[2rem] relative overflow-hidden group hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop" loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" alt="Dr Ricardo" />
                                <div>
                                    <div className="text-slate-900 font-bold text-sm">Dr. Ricardo Silva</div>
                                    <div className="text-xs text-slate-500 font-medium">Implantodontista</div>
                                </div>
                            </div>
                            <MessageCircle className="w-6 h-6 text-emerald-500 opacity-80" />
                        </div>

                        {/* Fake Audio Player */}
                        <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100 mb-4 group-hover:bg-indigo-50/30 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                            </div>
                            <div className="flex-1">
                                <div className="h-8 flex items-center gap-0.5">
                                    {[4, 8, 3, 6, 9, 5, 8, 3, 6, 4, 7, 3, 5, 8, 4, 6, 3, 7, 4, 8].map((h, i) => (
                                        <div key={i} className="w-1.5 bg-slate-300 rounded-full" style={{ height: `${h * 3}px`, opacity: i < 8 ? 1 : 0.4 }}></div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono font-bold">0:42</div>
                        </div>

                        <p className="text-slate-600 text-sm italic border-l-4 border-indigo-200 pl-4 font-medium">
                            "Cara, surreal. O paciente já chega educado sobre o valor do implante. Só hoje fechei 3 protocolos..."
                        </p>
                    </motion.div>

                    {/* Card 2: The "Design Praise" (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-white border border-slate-200 p-8 rounded-[2rem] relative overflow-hidden flex flex-col md:flex-row gap-8 items-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                    >
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-50/50 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="flex-1 z-10">
                            <div className="mb-6">
                                <Quote className="w-12 h-12 text-indigo-100 fill-current" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-relaxed">
                                "Eu tinha vergonha de mandar o link do meu site antigo. Hoje eu coloco em todo lugar. <span className="text-indigo-600 bg-indigo-50 px-1 rounded-lg">A percepção de autoridade mudou da água pro vinho.</span>"
                            </h3>
                            <div className="flex items-center gap-4 mt-6">
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" loading="lazy" decoding="async" className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100" alt="Dra Juliana" />
                                <div>
                                    <div className="text-slate-900 font-bold text-lg">Dra. Juliana Mendes</div>
                                    <div className="text-sm text-slate-500 flex items-center gap-1 font-medium">
                                        Harmonização Facial <CheckCircle2 className="w-4 h-4 text-indigo-500" strokeWidth={3} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Stats */}
                        <div className="w-full md:w-56 bg-white rounded-3xl p-5 border border-slate-200 shrink-0 transform rotate-2 hover:rotate-0 transition-all duration-500 shadow-lg ring-4 ring-slate-50">
                            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Visitas / Mês</div>
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-4xl font-black text-slate-900">4.2k</span>
                                <span className="text-xs text-emerald-600 font-bold mb-2 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                    <TrendingUp className="w-3 h-3 mr-0.5" strokeWidth={3} /> +210%
                                </span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[85%] rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: The "Direct Message" (Vertical) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-[2rem] flex flex-col justify-between group shadow-2xl"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-8 opacity-70">
                                <Instagram className="w-6 h-6 text-white" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Direct Message</span>
                            </div>

                            {/* Chat Bubbles */}
                            <div className="space-y-4">
                                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none text-sm text-slate-200 border border-slate-700 inline-block max-w-[90%] shadow-sm">
                                    Dra, vi seu site novo... ficou chiquérrimo! 😍
                                </div>
                                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none text-sm text-slate-200 border border-slate-700 inline-block max-w-[90%] shadow-sm">
                                    Passa muita confiança. Vou querer agendar aquele botox que falamos.
                                </div>
                                <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none text-sm text-white border border-indigo-500 ml-auto inline-block max-w-[90%] shadow-md">
                                    Obrigada querida! O link pra agendar tá na bio, super fácil ✨
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[3px] shadow-lg">
                                    <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop" loading="lazy" decoding="async" className="w-full h-full rounded-full object-cover border-2 border-slate-900" alt="Dra Camila" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">Dra. Camila Torres</div>
                                    <div className="text-xs text-slate-400 font-medium">Dermatologista</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4: Pure ROI (Compact) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-1 bg-emerald-50 border border-emerald-100 p-6 rounded-[2rem] flex flex-col justify-center items-center text-center hover:bg-emerald-100/50 transition-colors shadow-sm"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 text-emerald-600 shadow-md transform -rotate-6">
                            <TrendingUp className="w-8 h-8" strokeWidth={2.5} />
                        </div>
                        <div className="text-5xl font-display font-black text-slate-900 mb-2">12x</div>
                        <p className="text-emerald-700 text-sm font-bold uppercase tracking-wide">Retorno sobre Investimento</p>
                        <p className="text-slate-500 text-xs mt-2 font-medium">Média dos clientes nos primeiros 3 meses</p>
                    </motion.div>

                    {/* Card 5: The "Relief" (Standard) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="md:col-span-1 bg-white border border-slate-200 p-6 rounded-[2rem] flex flex-col justify-center hover:border-indigo-200 hover:shadow-lg transition-all"
                    >
                        <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                            "Cancelei minha agência que cobrava R$ 2.500 só pra postar arte feia. Com o ClinicFlow eu pago R$ 59 e tenho um material 10x melhor."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs ring-2 ring-indigo-50">
                                DR
                            </div>
                            <div className="text-sm font-bold text-slate-900">Dr. Rafael M.</div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};