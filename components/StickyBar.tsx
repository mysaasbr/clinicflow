import React from 'react';
import { Timer, ArrowRight } from 'lucide-react';

export const StickyBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-brand-purple via-pink-600 to-brand-purple text-white text-xs md:text-sm font-medium py-2 px-4 relative z-[60]">
      <div className="container mx-auto flex justify-between items-center md:justify-center gap-4">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 animate-pulse text-yellow-300" />
          <span><strong className="text-yellow-300 uppercase">Oferta Maluca:</strong> Garanta sua clínica premium por apenas <strong className="text-white bg-white/20 px-1.5 rounded">R$59/mês</strong> por tempo limitado!</span>
        </div>
        <a href="#pricing" className="hidden md:flex items-center gap-1 hover:underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity">
          Garantir minha vaga <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};