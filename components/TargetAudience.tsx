import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Stethoscope, Gem, ScanFace, Ban } from 'lucide-react';

const niches = [
  {
    title: "Odontologia Premium",
    desc: "Para clínicas focadas em Lentes de Contato, Implantes e Invisalign que precisam justificar o alto valor.",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "group-hover:border-blue-400/50"
  },
  {
    title: "Harmonização Facial",
    desc: "Destaque seus antes e depois (com ética) e transmita segurança para procedimentos injetáveis.",
    icon: ScanFace,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
    border: "group-hover:border-brand-purple/50"
  },
  {
    title: "Dermatologia",
    desc: "Elegância minimalista para vender protocolos de laser, botox e cuidados com a pele.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?q=80&w=1000&auto=format&fit=crop",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "group-hover:border-pink-400/50"
  },
  {
    title: "Cirurgia Plástica",
    desc: "Estrutura robusta para médicos que vendem sonhos e transformação de vida.",
    icon: Stethoscope,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "group-hover:border-emerald-400/50"
  }
];

export const TargetAudience: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 relative z-10">

        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-purple"></span>
              Hiper-Especialização
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              Não somos generalistas. <br />
              Somos <span className="text-brand-purple">especialistas.</span>
            </h2>
          </div>
          <div className="max-w-xs text-gray-500 text-sm md:text-right">
            <p>O ClinicFlow foi treinado e desenhado exclusivamente para o mercado de estética de alto padrão.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {niches.map((niche, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-[#111] transition-all duration-500 hover:-translate-y-2 ${niche.border}`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={niche.image}
                  alt={niche.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">

                <div className={`w-12 h-12 rounded-xl ${niche.bg} backdrop-blur-md flex items-center justify-center mb-auto border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <niche.icon className={`w-6 h-6 ${niche.color}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">
                  {niche.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {niche.desc}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Negative Filter (Who we don't serve) */}
        <div className="mt-16 pt-10 border-t border-white/5 flex justify-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-3 md:gap-6 opacity-50 hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-red-500 font-bold">
              <Ban className="w-4 h-4" />
              Não atendemos:
            </span>
            <span className="text-sm text-gray-500">Advogados</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="text-sm text-gray-500">E-commerce</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="text-sm text-gray-500">Info-produtos</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="text-sm text-gray-500">Engenharia</span>
          </div>
        </div>

      </div>
    </section>
  );
};