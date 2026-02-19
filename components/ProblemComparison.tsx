import React from 'react';
import { X, Check } from 'lucide-react';

export const ProblemComparison: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">
            Cansado de rasgar dinheiro com <span className="text-red-500 line-through decoration-red-500/50 decoration-4">Agência?</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
            Agências são lentas, cobram caro e no fim entregam o básico. <br className="hidden md:block" />
            O ClinicFlow é o "atalho" para você ter um marketing de luxo sem a burocracia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* O Jeito Antigo */}
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-200 transition-all hover:bg-slate-100">
            <h3 className="text-xl font-bold text-slate-500 mb-6 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              Agência Tradicional
            </h3>
            <ul className="space-y-4">
              {[
                "Custo alto de implantação (R$ 3k a R$ 10k)",
                "Prazos longos (30 a 60 dias)",
                "Cobram extra por qualquer alteração",
                "Reuniões intermináveis de aprovação",
                "Fidelidade de 12 meses no contrato"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500">
                  <div className="p-1 bg-red-100 text-red-500 rounded-full mt-0.5">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O Jeito ClinicFlow */}
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-indigo-100 relative shadow-[0_10px_40px_-10px_rgba(79,70,229,0.2)]">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-black px-4 py-2 rounded-bl-2xl rounded-tr-2xl uppercase tracking-widest">
              Recomendado
            </div>
            <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center gap-2 uppercase tracking-wide">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              ClinicFlow Studio
            </h3>
            <ul className="space-y-4">
              {[
                "Sem custo de implantação (Apenas mensalidade)",
                "Site no ar em até 3 dias úteis",
                "Alterações inclusas no plano",
                "Modelo validado de alta conversão",
                "Sem fidelidade (Cancele quando quiser)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-700">
                  <div className="p-1 bg-indigo-100 text-indigo-600 rounded-full mt-0.5">
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};