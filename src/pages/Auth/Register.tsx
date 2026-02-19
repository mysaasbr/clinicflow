import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Loader2, Check } from 'lucide-react';
import { AuthService } from '../../services/auth';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const response = await AuthService.register(formData.name, formData.email, formData.password);

        setLoading(false);
        if (response.error) {
            setError(response.error);
        } else {
            localStorage.setItem('clinicflow_token', response.token);
            navigate('/quiz'); // Flow: Register -> Quiz -> Dashboard
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl relative z-10"
            >
                <div className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 md:p-16 shadow-2xl shadow-slate-200/60">
                    <div className="text-center mb-12 space-y-4">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full shadow-sm mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Comece Agora</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tighter leading-none">
                            Crie sua <br /> <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Conta Grátis.</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed">
                            Junte-se a centenas de clínicas que já professionalizaram sua presença digital.
                        </p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-5 bg-red-50 border-2 border-red-100 rounded-[1.5rem] flex items-center gap-4 text-red-600 text-sm font-bold"
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-5 italic">Seu Nome Completo</label>
                            <div className="relative group">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg"
                                    placeholder="Dr. Nome Sobrenome"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-5 italic">Email Profissional</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-6 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg"
                                    placeholder="exemplo@clinicflow.co"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-5 italic">Sua Senha de Acesso</label>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 pl-16 pr-16 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg"
                                    placeholder="Mínimo 8 caracteres"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="flex gap-2 h-1.5 px-5 mt-4">
                                <div className={`flex-1 rounded-full transition-all duration-500 ${formData.password.length > 0 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                                <div className={`flex-1 rounded-full transition-all duration-500 ${formData.password.length > 6 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                                <div className={`flex-1 rounded-full transition-all duration-500 ${formData.password.length > 8 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl hover:-translate-y-1 active:translate-y-0 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <span className="uppercase tracking-[0.2em] text-xs">Criar Minha Conta</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-slate-400 font-medium">
                            Já possui uma conta? {' '}
                            <Link to="/login" className="text-indigo-600 font-black hover:underline decoration-2">
                                Fazer Login
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
