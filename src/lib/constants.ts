import { SocialNetwork, PostObjective } from '@/types';

export const SOCIAL_NETWORKS: Record<SocialNetwork, { 
  name: string; 
  color: string; 
  icon: string;
}> = {
  instagram: { 
    name: 'Instagram', 
    color: '#E4405F', 
    icon: 'Instagram' 
  },
  linkedin: { 
    name: 'LinkedIn', 
    color: '#0077B5', 
    icon: 'Linkedin' 
  },
  tiktok: { 
    name: 'TikTok', 
    color: '#000000', 
    icon: 'Music' 
  },
  facebook: { 
    name: 'Facebook', 
    color: '#1877F2', 
    icon: 'Facebook' 
  },
  twitter: { 
    name: 'Twitter/X', 
    color: '#1DA1F2', 
    icon: 'Twitter' 
  },
  youtube: { 
    name: 'YouTube', 
    color: '#FF0000', 
    icon: 'Youtube' 
  },
  pinterest: { 
    name: 'Pinterest', 
    color: '#BD081C', 
    icon: 'Image' 
  }
};

export const POST_OBJECTIVES: Record<PostObjective, {
  name: string;
  description: string;
  color: string;
}> = {
  engagement: {
    name: 'Engajamento',
    description: 'Aumentar interações e comentários',
    color: '#10B981'
  },
  awareness: {
    name: 'Consciência',
    description: 'Aumentar conhecimento da marca',
    color: '#3B82F6'
  },
  conversion: {
    name: 'Conversão',
    description: 'Gerar vendas ou leads',
    color: '#F59E0B'
  },
  education: {
    name: 'Educação',
    description: 'Ensinar e informar',
    color: '#8B5CF6'
  },
  entertainment: {
    name: 'Entretenimento',
    description: 'Divertir e entreter',
    color: '#EF4444'
  },
  community: {
    name: 'Comunidade',
    description: 'Construir relacionamentos',
    color: '#06B6D4'
  }
};

export const STORAGE_KEYS = {
  POSTS: 'conteudo-mestre-posts',
  SETTINGS: 'conteudo-mestre-settings',
  USER: 'conteudo-mestre-user'
} as const;

export const DEFAULT_SETTINGS = {
  theme: 'dark' as const,
  defaultSocialNetwork: 'instagram' as SocialNetwork,
  defaultObjective: 'engagement' as PostObjective,
  aiEnabled: true,
  exportFormat: 'pdf' as const
};

export const AI_SUGGESTION_PROMPTS = {
  idea: {
    instagram: 'Gere uma ideia criativa para post no Instagram sobre:',
    linkedin: 'Sugira um conteúdo profissional para LinkedIn sobre:',
    tiktok: 'Crie uma ideia viral para TikTok sobre:',
    facebook: 'Proponha um post engajante para Facebook sobre:',
    twitter: 'Sugira um tweet interessante sobre:',
    youtube: 'Ideia para vídeo no YouTube sobre:',
    pinterest: 'Sugira um pin visual para Pinterest sobre:'
  },
  cta: {
    engagement: 'Crie um call-to-action para aumentar engajamento',
    awareness: 'Gere um CTA para aumentar conhecimento da marca',
    conversion: 'Sugira um CTA para gerar conversões',
    education: 'Crie um CTA educativo',
    entertainment: 'Gere um CTA divertido',
    community: 'Sugira um CTA para construir comunidade'
  },
  hashtags: 'Sugira hashtags relevantes para:'
};
