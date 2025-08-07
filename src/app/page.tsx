'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Calendar,
  Sparkles,
  Download,
  Settings
} from 'lucide-react';
import AISuggestions from '@/components/ai/AISuggestions';
import ExportCalendar from '@/components/export/ExportCalendar';
import FutureIntegrations from '@/components/integrations/FutureIntegrations';
import { storage } from '@/lib/storage';
import { Post } from '@/types';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = () => {
      const storedPosts = storage.getPosts();
      setPosts(storedPosts);
    };

    loadPosts();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const postsThisMonth = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getMonth() === currentMonth && postDate.getFullYear() === currentYear;
  }).length;

  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const scheduledPosts = posts.filter(p => p.status === 'scheduled').length;
  const activeSocialNetworks = new Set(posts.map(p => p.socialNetwork)).size;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ai', label: 'IA Sugestões', icon: Sparkles },
    { id: 'export', label: 'Exportar', icon: Download },
    { id: 'integrations', label: 'Integrações', icon: Settings }
  ];

  const handleCreatePost = () => {
    // For now, we'll show a simple form
    const title = prompt('Título do post:');
    if (!title) return;

    const socialNetwork = prompt('Rede social (instagram, linkedin, tiktok, facebook, twitter, youtube, pinterest):') || 'instagram';
    const date = prompt('Data (YYYY-MM-DD):') || new Date().toISOString().split('T')[0];

    const newPost: Post = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      socialNetwork: socialNetwork as any,
      objective: 'engagement',
      date: `${date}T09:00:00.000Z`,
      time: '09:00',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storage.addPost(newPost);
    setPosts(storage.getPosts());
    alert('Post criado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ConteúdoMestre
              </h1>
              <p className="text-xs text-slate-400">Planejamento de Redes Sociais</p>
            </div>
          </div>
          
          <button
            onClick={handleCreatePost}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Post</span>
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Header Section */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
              <p className="text-slate-400">Gerencie seu calendário de conteúdo para redes sociais</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Posts este mês</p>
                    <p className="text-2xl font-bold">{postsThisMonth}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Publicados</p>
                    <p className="text-2xl font-bold">{publishedPosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Agendados</p>
                    <p className="text-2xl font-bold">{scheduledPosts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Redes ativas</p>
                    <p className="text-2xl font-bold">{activeSocialNetworks}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 border-l-4 border-l-blue-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Bem-vindo ao ConteúdoMestre! 🚀</h3>
              <p className="text-slate-400 mb-4">
                {posts.length === 0 
                  ? "Comece criando seu primeiro post para começar a planejar seu conteúdo para redes sociais."
                  : `Você já tem ${posts.length} posts criados! Continue organizando seu calendário de conteúdo.`
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-400">
                <p>✨ <strong>Sugestões de IA:</strong> Use a aba "IA Sugestões" para ideias criativas</p>
                <p>📄 <strong>Exportação:</strong> Gere PDFs do seu calendário na aba "Exportar"</p>
                <p>🔮 <strong>Futuro:</strong> Confira as integrações planejadas na aba "Integrações"</p>
              </div>
            </div>

            {/* Posts List */}
            {posts.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Posts Recentes</h3>
                <div className="space-y-3">
                  {posts.slice(-5).reverse().map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{post.title}</h4>
                        <p className="text-sm text-slate-400">
                          {post.socialNetwork} • {new Date(post.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-green-500/20 text-green-400'
                          : post.status === 'scheduled'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {post.status === 'published' ? 'Publicado' : post.status === 'scheduled' ? 'Agendado' : 'Rascunho'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-12 text-center">
                <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">Nenhum post criado ainda</h3>
                <p className="text-slate-400 mb-6">
                  Comece criando seu primeiro post para organizar seu calendário de conteúdo.
                </p>
                <button
                  onClick={handleCreatePost}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Criar Primeiro Post
                </button>
              </div>
            )}
          </div>
        )}

        {/* AI Suggestions Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Sugestões de IA</h2>
              <p className="text-slate-400">Gere ideias criativas, CTAs e hashtags personalizadas</p>
            </div>
            <AISuggestions />
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Exportar Calendário</h2>
              <p className="text-slate-400">Gere PDFs e imagens do seu calendário de conteúdo</p>
            </div>
            <ExportCalendar />
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Integrações</h2>
              <p className="text-slate-400">Conecte o ConteúdoMestre com suas ferramentas favoritas</p>
            </div>
            <FutureIntegrations />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-700 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">ConteúdoMestre</span>
          </div>
          <p className="text-slate-400 text-sm">
            Transformando o planejamento de conteúdo para redes sociais • v1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}