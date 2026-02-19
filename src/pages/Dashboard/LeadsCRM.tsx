
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { CRMService, Lead } from '../../services/crm';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Filter, MessageCircle, Phone, Mail,
    MoreVertical, CheckCircle2, Clock, XCircle,
    TrendingUp, Target, Zap, ArrowRight, Loader2
} from 'lucide-react';

export const LeadsCRM: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Lead['status'] | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLeads = async () => {
            const token = localStorage.getItem('clinicflow_token');
            const userId = token?.replace('local-dev-token-', '').replace('fake-jwt-token-', '');

            // In a real app, we'd get the projectId from the user profile session
            // For now, we'll fetch the dashboard overview to get the projectId
            try {
                const res = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const result = await res.json();
                const projectId = result.project.id;

                const leadData = await CRMService.getLeads(projectId);
                setLeads(leadData);
            } catch (err) {
                console.error('Error fetching leads:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    const handleUpdateStatus = async (id: string, status: Lead['status']) => {
        const res = await CRMService.updateLeadStatus(id, status);
        if (res.success) {
            setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
        }
    };

    const filteredLeads = leads.filter(l => {
        const matchesStatus = filter === 'all' || l.status === filter;
        const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (l.phone && l.phone.includes(searchTerm));
        return matchesStatus && matchesSearch;
    });

    const getStatusInfo = (status: Lead['status']) => {
        switch (status) {
            case 'new': return { label: 'Novo', color: 'bg-indigo-500', icon: Zap };
            case 'contacted': return { label: 'Contatado', color: 'bg-blue-500', icon: Clock };
            case 'scheduled': return { label: 'Agendado', color: 'bg-purple-500', icon: Target };
            case 'won': return { label: 'Paciente', color: 'bg-emerald-500', icon: CheckCircle2 };
            case 'lost': return { label: 'Perdido', color: 'bg-slate-400', icon: XCircle };
        }
    };

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        scheduled: leads.filter(l => l.status === 'scheduled').length,
        conversion: leads.length > 0 ? Math.round((leads.filter(l => l.status === 'won').length / leads.length) * 100) : 0
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full">
                            <Target className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Elite CRM</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-slate-900 leading-none">
                            Seus <span className="text-indigo-600">Pacientes.</span>
                        </h1>
                        <p className="text-slate-500 text-xl font-medium max-w-xl">
                            Gerencie seus leads e transforme intenção em agendamento com o CRM de alta performance.
                        </p>
                    </div>

                    {/* Quick Stats Sidebar-style in header */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Novos Leads</p>
                            <p className="text-2xl font-black text-indigo-600">{stats.new}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Agendados</p>
                            <p className="text-2xl font-black text-purple-600">{stats.scheduled}</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center hidden md:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversão</p>
                            <p className="text-2xl font-black text-emerald-600">{stats.conversion}%</p>
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou telefone..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                        {(['all', 'new', 'contacted', 'scheduled', 'won', 'lost'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`
                                    whitespace-nowrap px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                    ${filter === s ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}
                                `}
                            >
                                {s === 'all' ? 'Todos' : getStatusInfo(s as any).label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Leads Grid/List */}
                {loading ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sincronizando Leads...</p>
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div className="py-32 text-center space-y-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                            <Target className="w-8 h-8 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-400 italic">Nenhum lead encontrado</h3>
                            <p className="text-slate-400 font-medium">Divulgue seu site e comece a capturar pacientes.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredLeads.map((lead) => {
                                const status = getStatusInfo(lead.status);
                                return (
                                    <motion.div
                                        key={lead.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-lg shadow-slate-200/30 hover:shadow-2xl hover:shadow-indigo-200/40 transition-all group relative overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">

                                            <div className="flex items-center gap-6">
                                                <div className={`w-16 h-16 rounded-[1.5rem] ${status.color} flex items-center justify-center text-white shadow-lg`}>
                                                    <status.icon className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h4 className="text-2xl font-black text-slate-900 tracking-tight">{lead.name}</h4>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.source || 'Site'}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-slate-400 text-sm font-medium">
                                                        {lead.phone && (
                                                            <div className="flex items-center gap-2">
                                                                <Phone className="w-3.5 h-3.5" />
                                                                {lead.phone}
                                                            </div>
                                                        )}
                                                        {lead.email && (
                                                            <div className="flex items-center gap-2">
                                                                <Mail className="w-3.5 h-3.5" />
                                                                {lead.email}
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex flex-col items-end gap-2 pr-4 border-r border-slate-100">
                                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Alterar Status</span>
                                                    <select
                                                        value={lead.status}
                                                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                                        className="bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest py-2 px-3 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                                                    >
                                                        <option value="new">Novo</option>
                                                        <option value="contacted">Contatado</option>
                                                        <option value="scheduled">Agendado</option>
                                                        <option value="won">Paciente</option>
                                                        <option value="lost">Perdido</option>
                                                    </select>
                                                </div>

                                                <a
                                                    href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200 hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <MessageCircle className="w-7 h-7 fill-white/20" />
                                                </a>
                                            </div>

                                        </div>

                                        {/* Background Glow on status */}
                                        <div className={`absolute top-0 right-0 w-64 h-64 ${status.color} opacity-[0.03] blur-[100px] -mr-32 -mt-32 pointer-events-none`} />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}

                {/* Professional Tip Banner */}
                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl shadow-indigo-600/20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full -mr-48 -mt-48" />
                    <div className="relative z-10 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest border border-white/10">
                            <TrendingUp className="w-3 h-3" />
                            Dica de Autoridade
                        </div>
                        <h3 className="text-3xl font-black tracking-tight italic">Contate em menos de 5 minutos.</h3>
                        <p className="text-slate-400 font-medium max-w-xl text-lg leading-relaxed">
                            Leads atendidos nos primeiros 5 minutos têm uma probabilidade <span className="text-white font-black underline decoration-indigo-500 underline-offset-4">9x maior</span> de fechar o agendamento.
                        </p>
                    </div>
                    <button className="relative z-10 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all shadow-xl flex items-center gap-3 shrink-0">
                        Ativar Notificações <Zap className="w-4 h-4 fill-slate-950" />
                    </button>
                </div>

            </div>
        </DashboardLayout>
    );
};
