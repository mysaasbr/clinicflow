import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    KanbanSquare,
    Settings,
    CreditCard,
    LogOut,
    Menu,
    ShieldAlert,
    Upload,
    PenTool
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('clinicflow_token');
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin' },
        { icon: Users, label: 'Clientes', path: '/admin/clients' },
        { icon: CreditCard, label: 'Assinaturas', path: '/admin/subscriptions' },
        { icon: KanbanSquare, label: 'Projetos', path: '/admin/projects' },
        { icon: PenTool, label: 'Alterações', path: '/admin/changes' },
        { icon: Upload, label: 'Upload Conteúdo', path: '/admin/upload' },
        { icon: Settings, label: 'Configurações', path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex">

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation - Indigo Accent for Admin */}
            <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                {/* Logo */}
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <ShieldAlert className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="font-display font-bold text-xl block leading-none text-white">ClinicFlow</span>
                        <span className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Studio</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                            ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}
                        `}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="pt-6 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 relative">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-lg text-white">Admin</span>
                    </div>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-800 rounded-lg text-slate-200">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Page Content */}
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
