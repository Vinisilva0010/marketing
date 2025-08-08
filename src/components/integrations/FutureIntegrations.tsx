'use client';

import React from 'react';
import { 
  Shield, 
  Cloud, 
  Brain, 
  Share2, 
  BarChart3,
  Users,
  Zap,
  Globe
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'available' | 'coming-soon' | 'planned';
  features: string[];
  className?: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  icon,
  title,
  description,
  status,
  features,
  className
}) => {
  const statusConfig = {
    available: {
      badge: 'Disponível',
      badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
      buttonText: 'Configurar',
      buttonVariant: 'primary' as const
    },
    'coming-soon': {
      badge: 'Em Breve',
      badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      buttonText: 'Notificar-me',
      buttonVariant: 'outline' as const
    },
    planned: {
      badge: 'Planejado',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      buttonText: 'Interesse',
      buttonVariant: 'ghost' as const
    }
  };

  const config = statusConfig[status];

  return (
    <Card variant="glass" className={cn("h-full", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <span className={cn(
                "inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1",
                config.badgeColor
              )}>
                {config.badge}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-400 mt-3">
          {description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Funcionalidades:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm text-slate-400 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant={config.buttonVariant}
            className="w-full"
            disabled={status !== 'available'}
          >
            {config.buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface FutureIntegrationsProps {
  className?: string;
}

const FutureIntegrations: React.FC<FutureIntegrationsProps> = ({ className }) => {
  const integrations = [
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: 'Autenticação Clerk',
      description: 'Sistema de autenticação seguro e fácil de usar para gerenciar contas de usuário.',
      status: 'coming-soon' as const,
      features: [
        'Login social (Google, GitHub)',
        'Autenticação multifator',
        'Gestão de perfis',
        'Segurança avançada'
      ]
    },
    {
      icon: <Cloud className="h-6 w-6 text-green-400" />,
      title: 'Supabase Database',
      description: 'Banco de dados em nuvem para sincronização e backup automático dos seus dados.',
      status: 'coming-soon' as const,
      features: [
        'Sincronização em tempo real',
        'Backup automático',
        'Acesso multiplataforma',
        'Histórico de versões'
      ]
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: 'IA OpenAI',
      description: 'Integração com inteligência artificial para sugestões de conteúdo personalizadas.',
      status: 'planned' as const,
      features: [
        'Sugestões contextuais',
        'Geração de hashtags',
        'Otimização de CTAs',
        'Análise de tendências'
      ]
    },
    {
      icon: <Share2 className="h-6 w-6 text-pink-400" />,
      title: 'APIs Redes Sociais',
      description: 'Conecte-se diretamente com Instagram, LinkedIn, TikTok e outras plataformas.',
      status: 'planned' as const,
      features: [
        'Publicação automática',
        'Agendamento nativo',
        'Métricas em tempo real',
        'Gestão de múltiplas contas'
      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-400" />,
      title: 'Analytics Avançado',
      description: 'Análises detalhadas de performance e insights para otimizar sua estratégia.',
      status: 'planned' as const,
      features: [
        'Relatórios detalhados',
        'Comparativo de performance',
        'Insights automáticos',
        'ROI de campanhas'
      ]
    },
    {
      icon: <Users className="h-6 w-6 text-cyan-400" />,
      title: 'Colaboração em Equipe',
      description: 'Trabalhe em equipe com permissões, comentários e fluxos de aprovação.',
      status: 'planned' as const,
      features: [
        'Múltiplos usuários',
        'Controle de permissões',
        'Fluxo de aprovação',
        'Comentários e revisões'
      ]
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: 'Automações',
      description: 'Automatize tarefas repetitivas e crie fluxos de trabalho inteligentes.',
      status: 'planned' as const,
      features: [
        'Triggers personalizados',
        'Workflows automáticos',
        'Integração com Zapier',
        'Notificações inteligentes'
      ]
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-400" />,
      title: 'Multi-idioma',
      description: 'Suporte para múltiplos idiomas e localização de conteúdo.',
      status: 'planned' as const,
      features: [
        'Interface multilíngue',
        'Tradução automática',
        'Localização de conteúdo',
        'Fusos horários'
      ]
    }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Integrações Futuras
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Estamos constantemente trabalhando para expandir as funcionalidades do ConteúdoMestre. 
          Confira o que está por vir e seja notificado quando estiver disponível.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {integrations.map((integration, index) => (
          <IntegrationCard
            key={index}
            {...integration}
          />
        ))}
      </div>

      <Card variant="glass" className="p-6 text-center border-2 border-dashed border-slate-600">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Sugira uma Integração</h3>
            <p className="text-slate-400 mb-4">
              Tem alguma ferramenta ou serviço que gostaria de ver integrado? 
              Queremos saber sua opinião!
            </p>
            <Button variant="outline">
              Enviar Sugestão
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <Shield className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Roadmap Transparente</h3>
            <p className="text-sm text-slate-400 mb-4">
              Nosso desenvolvimento é orientado pela comunidade. Acompanhe nosso progresso 
              e participe das decisões sobre as próximas funcionalidades.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                Ver Roadmap Completo
              </Button>
              <Button variant="ghost" size="sm">
                Participar da Comunidade
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureIntegrations;

