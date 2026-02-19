import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "Preciso pagar hospedagem à parte?",
    a: "Relaxa, a gente cuida de tudo! A hospedagem ultra-rápida já está inclusa no valor da sua assinatura de R$59. Você só precisa ter um domínio (tipo suaclinica.com.br)."
  },
  {
    q: "Tem fidelidade? Posso cancelar quando quiser?",
    a: "Sem pegadinhas e sem letras miúdas. Se você não estiver curtindo ou quiser dar um tempo, cancela na hora. Zero burocracia."
  },
  {
    q: "Como eu recebo os posts de todo mês?",
    a: "Todo dia 01 você recebe um pacotão com 20 artes exclusivas feitas por designers (nada de template cansado) e as legendas prontinhas pra postar."
  },
  {
    q: "Serve pra qual especialidade?",
    a: "O ClinicFlow é perfeito pra quem trabalha com beleza e saúde: Dentistas, Fisioterapeutas, Dermatos, Cirurgiões e Esteticistas que querem ser percebidos como premium."
  },
  {
    q: "Vocês fazem os anúncios (tráfego pago)?",
    a: "A gente foca em te dar a estrutura de luxo (Site + Posts). Não fazemos os anúncios, mas seu site já vai prontinho com tudo o que seu gestor de tráfego precisa pra bombar."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
            <HelpCircle className="w-3 h-3 text-indigo-600" />
            Tira Dúvidas
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-center text-slate-900 tracking-tight">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border-2 border-slate-100 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 group">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-bold text-lg transition-colors duration-300 ${openIndex === i ? 'text-indigo-600' : 'text-slate-700 group-hover:text-slate-900'}`}>{faq.q}</span>
                {openIndex === i ? (
                  <div className="bg-indigo-100 p-1 rounded-full text-indigo-600">
                    <ChevronUp className="w-5 h-5" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="bg-slate-50 p-1 rounded-full text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600 transition-colors">
                    <ChevronDown className="w-5 h-5" strokeWidth={3} />
                  </div>
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-8 pb-8 text-slate-500 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};