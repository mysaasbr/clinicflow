import React from 'react';
import { AlertOctagon, TrendingDown, Clock, Ban, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const PainCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({
  children,
  className = "",
  delay = 0
}) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={`group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ${className}`}
      >
        <div className="relative z-10 h-full p-8 flex flex-col">
          {children}
        </div>
      </motion.div>
    );
  };

export const PainAgitation: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Subtle Purple Gradient Blur */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/40 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase mb-8 tracking-widest"
          >
            <Activity className="w-3 h-3" />
            Diagnóstico Sincero
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
            Você é um médico incrível, mas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">no Google você é invisível.</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Dói ver pacientes escolhendo profissionais piores só porque eles têm um site mais bonito ou posts melhores, né? <br />
            <span className="text-slate-900 font-semibold">Isso não é marketing, é injustiça.</span> E estamos aqui pra resolver.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">

          {/* Main Card (Large Left) */}
          <div className="md:col-span-7 h-full">
            <PainCard className="h-full min-h-[400px] justify-between border-l-4 border-l-red-500">
              <div>
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-8 border border-red-100 group-hover:scale-110 transition-transform duration-300">
                  <AlertOctagon className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">
                  A Síndrome do <br />"Sobrinho"
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                  Design amador, sites que não carregam e Instagram abandonado. Isso grita "descuido" para o subconsciente do seu paciente antes mesmo dele entrar no consultório.
                </p>
              </div>

              {/* Visual Metaphor inside card */}
              <div className="mt-8 relative h-32 w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent w-[200%] animate-shine translate-x-[-100%]"></div>
                <div className="flex items-center gap-3 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <span className="text-xs text-red-600 font-mono font-bold bg-red-100 px-2 py-1 rounded">ERROR 404</span>
                  <div className="h-px w-12 bg-red-300"></div>
                  <span className="text-xs text-slate-500 font-mono font-medium">CONNECTION LOST</span>
                </div>
              </div>
            </PainCard>
          </div>

          {/* Right Column (Stacked Cards) */}
          <div className="md:col-span-5 flex flex-col gap-6">

            {/* Money Card */}
            <PainCard delay={0.1} className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-xs font-mono text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">-32% ROI</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hemorragia de Caixa</h3>
              <p className="text-slate-600 text-sm">
                Pagando agências caras que entregam relatórios bonitos, mas zero pacientes na cadeira. A conta nunca fecha.
              </p>
            </PainCard>

            {/* Time Card */}
            <PainCard delay={0.2} className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-gray-100">
                  <Clock className="w-6 h-6 text-slate-700" />
                </div>
                <span className="text-xs font-mono text-slate-500 border border-gray-200 px-2 py-1 rounded">Sem Tempo</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ciclo da Exaustão</h3>
              <p className="text-slate-600 text-sm">
                Tentar criar posts no Canva entre um paciente e outro? Impossível. O resultado é um feed inconsistente.
              </p>
            </PainCard>

          </div>

          {/* Bottom Full Width Card - The "Broken System" */}
          <div className="md:col-span-12 mt-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group shadow-2xl"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Ban className="w-40 h-40 text-white rotate-12" />
              </div>

              <div className="flex-shrink-0 p-4 bg-white/10 rounded-full border border-white/20">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>

              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  A culpa não é sua. <span className="text-gray-400">O sistema tradicional quebrou.</span>
                </h3>
                <p className="text-gray-300 max-w-2xl">
                  O modelo antigo quer que você seja médico, gestor e designer ao mesmo tempo.
                  Isso drena sua energia. Deixa que a gente cuida do seu império digital enquanto você cuida do que importa: <strong className="text-white">seus pacientes.</strong>
                </p>
              </div>

              <div className="md:ml-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-8 rounded-2xl shadow-lg shadow-red-200 transition-colors"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  EU QUERO SAIR DO ANONIMATO
                </motion.button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};