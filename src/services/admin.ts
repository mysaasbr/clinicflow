
export interface AdminProject {
    id: string | null;
    clinicId: string;
    clinicName: string;
    domainUrl: string | null;
    status: string | null;
    monthlyFee: string;
}

export interface Post {
    id: number;
    projectId: string;
    month: string;
    imageUrl: string;
    caption: string;
}

export interface AdminClient {
    id: string; // Clinic ID
    userId: string;
    name: string;
    email: string;
    role: string;
    clinicName: string | null;
    createdAt: string;
    projectId?: string;
    projectStatus?: string;
    domainUrl?: string | null;
    monthlyFee?: string;
    requiredPosts?: number;
    currentPosts?: number;
    // Onboarding Data
    phone?: string;
    instagram?: string;
    colors?: { primary: string; secondary: string };
    fonts?: { primary: string; secondary: string };
    toneTags?: string[];
    differentials?: string;
    city?: string;
    address?: string;
}

export const AdminService = {
    async getProjects(): Promise<AdminProject[]> {
        try {
            const res = await fetch('/api/projects/list');
            if (!res.ok) throw new Error('Falha ao buscar projetos');
            return await res.json();
        } catch (error) {
            console.error('AdminService getProjects error:', error);
            return [];
        }
    },

    async getClients(): Promise<AdminClient[]> {
        try {
            const res = await fetch('/api/admin/clients');
            if (!res.ok) throw new Error('Falha ao buscar clientes');
            return await res.json();
        } catch (error) {
            console.error('AdminService getClients error:', error);
            return [];
        }
    },

    async createPost(data: Omit<Post, 'id' | 'projectId'> & { projectId?: string; clinicId?: string }): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/posts/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao criar post' };
            }

            return { success: true };
        } catch (error) {
            console.error('AdminService createPost error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async getPostsByProject(projectId: string, month?: string): Promise<any[]> {
        try {
            const url = `/api/posts/list?projectId=${projectId}${month ? `&month=${month}` : ''}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Falha ao buscar posts');
            return await res.json();
        } catch (error) {
            console.error('AdminService getPostsByProject error:', error);
            return [];
        }
    },

    async deletePost(postId: number): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/posts/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId })
            });
            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao excluir post' };
            }
            return { success: true };
        } catch (error) {
            console.error('AdminService deletePost error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async updatePost(data: Post): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/posts/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao atualizar post' };
            }
            return { success: true };
        } catch (error) {
            console.error('AdminService updatePost error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async updateProjectStatus(projectId: string, status: string): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/projects/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, status })
            });

            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao atualizar status' };
            }

            return { success: true };
        } catch (error) {
            console.error('AdminService updateStatus error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async createProject(data: { clinicId: string; status?: string; domainUrl?: string }): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/projects/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao criar projeto' };
            }
            return { success: true };
        } catch (error) {
            console.error('AdminService createProject error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async updateProject(data: { id: string; status?: string; domainUrl?: string; paymentStatus?: string }): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/projects/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao atualizar projeto' };
            }
            return { success: true };
        } catch (error) {
            console.error('AdminService updateProject error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/projects/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao excluir projeto' };
            }
            return { success: true };
        } catch (error) {
            console.error('AdminService deleteProject error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async getStats(): Promise<{ clients: number; revenue: number; projects: number }> {
        try {
            const res = await fetch('/api/admin/stats');
            if (!res.ok) throw new Error('Falha ao buscar estatísticas');
            return await res.json();
        } catch (error) {
            console.error('AdminService getStats error:', error);
            return { clients: 0, revenue: 0, projects: 0 };
        }
    },

    async getSubscriptions(): Promise<any[]> {
        try {
            const res = await fetch('/api/admin/subscriptions');
            if (!res.ok) throw new Error('Falha ao buscar assinaturas');
            return await res.json();
        } catch (error) {
            console.error('AdminService getSubscriptions error:', error);
            return [];
        }
    },

    async liberateAccess(projectId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/admin/liberate-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId })
            });
            const data = await res.json();
            if (data.success) return { success: true };
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Erro ao conectar ao servidor' };
        }
    },

    async createManualClient(data: { name: string; email: string; password: string }): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/admin/create-manual-client', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            if (!res.ok) {
                return { success: false, error: result.error || 'Erro ao criar cliente' };
            }

            return { success: true };
        } catch (error) {
            console.error('AdminService createManualClient error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async getClientDetails(clinicId: string): Promise<any> {
        try {
            const res = await fetch(`/api/admin/client-details?clinicId=${clinicId}`);
            if (!res.ok) throw new Error('Falha ao buscar detalhes do cliente');
            return await res.json();
        } catch (error) {
            console.error('AdminService getClientDetails error:', error);
            return null;
        }
    },

    async addPayment(projectId: string, amount: string, monthYear?: string): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/admin/add-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, amount, monthYear })
            });

            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao adicionar pagamento' };
            }

            return { success: true };
        } catch (error) {
            console.error('AdminService addPayment error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async updateClientFee(projectId: string, monthlyFee: string): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/admin/update-client-fee', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId, monthlyFee })
            });
            if (!res.ok) {
                const data = await res.json();
                return { success: false, error: data.error || 'Erro ao atualizar valor' };
            }
            return { success: true };
        } catch (error) {
            console.error('AdminService updateClientFee error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }
};
