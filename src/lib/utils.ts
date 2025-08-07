import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions para datas
export const dateUtils = {
  formatDate(date: string | Date, formatStr: string = 'dd/MM/yyyy'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: ptBR });
  },

  formatRelativeDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    
    if (isToday(dateObj)) return 'Hoje';
    if (isTomorrow(dateObj)) return 'Amanhã';
    if (isYesterday(dateObj)) return 'Ontem';
    
    return this.formatDate(dateObj, 'dd/MM');
  },

  getCalendarMonth(date: Date): string {
    return format(date, 'MMMM yyyy', { locale: ptBR });
  },

  isSameDay(date1: string | Date, date2: string | Date): boolean {
    const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    return format(d1, 'yyyy-MM-dd') === format(d2, 'yyyy-MM-dd');
  }
};

// Utility para gerar IDs únicos
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Utility para validação de URL
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Utility para truncar texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Utility para sanitizar hashtags
export const sanitizeHashtags = (hashtags: string[]): string[] => {
  return hashtags
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => tag.startsWith('#') ? tag : `#${tag}`);
};

// Utility para debounce
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Utility para detectar dispositivo móvel
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Utility para cores baseadas no tema
export const getThemeColors = (isDark: boolean = true) => ({
  primary: isDark ? '#3B82F6' : '#2563EB',
  secondary: isDark ? '#6B7280' : '#4B5563',
  accent: isDark ? '#10B981' : '#059669',
  background: isDark ? '#0F172A' : '#FFFFFF',
  surface: isDark ? '#1E293B' : '#F8FAFC',
  text: isDark ? '#F1F5F9' : '#0F172A',
  textSecondary: isDark ? '#94A3B8' : '#64748B',
  border: isDark ? '#334155' : '#E2E8F0',
  error: '#EF4444',
  warning: '#F59E0B',
  success: '#10B981',
});

// Utility para animar elementos
export const animationClasses = {
  fadeIn: 'animate-in fade-in duration-300',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
  slideUp: 'animate-in slide-in-from-top-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  fadeOut: 'animate-out fade-out duration-200',
  slideOut: 'animate-out slide-out-to-bottom-4 duration-200',
};
