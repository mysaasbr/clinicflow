
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Phone, Mail, Sparkles, Loader2 } from 'lucide-react';
import { CRMService } from '../src/services/crm';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    source: string;
    projectId: string;
    whatsappNumber: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, source, projectId, whatsappNumber }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await CRMService.collectLead({
            projectId,
            name,
            email,
            phone,
            source
        });

        if (res.success) {
            setSubmitted(true);
            // After success, delay redirect to WhatsApp
            setTimeout(() => {
                const message = encodeURIComponent(`Olá! Sou ${name} e gostaria de profissionalizar minha clínica.`);
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                onClose();
                // Reset state after a delay
                setTimeout(() => setSubmitted(false), 500);
            }, 1500);
        } else {
            alert('Erro ao enviar contato. Tente novamente.');
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
                    >
                        {/* Header Gradient */}
                        <div className="h-24 bg-slate-900 flex items-center justify-center relative">
                            <Sparkles className="w-8 h-8 text-indigo-400 opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-10 space-y-8">
                            {!submitted ? (
                                <>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-3xl font-black tracking-tight text-slate-900">
                                            Quase lá, <span className="text-indigo-600">Doutor.</span>
                                        </h3>
                                        <p className="text-slate-500 font-medium">
                                            Preencha os dados abaixo para blindar sua autoridade digital.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Seu Nome</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Dr. Nome Sobrenome"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">E-mail Profissional</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="contato@clinica.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">WhatsApp / Celular</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="(11) 99999-9999"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-slate-200 hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 mt-6"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Garantir Minha Vaga <Send className="w-4 h-4" /></>}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10 space-y-6">
                                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 12 }}
                                        >
                                            <Sparkles className="w-10 h-10 text-white fill-white/20" />
                                        </motion.div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black tracking-tight text-slate-900">Tudo pronto!</h3>
                                        <p className="text-slate-500 font-medium">Estamos redirecionando você para o WhatsApp...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
