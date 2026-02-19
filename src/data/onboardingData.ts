
import {
    LayoutDashboard, Globe, Sparkles, Image as ImageIcon,
    CalendarDays, Settings, Zap, Target, Rocket, Heart
} from 'lucide-react';

export interface GuideStep {
    title: string;
    description: string;
    icon: any;
    color: string;
}

export interface SectionGuide {
    id: string;
    title: string;
    description: string;
    steps: GuideStep[];
}

export const onboardingData: Record<string, SectionGuide> = {
    welcome: {
        id: 'welcome',
        title: 'Bem-vindo ao ClinicFlow! 🚀',
        description: 'Estamos muito felizes em ter você aqui. Vamos transformar sua clínica em uma referência digital.',
        steps: [
            {
                title: 'Seu Estúdio Completo',
                description: 'Gerencie site, conteúdos e pacientes em um só lugar com tecnologia de ponta.',
                icon: Rocket,
                color: 'indigo'
            },
            {
                title: 'Matemática da Autoridade',
                description: 'Nossa IA trabalha para transformar acessos em pacientes reais e fiéis.',
                icon: Target,
                color: 'emerald'
            },
            {
                title: 'Suporte VIP',
                description: 'Precisa de algo? Nossa equipe está a um clique de distância no WhatsApp.',
                icon: Heart,
                color: 'pink'
            }
        ]
    },
    dashboard: {
        id: 'dashboard',
        title: 'Visão Geral do seu Studio',
        description: 'Aqui você acompanha o "batimento cardíaco" do seu projeto.',
        steps: [
            {
                title: 'Status do Projeto',
                description: 'Acompanhe em tempo real em que etapa está a produção do seu site e das suas artes.',
                icon: Zap,
                color: 'amber'
            },
            {
                title: 'Próximas Missões',
                description: 'Veja as tarefas pendentes para manter seu crescimento acelerado.',
                icon: Target,
                color: 'blue'
            }
        ]
    },
    website: {
        id: 'website',
        title: 'Gestão do seu Site',
        description: 'Sua vitrine profissional para o mundo.',
        steps: [
            {
                title: 'Domínio Personalizado',
                description: 'Configure o endereço (Ex: suaclinica.com.br) para passar mais autoridade.',
                icon: Globe,
                color: 'blue'
            },
            {
                title: 'Preview em Tempo Real',
                description: 'Veja como seu site está ficando antes mesmo de ser publicado.',
                icon: Zap,
                color: 'indigo'
            }
        ]
    },
    leads: {
        id: 'leads',
        title: 'Sua Central de Pacientes (CRM)',
        description: 'Nunca mais perca um contato interessado.',
        steps: [
            {
                title: 'Gestão de Funil',
                description: 'Mova os pacientes entre "Novo", "Contatado" e "Agendado" para organizar seu dia.',
                icon: Sparkles,
                color: 'emerald'
            },
            {
                title: 'WhatsApp Direto',
                description: 'Inicie uma conversa com o paciente com apenas um clique, usando scripts otimizados.',
                icon: Zap,
                color: 'green'
            }
        ]
    },
    contents: {
        id: 'contents',
        title: 'Produção de Conteúdos',
        description: 'Artes de alto padrão para suas redes sociais.',
        steps: [
            {
                title: 'Grade Visual',
                description: 'Visualize todos os posts planejados para o mês em uma grade elegante.',
                icon: ImageIcon,
                color: 'purple'
            },
            {
                title: 'Download Seguro',
                description: 'Baixe suas artes em alta resolução (4K) prontas para postar.',
                icon: Zap,
                color: 'indigo'
            }
        ]
    },
    calendar: {
        id: 'calendar',
        title: 'Calendário Estratégico',
        description: 'Sua organização semanal sem estresse.',
        steps: [
            {
                title: 'Marcos de Entrega',
                description: 'Saiba exatamente quando cada novo conteúdo ou funcionalidade será entregue.',
                icon: CalendarDays,
                color: 'indigo'
            },
            {
                title: 'Agenda Semanal',
                description: 'Visualize suas calls e prazos em uma interface limpa e intuitiva.',
                icon: Zap,
                color: 'purple'
            }
        ]
    },
    settings: {
        id: 'settings',
        title: 'Configurações da Clínica',
        description: 'Mantenha seus dados sempre atualizados.',
        steps: [
            {
                title: 'Perfil Profissional',
                description: 'Atualize seu nome, e-mail e endereço que aparecem no seu site.',
                icon: Settings,
                color: 'slate'
            },
            {
                title: 'Identidade Visual',
                description: 'Revise suas cores e fontes escolhidas durante o onboarding.',
                icon: Zap,
                color: 'indigo'
            }
        ]
    }
};
