import React, { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateISO } from '../../lib/dateUtils';
import { AdminService } from '../../services/admin';
import {
    CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin,
    Image as ImageIcon, Truck, Users, Video, FileText,
    Plus, Filter, X, Circle, CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────
type EventType = 'post' | 'delivery' | 'meeting' | 'deadline' | 'content';

interface CalendarEvent {
    id: number;
    title: string;
    description: string;
    date: string;          // YYYY-MM-DD
    time?: string;         // HH:mm
    type: EventType;
    status: 'pending' | 'done' | 'in-progress';
}

// ─── Event Type Config ───────────────────────────────────────
const EVENT_TYPES: Record<EventType, { label: string; color: string; bg: string; border: string; dot: string; icon: React.FC<any> }> = {
    post: { label: 'Publicação', color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100', dot: 'bg-pink-500', icon: ImageIcon },
    delivery: { label: 'Entrega', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', dot: 'bg-emerald-500', icon: Truck },
    meeting: { label: 'Reunião', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', dot: 'bg-blue-500', icon: Video },
    deadline: { label: 'Prazo', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', dot: 'bg-rose-500', icon: AlertCircle },
    content: { label: 'Conteúdo', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', dot: 'bg-indigo-500', icon: FileText },
};

// ─── Event Generation Logic ─────────────────────────────────
const generateMockEvents = (baseDateStr?: string): CalendarEvent[] => {
    const baseDate = baseDateStr ? new Date(baseDateStr) : new Date();

    const offsetDate = (days: number) => {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + days);
        return d.toISOString().split('T')[0];
    };

    return [
        { id: 1, title: 'Briefing Inicial', description: 'Coleta de referências e definição do escopo do projeto.', date: offsetDate(-1), type: 'content', status: 'done' },
        { id: 2, title: 'Configuração do Domínio', description: 'Registro e apontamento do DNS para o novo site.', date: offsetDate(0), type: 'delivery', status: 'done' },
        { id: 3, title: 'Pesquisa de Referências', description: 'Análise de concorrentes e moodboard visual.', date: offsetDate(1), type: 'content', status: 'done' },
        { id: 4, title: 'Estruturação do Layout', description: 'Criação do wireframe e arquitetura de informação.', date: offsetDate(2), type: 'deadline', status: 'in-progress' },
        { id: 5, title: 'Entrega do Site Institucional', description: 'Apresentação do design completo e funcionalidade inicial.', date: offsetDate(3), type: 'delivery', status: 'pending' },
        { id: 6, title: 'Post: Inauguração Digital', description: 'Anúncio oficial do novo site nas redes sociais.', date: offsetDate(5), type: 'post', status: 'pending' },
        { id: 7, title: 'Reunião de Feedback', description: 'Ajustes finos baseados na primeira revisão do cliente.', date: offsetDate(6), type: 'meeting', status: 'pending' },
        { id: 8, title: 'Primeiro Lote de Conteúdo', description: 'Entrega das 5 primeiras artes para o feed do Instagram.', date: offsetDate(7), type: 'content', status: 'pending' },
        { id: 9, title: 'Post: Especialidade da Clínica', description: 'Conteúdo educativo focado no diferencial do Dr.', date: offsetDate(10), type: 'post', status: 'pending' },
        { id: 10, title: 'Reunião Mensal de Resultados', description: 'Análise de métricas e planejamento do próximo ciclo.', date: offsetDate(15), type: 'meeting', status: 'pending' },
    ];
};

// ─── Helpers ─────────────────────────────────────────────────
const MONTHS_PT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const WEEKDAYS_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

function formatDateKey(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isToday(year: number, month: number, day: number) {
    const now = new Date();
    return now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;
}

// ─── Calendar Component ──────────────────────────────────────
export const Calendar: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<EventType | 'all'>('all');
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState<any>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('clinicflow_token');
                const userId = token?.replace('local-dev-token-', '').replace('fake-jwt-token-', '');

                if (!userId) return;

                // 1. Get project info (including launch date)
                const overviewRes = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const overview = await overviewRes.json();
                setProjectData(overview.project);

                if (overview.project?.id) {
                    // 2. Fetch posts for selected month
                    const monthYear = `${String(currentMonth + 1).padStart(2, '0')}-${currentYear}`;
                    const postsData = await AdminService.getPostsByProject(overview.project.id, monthYear);

                    const mappedEvents: CalendarEvent[] = postsData
                        .filter(p => p.fullDate)
                        .map(p => ({
                            id: p.id,
                            title: p.title,
                            description: p.caption || '',
                            date: p.fullDate,
                            type: 'post',
                            status: p.status === 'ready' ? 'done' : 'pending'
                        }));

                    const dynamicEvents = generateMockEvents(overview.project?.createdAt);

                    const combinedEvents: CalendarEvent[] = [
                        ...dynamicEvents,
                        ...mappedEvents
                    ];

                    setEvents(combinedEvents);
                }
            } catch (err) {
                console.error('Error loading calendar data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [currentMonth, currentYear]);

    // Navigate months
    const goToPrev = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };
    const goToNext = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };
    const goToToday = () => {
        const now = new Date();
        setCurrentMonth(now.getMonth());
        setCurrentYear(now.getFullYear());
        setSelectedDate(formatDateKey(now.getFullYear(), now.getMonth(), now.getDate()));
    };

    // Build calendar grid
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth === 0 ? 11 : currentMonth - 1);

    // Events indexed by date
    const eventsByDate = useMemo(() => {
        const map: Record<string, CalendarEvent[]> = {};
        const filtered = activeFilter === 'all' ? events : events.filter(e => e.type === activeFilter);
        filtered.forEach(e => {
            if (!map[e.date]) map[e.date] = [];
            map[e.date].push(e);
        });
        return map;
    }, [activeFilter, events]);

    // Selected day events
    const selectedDayEvents = selectedDate ? (eventsByDate[selectedDate] || []) : [];

    // Upcoming events (from today)
    const upcomingEvents = useMemo(() => {
        const today = formatDateISO(new Date());
        const filtered = activeFilter === 'all' ? events : events.filter(e => e.type === activeFilter);
        return filtered.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
    }, [activeFilter, events]);

    // Stats
    const stats = useMemo(() => ({
        total: events.length,
        done: events.filter(e => e.status === 'done').length,
        pending: events.filter(e => e.status === 'pending').length,
        thisMonth: events.filter(e => e.date.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`)).length,
    }), [currentYear, currentMonth, events]);

    const stagger = {
        container: { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } },
        item: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
    };

    return (
        <DashboardLayout>
            <motion.div
                className="space-y-10"
                variants={stagger.container}
                initial="hidden"
                animate="visible"
            >
                {/* ── Header ────────────────────────────────────── */}
                <motion.div variants={stagger.item} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-3">
                            <CalendarDays className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Cronograma Premium</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-slate-900 leading-tight">
                            Meu Calendário.
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed mt-2">
                            Acompanhe cada etapa do seu crescimento digital em tempo real.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        {loading && <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />}
                        <button
                            onClick={goToToday}
                            className="group flex items-center gap-2.5 px-6 py-3.5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border-2 border-slate-100 shadow-[0_6px_0_rgb(226,232,240)] hover:shadow-[0_3px_0_rgb(226,232,240)] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] transition-all"
                        >
                            <Circle className="w-3 h-3 fill-indigo-500" />
                            Hoje
                        </button>
                    </div>
                </motion.div>

                {/* ── Stats Row ──────────────────────────────────── */}
                <motion.div variants={stagger.item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'No Mês', value: stats.thisMonth, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: CalendarDays },
                        { label: 'Concluídos', value: stats.done, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: CheckCircle2 },
                        { label: 'Pendentes', value: stats.pending, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: Clock },
                        { label: 'Total Geral', value: stats.total, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100', icon: FileText },
                    ].map((s, i) => (
                        <div key={i} className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 flex flex-col justify-between hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] transition-all group">
                            <div className={`w-12 h-12 rounded-2xl ${s.bg} border ${s.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <s.icon className={`w-6 h-6 ${s.color}`} />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">{s.value}</p>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* ── Filter Tags ────────────────────────────────── */}
                <motion.div variants={stagger.item} className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${activeFilter === 'all'
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xl'
                            : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200 hover:text-slate-600'
                            }`}
                    >
                        Todos os Eventos
                    </button>
                    {(Object.entries(EVENT_TYPES) as [EventType, typeof EVENT_TYPES[EventType]][]).map(([key, cfg]) => (
                        <button
                            key={key}
                            onClick={() => setActiveFilter(key)}
                            className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 whitespace-nowrap border-2 ${activeFilter === key
                                ? `${cfg.bg} ${cfg.color} ${cfg.border} shadow-lg shadow-indigo-500/5`
                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} shadow-sm`} />
                            {cfg.label}
                        </button>
                    ))}
                </motion.div>

                {/* ── Main Grid: Calendar + Sidebar ──────────────── */}
                <motion.div variants={stagger.item} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Calendar Grid */}
                    <div className="lg:col-span-2 bg-white border-2 border-slate-100 rounded-[3.5rem] p-8 md:p-10 shadow-sm">
                        {/* Month Nav */}
                        <div className="flex items-center justify-between mb-10">
                            <button onClick={goToPrev} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:bg-white hover:border-indigo-100 text-slate-400 hover:text-indigo-600 transition-all active:scale-90 shadow-sm">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1">{currentYear}</p>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter capitalize">
                                    {MONTHS_PT[currentMonth]}
                                </h2>
                            </div>
                            <button onClick={goToNext} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:bg-white hover:border-indigo-100 text-slate-400 hover:text-indigo-600 transition-all active:scale-90 shadow-sm">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-4">
                            {WEEKDAYS_PT.map(d => (
                                <div key={d} className="text-center text-[11px] font-black text-slate-300 uppercase tracking-widest py-4">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Day Cells */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Previous month trailing days */}
                            {Array.from({ length: firstDay }).map((_, i) => {
                                const day = prevMonthDays - firstDay + i + 1;
                                return (
                                    <div key={`prev-${i}`} className="aspect-square p-2 opacity-20 flex items-center justify-center">
                                        <span className="text-sm font-bold text-slate-400">{day}</span>
                                    </div>
                                );
                            })}

                            {/* Current month days */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dateKey = formatDateKey(currentYear, currentMonth, day);
                                const dayEvents = eventsByDate[dateKey] || [];
                                const today = isToday(currentYear, currentMonth, day);
                                const isSelected = selectedDate === dateKey;
                                const hasEvents = dayEvents.length > 0;

                                return (
                                    <motion.button
                                        key={day}
                                        onClick={() => {
                                            setSelectedDate(dateKey);
                                            setSelectedEvent(null);
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`
                                            aspect-square p-2 rounded-2xl flex flex-col items-center justify-center relative transition-all cursor-pointer border-2
                                            ${isSelected
                                                ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/20'
                                                : today
                                                    ? 'bg-indigo-50 border-indigo-100'
                                                    : hasEvents
                                                        ? 'bg-white border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30'
                                                        : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'
                                            }
                                        `}
                                    >
                                        <span className={`
                                            text-sm font-black transition-colors
                                            ${isSelected ? 'text-white' : today ? 'text-indigo-600' : hasEvents ? 'text-slate-900' : 'text-slate-400'}
                                        `}>
                                            {day}
                                        </span>

                                        {/* Today indicator label if selected */}
                                        {today && isSelected && (
                                            <span className="absolute -top-1 px-1.5 py-0.5 bg-indigo-500 text-[8px] font-black text-white rounded-full uppercase tracking-tighter shadow-sm">Hoje</span>
                                        )}

                                        {/* Event dots */}
                                        {dayEvents.length > 0 && (
                                            <div className="flex gap-1 mt-1.5 flex-wrap justify-center max-w-full">
                                                {dayEvents.slice(0, 3).map((ev, j) => (
                                                    <span
                                                        key={j}
                                                        className={`w-1.5 h-1.5 rounded-full ${EVENT_TYPES[ev.type].dot} ${isSelected ? 'ring-1 ring-white/50' : ''}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </motion.button>
                                );
                            })}

                            {/* Next month leading days */}
                            {Array.from({ length: (7 - ((firstDay + daysInMonth) % 7)) % 7 }).map((_, i) => (
                                <div key={`next-${i}`} className="aspect-square p-2 opacity-20 flex items-center justify-center">
                                    <span className="text-sm font-bold text-slate-400">{i + 1}</span>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-x-6 gap-y-3">
                            {(Object.entries(EVENT_TYPES) as [EventType, typeof EVENT_TYPES[EventType]][]).map(([key, cfg]) => (
                                <div key={key} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} shadow-sm`} />
                                    {cfg.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar: Selected Day / Upcoming */}
                    <div className="space-y-6">
                        {/* Selected Day Panel */}
                        <AnimatePresence mode="wait">
                            {selectedDate && (
                                <motion.div
                                    key={selectedDate}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white border-2 border-slate-100 rounded-[3rem] p-8 shadow-sm"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                                                <CalendarDays className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 tracking-tighter">
                                                {(() => {
                                                    const [y, m, d] = selectedDate.split('-').map(Number);
                                                    return `${d} de ${MONTHS_PT[m - 1]}`;
                                                })()}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedDate(null); setSelectedEvent(null); }}
                                            className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {selectedDayEvents.length === 0 ? (
                                        <div className="text-center py-10 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100">
                                            <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-200 mx-auto mb-4">
                                                <CalendarDays className="w-6 h-6" />
                                            </div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Nenhum evento</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedDayEvents.map(ev => {
                                                const cfg = EVENT_TYPES[ev.type];
                                                const isActive = selectedEvent?.id === ev.id;
                                                return (
                                                    <motion.button
                                                        key={ev.id}
                                                        onClick={() => setSelectedEvent(isActive ? null : ev)}
                                                        className={`w-full text-left p-4 rounded-2xl transition-all border-2 ${isActive
                                                            ? `${cfg.bg} ${cfg.border} shadow-sm`
                                                            : 'bg-white border-slate-50 hover:border-slate-100 hover:shadow-md'
                                                            }`}
                                                        layout
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-xl ${cfg.bg} border-2 ${cfg.border} flex items-center justify-center shrink-0`}>
                                                                <cfg.icon className={`w-5 h-5 ${cfg.color}`} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-black text-slate-900 truncate">{ev.title}</p>
                                                                <div className="flex items-center gap-2 mt-0.5">
                                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
                                                                    {ev.time && (
                                                                        <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-widest">
                                                                            <Clock className="w-3 h-3" /> {ev.time}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <StatusBadge status={ev.status} />
                                                        </div>

                                                        {/* Expanded details */}
                                                        <AnimatePresence>
                                                            {isActive && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.25 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                                                        <p className="text-xs text-slate-500 leading-relaxed font-semibold italic">
                                                                            "{ev.description}"
                                                                        </p>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Upcoming Events */}
                        <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-8 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3 tracking-tighter">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                                    <Clock className="w-4 h-4" />
                                </div>
                                Próximos Eventos
                            </h3>
                            <div className="space-y-4">
                                {upcomingEvents.map((ev, i) => {
                                    const cfg = EVENT_TYPES[ev.type];
                                    const [, m, d] = ev.date.split('-').map(Number);
                                    return (
                                        <motion.div
                                            key={ev.id}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * i }}
                                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group"
                                            onClick={() => {
                                                setSelectedDate(ev.date);
                                                setSelectedEvent(ev);
                                            }}
                                        >
                                            {/* Date block */}
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 border-2 border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                                                <span className="text-[8px] uppercase text-slate-400 font-black leading-none mb-0.5">
                                                    {MONTHS_PT[m - 1].slice(0, 3)}
                                                </span>
                                                <span className="text-lg font-black text-slate-900 leading-tight tracking-tighter">{d}</span>
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-slate-700 truncate group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{ev.title}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>{cfg.label}</span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{ev.time || 'Dia Todo'}</span>
                                                </div>
                                            </div>

                                            <StatusBadge status={ev.status} />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </DashboardLayout>
    );
};

// ─── Status Badge Sub-component ──────────────────────────────
const StatusBadge: React.FC<{ status: CalendarEvent['status'] }> = ({ status }) => {
    const config = {
        'done': { label: '✓', classes: 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm shadow-emerald-500/10' },
        'in-progress': { label: '◉', classes: 'bg-indigo-50 text-indigo-600 border-indigo-200 animate-pulse shadow-sm shadow-indigo-500/10' },
        'pending': { label: '○', classes: 'bg-slate-50 text-slate-400 border-slate-200 shadow-inner' },
    };
    const c = config[status];
    return (
        <span className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-xs font-black shrink-0 ${c.classes}`}>
            {c.label}
        </span>
    );
};
