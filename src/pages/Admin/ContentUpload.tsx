import React, { useState, useEffect } from 'react';
import { AdminLayout } from './layout/AdminLayout';
import { Upload, Image as ImageIcon, Link as LinkIcon, CheckCircle2, AlertCircle, Trash2, Edit } from 'lucide-react';
import { AdminService, AdminProject, Post } from '../../services/admin';

export const ContentUpload: React.FC = () => {
    const [projects, setProjects] = useState<AdminProject[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [month, setMonth] = useState('02-2026');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {
        if (selectedProjectId) {
            loadPosts();
        }
    }, [selectedProjectId]);

    const loadProjects = async () => {
        const data = await AdminService.getProjects();
        setProjects(data);
    };

    const loadPosts = async () => {
        if (!selectedProjectId || selectedProjectId.startsWith('no-project-')) {
            setPosts([]);
            return;
        }
        const data = await AdminService.getPostsByProject(selectedProjectId);
        setPosts(data);
    };

    const handleUpload = async () => {
        if (!selectedProjectId) {
            setErrorMessage('Selecione um cliente');
            return;
        }
        if (!imageUrl) {
            setErrorMessage('Insira a URL da imagem');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        let result;
        if (editingPost) {
            result = await AdminService.updatePost({
                ...editingPost,
                month,
                imageUrl,
                caption
            });
        } else {
            const isNoProject = selectedProjectId.startsWith('no-project-');
            const clinicId = isNoProject ? selectedProjectId.replace('no-project-', '') : undefined;
            const projectId = isNoProject ? undefined : selectedProjectId;

            result = await AdminService.createPost({
                projectId,
                clinicId,
                month,
                imageUrl,
                caption
            });
        }

        if (result.success) {
            setStatus('success');
            setImageUrl('');
            setCaption('');
            setEditingPost(null);

            // Reload projects to get the new project ID if it was created
            if (selectedProjectId.startsWith('no-project-')) {
                await loadProjects();
                // We don't know the new project ID yet here easily without returning it from createPost, 
                // but loadProjects will at least update the list.
                setSelectedProjectId('');
            } else {
                loadPosts();
            }

            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('error');
            setErrorMessage(result.error || 'Erro ao salvar post');
        }
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setImageUrl(post.imageUrl);
        setCaption(post.caption);
        setMonth(post.month);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (postId: number) => {
        if (!confirm('Tem certeza que deseja excluir este post?')) return;

        const result = await AdminService.deletePost(postId);
        if (result.success) {
            loadPosts();
        } else {
            alert(result.error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Upload de Conteúdos 📤</h1>
                    <p className="text-slate-400">Adicione ou gerencie posts para a grade dos clientes.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Form */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">

                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-100">
                                {editingPost ? '✏️ Editando Post' : '➕ Novo Conteúdo'}
                            </h2>
                            {editingPost && (
                                <button
                                    onClick={() => {
                                        setEditingPost(null);
                                        setImageUrl('');
                                        setCaption('');
                                    }}
                                    className="text-xs text-slate-500 hover:text-white underline"
                                >
                                    Cancelar Edição
                                </button>
                            )}
                        </div>

                        {/* Client Selector */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Cliente / Clínica</label>
                            <select
                                value={selectedProjectId || ''}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                            >
                                <option value="" disabled>Selecione um cliente...</option>
                                {projects.map((p) => (
                                    <option key={p.clinicId} value={p.id || `no-project-${p.clinicId}`}>
                                        {p.clinicName} {p.id ? (p.domainUrl ? `(${p.domainUrl})` : '(ID: ' + p.id.substring(0, 5) + ')') : '⚠️ (Sem Projeto)'}
                                    </option>
                                ))}
                            </select>
                            {selectedProjectId?.startsWith('no-project-') && (
                                <div className="mt-2 text-[10px] text-amber-500 flex items-center gap-1 font-bold uppercase tracking-wider">
                                    <AlertCircle className="w-3 h-3" />
                                    Este cliente ainda não iniciou o onboarding. O post será salvo após a criação do projeto.
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Data / Mês de Referência</label>
                            <input
                                type="text"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">URL da Imagem (Catbox / S3)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pl-12 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Legenda do Post</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Escreva a legenda aqui..."
                                className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            />
                        </div>

                        {errorMessage && (
                            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                <AlertCircle className="w-4 h-4" />
                                {errorMessage}
                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={status === 'loading'}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20"
                        >
                            {status === 'loading' ? (
                                <>Salvando...</>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Post Salvo!
                                </>
                            ) : (
                                <>
                                    <Upload className="w-5 h-5" />
                                    {editingPost ? 'Atualizar Post' : 'Salvar Post'}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[400px] shadow-sm">
                    <h3 className="text-slate-500 font-medium mb-4">Preview do Post</h3>

                    <div className="w-[320px] bg-black border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                        <div className="aspect-square bg-slate-950 flex items-center justify-center relative">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="w-12 h-12 text-slate-700" />
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-full bg-slate-800"></div>
                                <div className="h-3 w-24 bg-slate-800 rounded"></div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-slate-300 line-clamp-3">
                                    {caption || "A legenda aparecerá aqui..."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            {selectedProjectId && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                        📋 Posts Existentes
                        <span className="text-sm font-normal text-slate-500 bg-slate-800 px-3 py-1 rounded-full">{posts.length} un.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
                                <div className="aspect-square relative overflow-hidden">
                                    <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="p-3 bg-white text-slate-900 rounded-xl hover:scale-110 transition-transform"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-transform"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold text-white uppercase tracking-wider">
                                        {post.month}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-slate-400 line-clamp-2 italic">{post.caption}</p>
                                </div>
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <div className="col-span-full py-20 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
                                Nenhum conteúdo cadastrado para este projeto.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};
