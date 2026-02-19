
export interface Lead {
    id: string;
    projectId: string;
    name: string;
    email: string | null;
    phone: string | null;
    source: string | null;
    status: 'new' | 'contacted' | 'scheduled' | 'won' | 'lost';
    value: string | null;
    createdAt: string;
    updatedAt: string;
}

export const CRMService = {
    async getLeads(projectId: string): Promise<Lead[]> {
        try {
            const res = await fetch(`/api/crm/leads?projectId=${projectId}`);
            if (!res.ok) throw new Error('Falha ao buscar leads');
            return await res.json();
        } catch (error) {
            console.error('CRMService getLeads error:', error);
            return [];
        }
    },

    async updateLeadStatus(id: string, status: Lead['status']): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/crm/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            if (!res.ok) {
                const data = await res.json();
                return { success: false, error: data.error || 'Erro ao atualizar lead' };
            }
            return { success: true };
        } catch (error) {
            console.error('CRMService updateLeadStatus error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    },

    async collectLead(data: { projectId: string; name: string; email?: string; phone?: string; source?: string }): Promise<{ success: boolean; error?: string }> {
        try {
            const res = await fetch('/api/crm/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const errData = await res.json();
                return { success: false, error: errData.error || 'Erro ao enviar contato' };
            }
            return { success: true };
        } catch (error) {
            console.error('CRMService collectLead error:', error);
            return { success: false, error: 'Erro de conexão' };
        }
    }
};
