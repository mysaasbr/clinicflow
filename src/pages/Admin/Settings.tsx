import React, { useState } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import {
    Save,
    Shield,
    Key,
    CreditCard,
    Globe,
    Mail,
    Bell,
    Target,
    Zap,
    LogOut
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 1500);
    };

    const tabs = [
        { id: 'general', label: 'Geral', icon: Globe },
        { id: 'apis', label: 'APIs & Chaves', icon: Key },
        { id: 'payments', label: 'Pagamentos', icon: CreditCard },
        { id: 'notifications', label: 'Notificações', icon: Bell },
        { id: 'security', label: 'Segurança', icon: Shield },
    ];

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Configurações do Sistema ⚙️</h1>
                        <p className="text-slate-400 text-sm">Gerencie as preferências globais e integrações da plataforma.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 group"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        )}
                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-sm">

                            {activeTab === 'general' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-indigo-400" /> Preferências Gerais
                                    </h3>

                                    <div className="grid gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nome da Plataforma</label>
                                            <input
                                                type="text"
                                                defaultValue="ClinicFlow Studio"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">E-mail de Suporte</label>
                                            <input
                                                type="email"
                                                defaultValue="suporte@clinicflow.com.br"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">URL de Redirecionamento (Pós-Login)</label>
                                            <input
                                                type="text"
                                                defaultValue="https://clinicflow.me/dashboard"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            />
                                            <p className="text-[10px] text-slate-500 mt-2 font-medium">Nota: Admins são direcionados para /admin automaticamente.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'apis' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" /> Integrações e IA
                                    </h3>

                                    <div className="grid gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">OpenAI API Key</label>
                                            <input
                                                type="password"
                                                placeholder="sk-...."
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            />
                                            <p className="text-[10px] text-slate-500 mt-2 font-medium">Usada para geração automática de legendas e análises.</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Replicate Token</label>
                                            <input
                                                type="password"
                                                placeholder="r8_...."
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            />
                                        </div>

                                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4 items-start">
                                            <Target className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-amber-500 mb-1">Atenção com as Chaves</h4>
                                                <p className="text-xs text-slate-400 leading-relaxed">As chaves de API são sensíveis. Nunca as compartilhe ou as exponha no frontend. Elas são processadas apenas via serverless functions.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'payments' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-emerald-400" /> Checkout e Preços
                                    </h3>

                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Valor da Assinatura</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R$</span>
                                                    <input
                                                        type="number"
                                                        defaultValue="97"
                                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Moeda</label>
                                                <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all">
                                                    <option>BRL - Real Brasileiro</option>
                                                    <option>USD - Dólar Americano</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Webhook URL (Cakto)</label>
                                            <input
                                                type="text"
                                                defaultValue="https://clinicflow-xi.vercel.app/api/webhooks/cakto"
                                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-purple-400" /> Notificações do Sistema
                                    </h3>

                                    <div className="space-y-4">
                                        {[
                                            { label: "Aviso de novo cadastro", desc: "Receber e-mail quando um novo cliente se registrar." },
                                            { label: "Aviso de pagamento", desc: "Notificar via slack quando um pagamento for aprovado." },
                                            { label: "Alertas de Erros de API", desc: "E-mail imediato em caso de falha crítica nas integrações." },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                                <div>
                                                    <p className="font-bold text-sm text-slate-200">{item.label}</p>
                                                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                                </div>
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked={i === 0} />
                                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-red-400" /> Segurança Administrativa
                                    </h3>

                                    <div className="grid gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Alterar Senha do Master</label>
                                            <div className="space-y-3">
                                                <input
                                                    type="password"
                                                    placeholder="Senha atual"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Nova senha"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-800">
                                            <button className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-2 transition-colors">
                                                <LogOut className="w-4 h-4" /> Forçar Logout de todas as sessões
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
