import React, { useState } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import {
    Globe, Server, CheckCircle2, ChevronRight,
    MessageCircle, ShieldCheck, ArrowRight, X, Loader2,
    Sparkles, Zap, Lock, Globe2, Target, PenTool, Bot, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DomainSelection: React.FC = () => {
    const [subdomain, setSubdomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [showSubdomainSuccess, setShowSubdomainSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [loading, setLoading] = useState(true);

    // Change Request State
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [changeDescription, setChangeDescription] = useState('');
    const [isImproving, setIsImproving] = useState(false);
    const [isSubmittingChange, setIsSubmittingChange] = useState(false);
    const [activeRequest, setActiveRequest] = useState<any>(null);

    const getUserId = () => {
        const token = localStorage.getItem('clinicflow_token');
        return token?.replace('local-dev-token-', '').replace('fake-jwt-token-', '');
    };

    React.useEffect(() => {
        const fetchStatus = async () => {
            try {
                const userId = getUserId();
                const res = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const data = await res.json();

                // Lock if project is pending_payment or doesn't exist
                if (data.project && data.project.status !== 'pending_payment') {
                    setIsLocked(false);
                }

                // Check active request
                const statusRes = await fetch(`/api/changes/check-status?userId=${userId}`);
                const statusData = await statusRes.json();
                setActiveRequest(statusData.activeRequest);

            } catch (err) {
                console.error('Error fetching project status:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const handleSubdomainCheck = () => {
        if (!subdomain || isLocked) return;
        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            setShowSubdomainSuccess(true);
        }, 1500);
    };

    const handleCustomDomainRequest = () => {
        if (!customDomain || isLocked) return;
        setShowModal(true);
    };

    const handleImproveAI = async () => {
        if (!changeDescription) return;
        setIsImproving(true);
        try {
            const res = await fetch('/api/ai/improve-text', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: changeDescription })
            });

            const text = await res.text();
            console.log('[AI Client] Response text:', text);

            try {
                const data = JSON.parse(text);
                if (data.improvedText) {
                    setChangeDescription(data.improvedText);
                } else if (data.error) {
                    alert('Erro da IA: ' + data.error);
                }
            } catch (jsonErr) {
                console.error('[AI Client] JSON Parse Error:', jsonErr, 'Raw text:', text);
                alert('Erro ao processar resposta da IA. Veja o console para detalhes.');
            }
        } catch (error) {
            console.error('AI Error:', error);
            alert('Erro de conexão com o serviço de IA.');
        } finally {
            setIsImproving(false);
        }
    };

    const handleSubmitChange = async () => {
        if (!changeDescription) return;
        setIsSubmittingChange(true);
        try {
            const userId = getUserId();
            const res = await fetch('/api/changes/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, description: changeDescription })
            });
            const data = await res.json();
            if (data.success) {
                setActiveRequest(data.change);
                setShowChangeModal(false);
                setChangeDescription('');
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Submit Error:', error);
        } finally {
            setIsSubmittingChange(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header */}
                <header className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm">
                                <Globe2 className="w-3.5 h-3.5 text-indigo-600" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Presença Web</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-slate-900 leading-tight">
                                Seu Endereço <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-shine bg-[length:200%_auto]">Na Rede Global.</span>
                            </h1>
                        </div>

                        {!isLocked && !loading && (
                            <button
                                onClick={() => {
                                    if (activeRequest) {
                                        alert('Você já tem uma solicitação em andamento. Aguarde a conclusão.');
                                        return;
                                    }
                                    setShowChangeModal(true);
                                }}
                                className="group px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 border-2 border-slate-100 shadow-[0_8px_0_rgb(226,232,240)] hover:shadow-[0_4px_0_rgb(226,232,240)] hover:translate-y-[4px] active:shadow-none active:translate-y-[8px] transition-all"
                            >
                                <PenTool className="w-4 h-4 text-indigo-600" />
                                Pedir Alteração
                            </button>
                        )}

                        {isLocked && !loading && (
                            <div className="bg-amber-50 border-2 border-amber-100 rounded-3xl p-6 flex items-center gap-4 max-w-sm shadow-xl shadow-amber-900/5">
                                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-amber-100 flex items-center justify-center shrink-0">
                                    <Lock className="w-6 h-6 text-amber-500" />
                                </div>
                                <p className="text-[11px] text-amber-800 font-bold uppercase tracking-wider leading-relaxed">
                                    Configuração bloqueada até a confirmação do pagamento.
                                </p>
                            </div>
                        )}
                    </div>
                </header>

                <div className="relative">
                    {activeRequest && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border-2 border-indigo-100 rounded-[3rem] p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-500/5"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center animate-pulse shadow-xl shadow-indigo-500/40 shrink-0">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Solicitação em Andamento</h3>
                                    <p className="text-slate-500 text-sm font-medium max-w-xl">
                                        Estamos processando sua alteração. Enquanto isso, novas solicitações ficam pausadas para garantir a qualidade da entrega.
                                    </p>
                                    <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100 shadow-inner">
                                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                                            Status: {activeRequest.status === 'pending' ? 'Pendente' : 'Em Desenvolvimento'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-auto">
                                <div className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Previsão</p>
                                    <p className="text-slate-900 font-bold">Até 24h úteis</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {isLocked && !loading && (
                        <div className="absolute inset-x-0 -inset-y-6 z-10 bg-white/40 backdrop-blur-[4px] rounded-[5rem] flex items-center justify-center overflow-hidden">
                            <div className="bg-white border-2 border-slate-100 p-12 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] text-center space-y-6 max-w-sm ring-4 ring-white relative z-20">
                                <div className="w-20 h-20 rounded-[2.5rem] bg-amber-50 border-2 border-amber-100 flex items-center justify-center mx-auto mb-8 shadow-inner shadow-amber-900/5 rotate-3">
                                    <Lock className="w-10 h-10 text-amber-500" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pagamento Pendente</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">Conclua o pagamento na Cakto para liberar a configuração do seu domínio personalizado.</p>
                                <button
                                    onClick={() => window.open('https://cakto.com.br/checkout/clinicflow-studio', '_blank')}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_4px_0_rgb(55,48,163)] flex items-center justify-center gap-2 hover:translate-y-0.5 active:translate-y-1 transition-all"
                                >
                                    Ir para checkout
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 ${isLocked ? 'grayscale' : ''}`}>

                        {/* Opção 1: Subdomínio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative"
                        >
                            <div className="relative bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 flex flex-col justify-between h-full transition-all duration-500 hover:border-indigo-100 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.15)] group">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                        <Globe className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Subdomínio Grátis</h2>
                                    <p className="text-base text-slate-500 mb-10 leading-relaxed font-medium">Seu site pronto em segundos sob o endereço padrão da ClinicFlow.</p>

                                    <div className="space-y-6">
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                value={subdomain}
                                                onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                                                placeholder="nome-da-clinica"
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 pr-36 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-base font-bold shadow-inner"
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-black text-xs uppercase tracking-widest group-focus-within/input:text-indigo-400">.clinicflow.me</span>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSubdomainCheck}
                                            disabled={!subdomain || isChecking}
                                            className="w-full bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-[0_6px_0_rgb(55,48,163)] active:shadow-none active:translate-y-1"
                                        >
                                            {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>
                                                    Reservar Endereço
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </motion.button>
                                    </div>

                                    <AnimatePresence>
                                        {showSubdomainSuccess && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="mt-10 p-5 bg-emerald-50 border-2 border-emerald-100 rounded-3xl flex items-center gap-5 shadow-xl shadow-emerald-500/5"
                                            >
                                                <div className="w-10 h-10 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center shadow-sm">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                </div>
                                                <p className="text-xs text-emerald-800 font-black uppercase tracking-[0.2em]">Endereço Configurado!</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap gap-8">
                                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-black uppercase tracking-widest">
                                        <Zap className="w-4 h-4 text-indigo-500" /> INSTANTÂNEO
                                    </div>
                                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-black uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4 text-indigo-500" /> SSL ATIVO
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Opção 2: Domínio Próprio */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="group relative"
                        >
                            <div className="relative bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 flex flex-col justify-between h-full transition-all duration-500 hover:border-purple-100 hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.15)] group">
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-purple-50 border-2 border-purple-100 flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                        <Server className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Domínio Custom</h2>
                                    <p className="text-base text-slate-500 mb-10 leading-relaxed font-medium">Utilize seu endereço próprio (ex: .com.br) para o máximo de autoridade.</p>

                                    <div className="space-y-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={customDomain}
                                                onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
                                                placeholder="www.minhaclinica.com.br"
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white transition-all text-base font-bold shadow-inner"
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleCustomDomainRequest}
                                            disabled={!customDomain}
                                            className="w-full bg-white border-2 border-slate-100 text-slate-900 text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl transition-all disabled:opacity-50 shadow-[0_6px_0_rgb(226,232,240)] active:shadow-none active:translate-y-1 hover:bg-slate-50"
                                        >
                                            Solicitar Integração
                                        </motion.button>
                                    </div>
                                </div>

                                <div className="mt-14 pt-8 border-t border-slate-100 flex flex-wrap gap-8">
                                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-black uppercase tracking-widest">
                                        <Target className="w-4 h-4 text-purple-500" /> SEO PREMIUM
                                    </div>
                                    <div className="flex items-center gap-2.5 text-[11px] text-slate-500 font-black uppercase tracking-widest">
                                        <Lock className="w-4 h-4 text-purple-500" /> ASSISTÊNCIA DNS
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Info */}
                <footer className="pt-20 border-t border-slate-100">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white rounded-[4rem] p-10 border-2 border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="flex items-start gap-8 text-slate-500 max-w-2xl">
                            <div className="w-16 h-16 rounded-[2rem] bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center shrink-0 shadow-inner">
                                <MessageCircle className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-3">Dúvida Técnica?</h4>
                                <p className="text-base leading-relaxed font-medium">
                                    Não se preocupe com DNS ou configurações técnicas. Criamos e cuidamos de tudo por você. Basta escolher o nome e nosso suporte finaliza.
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full lg:w-auto px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_6px_0_rgb(226,232,240)] hover:bg-slate-50 active:shadow-none active:translate-y-1 transition-all"
                        >
                            Falar com suporte
                        </motion.button>
                    </div>
                </footer>

                {/* Modal de Sucesso (Domain Request) */}
                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowModal(false)}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-white border-2 border-slate-100 rounded-[4rem] p-12 max-w-md w-full shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden text-center"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 blur-[80px] rounded-full -mr-32 -mt-32" />

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-8 right-8 p-3 rounded-2xl hover:bg-slate-50 text-slate-400 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="relative z-10">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center mb-8 mx-auto shadow-2xl shadow-indigo-500/40 rotate-6">
                                        <Sparkles className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Pedido Recebido!</h3>
                                    <p className="text-base text-slate-500 mb-10 leading-relaxed font-medium">
                                        Agendamos sua solicitação para <span className="text-indigo-600 font-bold">{customDomain}</span>.
                                        Nosso time técnico assumirá o processo e te chamará via WhatsApp.
                                    </p>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowModal(false)}
                                        className="w-full bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl transition-all"
                                    >
                                        Entendido
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Modal de Alteração de Site com IA (New) */}
                <AnimatePresence>
                    {showChangeModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowChangeModal(false)}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-white border-2 border-slate-100 rounded-[3.5rem] w-full max-w-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                <div className="p-10 md:p-12 flex-1 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-10">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-3">
                                                <Bot className="w-3 h-3 text-indigo-600" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Assistente IA</span>
                                            </div>
                                            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Pedir Alteração</h3>
                                            <p className="text-slate-500 font-medium mt-1">Descreva o que deseja mudar no seu site.</p>
                                        </div>
                                        <button
                                            onClick={() => setShowChangeModal(false)}
                                            className="p-4 rounded-2xl hover:bg-slate-50 text-slate-400 transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="relative group">
                                            <textarea
                                                value={changeDescription}
                                                onChange={(e) => setChangeDescription(e.target.value)}
                                                placeholder="Ex: Gostaria de alterar a cor do botão principal para verde e mudar o texto da seção de serviços..."
                                                className="w-full h-48 bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none text-lg leading-relaxed shadow-inner"
                                            />

                                            {/* AI Button */}
                                            <div className="absolute bottom-6 right-6">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleImproveAI}
                                                    disabled={!changeDescription || isImproving}
                                                    className="flex items-center gap-2.5 px-5 py-3 bg-white border-2 border-slate-100 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-[0_4px_0_rgb(241,245,249)] hover:border-indigo-500 hover:text-indigo-600 active:shadow-none active:translate-y-[4px]"
                                                >
                                                    {isImproving ? (
                                                        <>
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                                                            Otimizando...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                                            Refinar com IA
                                                        </>
                                                    )}
                                                </motion.button>
                                            </div>
                                        </div>

                                        {isImproving && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-start gap-5 p-6 bg-indigo-50 rounded-3xl border-2 border-indigo-100"
                                            >
                                                <div className="w-10 h-10 rounded-2xl bg-white border-2 border-indigo-100 flex items-center justify-center shrink-0">
                                                    <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-indigo-900 font-bold mb-1">A mágica está acontecendo...</p>
                                                    <p className="text-[11px] text-indigo-500 font-medium uppercase tracking-wider">
                                                        Reescrevendo sua solicitação para a equipe de desenvolvimento...
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-10 border-t border-slate-100 bg-slate-50/50 backdrop-blur-md">
                                    <button
                                        onClick={handleSubmitChange}
                                        disabled={!changeDescription || isSubmittingChange || isImproving}
                                        className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-[0_8px_0_rgb(55,48,163)] hover:translate-y-0.5 active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {isSubmittingChange ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                Enviar Solicitação
                                                <ArrowRight className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                                        Esta solicitação será revisada em até 24h úteis
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </DashboardLayout>
    );
};
