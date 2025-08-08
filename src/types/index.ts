export type SocialNetwork = 
  | 'instagram' 
  | 'linkedin' 
  | 'tiktok' 
  | 'facebook' 
  | 'twitter' 
  | 'youtube' 
  | 'pinterest';

export type PostObjective = 
  | 'engagement' 
  | 'awareness' 
  | 'conversion' 
  | 'education' 
  | 'entertainment' 
  | 'community';

export interface Post {
  id: string;
  title: string;
  socialNetwork: SocialNetwork;
  objective: PostObjective;
  date: string; // ISO date string
  time?: string; // HH:MM format
  description?: string;
  mediaUrl?: string; // Link ou URL da imagem/arte
  hashtags?: string[];
  callToAction?: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent extends Post {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface AIsuggestion {
  type: 'idea' | 'cta' | 'hashtags';
  content: string | string[];
  context?: {
    socialNetwork?: SocialNetwork;
    objective?: PostObjective;
    topic?: string;
  };
}

export interface AppSettings {
  theme: 'dark' | 'light';
  defaultSocialNetwork: SocialNetwork;
  defaultObjective: PostObjective;
  aiEnabled: boolean;
  exportFormat: 'pdf' | 'image';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: AppSettings;
  createdAt: string;
}

// Para futuras integrações
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface CalendarViewMode {
  view: 'month' | 'week' | 'day';
  date: Date;
}

export interface ExportOptions {
  format: 'pdf' | 'image';
  dateRange: {
    start: string;
    end: string;
  };
  includeDetails: boolean;
  orientation: 'portrait' | 'landscape';
}

