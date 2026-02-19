import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Sparkles, Zap, Lock, Activity, Server, Smartphone, Globe } from 'lucide-react';

const benefits = [
  {
    icon: Crown,
    title: "Autoridade Instantânea",
    desc: "Sua clínica deixa de ser 'mais uma' e passa a ser a referência. Um design impecável elimina qualquer dúvida sobre a qualidade do seu trabalho.",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-100"
  },
  {
    icon: Lock,
    title: "Estrutura Própria",
    desc: "Não 'alugue' seu site de agências que te prendem em contratos. Aqui a estrutura é sua, um patrimônio digital que valoriza sua clínica.",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-100"
  },
  {
    icon: Sparkles,
    title: "Presença de Elite",
    desc: "Tenha um Instagram que parece gerenciado por uma agência de luxo. Conteúdo estratégico que atrai pacientes dispostos a pagar o que você vale.",
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-purple-100"
  }
];

const PremiumCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`relative rounded-[2.5rem] bg-white border border-slate-200 shadow-[0_8px_0_rgb(226,232,240)] hover:shadow-[0_4px_0_rgb(226,232,240)] hover:translate-y-[4px] transition-all duration-300 overflow-visible ${className}`}>
      {children}
    </div>
  );
};

export const Solution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-32 bg-slate-50 relative overflow-hidden">

      {/* Tech Grid Background - Subtler for Light Mode */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-40"></div>

      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* 1. Headline Area */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-8 shadow-sm"
          >
            <Zap className="w-3 h-3 fill-indigo-600" />
            O "Hack" do Marketing Médico
          </motion.div>

          <h2 className="text-4xl md:text-7xl font-display font-black text-slate-900 mb-8 leading-[0.9] tracking-tight">
            Pare de ser apenas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-shine bg-[length:200%_auto]">mais uma clínica.</span>
          </h2>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            A gente cuida de tudo: design, posts e seu site ultra-rápido. <br className="hidden md:block" />
            Você foca em ser o melhor doutor, a gente foca em te deixar com cara de clínica milionária.
          </p>
        </div>

        {/* 2. Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {benefits.map((benefit, index) => (
            <PremiumCard key={index} className="group">
              <div className="p-10 h-full flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-[2rem] ${benefit.bg} ${benefit.border} border-2 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <benefit.icon className={`w-10 h-10 ${benefit.text}`} />
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                  {benefit.title}
                </h3>

                <p className="text-slate-500 leading-relaxed text-lg font-medium">
                  {benefit.desc}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-50 w-full flex justify-center items-center gap-2 text-[10px] font-black font-mono text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></div>
                  Fator Uau Ativado
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* 3. Result Bar (Business Metrics) */}
        <motion.div
          style={{ y }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-[2.5rem] border-2 border-indigo-50 bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-100/50 p-4 flex flex-col md:flex-row gap-4">

            {/* Metric 1 */}
            <div className="flex-1 bg-white rounded-3xl p-6 flex items-center gap-5 border border-slate-100 shadow-sm">
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
                <Smartphone className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Experiência</div>
                <div className="text-slate-900 font-black text-xl tracking-tight">Agendamento em 2 Cliques</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex-1 bg-white rounded-3xl p-6 flex items-center gap-5 border border-slate-100 shadow-sm">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Performance</div>
                <div className="text-slate-900 font-black text-xl tracking-tight">Carregamento Instantâneo</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex-1 bg-white rounded-3xl p-6 flex items-center gap-5 border border-slate-100 shadow-sm">
              <div className="p-3 bg-pink-50 rounded-2xl border border-pink-100">
                <Crown className="w-8 h-8 text-pink-600" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Posicionamento</div>
                <div className="text-slate-900 font-black text-xl tracking-tight">Percepção High-Ticket</div>
              </div>
            </div>

          </div>
          <div className="text-center mt-8 flex justify-center items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full rounded-full object-cover" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-bold">
              Junte-se a <span className="text-indigo-600 font-black">+147 médicos</span> que já mudaram de nível.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};