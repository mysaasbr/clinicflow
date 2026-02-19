import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, MousePointer2, ShieldCheck, Zap, ArrowRight, Banknote } from 'lucide-react';
import { LeadModal } from './LeadModal';

export const MathematicsOfAuthority: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    return (
        <section id="funnel" className="py-32 bg-white relative overflow-hidden">
            {/* Background Refinement */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.03),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Text Content - Positioned for Air/Movement */}
                    <div className="lg:w-1/2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 font-bold tracking-[0.2em] uppercase text-[10px]"
                        >
                            <Zap className="w-3 h-3 text-indigo-500" />
                            Engenharia de Conversão
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-[1] tracking-tight"
                        >
                            A Ciência por trás <br />
                            <span className="text-indigo-600">do alto padrão.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl"
                        >
                            Um site amador não é apenas feio, ele é **caro**. Ele afasta o paciente que pagaria o valor justo pelo seu serviço sem questionar.
                        </motion.p>

                        {/* Stats Grid - Minimalist */}
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-slate-900 tracking-tighter">75%</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Menor custo por lead</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-indigo-600 tracking-tighter">3.1x</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mais agendamentos</div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all group"
                            >
                                Blindar Minha Conversão
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Luxury Funnel Visualization */}
                    <div className="lg:w-1/2 relative perspective-1000">
                        {/* The "Amateur" Cloud (Grey/Blurred/Faded) */}
                        <motion.div
                            initial={{ opacity: 0, rotateY: 20 }}
                            whileInView={{ opacity: 0.4, rotateY: 15 }}
                            viewport={{ once: true }}
                            className="absolute -left-20 top-20 w-full h-[400px] bg-slate-50 rounded-[3rem] border border-slate-200 blur-sm -z-10 hidden xl:block"
                        />

                        {/* The High-End Funnel Layered Cards */}
                        <div className="relative space-y-4">

                            {/* Layer 1: Traffic */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative bg-white/40 backdrop-blur-md border border-slate-200 rounded-[2rem] p-8 shadow-xl shadow-slate-200/20 group hover:bg-white/60 transition-all duration-500"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Entrada de Tráfego</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-slate-200" />)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-14 min-w-[3.5rem] h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 ring-4 ring-indigo-50/50">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-800 tracking-tight">Visitantes Qualificados</h4>
                                        <p className="text-xs text-slate-400 font-medium">Médicos costumam pagar caro pelo clique.</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Connector 1 */}
                            <div className="flex justify-center -my-2 relative z-20">
                                <div className="w-px h-10 bg-gradient-to-b from-indigo-200 to-indigo-500" />
                            </div>

                            {/* Layer 2: Conversion (The Secret Sauce) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_80px_-20px_rgba(79,102,241,0.3)] ring-1 ring-white/5 group overflow-hidden"
                            >
                                {/* Visual Glow */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex-1 space-y-2">
                                        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2">Barreira de Valor</div>
                                        <h4 className="text-3xl font-black text-white tracking-tighter italic">Efeito ClinicFlow</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                                            O lead premium decide agendar em **1.2s** ao sentir a autoridade do seu design.
                                        </p>
                                    </div>

                                    <div className="shrink-0 flex items-center justify-center w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl relative">
                                        <div className="absolute inset-2 border-2 border-indigo-500 rounded-full border-t-transparent animate-spin duration-[3s]" />
                                        <Zap className="w-8 h-8 text-indigo-400" />
                                    </div>
                                </div>

                                {/* Progress Lines Decoration */}
                                <div className="mt-8 grid grid-cols-4 gap-2 opacity-20">
                                    {[1, 1, 1, 1].map((_, i) => (
                                        <div key={i} className="h-1 bg-white rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                                                className="h-full w-1/2 bg-indigo-400"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Connector 2 */}
                            <div className="flex justify-center -my-2 relative z-20">
                                <div className="w-px h-10 bg-gradient-to-b from-indigo-500 to-emerald-500" />
                            </div>

                            {/* Layer 3: Result (Agendamentos) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="relative bg-emerald-50/50 backdrop-blur-md border border-emerald-100 rounded-[2rem] p-8 shadow-xl shadow-emerald-500/5 hover:bg-emerald-50 transition-all duration-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-50">
                                            <Banknote className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-800 tracking-tight">Pacientes High-Ticket</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Investimento Recuperado</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-3xl font-black text-emerald-600 tracking-tighter">+82%</div>
                                        <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Conversão</div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                        {/* Absolute Badges for "Expertise" feel */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -right-8 top-1/2 bg-white p-4 rounded-3xl border border-slate-100 shadow-2xl hidden md:flex items-center gap-3 z-30"
                        >
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certificado</div>
                                <div className="text-xs font-bold text-slate-800">Carga Ultra-Rápida</div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                            className="absolute -left-12 bottom-1/4 bg-slate-900 p-4 rounded-3xl shadow-2xl hidden md:flex items-center gap-3 z-30"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Performance</div>
                                <div className="text-xs font-bold text-white">ROI Predict®</div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
            <LeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                source="Funnel Section"
                projectId="default-project-id"
                whatsappNumber="5512996170618"
            />
        </section >
    );
};
