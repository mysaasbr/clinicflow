import React from 'react';
import { Layout, Instagram, Zap, MousePointerClick, Wallet, Server, ShieldCheck, Lock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export const Features: React.FC = () => {
   return (
      <section id="features" className="py-32 bg-white relative overflow-hidden">

         {/* Background Gradients */}
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-50/50 blur-[120px] rounded-full pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10">

            {/* Header Section */}
            <div className="text-center mb-24 max-w-4xl mx-auto">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase mb-8 shadow-sm tracking-widest">
                  <ShieldCheck className="w-3 h-3" />
                  Marketing Sem Frescura
               </div>
               <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 tracking-tight">
                  Sua clínica completa <br />
                  <span className="text-slate-400">e no piloto automático.</span>
               </h2>
               <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                  A gente corta toda a enrolação das agências. <br className="hidden md:block" />
                  Entregamos o que realmente importa: autoridade imediata e gente chamando no seu Zap.
               </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

               {/* Card 1: Landing Page (Large with Premium Mockup) */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-2 bg-slate-50 rounded-[2.5rem] border border-slate-200 transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.1)] hover:border-indigo-200"
               >
                  {/* Content */}
                  <div className="p-10 md:p-12 relative z-10 md:w-[45%] flex flex-col justify-center">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md border border-slate-100">
                        <Layout className="w-8 h-8 text-indigo-600" />
                     </div>
                     <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">Site Ultra-Premium</h3>
                     <p className="text-slate-500 text-lg leading-relaxed font-medium">
                        Esqueça templates prontos. Criamos uma estrutura que passa confiança e mostra que seu serviço é exclusivo.
                     </p>
                     <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-600 uppercase tracking-wider">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        No ar em 72h
                     </div>
                  </div>

                  {/* Visual Mockup Area - 16:9 Optimized */}
                  <div className="relative h-[350px] md:h-auto md:w-[55%] overflow-hidden flex items-center justify-center bg-slate-100">
                     {/* Decorative Glow behind mockup */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full"></div>

                     {/* Browser Window Mockup */}
                     <div className="relative w-[90%] md:w-[95%] transform rotate-[-2deg] transition-all duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.02] group-hover:translate-x-[-10px] z-20">
                        <div className="rounded-xl bg-white border border-slate-200 shadow-2xl overflow-hidden ring-1 ring-slate-100 flex flex-col aspect-video">

                           {/* Premium Browser Header */}
                           <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-3 gap-2 shrink-0 z-20 relative">
                              {/* Traffic Lights */}
                              <div className="flex gap-1.5">
                                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                                 <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                              </div>

                              {/* URL Bar */}
                              <div className="flex-1 bg-white rounded-[6px] h-5 border border-slate-200 flex items-center justify-center px-2 gap-1.5 shadow-sm">
                                 <Lock className="w-2 h-2 text-emerald-500" />
                                 <span className="text-[9px] text-slate-400 font-bold font-sans tracking-wide">clinicflow-premium.com</span>
                              </div>

                              {/* Empty spacer for balance */}
                              <div className="w-8"></div>
                           </div>

                           {/* Image Content Wrapper - 16:9 Viewport */}
                           <div className="relative flex-1 bg-white overflow-hidden group-hover:cursor-ns-resize">
                              {/* The Long Image */}
                              <div className="w-full h-full relative overflow-hidden bg-white">
                                 <img
                                    src="https://files.catbox.moe/lsijtd.png"
                                    alt="Landing Page Preview"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-top transition-[object-position] duration-[4s] ease-in-out group-hover:object-bottom"
                                 />

                                 {/* Hover Highlight Overlay */}
                                 <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors pointer-events-none z-10"></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Card 2: Speed (Vertical) */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-1 bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10"
               >
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform shadow-sm">
                     <Zap className="w-8 h-8" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Setup em 72h</h3>
                     <p className="text-slate-500 text-base font-medium leading-relaxed">
                        Nada de "em construção". Em 3 dias sua estrutura está pronta para receber tráfego.
                     </p>
                  </div>
               </motion.div>

               {/* Card 3: Social Media (HIGHLIGHTED - NEW DESIGN) */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="md:col-span-2 bg-slate-900 rounded-[2.5rem] border border-slate-800 relative overflow-hidden flex flex-col sm:flex-row group hover:border-pink-500/30 transition-all duration-500 shadow-2xl shadow-slate-900/20"
               >
                  {/* Instagram Gradient Background Spot */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-20 blur-[80px] rounded-full pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>

                  <div className="p-10 md:p-12 relative z-10 sm:w-1/2 flex flex-col justify-center">
                     <div className="w-16 h-16 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-pink-500/20">
                        <Instagram className="w-8 h-8 text-white" />
                     </div>
                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">20 Posts Mensais</h3>
                     <p className="text-slate-300 text-lg leading-relaxed font-medium">
                        Pare de sofrer no Canva. Nossa equipe de designers cria artes que param o scroll e trazem pacientes de verdade. Todo mês na sua mão.
                     </p>
                     <div className="mt-8 flex flex-wrap gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white backdrop-blur-md">Feed & Stories</span>
                        <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white backdrop-blur-md">Carrosséis</span>
                     </div>
                  </div>

                  {/* Mockup Area with Fanned Cards */}
                  <div className="relative sm:w-1/2 min-h-[350px] flex items-center justify-center p-6">

                     {/* Image 1 (Back) */}
                     <img
                        src="https://files.catbox.moe/8vxb2e.png"
                        alt="Post Social Media 1"
                        loading="lazy"
                        decoding="async"
                        className="absolute w-40 md:w-48 aspect-[4/5] object-cover rounded-2xl border border-white/10 shadow-2xl transform rotate-[-12deg] translate-x-[-40px] group-hover:translate-x-[-60px] group-hover:rotate-[-15deg] transition-all duration-500 bg-slate-800"
                     />

                     {/* Image 2 (Middle Back) */}
                     <img
                        src="https://files.catbox.moe/0u142b.png"
                        alt="Post Social Media 2"
                        loading="lazy"
                        decoding="async"
                        className="absolute w-40 md:w-48 aspect-[4/5] object-cover rounded-2xl border border-white/10 shadow-2xl transform rotate-[-6deg] translate-x-[-15px] group-hover:translate-x-[-20px] group-hover:rotate-[-8deg] transition-all duration-500 delay-75 bg-slate-800"
                     />

                     {/* Image 3 (Middle Front) */}
                     <img
                        src="https://files.catbox.moe/qskqsh.png"
                        alt="Post Social Media 3"
                        loading="lazy"
                        decoding="async"
                        className="absolute w-40 md:w-48 aspect-[4/5] object-cover rounded-2xl border border-white/10 shadow-2xl transform rotate-[0deg] translate-x-[10px] group-hover:translate-x-[20px] group-hover:rotate-[0deg] transition-all duration-500 delay-100 z-10 bg-slate-800"
                     />

                     {/* Image 4 (Front) */}
                     <img
                        src="https://files.catbox.moe/roobxa.png"
                        alt="Post Social Media 4"
                        loading="lazy"
                        decoding="async"
                        className="absolute w-40 md:w-48 aspect-[4/5] object-cover rounded-2xl border border-white/10 shadow-2xl transform rotate-[6deg] translate-x-[35px] group-hover:translate-x-[60px] group-hover:rotate-[10deg] transition-all duration-500 delay-150 z-20 bg-slate-800"
                     />

                  </div>
               </motion.div>

               {/* Card 4: Hosting */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="md:col-span-1 bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 hover:border-emerald-200 transition-all duration-300 group flex flex-col justify-center shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-500/10"
               >
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform shadow-sm">
                     <Server className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Hospedagem Inclusa</h3>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">
                     Servidores AWS de alta performance. Economize os R$ 60/mês que gastaria na Hostgator.
                  </p>
               </motion.div>

               {/* Card 5: Conversion Focus */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="md:col-span-1 bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 hover:border-amber-200 transition-all duration-300 group flex flex-col justify-center shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-amber-500/10"
               >
                  <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform shadow-sm">
                     <MousePointerClick className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">Foco no WhatsApp</h3>
                  <p className="text-slate-500 text-base font-medium leading-relaxed">
                     Botões flutuantes e CTAs estratégicos que perseguem o usuário até o agendamento.
                  </p>
               </motion.div>

               {/* Card 6: Value (Wide) */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-[2.5rem] p-10 md:p-12 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-10 group shadow-2xl shadow-indigo-500/30"
               >
                  <div className="flex items-center gap-8">
                     <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20 group-hover:scale-105 transition-transform shrink-0 backdrop-blur-md">
                        <Wallet className="w-10 h-10 text-white" />
                     </div>
                     <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Valor que não faz sentido</h3>
                        <p className="text-indigo-100 text-lg max-w-lg font-medium">
                           Uma agência te cobraria R$1.500/mês por metade disso. Aqui você paga menos que um café por dia.
                        </p>
                     </div>
                  </div>
                  <div className="text-right whitespace-nowrap bg-white/10 px-8 py-4 rounded-3xl border border-white/10 backdrop-blur-md">
                     <span className="text-sm text-indigo-200 line-through block mb-1 font-bold">De R$ 5.000</span>
                     <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-2xl font-bold text-white">R$</span>
                        <span className="text-6xl font-black text-white tracking-tighter">59</span>
                        <span className="text-xl text-indigo-200 font-bold">/mês</span>
                     </div>
                  </div>
               </motion.div>

            </div>
         </div>
      </section>
   );
};