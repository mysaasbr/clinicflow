import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Globe,
    ImageIcon,
    CalendarDays,
    Settings,
    LogOut,
    Menu,
    X,
    Sparkles,
    HelpCircle,
} from 'lucide-react';
import { HelpModal } from '../../../components/HelpModal';
import { onboardingData } from '../../../data/onboardingData';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

// Flag persistente por sessão de navegação para evitar re-trigger
let hasShownWelcomeInSession = false;

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [clinicData, setClinicData] = useState<any>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Mapping current path to guide ID
    const currentGuideId = React.useMemo(() => {
        const path = location.pathname;
        if (path === '/dashboard') return 'dashboard';
        if (path.includes('website')) return 'website';
        if (path.includes('leads')) return 'leads';
        if (path.includes('contents')) return 'contents';
        if (path.includes('calendar')) return 'calendar';
        if (path.includes('settings')) return 'settings';
        return 'dashboard';
    }, [location.pathname]);

    React.useEffect(() => {
        const fetchStatus = async () => {
            try {
                const token = localStorage.getItem('clinicflow_token');
                const userId = token?.replace('local-dev-token-', '').replace('fake-jwt-token-', '');
                const res = await fetch(`/api/dashboard/overview?userId=${userId}`);
                const data = await res.json();
                setClinicData(data.clinic);

                // Se nunca foi mostrado nesta sessão E não está onboarded no banco
                if (data.clinic && !data.clinic.onboarded && !hasShownWelcomeInSession) {
                    setIsWelcomeOpen(true);
                    hasShownWelcomeInSession = true; // Marca como mostrado imediatamente
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchStatus();
    }, []);

    const completeOnboarding = async () => {
        try {
            const token = localStorage.getItem('clinicflow_token');
            const userId = token?.replace('local-dev-token-', '').replace('fake-jwt-token-', '');

            // Mark locally first
            setClinicData((prev: any) => prev ? { ...prev, onboarded: true } : prev);

            await fetch('/api/onboarding/complete-onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleCloseWelcome = () => {
        setIsWelcomeOpen(false);
        // Mesmo fechando no 'X', marcamos como concluído para não ser intrusivo
        completeOnboarding();
    };

    const handleLogout = () => {
        localStorage.removeItem('clinicflow_token');
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
        { icon: Globe, label: 'Meu Site', path: '/dashboard/website' },
        { icon: Sparkles, label: 'Pacientes (CRM)', path: '/dashboard/leads' },
        { icon: ImageIcon, label: 'Meus Posts', path: '/dashboard/contents' },
        { icon: CalendarDays, label: 'Meu Calendário', path: '/dashboard/calendar' },
        { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 text-slate-900 flex font-sans selection:bg-indigo-600 selection:text-white">
            {/* Ambient Background - Ultra Clean */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-slate-100 blur-[100px] rounded-full opacity-60" />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed top-0 left-0 bottom-0 z-50 w-80 bg-white border-r border-slate-100 p-10 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="flex items-center gap-5 mb-16 group cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <div className="relative">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-2xl relative z-10 overflow-hidden group-hover:bg-indigo-600 transition-colors duration-500"
                        >
                            <Sparkles className="w-7 h-7 text-white fill-white/20" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent" />
                        </motion.div>
                        <div className="absolute -inset-1 bg-indigo-100 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                        <span className="font-display font-black text-2xl block leading-none tracking-tighter text-slate-900">ClinicFlow</span>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[10px] text-indigo-600 font-black tracking-[0.2em] uppercase">Studio Alpha</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-3">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-4 px-5 py-4.5 rounded-2xl transition-all duration-300 relative group
                                    ${isActive
                                        ? 'text-indigo-600'
                                        : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}
                                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-indigo-50 border-r-4 border-indigo-600 rounded-2xl -z-10"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}
                                <item.icon className={`w-5.5 h-5.5 transition-all duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:scale-110'}`} />
                                <span className={`text-sm font-black uppercase tracking-[0.1em]`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Logout */}
                <div className="pt-10 border-t border-slate-100 space-y-6">
                    <button
                        onClick={() => setIsHelpOpen(true)}
                        className="w-full flex items-center gap-4 px-5 py-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all font-black uppercase text-[10px] tracking-[0.2em] border-2 border-indigo-100/50"
                    >
                        <HelpCircle className="w-5 h-5" />
                        O que tem aqui?
                    </button>

                    <div className="bg-slate-50 border-2 border-slate-50 rounded-[2rem] p-5 group hover:border-slate-900 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center font-black text-xs text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {clinicData?.name?.charAt(0) || 'D'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full border-4 border-white" />
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-sm font-black truncate text-slate-900">{clinicData?.name || 'Dr. Usuário'}</p>
                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-0.5">Plano Vitalício</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4.5 rounded-2xl bg-white border-2 border-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all font-black uppercase text-[10px] tracking-[0.2em]"
                    >
                        <LogOut className="w-4 h-4" />
                        Encerrar Sessão
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-80 relative min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-display font-black text-2xl tracking-tighter text-slate-900">ClinicFlow</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsHelpOpen(true)}
                            className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:scale-110 active:scale-95 transition-all"
                        >
                            <HelpCircle className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-3 bg-slate-900 rounded-2xl hover:scale-110 active:scale-95 transition-all text-white"
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 md:p-14 lg:p-20 max-w-[1600px] mx-auto relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Modais de Guia / Onboarding */}
            <HelpModal
                isOpen={isWelcomeOpen}
                onClose={handleCloseWelcome}
                guide={onboardingData.welcome}
                isFirstTime={true}
                onComplete={completeOnboarding}
            />

            <HelpModal
                isOpen={isHelpOpen}
                onClose={() => setIsHelpOpen(false)}
                guide={onboardingData[currentGuideId]}
            />
        </div>
    );
};

