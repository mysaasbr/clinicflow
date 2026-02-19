import React, { useEffect, useState } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import {
    Users, DollarSign, Activity, TrendingUp, Loader2,
    ArrowUpRight, Plus, Upload, Settings, CreditCard,
    CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { AdminService, AdminClient } from '../../services/admin';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ clients: 0, revenue: 0, projects: 0 });
    const [recentClients, setRecentClients] = useState<AdminClient[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                const [statsData, clientsData] = await Promise.all([
                    AdminService.getStats(),
                    AdminService.getClients()
                ]);
                setStats(statsData);
                const sorted = [...clientsData].sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                ).slice(0, 5);
                setRecentClients(sorted);
            } catch (err) {
                console.error('Error loading admin dashboard:', err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    const quickActions = [
        { label: 'Novo Cliente', icon: Plus, path: '/admin/clients', color: 'bg-emerald-500' },
        { label: 'Upload Pack', icon: Upload, path: '/admin/upload', color: 'bg-indigo-500' },
        { label: 'Gerenciar Assinaturas', icon: CreditCard, path: '/admin/subscriptions', color: 'bg-blue-500' },
        { label: 'Ajustes Globais', icon: Settings, path: '/admin/settings', color: 'bg-slate-700' },
    ];

    return (
        <AdminLayout>
            <div className="space-y-10 pb-20">
                {/* ── Header Section ────────────────────────────────── */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Sistema Online • v1.4</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Painel <span className="text-indigo-500">Mestre.</span>
                        </h1>
                        <p className="text-slate-400 font-medium max-w-md">
                            Controle total sobre clínicas, projetos e entregas em um único lugar.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/admin/clients')}
                            className="bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-white/5"
                        >
                            Ver Todos Clientes
                        </button>
                    </div>
                </div>

                {/* ── Main Stats + Quick Actions Row ────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Primary Stats (8 cols on lg) */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { label: "Receita Mensal", value: formatCurrency(stats.revenue), icon: DollarSign, trend: "+12%", color: "text-emerald-400", bg: "bg-emerald-500/5", border: "border-emerald-500/10" },
                            { label: "Total Clientes", value: stats.clients.toString(), icon: Users, trend: "+3", color: "text-indigo-400", bg: "bg-indigo-500/5", border: "border-indigo-500/10" },
                            { label: "Projetos Ativos", value: stats.projects.toString(), icon: Activity, trend: "4 No Ar", color: "text-blue-400", bg: "bg-blue-500/5", border: "border-blue-500/10" },
                        ].map((stat, i) => (
                            <div key={i} className={`bg-slate-900/40 backdrop-blur-sm border ${stat.border} rounded-[2rem] p-6 group hover:bg-slate-900/60 transition-all`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center border border-white/5`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <span className={`text-[10px] font-black ${stat.color} group-hover:scale-110 transition-transform`}>{stat.trend}</span>
                                </div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-white tracking-tighter italic">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions (4 cols on lg) */}
                    <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-sm border border-white/[0.03] rounded-[2rem] p-6">
                        <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6 px-2">Ações Rápidas</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate(action.path)}
                                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-white/[0.03] hover:bg-white/[0.02] hover:border-white/10 transition-all group"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors text-center leading-tight">
                                        {action.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Two Column Layout for Depth ───────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Pipeline / Health (1 col) */}
                    <div className="lg:col-span-1 space-y-6 text-slate-400">
                        <div className="bg-slate-900/40 border border-white/[0.03] rounded-[2rem] p-8">
                            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-indigo-500" />
                                Funil de Operação
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Aguardando Pagamento', count: 2, icon: Clock, color: 'text-amber-500' },
                                    { label: 'Em Desenvolvimento', count: stats.projects - 4, icon: Activity, color: 'text-indigo-500' },
                                    { label: 'Projetos Finalizados', count: 4, icon: CheckCircle2, color: 'text-emerald-500' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-4 h-4 ${item.color}`} />
                                            <span className="text-xs font-medium group-hover:text-white transition-colors">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-8 border-t border-white/[0.03]">
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 italic">Performance Geral</p>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 w-[85%]" />
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] font-bold">85% Eficiência</span>
                                    <span className="text-[10px] font-bold text-emerald-500">+4% este mês</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table (2 cols) */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900/40 backdrop-blur-sm border border-white/[0.03] rounded-[2rem] overflow-hidden">
                            <div className="p-8 border-b border-white/[0.03] flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    Monitor de Cadastros
                                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">Tempo Real</span>
                                </h2>
                                <button
                                    onClick={() => navigate('/admin/clients')}
                                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                                >
                                    Ver Todos →
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/[0.03]">
                                            <th className="py-6 px-8">Identificação</th>
                                            <th className="py-6 px-4">Clínica</th>
                                            <th className="py-6 px-4 text-center">Posts</th>
                                            <th className="py-6 px-4 text-right">Data</th>
                                            <th className="py-6 px-8 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {recentClients.map((client, i) => (
                                            <tr key={i} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => navigate('/admin/clients')}>
                                                <td className="py-5 px-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300 group-hover:bg-indigo-600 group-hover:border-indigo-500 group-hover:text-white transition-all">
                                                            {client.name?.charAt(0) || client.email.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-100 uppercase text-[11px] tracking-tight">{client.name || 'Sem nome'}</div>
                                                            <div className="text-[10px] text-slate-500 font-medium">{client.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-5 px-4">
                                                    <div className="text-slate-400 font-bold text-xs italic">{client.clinicName || '—'}</div>
                                                    {client.domainUrl && (
                                                        <div className="text-[9px] text-indigo-400 font-medium truncate max-w-[120px]">{client.domainUrl}</div>
                                                    )}
                                                </td>
                                                <td className="py-5 px-4 text-center">
                                                    {(client.requiredPosts ?? 0) > 0 ? (
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${(client.currentPosts || 0) >= (client.requiredPosts || 0)
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                            }`}>
                                                            {client.currentPosts || 0}/{client.requiredPosts}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-slate-600 font-black">—</span>
                                                    )}
                                                </td>
                                                <td className="py-5 px-4 text-right text-slate-500 font-bold text-[10px]">
                                                    {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                                                </td>
                                                <td className="py-5 px-8 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${client.projectStatus === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                                        <span className="text-[10px] font-black uppercase text-slate-400">
                                                            {client.projectStatus ? 'Ativo' : 'Pendente'}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};
