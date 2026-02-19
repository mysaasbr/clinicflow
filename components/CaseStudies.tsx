import React from 'react';
import { TrendingUp, ArrowUpRight, CalendarCheck, Wallet, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const CaseStudies: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50/50 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-xs border border-emerald-200 px-3 py-1 rounded-full bg-emerald-50">
            Raio-X de Resultados
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black mt-6 text-slate-900 leading-tight tracking-tight">
            Contra fatos não há <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">argumentos.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Narrative Side */}
          <div className="relative">
            {/* Doctor Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 mb-10 p-4 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
                  alt="Dr Matheus"
                  className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full border-2 border-white">
                  <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Dr. Matheus Oliveira</h3>
                <p className="text-slate-500 text-sm flex flex-col sm:flex-row items-center gap-2 font-medium">
                  Implantodontista
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-emerald-600 font-bold">Cliente há 3 meses</span>
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-10 relative">
              {/* Connecting Line */}
              <div className="absolute left-[19px] top-8 bottom-8 w-[3px] bg-gradient-to-b from-red-200 via-slate-200 to-emerald-200"></div>

              {/* Before State */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-red-100 flex items-center justify-center z-10 shadow-md">
                  <AlertCircle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                </div>
                <h4 className="text-red-500 font-black mb-2 text-xs uppercase tracking-wide flex items-center gap-2">
                  Cenário Anterior
                </h4>
                <div className="bg-red-50/50 p-6 rounded-[1.5rem] border border-red-100 hover:border-red-200 transition-colors">
                  <p className="text-slate-600 leading-relaxed italic text-sm md:text-base font-medium">
                    "Eu dependia 100% de indicação. Meu Instagram era uma bagunça e meu site antigo demorava 10 segundos para carregar. Eu sentia que perdia pacientes todos os dias para clínicas 'mais bonitas' mas com serviço pior."
                  </p>
                </div>
              </motion.div>

              {/* After State */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center z-10 shadow-lg shadow-emerald-200">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <h4 className="text-emerald-600 font-black mb-2 text-xs uppercase tracking-wide">
                  O Efeito ClinicFlow (30 dias)
                </h4>
                <div className="bg-white p-6 rounded-[1.5rem] border border-emerald-100 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-50">
                  <p className="text-slate-600 leading-relaxed font-medium text-sm md:text-base">
                    "Com a nova Landing Page, a percepção de valor mudou na hora. Comecei a receber contatos qualificados direto no WhatsApp. <span className="text-emerald-700 bg-emerald-100 px-1 rounded font-bold">Fechei 3 protocolos de R$ 15k</span> na primeira semana."
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-10">
              <div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                <div className="text-slate-400 text-[10px] md:text-xs uppercase tracking-wider mb-1 font-bold">ROI</div>
                <div className="text-lg md:text-2xl font-black text-slate-900">12x</div>
              </div>
              <div className="bg-white p-3 md:p-4 rounded-2xl border border-slate-200 text-center shadow-sm">
                <div className="text-slate-400 text-[10px] md:text-xs uppercase tracking-wider mb-1 font-bold">Conv.</div>
                <div className="text-lg md:text-2xl font-black text-slate-900">4.8%</div>
              </div>
              <div className="bg-emerald-50 p-3 md:p-4 rounded-2xl border border-emerald-100 text-center relative overflow-hidden shadow-sm">
                <div className="text-emerald-600 text-[10px] md:text-xs uppercase tracking-wider mb-1 font-black">Custo/Lead</div>
                <div className="text-lg md:text-2xl font-black text-emerald-700 relative z-10">-40%</div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (Dashboard Simulation) */}
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Main Dashboard Card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-2xl shadow-indigo-500/10 z-10"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Faturamento Gerado</div>
                  <div className="text-3xl md:text-4xl font-display font-black text-slate-900 flex items-center gap-3">
                    R$ 42.500
                    <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full border border-emerald-100 font-sans font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +125%
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100 self-end sm:self-auto shadow-sm">
                  <Wallet className="w-6 h-6 text-indigo-500" />
                </div>
              </div>

              {/* Graph Simulation */}
              <div className="h-48 flex items-end justify-between gap-2 mb-8 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
                  <div className="w-full h-px bg-slate-100 border-dashed border-t border-slate-200"></div>
                  <div className="w-full h-px bg-slate-100 border-dashed border-t border-slate-200"></div>
                  <div className="w-full h-px bg-slate-100 border-dashed border-t border-slate-200"></div>
                </div>

                {[35, 42, 38, 55, 62, 58, 75, 82, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.5, duration: 0.8, ease: "easeOut" }}
                    className="relative flex-1 group"
                  >
                    <div className={`absolute bottom-0 left-0 right-0 top-0 rounded-t-lg ${i >= 6 ? 'bg-indigo-500' : 'bg-slate-200'}`}></div>

                    {/* Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none hidden md:block shadow-lg">
                      R$ {(h * 500).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Active Leads List */}
              <div className="space-y-3">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Últimos Agendamentos</div>

                {[
                  { name: 'Fernanda S.', proc: 'Lentes de Contato', time: '10 min', status: 'Confirmado' },
                  { name: 'Roberto M.', proc: 'Implante Total', time: '32 min', status: 'Aguardando' }
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{lead.name}</div>
                        <div className="text-[10px] md:text-xs text-slate-500 font-medium">{lead.proc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lead.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {lead.status}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-medium">{lead.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating WhatsApp Notification (The Persuasion Hook) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: -10, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute right-0 top-16 md:-right-12 md:top-32 bg-white text-slate-900 p-4 rounded-2xl rounded-tr-none shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] border border-slate-100 w-56 md:w-64 z-20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5 text-white fill-white" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">Novo Lead</span>
                    <span className="text-[10px] text-slate-400 font-bold">Agora</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug font-medium">
                    "Olá Dr! Vi seu site e adorei os resultados. Gostaria de agendar uma avaliação para Harmonização."
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};