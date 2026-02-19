import React from 'react';
import { Quote, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutFounder: React.FC = () => {
    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Visual Side (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
                            <img
                                src="https://files.catbox.moe/d091ou.png"
                                alt="ClinicFlow Office"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                            {/* Floating Caption inside Image */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <Quote className="w-10 h-10 text-white/20 mb-4 fill-current" />
                                <p className="text-xl md:text-2xl text-white font-display font-bold leading-tight">
                                    "O mercado de estética evoluiu. A forma como as clínicas se vendem, não."
                                </p>
                            </div>
                        </div>

                        {/* Floating "Mission Card" - Overlapping */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="absolute -bottom-10 -right-4 md:-right-10 w-64 bg-[#111] border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:block"
                        >
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Nossa Missão</div>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                                    <span>Democratizar o design high-ticket.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                                    <span>Eliminar custos de agência.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <CheckCircle2 className="w-4 h-4 text-brand-purple mt-0.5 shrink-0" />
                                    <span>Automatizar o que importa.</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Content Side (Right) */}
                    <div className="relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
                            <span className="w-2 h-2 rounded-full bg-white"></span>
                            Manifesto ClinicFlow
                        </div>

                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
                            Cansamos de ver doutores pagando <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">O Preço da Ignorância.</span>
                        </h2>

                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Trabalhamos por anos nos bastidores das maiores agências de marketing médico do país. Vimos de perto contratos de <strong>R$ 10.000,00</strong> serem fechados por sites que demoravam 3 horas para serem feitos.
                            </p>
                            <p>
                                A verdade inconveniente? <span className="text-white font-medium">Você não estava pagando pela qualidade.</span> Estava pagando pelo ar-condicionado, pela recepcionista e pelo café gourmet da agência.
                            </p>
                            <p>
                                Decidimos quebrar esse ciclo. Pegamos a mesma tecnologia e design que vendíamos para grandes franquias e automatizamos o processo.
                            </p>
                            <p className="border-l-2 border-brand-purple pl-4 italic text-white/80">
                                O resultado é o ClinicFlow: A qualidade de uma agência de elite, pelo preço de um jantar.
                            </p>
                        </div>

                        {/* Founder Signature Area */}
                        <div className="mt-12 pt-8 border-t border-white/5 flex items-end justify-between">
                            <div>
                                <div className="text-white font-bold font-display text-lg">Equipe ClinicFlow</div>
                                <div className="text-sm text-brand-purple font-medium">São Paulo, Brasil</div>
                            </div>

                            {/* Fake Signature SVG */}
                            <div className="opacity-50">
                                <svg width="150" height="50" viewBox="0 0 150 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 35C10 35 25 10 40 25C55 40 45 45 35 35C25 25 50 15 60 25C70 35 80 40 90 30C100 20 110 30 120 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-8">
                            <a href="#pricing" className="inline-flex items-center gap-2 text-white font-bold hover:text-brand-purple transition-colors group">
                                Junte-se ao movimento <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};