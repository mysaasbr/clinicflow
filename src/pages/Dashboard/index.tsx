import React, { useMemo } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, CheckCircle2, Globe, Image as ImageIcon,
    CalendarDays, ChevronRight, MessageCircle, Bell,
    ArrowUpRight, Sparkles, Zap, ArrowRight, Target,
    Lock, Play, ExternalLink, Download, Layout,
    Info, Star, HelpCircle, Trophy, Rocket
} from 'lucide-react';

// ─── Componentes Auxiliares ──────────────────────────────────

const StatusPipeline: React.FC<{ title: string; steps: any[]; accentColor: string; icon: any; iconColor: string }> = ({
    title, steps, accentColor, icon: Icon, iconColor
}) => {
    return (
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/60 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className={`absolute top-0 right-0 p-32 bg-${accentColor}-50 rounded-bl-full -mr-16 -mt-16 opacity-50`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl bg-${accentColor}-100 text-${accentColor}-600 shadow-sm`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-slate-800 text-lg font-black tracking-tight">{title}</h3>
                    </div>
                </div>

                <div className="relative px-2">
                    {/* Progress Bar Background */}
                    <div className="absolute top-5 left-8 right-8 h-3 bg-slate-100 rounded-full" />

                    {/* Active Progress Bar (Calculated) */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(steps.filter(s => s.status === 'completed').length / (steps.length - 1)) * 100}%` }}
                        className={`absolute top-5 left-8 h-3 bg-${accentColor}-500 rounded-full z-0`}
                        transition={{ duration: 1.5, ease: "circOut" }}
                    />

                    <div className="flex justify-between relative z-10">
                        {steps.map((step, i) => {
                            const isCompleted = step.status === 'completed';
                            const isCurrent = step.status === 'current';

                            return (
                                <div key={i} className="flex flex-col items-center gap-4 group/step cursor-default">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: isCurrent ? 180 : 0 }}
                                        className={`
                                            w-14 h-14 rounded-2xl flex items-center justify-center border-4 transition-all duration-300 shadow-lg
                                            ${isCompleted ? `bg-${accentColor}-500 border-${accentColor}-500 text-white` :
                                                isCurrent ? `bg-white border-${accentColor}-500 text-${accentColor}-600` :
                                                    `bg-slate-100 border-slate-200 text-slate-400`}
                                        `}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-7 h-7" />
                                        ) : (
                                            <span className="text-xl font-black">{step.step}</span>
                                        )}
                                    </motion.div>
                                    <span className={`text-xs font-bold tracking-tight text-center uppercase ${isCurrent ? `text-${accentColor}-600` : 'text-slate-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Dashboard Principal ─────────────────────────────────────

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [isCreatingSession, setIsCreatingSession] = React.useState(false);

    React.useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const token = localStorage.getItem('clinicflow_token');
                const userId = token?.replace('local-dev-token-', '').replace('fake-jwt-token-', '');

                const res = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const siteSteps = useMemo(() => data?.project?.siteSteps || [
        { step: 1, label: 'Briefing', status: 'current' },
        { step: 2, label: 'Design', status: 'pending' },
        { step: 3, label: 'Review', status: 'pending' },
        { step: 4, label: 'Lançar', status: 'pending' },
    ], [data]);

    const contentSteps = useMemo(() => data?.project?.contentSteps || [
        { step: 1, label: 'Pautas', status: 'completed' },
        { step: 2, label: 'Artes', status: 'current' },
        { step: 3, label: 'Aprovar', status: 'pending' },
        { step: 4, label: 'Postar', status: 'pending' },
    ], [data]);

    const deliveryDates = useMemo(() => {
        if (!data?.project?.createdAt) return {
            site: { day: '22', month: 'Fev', full: '22 Fev' },
            posts: '25 Fev',
            meeting: '27 Fev'
        };

        const baseDate = new Date(data.project.createdAt);

        const formatDate = (date: Date) => {
            const day = date.getDate();
            const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            const month = monthNames[date.getMonth()];
            return { day: day.toString(), month, full: `${day} ${month}` };
        };

        const siteDate = new Date(baseDate);
        siteDate.setDate(baseDate.getDate() + 3);

        const postsDate = new Date(baseDate);
        postsDate.setDate(baseDate.getDate() + 6);

        const meetingDate = new Date(baseDate);
        meetingDate.setDate(baseDate.getDate() + 8);

        return {
            site: formatDate(siteDate),
            posts: formatDate(postsDate).full,
            meeting: formatDate(meetingDate).full
        };
    }, [data?.project?.createdAt]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-8 border-indigo-100 border-t-indigo-500 rounded-full"
                    />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Carregando seu estúdio...</p>
                </div>
            </DashboardLayout>
        );
    }

    const nextSteps = [
        {
            title: 'Dominio do Site',
            desc: 'Conecte seu endereço personalizado.',
            action: 'Configurar',
            path: '/dashboard/website',
            icon: Globe,
            color: 'blue',
            status: data?.project?.status === 'pending_payment' ? 'locked' : 'available'
        },
        {
            title: 'Aprovar Artes',
            desc: 'Você tem 5 novos posts pendentes.',
            action: 'Revisar',
            path: '/dashboard/contents',
            icon: ImageIcon,
            color: 'indigo',
            status: data?.project?.status === 'pending_payment' ? 'locked' : 'available'
        },
        {
            title: 'Agendar Call',
            desc: 'Alinhe a estratégia do próximo mês.',
            action: 'WhatsApp',
            path: 'https://wa.me/5511999999999',
            icon: CalendarDays,
            color: 'emerald',
            status: 'available'
        }
    ];

    const clinicAssets = [
        { name: 'Logotipo Principal', type: 'PNG/SVG', size: '2.4 MB', icon: Target },
        { name: 'Manual da Marca', type: 'PDF', size: '15.8 MB', icon: Info },
        { name: 'Paleta de Cores', type: 'Digital', size: '--', icon: Star },
    ];

    const shortcuts = [
        {
            icon: Globe,
            label: 'Web & SEO',
            sub: 'Gestão do site',
            path: '/dashboard/website',
            color: 'text-blue-400',
            bg: 'from-blue-500/10'
        },
        {
            icon: ImageIcon,
            label: 'Conteúdos',
            sub: 'Artes semanais',
            path: '/dashboard/contents',
            color: 'text-indigo-400',
            bg: 'from-indigo-500/10'
        },
        {
            icon: CalendarDays,
            label: 'Calendário',
            sub: 'Datas e Prazos',
            path: '/dashboard/calendar',
            color: 'text-purple-400',
            bg: 'from-purple-500/10'
        },
    ];


    const upcoming = [
        { date: deliveryDates.site.full, title: 'Entrega do Site', tag: 'Web', color: 'bg-blue-500' },
        { date: deliveryDates.posts, title: '5 Posts Feed', tag: 'Arte', color: 'bg-indigo-500' },
        { date: deliveryDates.meeting, title: 'Reunião Mensal', tag: 'Call', color: 'bg-emerald-500' },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto space-y-16 pb-20">

                {/* ── Top Section ────────────────────────────────── */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full shadow-sm"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                                {data?.clinic?.name || 'Studio Profissional'}
                            </span>
                        </motion.div>
                        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-slate-900 leading-[0.9]">
                            Vamos crescer <br />
                            <span className="text-indigo-600">hoje?</span>
                        </h1>
                        <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                            Bem-vindo ao seu painel de controle. Aqui você acompanha em tempo real a evolução da sua presença digital.
                        </p>
                    </div>

                    <motion.div
                        whileHover={{ y: -10, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-slate-200/60 border-2 border-slate-900 flex items-center gap-8 cursor-pointer group relative overflow-hidden"
                        onClick={() => navigate('/dashboard/calendar')}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform duration-700" />

                        <div className="w-20 h-20 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white shadow-xl group-hover:bg-indigo-600 transition-colors relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{deliveryDates.site.month}</span>
                            <span className="text-3xl font-black">{deliveryDates.site.day}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-2">Próximo Marco</p>
                            <p className="text-slate-900 font-black leading-tight text-2xl group-hover:text-indigo-600 transition-colors">Entrega do Site <br /> Institucional</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all relative z-10">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </motion.div>
                </header>

                {/* ── Payment Warning ────────────────────────────── */}
                {data?.project?.status === 'pending_payment' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border-2 border-slate-900 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl shadow-indigo-200/50"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />

                        <div className="flex items-center gap-10 relative z-10">
                            <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/40 shrink-0 md:-rotate-6">
                                <Lock className="w-10 h-10" />
                            </div>
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Acesso Limitado
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase italic">Ative sua Licença Pro.</h2>
                                <p className="text-slate-400 font-medium max-w-xl text-lg leading-relaxed">
                                    Libere seu domínio personalizado, download de artes em 4K e SEO avançado agora mesmo.
                                </p>
                            </div>
                        </div>

                        <button
                            disabled={isCreatingSession}
                            onClick={async () => {
                                setIsCreatingSession(true);

                                try {
                                    const res = await fetch('/api/payments/create-session', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                            email: data?.clinic?.email,
                                            name: data?.clinic?.name,
                                            projectId: data?.project?.id
                                        })
                                    });
                                    const result = await res.json();
                                    if (result.url) {
                                        window.location.href = result.url;
                                    } else {
                                        alert('Erro ao redirecionar para o pagamento.');
                                    }
                                } catch (e) {
                                    console.error(e);
                                    alert('Erro ao processar pedido.');
                                } finally {
                                    setIsCreatingSession(false);
                                }
                            }}
                            id="pay-btn"
                            className="relative z-10 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3 shrink-0 disabled:opacity-50"
                        >
                            {isCreatingSession ? 'Processando...' : 'Liberar Agora'} <Zap className="w-4 h-4 fill-slate-950" />
                        </button>
                    </motion.div>
                )}

                {/* ── Project Preview ────────────────────────────── */}
                {(data?.project?.status === 'finished' || data?.project?.status === 'published') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border-2 border-slate-100 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 group"
                    >
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 relative aspect-video lg:aspect-auto overflow-hidden bg-slate-50">
                                <img
                                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-90"
                                    alt="Preview"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        className="w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-2xl"
                                    >
                                        <Play className="w-8 h-8 fill-white ml-1" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="lg:w-1/2 p-14 md:p-20 flex flex-col justify-center space-y-8">
                                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full w-fit">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Site Finalizado</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-display font-black text-slate-900 tracking-tighter leading-[0.9]">
                                    Presença <br /> <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Digital de Elite.</span>
                                </h2>
                                <p className="text-slate-500 text-xl font-medium leading-relaxed">
                                    Sua clínica agora possui um site otimizado para conversão. Assista ao tour e veja como impactar seus pacientes.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                                    <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:scale-105 transition-all flex items-center gap-3 justify-center shadow-xl">
                                        Visualizar Site
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => navigate('/dashboard/settings')} className="bg-white text-slate-500 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] border-2 border-slate-100 hover:border-slate-300 hover:text-slate-900 transition-all flex items-center gap-3 justify-center">
                                        Configurações
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── Status Pipelines ────────────────────────────── */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <StatusPipeline
                        title="Status do Site"
                        steps={siteSteps}
                        accentColor="indigo"
                        icon={Globe}
                        iconColor="text-indigo-600"
                    />
                    <StatusPipeline
                        title="Produção de Conteúdo"
                        steps={contentSteps}
                        accentColor="indigo"
                        icon={ImageIcon}
                        iconColor="text-indigo-600"
                    />
                </section>

                {/* ── Main Grid ──────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left: Next Steps (7 cols) */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="flex items-center gap-5">
                            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Próximas Missões</h4>
                            <div className="h-[2px] flex-1 bg-slate-50 rounded-full" />
                        </div>

                        <div className="grid gap-6">
                            {nextSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                                        bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-xl shadow-slate-200/40 flex items-center justify-between gap-8 cursor-pointer group transition-all
                                        ${step.status === 'locked' ? 'opacity-60 grayscale' : 'hover:border-slate-900'}
                                    `}
                                    onClick={() => step.status !== 'locked' && (step.path.startsWith('http') ? window.open(step.path) : navigate(step.path))}
                                >
                                    <div className="flex items-center gap-8">
                                        <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center bg-slate-50 text-slate-400 border-2 border-slate-100 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300`}>
                                            {step.status === 'locked' ? <Lock className="w-8 h-8" /> : <step.icon className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h5 className="text-2xl font-black text-slate-900 mb-2">{step.title}</h5>
                                            <p className="text-slate-500 font-medium leading-tight max-w-[200px] md:max-w-xs">{step.desc}</p>
                                        </div>
                                    </div>

                                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                        <ChevronRight className="w-7 h-7" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Assets & Agenda (5 cols) */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-12">
                        {/* Agenda Card */}
                        <div className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 shadow-2xl shadow-slate-200/40">
                            <h4 className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                                <CalendarDays className="w-4 h-4" />
                                Agenda Semanal
                            </h4>

                            <div className="space-y-8">
                                {upcoming.map((ev, i) => (
                                    <div key={i} className="flex items-center gap-6 group cursor-pointer p-2 -mx-2 rounded-3xl transition-all hover:bg-slate-50">
                                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] font-black leading-none group-hover:bg-indigo-600 transition-colors shadow-lg">
                                            <span className="text-[10px] uppercase opacity-60 mb-1">{ev.date.split(' ')[1]}</span>
                                            <span className="text-2xl">{ev.date.split(' ')[0]}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{ev.title}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${ev.color} shadow-sm`} />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ev.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => navigate('/dashboard/calendar')} className="w-full mt-10 py-5 rounded-2xl bg-slate-50 text-slate-900 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                Calendário Completo
                            </button>
                        </div>

                        {/* Support Banner */}
                        <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-300/50">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />

                            <div className="relative z-10 space-y-6">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                    <MessageCircle className="w-8 h-8 text-white fill-white/20" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black tracking-tight mb-2">Precisa de suporte?</h3>
                                    <p className="text-slate-400 font-medium text-lg leading-relaxed">
                                        Nossa equipe está online agora para te ajudar com qualquer dúvida.
                                    </p>
                                </div>
                                <a
                                    href={`https://wa.me/5512996170618?text=${encodeURIComponent(`Olá! Sou da clínica ${data?.clinic?.name} e preciso de ajuda com meu dashboard.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl"
                                >
                                    Chamar no WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
};
