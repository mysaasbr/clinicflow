import React from 'react';
import { Instagram, Linkedin, Mail, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-slate-900 text-sm">
      <div className="container mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12 mb-20">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-2xl font-display font-black text-white tracking-tight">
                Clinic<span className="text-indigo-500">Flow</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 font-medium">
              A plataforma definitiva para profissionais da saúde que desejam uma presença digital de alto padrão sem depender de agências.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-8 text-lg">Produto</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><a href="#features" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Vantagens</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Portfolio</a></li>
              <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Como Funciona</a></li>
              <li><a href="#pricing" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Planos</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-8 text-lg">Legal</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li><a href="#" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">Políticas de Reembolso</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors inline-block hover:translate-x-1 duration-300">LGPD</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1">
            <h4 className="text-white font-bold mb-8 text-lg">Contato</h4>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Email</span>
                  <span className="text-white">suporte@clinicflow.com.br</span>
                </div>
              </li>
              <li>
                <span className="block text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Horário de Atendimento</span>
                <span className="text-slate-300">Seg à Sex, 09h às 18h</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 font-medium text-xs">
          <div>
            &copy; {new Date().getFullYear()} ClinicFlow Tecnologia Ltda. Todos os direitos reservados.
          </div>
          <div className="flex gap-2 items-center bg-slate-900 px-4 py-2 rounded-full">
            <span>Feito com</span>
            <span className="text-red-500 animate-pulse">♥</span>
            <span>em São Paulo</span>
          </div>
        </div>

      </div>
    </footer>
  );
};