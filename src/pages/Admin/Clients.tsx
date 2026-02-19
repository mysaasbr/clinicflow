import React, { useEffect, useState } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import { MoreVertical, Edit, Trash2, Loader2, X, Globe, Calendar, CreditCard, Activity, TrendingUp, Check, Palette, Type, Target, Smartphone, Instagram, MessageSquare, MapPin, Flag } from 'lucide-react';
import { AdminService, AdminClient } from '../../services/admin';

export const AdminClients: React.FC = () => {
    const [clients, setClients] = useState<AdminClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [activeTab, setActiveTab] = useState<'details' | 'calendar'>('details');
    const [clientPosts, setClientPosts] = useState<any[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('97,00');
    const [postFormData, setPostFormData] = useState({
        imageUrl: '',
        caption: '',
        month: '02-2026'
    });
    const [isEditingFee, setIsEditingFee] = useState(false);
    const [tempFee, setTempFee] = useState('');

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        if (activeTab === 'calendar' && selectedClient?.projectId) {
            loadClientPosts();
        }
    }, [activeTab, selectedClient]);

    const loadClients = async () => {
        setLoading(true);
        const data = await AdminService.getClients();
        setClients(data);
        setLoading(false);
    };

    const loadClientPosts = async () => {
        if (!selectedClient?.projectId) return;
        setLoadingPosts(true);
        const data = await AdminService.getPostsByProject(selectedClient.projectId);
        setClientPosts(data);
        setLoadingPosts(false);
    };

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const result = await AdminService.createManualClient(formData);
        if (result.success) {
            setIsModalOpen(false);
            setFormData({ name: '', email: '', password: '' });
            loadClients();
        } else {
            alert(result.error);
        }
        setIsSaving(false);
    };

    const handleViewDetails = async (clinicId: string) => {
        setLoadingDetails(true);
        setIsDetailModalOpen(true);
        setActiveTab('details');
        const details = await AdminService.getClientDetails(clinicId);
        if (details) {
            setSelectedClient(details);
            setTempFee(details.monthlyFee || 'R$ 497,00');
        } else {
            alert('Erro ao carregar detalhes do cliente.');
            setIsDetailModalOpen(false);
        }
        setLoadingDetails(false);
    };

    const handleSavePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClient?.projectId) return;

        setIsSaving(true);
        let result;
        if (editingPost) {
            result = await AdminService.updatePost({
                ...editingPost,
                ...postFormData
            });
        } else {
            result = await AdminService.createPost({
                projectId: selectedClient.projectId,
                ...postFormData
            });
        }

        if (result.success) {
            setIsPostModalOpen(false);
            setEditingPost(null);
            setPostFormData({ imageUrl: '', caption: '', month: '02-2026' });
            loadClientPosts();
        } else {
            alert(result.error);
        }
        setIsSaving(false);
    };

    const handleDeletePost = async (postId: number) => {
        if (!confirm('Excluir este post?')) return;
        const result = await AdminService.deletePost(postId);
        if (result.success) {
            alert('Post excluído!');
            loadClientPosts();
        } else {
            alert(result.error);
        }
    };

    const handleAddPayment = async (customMonth?: string) => {
        if (!selectedClient?.projectId) return;
        setIsSaving(true);

        const amount = customMonth ? selectedClient.monthlyFee : `R$ ${paymentAmount}`;
        const result = await AdminService.addPayment(selectedClient.projectId, amount, customMonth);

        if (result.success) {
            setIsPaymentModalOpen(false);
            setPaymentAmount('97,00');
            // Reload details to show new payment
            const updated = await AdminService.getClientDetails(selectedClient.clinicId);
            setSelectedClient(updated);
        } else {
            alert(result.error);
        }
        setIsSaving(false);
    };

    const handleUpdateFee = async () => {
        if (!selectedClient?.projectId) return;
        setIsSaving(true);
        const result = await AdminService.updateClientFee(selectedClient.projectId, tempFee);
        if (result.success) {
            setSelectedClient({ ...selectedClient, monthlyFee: tempFee });
            setIsEditingFee(false);
            loadClients(); // Refresh list to show new fee if needed
        } else {
            alert(result.error);
        }
        setIsSaving(false);
    };

    const handleUpdateStatus = async (projectId: string, newStatus: string) => {
        const result = await AdminService.updateProjectStatus(projectId, newStatus);
        if (result.success) {
            loadClients();
        } else {
            alert(result.error);
        }
    };

    const getStatusLabel = (status: string | undefined) => {
        switch (status) {
            case 'pending_payment': return 'Aguardando Pagamento';
            case 'approved': return 'Briefing/Aprovado';
            case 'in_progress': return 'Em Design';
            case 'finished': return 'Finalizado';
            case 'published': return 'Publicado';
            default: return 'Sem Projeto';
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Gerenciar Clientes 👥</h1>
                    <p className="text-slate-400">Base total: {clients.length} clientes.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
                >
                    + Novo Cliente
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                </div>
            ) : clients.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    Nenhum cliente encontrado.
                </div>
            ) : (
                <div className="grid gap-4">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-colors shadow-sm group">
                            <div className="flex gap-4 flex-1 cursor-pointer" onClick={() => handleViewDetails(client.id)}>
                                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-lg text-slate-200 border border-slate-700 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all">
                                    {client.name?.charAt(0) || client.email.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-slate-100 truncate">{client.name || 'Sem nome'}</h3>
                                    <p className="text-slate-400 text-sm truncate">{client.clinicName || 'Sem clínica'}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
                                        <span className="truncate">{client.email}</span>
                                        <span>•</span>
                                        <span>Cadastrado em: {new Date(client.createdAt).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    {client.domainUrl && (
                                        <div className="flex items-center gap-1.5 mt-2 bg-indigo-500/5 border border-indigo-500/10 w-fit px-2 py-0.5 rounded text-[10px] text-indigo-400 font-black">
                                            <Globe className="w-3 h-3" />
                                            {client.domainUrl}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                                <div className="flex flex-col items-end gap-2">
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${client.projectStatus === 'published' ? 'bg-emerald-500/10 text-emerald-400' :
                                        client.projectStatus === 'pending_payment' ? 'bg-amber-500/10 text-amber-400' :
                                            'bg-indigo-500/10 text-indigo-400'
                                        }`}>
                                        {getStatusLabel(client.projectStatus)}
                                    </div>

                                    {(client.requiredPosts ?? 0) > 0 && (
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded border ${(client.currentPosts || 0) >= (client.requiredPosts || 0)
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                            Postagens: {client.currentPosts || 0}/{client.requiredPosts}
                                        </div>
                                    )}

                                    {client.projectId && (
                                        <select
                                            className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded border border-slate-700 focus:outline-none focus:border-indigo-500 uppercase font-bold"
                                            value={client.projectStatus || ''}
                                            onChange={(e) => handleUpdateStatus(client.projectId!, e.target.value)}
                                        >
                                            <option value="pending_payment">Aguardando Pagamento</option>
                                            <option value="approved">Aprovado (Start Design)</option>
                                            <option value="in_progress">Em Progresso</option>
                                            <option value="finished">Finalizado</option>
                                            <option value="published">Publicado/No Ar</option>
                                        </select>
                                    )}
                                </div>

                                <div className="flex gap-2 ml-auto">
                                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Novo Cliente */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Novo Cliente Manual 👤</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Nome Completo</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Ex: Dr. João Silva"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">E-mail de Acesso</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="joao@exemplo.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Senha Temporária</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-500 mt-1">O cliente poderá alterar a senha depois.</p>
                            </div>

                            <div className="pt-4">
                                <button
                                    disabled={isSaving}
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Criando...
                                        </>
                                    ) : (
                                        'Criar Cliente e Liberar Tudo'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Detalhes do Cliente */}
            {isDetailModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight truncate">
                                    {selectedClient?.name || 'Carregando...'} 🔍
                                </h2>
                                <div className="flex gap-4 mt-2">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'details' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                                    >
                                        Visão Geral
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('calendar')}
                                        className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'calendar' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                                    >
                                        Calendário de Posts
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('onboarding')}
                                        className={`text-[10px] font-black uppercase tracking-widest pb-1 border-b-2 transition-all ${activeTab === 'onboarding' ? 'text-indigo-400 border-indigo-400' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                                    >
                                        Onboarding/Quiz
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setIsDetailModalOpen(false);
                                    setSelectedClient(null);
                                    setActiveTab('details');
                                }}
                                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-slate-700 flex-shrink-0 ml-4"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            {loadingDetails ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Carregando métricas...</p>
                                </div>
                            ) : selectedClient && selectedClient.clinicId ? (
                                activeTab === 'details' ? (
                                    <div className="space-y-8">
                                        {/* Header Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.05]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-indigo-500/10 rounded-xl">
                                                        <Activity className="w-5 h-5 text-indigo-400" />
                                                    </div>
                                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">Informações Gerais</h3>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Nome / Clínica</p>
                                                        <p className="text-slate-100 font-bold truncate">{selectedClient.name} <span className="text-slate-500 font-medium">({selectedClient.clinicName})</span></p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Data de Entrada</p>
                                                        <p className="text-slate-100 font-bold">{new Date(selectedClient.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Valor Mensal (Personalizado)</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {isEditingFee ? (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        value={tempFee}
                                                                        onChange={(e) => setTempFee(e.target.value)}
                                                                        className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold"
                                                                    />
                                                                    <button onClick={handleUpdateFee} className="p-1 bg-emerald-500 rounded hover:bg-emerald-600">
                                                                        <Check className="w-3 h-3 text-white" />
                                                                    </button>
                                                                    <button onClick={() => setIsEditingFee(false)} className="p-1 bg-slate-700 rounded hover:bg-slate-600">
                                                                        <X className="w-3 h-3 text-white" />
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="text-slate-100 font-bold">{selectedClient.monthlyFee || 'R$ 497,00'}</p>
                                                                    <button onClick={() => setIsEditingFee(true)} className="text-[9px] text-indigo-400 font-bold uppercase hover:underline">Alterar</button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.05]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-emerald-500/10 rounded-xl">
                                                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                                                    </div>
                                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">Engajamento e Uso</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-black/20 p-4 rounded-2xl border border-white/[0.02]">
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-1 truncate">Total Acessos</p>
                                                        <p className="text-2xl font-black text-white">{selectedClient.stats?.usage?.totalLogins || 0}</p>
                                                    </div>
                                                    <div className="bg-black/20 p-4 rounded-2xl border border-white/[0.02]">
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-1 truncate">Dias Ativos</p>
                                                        <p className="text-2xl font-black text-white">{selectedClient.stats?.usage?.uniqueDays || 0}</p>
                                                    </div>
                                                </div>
                                                <p className="text-[9px] text-slate-500 font-bold mt-4 italic">* Usuário frequenta a plataforma em média {Math.round((selectedClient.stats?.usage?.totalLogins || 0) / (selectedClient.stats?.usage?.uniqueDays || 1))} vezes por dia.</p>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-indigo-500/5 p-6 rounded-3xl border border-indigo-500/10 text-center">
                                                <div className="flex justify-center mb-3">
                                                    <Calendar className="w-6 h-6 text-indigo-400" />
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-1">Posts (Geral)</p>
                                                <p className="text-2xl font-black text-white">{selectedClient.stats?.totalPosts || 0}</p>
                                            </div>
                                            <div className="bg-amber-500/5 p-6 rounded-3xl border border-amber-500/10 text-center">
                                                <div className="flex justify-center mb-3">
                                                    <Activity className="w-6 h-6 text-amber-400" />
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-1">Mensal (Realizado)</p>
                                                <p className="text-2xl font-black text-white">{selectedClient.stats?.monthPosts || 0}</p>
                                            </div>
                                            <div className="bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/10 text-center">
                                                <div className="flex justify-center mb-3">
                                                    <CreditCard className="w-6 h-6 text-emerald-400" />
                                                </div>
                                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-1">Faturamento Total</p>
                                                <p className="text-2xl font-black text-white">{selectedClient.stats?.totalPaidValue || 'R$ 0,00'}</p>
                                            </div>
                                        </div>

                                        {/* Payment Tracking Grid (Spreadsheet Style) */}
                                        <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.05]">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-amber-500/10 rounded-xl">
                                                    <Calendar className="w-5 h-5 text-amber-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">Controle de Mensalidades 2026</h3>
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">Clique no mês para marcar como pago</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                                {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(month => {
                                                    const mYear = `${month}-2026`;
                                                    const isPaid = selectedClient.payments?.some((p: any) => p.monthYear === mYear);

                                                    return (
                                                        <button
                                                            key={month}
                                                            onClick={() => !isPaid && handleAddPayment(mYear)}
                                                            disabled={isPaid || isSaving}
                                                            className={`
                                                                p-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-2
                                                                ${isPaid
                                                                    ? 'bg-emerald-500/20 border-emerald-500/20 text-emerald-400 cursor-default shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                                                                    : 'bg-white/[0.02] border-white/[0.05] text-slate-500 hover:border-indigo-500/50 hover:bg-white/[0.05] hover:text-slate-300'}
                                                            `}
                                                        >
                                                            <span className="text-[9px] font-black uppercase tracking-widest">{month}/26</span>
                                                            {isPaid ? (
                                                                <Check className="w-3 h-3" />
                                                            ) : (
                                                                <span className="text-[8px] font-bold">ABERTO</span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Payments Table */}
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">Histórico de Pagamentos</h3>
                                                    <span className="text-[10px] bg-emerald-500 text-black font-black px-2 py-0.5 rounded uppercase mt-1 inline-block">
                                                        {selectedClient.stats?.totalPayments || 0} Pagamentos
                                                    </span>
                                                </div>
                                                {selectedClient?.projectId && (
                                                    <button
                                                        onClick={() => setIsPaymentModalOpen(true)}
                                                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                                                    >
                                                        + Adicionar Pagamento
                                                    </button>
                                                )}
                                            </div>
                                            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden overflow-x-auto">
                                                <table className="w-full text-left text-xs min-w-[400px]">
                                                    <thead>
                                                        <tr className="bg-white/[0.03] text-slate-500 font-black uppercase tracking-widest text-[9px]">
                                                            <th className="py-4 px-6">Data</th>
                                                            <th className="py-4 px-6 text-right">Valor</th>
                                                            <th className="py-4 px-6 text-right">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedClient.payments?.length > 0 ? selectedClient.payments.map((p: any, idx: number) => (
                                                            <tr key={idx} className="border-t border-white/[0.02]">
                                                                <td className="py-4 px-6 text-slate-400">{new Date(p.createdAt).toLocaleDateString('pt-BR')}</td>
                                                                <td className="py-4 px-6 text-right font-bold text-slate-100">{p.amount}</td>
                                                                <td className="py-4 px-6 text-right font-black uppercase text-emerald-400 text-[10px]">Confirmado</td>
                                                            </tr>
                                                        )) : (
                                                            <tr>
                                                                <td colSpan={3} className="py-8 text-center text-slate-600 font-bold uppercase tracking-widest">Nenhum pagamento registrado</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ) : activeTab === 'onboarding' ? (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        {/* Positioning & Strategy */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.05]">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="p-2 bg-rose-500/10 rounded-xl">
                                                        <Target className="w-5 h-5 text-rose-400" />
                                                    </div>
                                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">Posicionamento Estratégico</h3>
                                                </div>
                                                <div className="space-y-6">
                                                    <div>
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-2">Voz da Marca (Tone Tags)</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedClient.toneTags?.map((tag: string) => (
                                                                <span key={tag} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-bold uppercase tracking-wider italic">
                                                                    #{tag}
                                                                </span>
                                                            )) || <span className="text-slate-600 text-[10px] italic">Não definido</span>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-2">Diferenciais Competitivos</p>
                                                        <div className="p-4 bg-black/20 rounded-2xl border border-white/[0.02] text-slate-300 text-xs leading-relaxed italic">
                                                            {selectedClient.differentials || 'Informação não fornecida no quiz.'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.05]">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="p-2 bg-amber-500/10 rounded-xl">
                                                        <Smartphone className="w-5 h-5 text-amber-400" />
                                                    </div>
                                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">Presença & Contato</h3>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/[0.02]">
                                                        <div className="flex items-center gap-3">
                                                            <Instagram className="w-4 h-4 text-pink-400" />
                                                            <span className="text-xs font-bold text-slate-200">Instagram</span>
                                                        </div>
                                                        <span className="text-xs text-indigo-400 font-black">@{selectedClient.instagram || 'n/a'}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/[0.02]">
                                                        <div className="flex items-center gap-3">
                                                            <MessageSquare className="w-4 h-4 text-emerald-400" />
                                                            <span className="text-xs font-bold text-slate-200">WhatsApp</span>
                                                        </div>
                                                        <span className="text-xs text-emerald-400 font-black">{selectedClient.phone || 'n/a'}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/[0.02]">
                                                        <div className="flex items-center gap-3">
                                                            <MapPin className="w-4 h-4 text-sky-400" />
                                                            <span className="text-xs font-bold text-slate-200">Cidade</span>
                                                        </div>
                                                        <span className="text-xs text-sky-400 font-black">{selectedClient.city || 'Não informado'}</span>
                                                    </div>
                                                    <div className="p-4 bg-black/20 rounded-2xl border border-white/[0.02] space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <Flag className="w-4 h-4 text-indigo-400" />
                                                            <span className="text-xs font-bold text-slate-200">Objetivos de Marketing</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedClient.marketingGoals?.map((goal: string) => (
                                                                <span key={goal} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-[9px] font-bold uppercase">
                                                                    {goal}
                                                                </span>
                                                            )) || <span className="text-slate-600 text-[10px] italic">Não informado</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Visual Identity */}
                                        <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/[0.05]">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="p-2 bg-indigo-500/10 rounded-xl">
                                                    <Palette className="w-5 h-5 text-indigo-400" />
                                                </div>
                                                <h3 className="font-black text-white uppercase text-xs tracking-widest">Identidade Visual Escolhida</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                <div>
                                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-4">Paleta de Cores</p>
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div
                                                                className="w-16 h-16 rounded-2xl shadow-xl border border-white/10"
                                                                style={{ backgroundColor: selectedClient.colors?.primary || '#6366f1' }}
                                                            />
                                                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{selectedClient.colors?.primary || '#6366f1'}</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <div
                                                                className="w-16 h-16 rounded-2xl shadow-xl border border-white/10"
                                                                style={{ backgroundColor: selectedClient.colors?.secondary || '#a5b4fc' }}
                                                            />
                                                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{selectedClient.colors?.secondary || '#a5b4fc'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter mb-4">Tipografia & Fontes</p>
                                                    <div className="p-6 bg-black/20 rounded-3xl border border-white/[0.02] flex items-center gap-4">
                                                        <div className="p-3 bg-white/5 rounded-2xl">
                                                            <Type className="w-6 h-6 text-slate-300" />
                                                        </div>
                                                        <div>
                                                            <p className="text-lg font-bold text-white tracking-tight" style={{ fontFamily: selectedClient.fonts?.primary || 'sans-serif' }}>
                                                                {selectedClient.fonts?.primary || 'Inter / Default'}
                                                            </p>
                                                            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Fonte Principal Captada</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-black text-white uppercase text-xs tracking-widest">Grade de Conteúdos</h3>
                                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Posts ativos para o cliente</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setEditingPost(null);
                                                    setPostFormData({ imageUrl: '', caption: '', month: '02-2026' });
                                                    setIsPostModalOpen(true);
                                                }}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                                            >
                                                + Novo Post
                                            </button>
                                        </div>

                                        {loadingPosts ? (
                                            <div className="flex justify-center py-20">
                                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                            </div>
                                        ) : clientPosts.length === 0 ? (
                                            <div className="text-center py-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl border-dashed">
                                                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Nenhum post planejado</p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {clientPosts.map((post) => (
                                                    <div key={post.id} className="relative aspect-square rounded-2xl overflow-hidden border border-white/[0.05] group">
                                                        <img src={post.imageUrl || post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingPost(post);
                                                                    setPostFormData({ imageUrl: post.imageUrl || post.image, caption: post.caption, month: post.month || post.monthYear || '02-2026' });
                                                                    setIsPostModalOpen(true);
                                                                }}
                                                                className="p-2 bg-white text-slate-900 rounded-lg hover:scale-110 transition-transform"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeletePost(post.id)}
                                                                className="p-2 bg-red-500 text-white rounded-lg hover:scale-110 transition-transform"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[9px] font-bold text-white uppercase tracking-tighter">
                                                            {post.month || post.monthYear || 'Post'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <p className="text-slate-500 font-bold uppercase tracking-widest italic text-center">
                                        Nenhum dado encontrado.<br />
                                        <span className="text-[10px] font-medium non-italic mt-2 block">Ocorreu um erro ao carregar as informações deste cliente.</span>
                                    </p>
                                    <button
                                        onClick={() => handleViewDetails(selectedClient?.clinicId || '')}
                                        className="text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest underline"
                                    >
                                        Tentar Novamente
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Lancar Pagamento */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-white/[0.08] rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-white/[0.05]">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Lançar Pagamento 💳</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Insira o valor pago pelo cliente.</p>
                        </div>
                        <div className="p-8 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Valor (R$)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                                    <input
                                        type="text"
                                        value={paymentAmount}
                                        onChange={(e) => setPaymentAmount(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/[0.1] rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-black"
                                        placeholder="97,00"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-black/20 flex gap-3">
                            <button
                                onClick={() => setIsPaymentModalOpen(false)}
                                className="flex-1 py-4 px-4 rounded-2xl text-slate-500 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleAddPayment()}
                                disabled={isSaving}
                                className="flex-1 py-4 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
                            >
                                {isSaving ? 'Salvando...' : 'Confirmar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Criar/Editar Post */}
            {isPostModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight">
                                {editingPost ? '✏️ Editar Post' : '➕ Novo Post'}
                            </h3>
                            <button onClick={() => setIsPostModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSavePost} className="p-6 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mês de Referência (MM-AAAA)</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                    value={postFormData.month}
                                    onChange={e => setPostFormData({ ...postFormData, month: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">URL da Imagem</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                    value={postFormData.imageUrl}
                                    onChange={e => setPostFormData({ ...postFormData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Legenda (Opcional)</label>
                                <textarea
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500 transition-colors h-24 resize-none"
                                    value={postFormData.caption}
                                    onChange={e => setPostFormData({ ...postFormData, caption: e.target.value })}
                                    placeholder="Escreva algo..."
                                />
                            </div>

                            <button
                                disabled={isSaving}
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
                            >
                                {isSaving ? 'Salvando...' : 'Confirmar e Publicar'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};
