
import React, { useEffect, useState } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import { CreditCard, Search, Filter, Loader2, CheckCircle2, Clock, XCircle, RefreshCcw } from 'lucide-react';
import { AdminService } from '../../services/admin';

export const AdminSubscriptions: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        setLoading(true);
        const data = await AdminService.getSubscriptions();
        setSubscriptions(data);
        setLoading(false);
    };

    const getStatusLabel = (status: string, paymentStatus: string) => {
        if (paymentStatus === 'paid' || status === 'approved') return { label: 'Ativa', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: CheckCircle2 };
        if (paymentStatus === 'canceled') return { label: 'Cancelada', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle };
        return { label: 'Pendente', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Clock };
    };

    const filtered = subscriptions.filter(sub =>
        sub.clinicName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Assinaturas 💳</h1>
                        <p className="text-slate-400">Gerencie pagamentos e acessos dos clientes.</p>
                    </div>
                    <button
                        onClick={loadSubscriptions}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors border border-slate-700"
                    >
                        <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Atualizar
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar por clínica ou e-mail..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <button className="bg-slate-800 border border-slate-700 text-slate-300 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-700 transition-all font-bold">
                        <Filter className="w-5 h-5" />
                        Filtros
                    </button>
                </div>

                {/* Main Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 text-xs font-bold uppercase tracking-widest bg-slate-800/50 border-b border-slate-800">
                                    <th className="py-6 px-8">Clínica / E-mail</th>
                                    <th className="py-6 px-8 text-center">Status</th>
                                    <th className="py-6 px-8 text-center">Forma</th>
                                    <th className="py-6 px-8 text-right">Último Update</th>
                                    <th className="py-6 px-8 text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {loading && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
                                            <p className="text-slate-500 font-medium">Carregando assinaturas...</p>
                                        </td>
                                    </tr>
                                )}

                                {!loading && filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <CreditCard className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                                            <p className="text-slate-500">Nenhuma assinatura encontrada.</p>
                                        </td>
                                    </tr>
                                )}

                                {!loading && filtered.map((sub) => {
                                    const status = getStatusLabel(sub.status, sub.paymentStatus);
                                    return (
                                        <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors group">
                                            <td className="py-6 px-8">
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-indigo-400 transition-colors">{sub.clinicName || 'Sem nome'}</div>
                                                    <div className="text-xs text-slate-500 mt-1">{sub.userEmail}</div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-center">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${status.bg} ${status.color} ${status.border} text-[10px] font-black uppercase tracking-widest`}>
                                                    <status.icon className="w-4 h-4" />
                                                    {status.label}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-center">
                                                <span className="text-xs font-bold text-slate-400">Cakto API</span>
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <div className="text-sm text-slate-300 font-mono">
                                                    {new Date(sub.updatedAt || sub.createdAt).toLocaleDateString('pt-BR')}
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-mono">
                                                    {new Date(sub.updatedAt || sub.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td className="py-6 px-8 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {(sub.paymentStatus !== 'paid' && sub.status === 'pending_payment') && (
                                                        <button
                                                            onClick={async () => {
                                                                if (confirm(`Liberar acesso para ${sub.clinicName}?`)) {
                                                                    await AdminService.liberateAccess(sub.id);
                                                                    loadSubscriptions();
                                                                }
                                                            }}
                                                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all border border-emerald-500/20"
                                                            title="Liberar Acesso Manual"
                                                        >
                                                            <CheckCircle2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700">
                                                        <CreditCard className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
