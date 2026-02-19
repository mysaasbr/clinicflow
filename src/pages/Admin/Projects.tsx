import React, { useEffect, useState } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import { Clock, CheckCircle2, AlertCircle, ArrowRight, Loader2, Edit2, Trash2, X, Globe, CreditCard } from 'lucide-react';
import { AdminService, AdminProject, AdminClient } from '../../services/admin';

export const AdminProjects: React.FC = () => {
    const [projects, setProjects] = useState<AdminProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Form states for edit/create
    const [editStatus, setEditStatus] = useState('');
    const [editDomain, setEditDomain] = useState('');
    const [editPaymentStatus, setEditPaymentStatus] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [clients, setClients] = useState<AdminClient[]>([]);
    const [selectedClinicId, setSelectedClinicId] = useState('');

    useEffect(() => {
        loadProjects();
        loadClients();
    }, []);

    const loadClients = async () => {
        const data = await AdminService.getClients();
        setClients(data);
    };

    const handleOpenCreate = () => {
        setSelectedClinicId('');
        setEditStatus('pending_payment');
        setEditDomain('');
        setIsCreateModalOpen(true);
    };

    const handleSaveCreate = async () => {
        if (!selectedClinicId) {
            alert('Selecione uma clínica');
            return;
        }

        const result = await AdminService.createProject({
            clinicId: selectedClinicId,
            status: editStatus,
            domainUrl: editDomain
        });

        if (result.success) {
            setIsCreateModalOpen(false);
            loadProjects();
        } else {
            alert(result.error);
        }
    };

    const loadProjects = async () => {
        setLoading(true);
        const data = await AdminService.getProjects();
        setProjects(data);
        setLoading(false);
    };

    const handleOpenEdit = (project: AdminProject) => {
        if (!project.id) return; // Should not happen for projects in list
        setEditingProject(project);
        setEditStatus(project.status || '');
        setEditDomain(project.domainUrl || '');
        setEditPaymentStatus('paid'); // Default for manual edit if needed
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        if (!editingProject?.id) return;

        const result = await AdminService.updateProject({
            id: editingProject.id,
            status: editStatus,
            domainUrl: editDomain
        });

        if (result.success) {
            setIsEditModalOpen(false);
            loadProjects();
        } else {
            alert(result.error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este projeto? Todos os posts vinculados também serão removidos.')) return;

        const result = await AdminService.deleteProject(id);
        if (result.success) {
            loadProjects();
        } else {
            alert(result.error);
        }
    };

    const getColumnProjects = (stage: 'briefing' | 'development' | 'delivery') => {
        return projects.filter(p => {
            if (!p.id) return false; // Filter out clients without projects
            if (stage === 'briefing') return ['pending_payment', 'approved'].includes(p.status || '');
            if (stage === 'development') return ['in_progress'].includes(p.status || '');
            if (stage === 'delivery') return ['finished', 'published'].includes(p.status || '');
            return false;
        });
    };

    const getStatusInfo = (status: string | null) => {
        switch (status) {
            case 'pending_payment': return { label: 'Aguardando Pagto', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' };
            case 'approved': return { label: 'Briefing Aprovado', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' };
            case 'in_progress': return { label: 'Em Desenvolvimento', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' };
            case 'finished': return { label: 'Finalizado', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
            case 'published': return { label: 'Publicado', color: 'text-emerald-500', bg: 'bg-emerald-500/20 border-emerald-500/30' };
            default: return { label: 'Desconhecido', color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/20' };
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Gerenciar Projetos 🚀</h1>
                    <p className="text-slate-400">Acompanhe e gerencie o ciclo de vida de cada entrega.</p>
                </div>
                <button
                    onClick={handleOpenCreate}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 active:scale-[0.98]"
                >
                    <ArrowRight className="w-4 h-4 rotate-[-45deg]" /> Novo Projeto
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {(['briefing', 'development', 'delivery'] as const).map(stage => (
                    <div key={stage} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm h-full flex flex-col">
                        <h3 className="font-bold text-sm text-slate-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
                            <span className={`w-2 h-2 rounded-full ${stage === 'briefing' ? 'bg-amber-500' : stage === 'development' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                            {stage === 'briefing' ? 'Design / Briefing' : stage === 'development' ? 'Desenvolvimento' : 'Entrega / Publicado'}
                        </h3>

                        <div className="space-y-4 flex-1">
                            {getColumnProjects(stage).map(project => {
                                const statusInfo = getStatusInfo(project.status);
                                return (
                                    <div
                                        key={project.id}
                                        className="bg-slate-800 border border-slate-700/50 p-5 rounded-2xl hover:border-slate-600 transition-all group relative animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <p className="font-bold text-slate-100 group-hover:text-white transition-colors">{project.clinicName}</p>
                                            <div className="flex gap-1 opacity-10 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleOpenEdit(project)}
                                                    className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProject(project.id!)}
                                                    className="p-1.5 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusInfo.bg} ${statusInfo.color} mb-3 border`}>
                                            <div className={`w-1 h-1 rounded-full ${stage === 'briefing' ? 'bg-amber-500' : stage === 'development' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                                            {statusInfo.label}
                                        </div>

                                        {project.domainUrl && (
                                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-2 bg-black/20 p-2 rounded-lg border border-white/5">
                                                <Globe className="w-3 h-3" />
                                                <span className="truncate">{project.domainUrl}</span>
                                            </div>
                                        )}

                                        {!project.domainUrl && stage === 'delivery' && (
                                            <div className="text-[10px] text-amber-500/70 italic mt-2">
                                                Aguardando domínio...
                                            </div>
                                        )}

                                        {project.status === 'pending_payment' && (
                                            <button
                                                onClick={async () => {
                                                    if (confirm('Deseja liberar o acesso manualmente para este cliente?')) {
                                                        const res = await AdminService.liberateAccess(project.id!);
                                                        if (res.success) loadProjects();
                                                        else alert(res.error);
                                                    }
                                                }}
                                                className="mt-3 w-full py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-emerald-500/20 flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Liberar Acesso Manual
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleOpenEdit(project)}
                                            className="mt-2 w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-[11px] font-bold rounded-xl transition-all border border-transparent hover:border-slate-500"
                                        >
                                            Ver Detalhes
                                        </button>
                                    </div>
                                );
                            })}
                            {getColumnProjects(stage).length === 0 && (
                                <div className="h-32 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600">
                                    <Clock className="w-6 h-6 mb-2 opacity-20" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Sem projetos</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Create / Edit Modal */}
            {(isEditModalOpen || isCreateModalOpen) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setIsEditModalOpen(false); setIsCreateModalOpen(false); }}></div>

                    <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => { setIsEditModalOpen(false); setIsCreateModalOpen(false); }}
                            className="absolute top-6 right-6 p-2 hover:bg-slate-800 rounded-xl text-slate-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            {isEditModalOpen ? 'Editar Projeto 🛠️' : 'Novo Projeto ✨'}
                        </h2>
                        <p className="text-slate-400 text-sm mb-8">
                            {isEditModalOpen ? editingProject?.clinicName : 'Inicie um novo ciclo para uma clínica cadastrada.'}
                        </p>

                        <div className="space-y-6">
                            {isCreateModalOpen && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Selecionar Clínica</label>
                                    <select
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                        value={selectedClinicId}
                                        onChange={(e) => setSelectedClinicId(e.target.value)}
                                    >
                                        <option value="" disabled>Escolha uma clínica...</option>
                                        {clients.filter(c => !!c.id).map(client => (
                                            <option key={client.id} value={client.id}>
                                                {client.clinicName || client.name} ({client.email})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Status do Ciclo</label>
                                <select
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                >
                                    <option value="pending_payment">Aguardando Pagamento</option>
                                    <option value="approved">Briefing / Aprovado</option>
                                    <option value="in_progress">Em Desenvolvimento</option>
                                    <option value="finished">Finalizado / Revisão</option>
                                    <option value="published">Publicado / No Ar</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Globe className="w-3 h-3" /> Domínio URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex: clinica-vital.com"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                                    value={editDomain}
                                    onChange={(e) => setEditDomain(e.target.value)}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={() => { setIsEditModalOpen(false); setIsCreateModalOpen(false); }}
                                    className="flex-1 px-4 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={isEditModalOpen ? handleSaveEdit : handleSaveCreate}
                                    className="flex-1 px-4 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
                                >
                                    {isEditModalOpen ? 'Salvar Alterações' : 'Criar Projeto'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
};

