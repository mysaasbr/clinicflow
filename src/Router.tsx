import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

// Placeholders for future pages
import { Quiz } from './pages/Quiz';
import { Dashboard } from './pages/Dashboard';
import { DomainSelection } from './pages/Dashboard/DomainSelection';
import { ContentGrid } from './pages/Dashboard/ContentGrid';
import { Calendar } from './pages/Dashboard/Calendar';
import { LeadsCRM } from './pages/Dashboard/LeadsCRM';
import { SettingsPage } from './pages/Dashboard/Settings';
import { AdminDashboard } from './pages/Admin';
import { AdminClients } from './pages/Admin/Clients';
import { AdminProjects } from './pages/Admin/Projects';
import { ContentUpload } from './pages/Admin/ContentUpload';
import { AdminSubscriptions } from './pages/Admin/Subscriptions';
import { AdminChanges } from './pages/Admin/Changes';
import { AdminSettings } from './pages/Admin/Settings';

// Placeholders for future pages

export const Router: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/website" element={<DomainSelection />} />
            <Route path="/dashboard/contents" element={<ContentGrid />} />
            <Route path="/dashboard/calendar" element={<Calendar />} />
            <Route path="/dashboard/leads" element={<LeadsCRM />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/upload" element={<ContentUpload />} />
            <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
            <Route path="/admin/changes" element={<AdminChanges />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Onboarding */}
            <Route path="/quiz" element={<Quiz />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
