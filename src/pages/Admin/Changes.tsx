import React, { useState, useEffect } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import {
    KanbanSquare, Clock, ArrowRight, CheckCircle2,
    MoreHorizontal, Loader2, AlertCircle, CalendarDays
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChangeRequest {
    id: string;
    projectId: string;
    description: string;
    status: 'pending' | 'in_progress' | 'done';
    createdAt: string;
    clinicName: string;
    domainUrl?: string;
}

export const AdminChanges: React.FC = () => {
    const [changes, setChanges] = useState<ChangeRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const fetchChanges = async () => {
        try {
            const res = await fetch('/api/admin/changes/list');
            const data = await res.json();
            setChanges(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChanges();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch('/api/admin/changes/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus })
            });
            if (res.ok) {
                setChanges(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as any } : c));
            }
        } catch (err) {
            alert('Erro ao atualizar status');
        } finally {
            setUpdatingId(null);
        }
    };

    const columns = [
        { id: 'pending', label: 'Pendente', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
        { id: 'in_progress', label: 'Em Desenvolvimento', icon: Loader2, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        { id: 'done', label: 'No Ar', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    ];

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Solicitações de Alteração</h1>
                        <p className="text-slate-400">Gerencie as mudanças solicitadas pelos clientes no site.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {columns.map(col => (
                        <div key={col.id} className="bg-slate-900 border border-white/5 rounded-3xl p-6 min-h-[500px]">
                            <div className={`flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl ${col.bg} ${col.border} border`}>
                                <col.icon className={`w-5 h-5 ${col.color} ${col.id === 'in_progress' ? 'animate-spin' : ''}`} />
                                <h3 className={`font-bold uppercase text-xs tracking-widest ${col.color}`}>{col.label}</h3>
                                <span className="ml-auto bg-slate-950/50 px-2 py-1 rounded-lg text-[10px] text-white font-mono">
                                    {changes.filter(c => c.status === col.id).length}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence mode='popLayout'>
                                    {changes
                                        .filter(c => c.status === col.id)
                                        .map(change => (
                                            <motion.div
                                                key={change.id}
                                                layoutId={change.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="bg-slate-950 border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-colors group relative"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <h4 className="font-bold text-white text-sm mb-1">{change.clinicName}</h4>
                                                        <a href={change.domainUrl} target="_blank" className="text-xs text-indigo-400 hover:underline truncate block max-w-[150px]">
                                                            {change.domainUrl || 'Sem domínio'}
                                                        </a>
                                                    </div>
                                                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                                        <CalendarDays className="w-3 h-3" />
                                                        {new Date(change.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="bg-slate-900/50 p-3 rounded-xl mb-4 border border-white/5">
                                                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                                                        {change.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                                    {col.id === 'pending' && (
                                                        <button
                                                            onClick={() => updateStatus(change.id, 'in_progress')}
                                                            disabled={updatingId === change.id}
                                                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
                                                        >
                                                            {updatingId === change.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <ArrowRight className="w-3 h-3" />}
                                                            Iniciar
                                                        </button>
                                                    )}
                                                    {col.id === 'in_progress' && (
                                                        <button
                                                            onClick={() => updateStatus(change.id, 'done')}
                                                            disabled={updatingId === change.id}
                                                            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
                                                        >
                                                            {updatingId === change.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                                                            Concluir
                                                        </button>
                                                    )}
                                                    {col.id === 'done' && (
                                                        <span className="w-full text-center text-[10px] text-emerald-500 font-bold uppercase tracking-widest py-2">
                                                            Finalizado
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                </AnimatePresence>
                                {changes.filter(c => c.status === col.id).length === 0 && (
                                    <div className="text-center py-10 opacity-30">
                                        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Vazio</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};
