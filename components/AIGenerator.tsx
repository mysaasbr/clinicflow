import React, { useState } from 'react';
import { generateInstagramCaption } from '../services/geminiService';
import { Sparkles, Copy, Check } from 'lucide-react';

export const AIGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [role, setRole] = useState('Dentista');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setResult('');
    const text = await generateInstagramCaption(topic, role);
    setResult(text);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-tool" className="py-24 bg-gradient-to-b from-brand-dark to-brand-gray relative">
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-bold uppercase mb-6">
              <Sparkles className="w-3 h-3" />
              Tecnologia Gemini
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Posts Profissionais.<br />
              <span className="text-brand-purple">Instantaneamente.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Parte de sua assinatura inclui nossas ferramentas de design premium.
              Experimente nosso Gerador de Legendas IA para ver como é fácil gerenciar seu feed.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sua Profissão</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                >
                  <option value="Dentista">Dentista</option>
                  <option value="Dermatologista">Dermatologista</option>
                  <option value="Psicólogo">Psicólogo</option>
                  <option value="Nutricionista">Nutricionista</option>
                  <option value="Fisioterapeuta">Fisioterapeuta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Tópico do Post</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="ex: Importância do fio dental, Cuidados com a pele..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-purple focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !topic}
                className={`w-full py-4 rounded-lg font-bold flex justify-center items-center gap-2 transition-all ${loading || !topic ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-brand-purple hover:bg-purple-500 text-white shadow-lg hover:shadow-brand-purple/25'}`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Legenda
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[400px] relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-purple to-pink-600"></div>
                <div>
                  <div className="h-3 w-32 bg-white/20 rounded mb-1"></div>
                  <div className="h-2 w-20 bg-white/10 rounded"></div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 min-h-[250px] text-gray-300 whitespace-pre-line font-light leading-relaxed">
                {result || <span className="text-gray-600 italic">Sua legenda gerada por IA aparecerá aqui...</span>}
              </div>

              {result && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar Texto'}
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};