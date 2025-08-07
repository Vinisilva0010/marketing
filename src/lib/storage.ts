import { Post, AppSettings, User } from '@/types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from './constants';

// Utility functions para localStorage
export const storage = {
  // Posts
  getPosts(): Post[] {
    if (typeof window === 'undefined') return [];
    try {
      const posts = localStorage.getItem(STORAGE_KEYS.POSTS);
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      return [];
    }
  },

  savePosts(posts: Post[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (error) {
      console.error('Erro ao salvar posts:', error);
    }
  },

  addPost(post: Post): void {
    const posts = this.getPosts();
    posts.push(post);
    this.savePosts(posts);
  },

  updatePost(postId: string, updatedPost: Partial<Post>): void {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts[index] = { 
        ...posts[index], 
        ...updatedPost, 
        updatedAt: new Date().toISOString() 
      };
      this.savePosts(posts);
    }
  },

  deletePost(postId: string): void {
    const posts = this.getPosts();
    const filteredPosts = posts.filter(p => p.id !== postId);
    this.savePosts(filteredPosts);
  },

  getPostById(postId: string): Post | undefined {
    const posts = this.getPosts();
    return posts.find(p => p.id === postId);
  },

  getPostsByDateRange(startDate: string, endDate: string): Post[] {
    const posts = this.getPosts();
    return posts.filter(post => {
      const postDate = new Date(post.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return postDate >= start && postDate <= end;
    });
  },

  // Settings
  getSettings(): AppSettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return settings ? { ...DEFAULT_SETTINGS, ...JSON.parse(settings) } : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: Partial<AppSettings>): void {
    if (typeof window === 'undefined') return;
    try {
      const currentSettings = this.getSettings();
      const newSettings = { ...currentSettings, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  },

  // User (para futuras funcionalidades)
  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      return null;
    }
  },

  saveUser(user: User): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  },

  clearUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Utility para limpar todos os dados
  clearAll(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Hook personalizado para usar o storage com React
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  if (typeof window === 'undefined') {
    return [defaultValue, () => {}] as const;
  }

  const getValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Erro ao carregar ${key}:`, error);
      return defaultValue;
    }
  };

  const setValue = (value: T | ((val: T) => T)): void => {
    try {
      const valueToStore = value instanceof Function ? value(getValue()) : value;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      // Triggering a custom event for cross-component updates
      window.dispatchEvent(new CustomEvent('localStorage', { 
        detail: { key, value: valueToStore } 
      }));
    } catch (error) {
      console.error(`Erro ao salvar ${key}:`, error);
    }
  };

  return [getValue(), setValue] as const;
};
