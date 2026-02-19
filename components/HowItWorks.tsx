import React from 'react';
import { FileText, Rocket, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: "01",
      icon: Zap,
      title: "Assine em 30 segundos",
      desc: "Garanta seu plano por apenas R$59. O acesso é liberado na hora, sem frescura.",
      color: "text-amber-500",
      bg: "bg-amber-100",
      border: "border-amber-200"
    },
    {
      id: "02",
      icon: FileText,
      title: "Mande suas infos no Zap",
      desc: "Nada de formulários gigantes. Manda seu logo e cores e a gente faz a mágica acontecer.",
      color: "text-blue-500",
      bg: "bg-blue-100",
      border: "border-blue-200"
    },
    {
      id: "03",
      icon: Rocket,
      title: "Exploda seus resultados",
      desc: "Em 3 dias seu site tá no ar e seus posts estão prontos. É só postar e começar a agendar.",
      color: "text-indigo-500",
      bg: "bg-indigo-100",
      border: "border-indigo-200"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-slate-50 relative overflow-hidden">

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Passo a Passo Ridículo
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-6 tracking-tight">
            Seja percebido como único <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">em menos de uma semana.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            Chega de perder tempo com reuniões chatas. <br className="hidden md:block" />
            Nós criamos um fluxo expresso pra quem não tem tempo a perder.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28%] left-[16%] right-[16%] h-[4px] bg-slate-200 z-0 rounded-full"></div>

          {/* Connecting Line (Mobile) */}
          <div className="md:hidden absolute top-[10%] bottom-[10%] left-[2rem] w-[4px] bg-slate-200 z-0 rounded-full"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group z-10"
            >
              {/* Background Big Number */}
              <div className="absolute -top-12 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 text-[120px] font-display font-black text-slate-200/50 select-none pointer-events-none group-hover:text-indigo-100 transition-colors duration-500 leading-none">
                {step.id}
              </div>

              {/* Card Content */}
              <div className="relative bg-white rounded-[2.5rem] p-8 border border-slate-200 transition-all duration-300 group-hover:-translate-y-2 shadow-[0_10px_0_rgb(226,232,240)] hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.2)] h-full flex flex-col md:items-center md:text-center text-left">

                {/* Icon Wrapper */}
                <div className={`w-20 h-20 rounded-3xl ${step.bg} ${step.border} border-2 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-slate-500 leading-relaxed text-base font-medium">
                  {step.desc}
                </p>

                {/* Mobile Arrow */}
                {i < 2 && (
                  <div className="md:hidden absolute -bottom-10 left-8 z-20">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shadow-md text-slate-400">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-6 w-full flex md:justify-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-bold text-indigo-600 flex items-center gap-2 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Passo Concluído
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};