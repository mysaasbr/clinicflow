import React from 'react';
import { X, Check, Minus } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
    const comparisonData = [
        { label: "Custo de Implantação", agency: "R$ 3k a R$ 10k", cf: "ZERO" },
        { label: "Tempo de Entrega", agency: "30 a 60 dias", cf: "72 horas" },
        { label: "Manutenção Técnica", agency: "Cobrada p/ hora", cf: "100% Inclusa" },
        { label: "Design & UX", agency: "Templates Genéricos", cf: "Design Premium" },
        { label: "Social Media", agency: "+ R$ 1.500/mês", cf: "20 Artes Inclusas" },
        { label: "Hospedagem", agency: "+ R$ 60/mês", cf: "Inclusa" },
        { label: "Contrato", agency: "Fidelidade 12 Meses", cf: "Sem Fidelidade" },
    ];

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative overflow-hidden">

            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-3 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6 tracking-tight">
                        A Matemática é <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Cruel.</span>
                    </h2>
                    <p className="text-sm md:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                        A diferença entre gastar e investir. Compare racionalmente a estrutura antiga contra a nova economia digital.
                    </p>
                </div>

                {/* Premium Comparison Table */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Glass Container */}
                    <div className="rounded-2xl md:rounded-3xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl overflow-hidden relative shadow-2xl">

                        {/* Column Highlight Effect - The "Beam" behind ClinicFlow */}
                        <div className="absolute top-0 bottom-0 right-0 w-[34%] md:w-[35%] bg-gradient-to-b from-brand-purple/10 via-brand-purple/5 to-transparent pointer-events-none"></div>
                        <div className="absolute top-0 right-[34%] md:right-[35%] w-px h-full bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 border-b border-white/5 relative z-10 bg-white/[0.02]">
                            <div className="col-span-4 md:col-span-4 p-3 md:p-8 flex items-end justify-center md:justify-start text-center md:text-left">
                                <span className="text-[9px] md:text-xs font-mono text-gray-600 uppercase tracking-widest leading-tight">Especificação</span>
                            </div>
                            <div className="col-span-4 md:col-span-4 p-3 md:p-8 flex flex-col items-center justify-end text-center opacity-60 md:opacity-40 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                                <span className="text-[10px] md:text-base font-bold text-gray-300 mb-0.5 md:mb-1 leading-tight">Tradicional</span>
                                <span className="text-[8px] md:text-[10px] text-gray-600 uppercase tracking-wider hidden md:block">Agências & Freelancers</span>
                            </div>
                            <div className="col-span-4 md:col-span-4 p-3 md:p-8 flex flex-col items-center justify-end text-center relative bg-white/[0.02]">
                                {/* Glowing Top Border for the winner */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent shadow-[0_0_20px_#8b5cf6]"></div>

                                <span className="text-[10px] md:text-xl font-display font-bold text-white mb-0.5 md:mb-1 leading-tight">ClinicFlow</span>
                                <span className="inline-flex items-center gap-1 text-[8px] md:text-[10px] text-brand-purple font-bold uppercase tracking-wider bg-brand-purple/10 px-1.5 py-0.5 rounded-full border border-brand-purple/20 scale-90 md:scale-100 origin-bottom">
                                    <Check className="w-2 h-2 md:w-3 md:h-3" /> <span className="hidden md:inline">Recomendado</span><span className="md:hidden">TOP</span>
                                </span>
                            </div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-white/5 relative z-10">
                            {comparisonData.map((row, i) => (
                                <div key={i} className="grid grid-cols-12 group hover:bg-white/[0.01] transition-colors min-h-[60px] md:min-h-0">

                                    {/* Label */}
                                    <div className="col-span-4 md:col-span-4 p-2 md:p-6 flex items-center justify-center md:justify-start text-center md:text-left bg-white/[0.01] md:bg-transparent">
                                        <span className="text-[10px] md:text-base text-gray-400 font-medium leading-tight">{row.label}</span>
                                    </div>

                                    {/* Competitor Value */}
                                    <div className="col-span-4 md:col-span-4 p-2 md:p-6 flex items-center justify-center text-center border-l border-white/5 md:border-none">
                                        <div className="flex flex-col items-center justify-center w-full h-full">
                                            <span className="text-[10px] md:text-base text-gray-500 group-hover:text-gray-400 transition-colors leading-tight break-words w-full">{row.agency}</span>
                                        </div>
                                    </div>

                                    {/* ClinicFlow Value */}
                                    <div className="col-span-4 md:col-span-4 p-2 md:p-6 flex items-center justify-center text-center bg-white/[0.02] relative group-hover:bg-white/[0.04] transition-colors border-l border-white/5 md:border-none">
                                        <span className="text-[10px] md:text-base font-bold text-white group-hover:text-brand-purple transition-colors drop-shadow-[0_0_10px_rgba(139,92,246,0.2)] leading-tight break-words w-full">
                                            {row.cf}
                                        </span>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Bottom Disclaimer */}
                    <div className="mt-8 flex justify-center opacity-40 px-4">
                        <p className="text-[9px] md:text-xs text-center max-w-lg text-gray-500">
                            * Comparativo baseado na média de mercado para desenvolvimento customizado.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};