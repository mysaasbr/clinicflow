import React, { useState } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import {
    User, Building2, Shield, CreditCard,
    Camera, Check, Save, Bell,
    Instagram, Smartphone, Mail, Globe,
    ChevronRight, Sparkles, Zap, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'clinic' | 'security' | 'billing'>('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        clinicName: '',
        instagram: '',
        phone: '',
        address: '',
        monthlyFee: 'R$ 59,00',
        payments: [] as any[]
    });

    React.useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem('clinicflow_token');
                const userId = token?.replace('fake-jwt-token-', '');
                const res = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const data = await res.json();

                setFormData({
                    userName: data.clinic?.name || 'Seu Nome',
                    userEmail: data.clinic?.email || '',
                    clinicName: data.clinic?.name || '',
                    instagram: data.clinic?.instagram || '',
                    phone: data.clinic?.phone || '',
                    address: data.clinic?.address || '',
                    monthlyFee: data.project?.monthlyFee || 'R$ 59,00',
                    payments: data.project?.payments || []
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem('clinicflow_token');
            const userId = token?.replace('fake-jwt-token-', '');

            await fetch('/api/settings/update-clinic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    clinicName: formData.clinicName,
                    instagram: formData.instagram,
                    phone: formData.phone,
                    address: formData.address
                })
            });

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Seu Perfil', icon: User },
        { id: 'clinic', label: 'Sua Clínica', icon: Building2 },
        { id: 'security', label: 'Segurança', icon: Shield },
        { id: 'billing', label: 'Plano & Faturamento', icon: CreditCard },
    ] as const;

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-12 pb-20">

                {/* ── Header ─────────────────────────────── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Central de Controle</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-slate-900 leading-tight">
                            Configurações.
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                            Personalize sua experiência, gerencie sua clínica e mantenha seus dados seguros e atualizados.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all relative overflow-hidden"
                    >
                        {showSuccess ? (
                            <>
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span>Salvo com Sucesso!</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                {isSaving ? 'Processando...' : 'Salvar Alterações'}
                            </>
                        )}
                    </motion.button>
                </header>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* ── Sidebar Tabs ───────────────────────── */}
                    <nav className="lg:w-80 space-y-3 shrink-0">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        w-full flex items-center justify-between p-5 rounded-[2rem] transition-all group border-2
                                        ${isActive
                                            ? 'bg-white border-slate-900 text-slate-900 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)]'
                                            : 'bg-white border-slate-50 text-slate-400 hover:border-slate-200 hover:text-slate-600'}
                                    `}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`
                                            w-12 h-12 rounded-[1.25rem] flex items-center justify-center transition-all border-2
                                            ${isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:bg-white'}
                                        `}>
                                            <tab.icon className="w-5 h-5" />
                                        </div>
                                        <span className={`text-sm font-black tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{tab.label}</span>
                                    </div>
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                                </button>
                            );
                        })}
                    </nav>

                    {/* ── Content Area ────────────────────────── */}
                    <div className="flex-1 bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 md:p-14 shadow-sm relative overflow-hidden">
                        {/* Tab Content: Profile */}
                        {activeTab === 'profile' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-12"
                            >
                                <div className="flex flex-col md:flex-row items-center gap-10">
                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-indigo-100 to-indigo-50 p-1 border-2 border-slate-100 shadow-xl shadow-slate-200/50">
                                            <div className="w-full h-full rounded-[2.2rem] bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                                                <User className="w-10 h-10 text-indigo-600" />
                                            </div>
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                                            <Camera className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Dr. Usuário Admin</h3>
                                        <p className="text-slate-500 text-lg font-medium mt-1">Sua foto será exibida no rodapé do seu site profissional.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Nome Completo</label>
                                        <input
                                            type="text"
                                            value={formData.userName}
                                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-[0_0_20px_-5px_rgba(79,70,229,0.1)] transition-all font-bold text-lg"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Profissional</label>
                                        <input
                                            type="email"
                                            value={formData.userEmail}
                                            onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-[0_0_20px_-5px_rgba(79,70,229,0.1)] transition-all font-bold text-lg"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Especialidade</label>
                                        <div className="relative">
                                            <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg appearance-none cursor-pointer">
                                                <option>Estética Avançada</option>
                                                <option>Odontologia</option>
                                                <option>Dermatologia</option>
                                                <option>Fisioterapia</option>
                                            </select>
                                            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Telefone (WhatsApp)</label>
                                        <div className="relative">
                                            <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600" />
                                            <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-16 pr-8 py-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-[0_0_20px_-5px_rgba(79,70,229,0.1)] transition-all font-bold text-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab Content: Clinic */}
                        {activeTab === 'clinic' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-12"
                            >
                                <div className="space-y-3">
                                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Nome da Clínica</label>
                                    <input
                                        type="text"
                                        value={formData.clinicName}
                                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-black text-3xl tracking-tight"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Instagram Profissional</label>
                                        <div className="relative">
                                            <Instagram className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600" />
                                            <input
                                                type="text"
                                                value={formData.instagram}
                                                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                                placeholder="https://instagram.com/suaclinica"
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-16 pr-8 py-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Endereço Completo</label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Ex: Av. Principal, 1000 - Sala 101"
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-bold text-lg"
                                        />
                                    </div>
                                </div>

                                <div className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 group hover:border-indigo-100 transition-all">
                                    <div className="w-32 h-32 bg-white border-2 border-slate-200 border-dashed rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm group-hover:border-indigo-300 transition-colors">
                                        <Building2 className="w-10 h-10 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <div className="space-y-3 text-center md:text-left">
                                        <h4 className="text-xl font-black text-slate-900">Logotipo da Clínica</h4>
                                        <p className="text-sm text-slate-500 font-medium max-w-sm">Recomendamos arquivos PNG ou SVG com fundo transparente para melhor integração no site.</p>
                                        <button className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-indigo-600 hover:text-indigo-700 transition-all pt-2">
                                            Fazer Upload <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-10 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 group">
                                    <div className="space-y-2 text-center md:text-left">
                                        <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">Posicionamento Estratégico</h4>
                                        <p className="text-sm text-slate-500 font-medium max-w-md">Refaça o onboarding para atualizar sua identidade visual, voz da marca e diferenciais competitivos.</p>
                                    </div>
                                    <button
                                        onClick={() => window.location.href = '/quiz'}
                                        className="shrink-0 px-8 py-4 bg-white border-2 border-indigo-200 text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all shadow-sm"
                                    >
                                        Refazer Onboarding
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab Content: Security */}
                        {activeTab === 'security' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-12"
                            >
                                <div className="space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                                            <Lock className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Privacidade & Acesso</h3>
                                            <p className="text-slate-500 font-medium text-lg">Proteja sua conta com uma autenticação forte.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8 max-w-md">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Senha Atual</label>
                                            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 transition-all font-bold text-lg focus:border-indigo-600 focus:bg-white focus:outline-none" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Nova Senha</label>
                                            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 transition-all font-bold text-lg focus:border-indigo-600 focus:bg-white focus:outline-none" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-4">Confirmar Nova Senha</label>
                                            <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-8 py-5 text-slate-900 transition-all font-bold text-lg focus:border-indigo-600 focus:bg-white focus:outline-none" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Tab Content: Billing */}
                        {activeTab === 'billing' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-12"
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-[3rem] opacity-5 blur-2xl group-hover:opacity-10 transition-opacity" />
                                    <div className="relative bg-white border-2 border-slate-900 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-slate-200/50">
                                        <div className="space-y-4 text-center md:text-left">
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-200">
                                                <Zap className="w-3 h-3 fill-white" />
                                                PRO Ativo
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tighter">ClinicFlow Studio <span className="text-indigo-600">PRO.</span></h3>
                                            <p className="text-slate-500 text-lg font-medium">Próxima renovação: <span className="text-slate-900 font-bold">12 de Março, 2026.</span></p>
                                        </div>
                                        <div className="flex flex-col items-center gap-5">
                                            <div className="text-center">
                                                <p className="text-5xl font-black text-slate-900 tracking-tighter">{formData.monthlyFee}</p>
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">por mês</p>
                                            </div>
                                            <button className="w-full px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl">
                                                Mudar Plano
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Histórico Financeiro</h3>
                                            <p className="text-slate-500 font-medium">Acompanhe todos os seus pagamentos e faturas.</p>
                                        </div>
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                                            <CreditCard className="w-7 h-7" />
                                        </div>
                                    </div>

                                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/40">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Referência</th>
                                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Valor</th>
                                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Data</th>
                                                        <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {formData.payments && formData.payments.length > 0 ? (
                                                        formData.payments.map((p: any, i: number) => (
                                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                                                <td className="px-10 py-6">
                                                                    <p className="font-black text-slate-900 leading-none">Mês {p.monthYear}</p>
                                                                    <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Fatura #{p.id.slice(0, 8)}</p>
                                                                </td>
                                                                <td className="px-10 py-6">
                                                                    <span className="font-black text-slate-900">{p.amount}</span>
                                                                </td>
                                                                <td className="px-10 py-6 text-slate-500 font-medium">
                                                                    {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                                                                </td>
                                                                <td className="px-10 py-6">
                                                                    <div className={`
                                                                        inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                                                                        ${p.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}
                                                                    `}>
                                                                        <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                                                                        {p.status === 'paid' ? 'Pago' : 'Pendente'}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={4} className="px-10 py-12 text-center">
                                                                <div className="flex flex-col items-center gap-4">
                                                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                                                        <CreditCard className="w-8 h-8" />
                                                                    </div>
                                                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Nenhuma fatura encontrada.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200/50">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                                        <div className="relative z-10 flex items-center gap-6">
                                            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                                <Bell className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black italic uppercase">Precisa de comprovante?</h4>
                                                <p className="text-slate-400 text-sm font-medium">Solicite notas fiscais detalhadas via suporte.</p>
                                            </div>
                                        </div>
                                        <a
                                            href={`https://wa.me/5512996170618?text=${encodeURIComponent(`Olá! Sou da clínica ${formData.clinicName} e gostaria de solicitar o comprovante do meu pagamento do ClinicFlow Studio.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative z-10 bg-white text-slate-950 px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl whitespace-nowrap"
                                        >
                                            Falar com Suporte
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
