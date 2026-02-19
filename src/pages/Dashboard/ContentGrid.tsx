import React, { useState } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import {
    Download, Copy, Check, Calendar,
    ChevronLeft, Instagram, Heart, MessageCircle,
    Send, Bookmark, MoreHorizontal, ArrowLeft,
    Sparkles, Zap, Smartphone, ExternalLink, X,
    Image as ImageIcon, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tipagem ────────────────────────────────────────────────

interface Post {
    id: number;
    title: string;
    image: string;
    caption: string;
    date: string;
    dayNum: string;
    monthName: string;
}

interface MonthFolder {
    id: string;
    name: string;
    count: number;
    year: string;
    accent: string;
}

// ─── Componentes ────────────────────────────────────────────

export const ContentGrid: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<MonthFolder | null>(null);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [copied, setCopied] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [months, setMonths] = useState<MonthFolder[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMonths, setLoadingMonths] = useState(true);
    const [projectId, setProjectId] = useState<string | null>(null);

    React.useEffect(() => {
        const fetchProjectAndMonths = async () => {
            const token = localStorage.getItem('clinicflow_token');
            if (!token) return;
            const userId = token.replace('local-dev-token-', '').replace('fake-jwt-token-', '');

            try {
                // Fetch folders (Projects)
                const monthsRes = await fetch(`/api/posts/months?userId=${userId}`);
                const monthsData = await monthsRes.json();
                setMonths(monthsData);

                // Auto-select the first one if available
                if (monthsData.length > 0 && !selectedMonth) {
                    setSelectedMonth(monthsData[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingMonths(false);
            }
        };
        fetchProjectAndMonths();
    }, []);

    React.useEffect(() => {
        if (selectedMonth) {
            loadPosts();
        }
    }, [selectedMonth]);

    const loadPosts = async () => {
        setLoading(true);
        try {
            // selectedMonth.id is the projectId
            const res = await fetch(`/api/posts/list?projectId=${selectedMonth!.id}`);
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadImage = (url: string, name: string) => {
        // Simulação de download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-16">

                {/* ── Header ─────────────────────────────── */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm">
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Hub de Conteúdo</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-slate-900 leading-tight">
                            {selectedMonth ? `Posts de ${selectedMonth.name}` : 'Seus Conteúdos.'}
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                            {selectedMonth
                                ? `Explorando ${selectedMonth.count} publicações planejadas estrategicamente para este período.`
                                : 'Acesse seu feed de publicações exclusivas e transforme seguidores em pacientes.'}
                        </p>
                    </div>

                    {selectedMonth && (
                        <button
                            onClick={() => setSelectedMonth(null)}
                            className="group flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border-2 border-slate-100 shadow-[0_6px_0_rgb(226,232,240)] hover:shadow-[0_3px_0_rgb(226,232,240)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all"
                        >
                            <ArrowLeft className="w-4 h-4 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
                            Mudar Mês
                        </button>
                    )}
                </header>

                {/* ── Grid Principal ────────────────────────── */}
                <main className="relative">
                    {!selectedMonth ? (
                        /* View 1: Pastas de Meses */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {loadingMonths ? (
                                <div className="col-span-full py-32 flex flex-col items-center gap-6">
                                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse">Organizando seu Calendário...</p>
                                </div>
                            ) : months.length === 0 ? (
                                <div className="col-span-full py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[4rem]">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-300 mx-auto mb-8 shadow-inner">
                                        <Calendar className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Nada por aqui ainda</h3>
                                    <p className="text-slate-400 font-medium">Seus conteúdos semanais aparecerão aqui automaticamente.</p>
                                </div>
                            ) : (
                                months.map((month) => (
                                    <motion.button
                                        key={month.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedMonth(month)}
                                        className="relative group text-left h-full"
                                    >
                                        <div className="relative bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 flex flex-col justify-between h-full transition-all duration-500 hover:border-indigo-100 hover:shadow-[0_20px_50px_-20px_rgba(79,70,229,0.15)] group">
                                            <div>
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${month.accent} flex items-center justify-center text-white border-4 border-white shadow-xl mb-12 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}>
                                                    <Calendar className="w-8 h-8" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{month.year}</p>
                                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{month.name}</h3>
                                                </div>
                                                <div className="mt-8 flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100 shadow-inner">
                                                        {month.count} Publicações
                                                    </span>
                                                    <div className="w-12 h-12 rounded-2xl border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all shadow-sm">
                                                        <ChevronRight className="w-6 h-6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))
                            )}
                        </div>
                    ) : (
                        /* View 2: Posts do Mês */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {loading ? (
                                <div className="col-span-full py-32 flex flex-col items-center gap-6">
                                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse">Carregando artes exclusivas...</p>
                                </div>
                            ) : posts.length === 0 ? (
                                <div className="col-span-full py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[4rem]">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-300 mx-auto mb-8 shadow-inner">
                                        <ImageIcon className="w-10 h-10" />
                                    </div>
                                    <p className="text-slate-400 font-medium">Nenhum post agendado para este mês ainda.</p>
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -5 }}
                                        onClick={() => setSelectedPost(post)}
                                        className="relative aspect-square rounded-[2.5rem] overflow-hidden cursor-pointer group border-2 border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                                    >
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                                        <div className="absolute top-5 right-5 w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 shadow-xl flex flex-col items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                                            <span className="text-[10px] font-black uppercase leading-none mb-0.5">{post.monthName}</span>
                                            <span className="text-2xl font-black leading-none">{post.dayNum}</span>
                                        </div>

                                        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                                                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">{post.date}</p>
                                                <h4 className="text-white font-bold leading-tight line-clamp-2">{post.title}</h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    )}
                </main>

                {/* ── Modal de Visualização (Instagram Style) ──────── */}
                <AnimatePresence>
                    {selectedPost && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedPost(null)}
                                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-white border-2 border-slate-100 rounded-[4rem] w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row"
                            >
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="absolute top-8 right-8 z-20 p-4 bg-white/80 backdrop-blur-md hover:bg-white rounded-2xl text-slate-400 hover:text-slate-900 border-2 border-slate-100 transition-all active:scale-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Left: Instagram Preview Mockup */}
                                <div className="lg:w-1/2 bg-slate-50 flex items-center justify-center p-10 md:p-20 border-r border-slate-100 relative overflow-hidden">
                                    {/* Background decoration */}
                                    <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full" />

                                    <div className="w-full max-w-[340px] aspect-[9/16] relative">
                                        {/* Phone Frame */}
                                        <div className="absolute inset-0 bg-white border-[10px] border-slate-900 rounded-[3.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden ring-4 ring-slate-100 ring-offset-2 ring-offset-white">
                                            {/* Insta Header */}
                                            <div className="px-5 py-5 flex items-center justify-between border-b border-slate-100 bg-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                                                        <div className="w-full h-full rounded-full border-2 border-white bg-slate-100" />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-900">sua_clinica</span>
                                                </div>
                                                <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                            </div>

                                            {/* Actual Image */}
                                            <div className="aspect-square bg-slate-50 overflow-hidden">
                                                <img src={selectedPost.image} className="w-full h-full object-cover" alt="Preview" />
                                            </div>

                                            {/* Insta Actions */}
                                            <div className="p-5 flex-1 bg-white">
                                                <div className="flex items-center justify-between mb-4 text-slate-900">
                                                    <div className="flex items-center gap-4">
                                                        <Heart className="w-6 h-6" />
                                                        <MessageCircle className="w-6 h-6" />
                                                        <Send className="w-6 h-6" />
                                                    </div>
                                                    <Bookmark className="w-6 h-6" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[11px] font-black text-slate-900">Curtido por milhares de pessoas</p>
                                                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3">
                                                        <span className="font-black mr-1 text-slate-900">sua_clinica</span>
                                                        {selectedPost.caption}
                                                    </p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-4">{selectedPost.date}</p>
                                                </div>
                                            </div>

                                            {/* Bottom Nav Simulation */}
                                            <div className="mt-auto border-t border-slate-100 p-5 flex justify-around text-slate-900 bg-white">
                                                <div className="w-6 h-6 border-2 border-slate-900 rounded-[4px]" />
                                                <div className="w-6 h-6 border-2 border-slate-200 rounded-[4px]" />
                                                <div className="w-6 h-6 border-2 border-slate-200 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Actual Content & Actions */}
                                <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center space-y-12 overflow-y-auto bg-white relative">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner">
                                                <Zap className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Publicação Agendada</p>
                                                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedPost.date}</h2>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-600 leading-relaxed leading-tight text-slate-900">"{selectedPost.title}"</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                                                <Instagram className="w-3 h-3 text-slate-600" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Sugestão de Legenda</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 text-base text-slate-600 font-medium leading-relaxed max-h-[250px] overflow-y-auto italic shadow-inner">
                                            {selectedPost.caption}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => downloadImage(selectedPost.image, selectedPost.title)}
                                            className="flex-1 bg-indigo-600 text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_8px_0_rgb(55,48,163)] flex items-center justify-center gap-3 active:shadow-none active:translate-y-1 transition-all"
                                        >
                                            <Download className="w-5 h-5" />
                                            Baixar Criativo
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleCopy(selectedPost.caption)}
                                            className="px-8 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_6px_0_rgb(226,232,240)] flex items-center justify-center gap-3 active:shadow-none active:translate-y-1 transition-all min-w-[200px]"
                                        >
                                            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                            {copied ? 'Copiado!' : 'Copiar Legenda'}
                                        </motion.button>
                                    </div>

                                    <div className="flex items-center gap-6 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span>Alta Conversão</span>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                        <div className="flex items-center gap-2">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Sugerido: Feed</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </DashboardLayout>
    );
};
