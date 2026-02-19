import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Star, Zap } from 'lucide-react';

const BrowserMockup = ({ image, className = "" }: { image: string; className?: string }) => (
  <div className={`relative rounded-[1.5rem] overflow-hidden bg-white border border-slate-200 shadow-2xl ${className} group`}>
    {/* Browser Header */}
    <div className="h-10 bg-slate-50/80 backdrop-blur-md border-b border-slate-100 flex items-center px-6 gap-3">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
      </div>
      <div className="flex-1 max-w-sm h-6 bg-white border border-slate-100 rounded-md flex items-center px-3">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider italic">clinic-luxury.studio</span>
      </div>
    </div>
    {/* Content */}
    <div className="relative aspect-[16/10] overflow-hidden bg-white">
      <img
        src={image}
        alt="Clinical Interface"
        loading="lazy"
        className="w-full h-auto object-cover object-top transition-transform duration-[6s] ease-in-out group-hover:-translate-y-[calc(100%-500px)]"
      />
    </div>
  </div>
);

const PhoneMockup = ({ image, className = "" }: { image: string; className?: string }) => (
  <div className={`relative rounded-[2.5rem] overflow-hidden bg-slate-900 border-[8px] border-slate-900 shadow-2xl ${className} group`}>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-b-2xl z-30" />
    <div className="relative h-full w-full bg-white overflow-hidden">
      <img
        src={image}
        alt="Mobile Interface"
        loading="lazy"
        className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
      />
    </div>
  </div>
);

export const VisualShowcase: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 md:py-40 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Simplified Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-20">
          <div className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold tracking-widest uppercase text-[10px] mb-6"
            >
              Design de Autoridade
            </motion.div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-slate-900 leading-[1.05] tracking-tight mb-8">
              Estética que <span className="text-indigo-600">converte.</span>
            </h2>

            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Não entregamos apenas layouts. Criamos arquiteturas digitais projetadas para atrair pacientes de alto padrão e consolidar sua presença no mercado.
            </p>
          </div>

          <div className="lg:w-1/4 hidden lg:block">
            <div className="h-px w-full bg-slate-100 mb-6" />
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Cada detalhe é planejado para transmitir confiança, precisão e exclusividade.
            </p>
          </div>
        </div>

        {/* Improved Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BrowserMockup image="https://files.catbox.moe/hsg7jf.png" />

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-black text-slate-900">Portfolio High-Ticket</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Layouts limpos, espaçosos e focados na legibilidade e na sofisticação médica.</p>
                </div>
                <div className="bg-slate-50 rounded-3xl p-8 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">100</span>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Perf Score</span>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <p className="text-xs font-bold text-slate-400">Otimização máxima para carregamento instantâneo em qualquer dispositivo.</p>
                </div>
              </div>
            </motion.div>

            {/* Sub Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-14 bg-slate-900 rounded-[3rem] text-white overflow-hidden group shadow-xl"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                    <Zap className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h4 className="text-3xl md:text-4xl font-display font-black tracking-tight">Performance Cirúrgica.</h4>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">Velocidade extrema que gera confiança imediata e reduz a taxa de rejeição dos seus leads.</p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-full border-4 border-indigo-500/30 flex items-center justify-center">
                    <span className="text-5xl font-black text-white italic">A+</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Rank Mundial</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Mobile */}
          <div className="lg:col-span-4 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 relative overflow-hidden h-full flex flex-col shadow-sm"
            >
              <div className="mb-12 space-y-4">
                <h3 className="text-3xl font-display font-black text-slate-900 leading-tight">
                  Presença <br /> <span className="text-indigo-600">Mobile.</span>
                </h3>
                <p className="text-slate-400 font-medium text-sm">Design adaptativo que mantém o luxo na palma da mão.</p>
              </div>

              <div className="relative flex justify-center mt-auto">
                <PhoneMockup
                  className="w-full max-w-[280px] aspect-[9/18]"
                  image="https://files.catbox.moe/oupf1j.png"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <button
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-4 text-slate-800 font-bold text-sm uppercase tracking-widest border-b-2 border-indigo-600 pb-2 hover:text-indigo-600 transition-all"
              >
                Conhecer Portfólio <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};