'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Calendar from '@/components/calendar/Calendar';
import PostForm from '@/components/forms/PostForm';
import AISuggestions from '@/components/ai/AISuggestions';
import ExportCalendar from '@/components/export/ExportCalendar';
import FutureIntegrations from '@/components/integrations/FutureIntegrations';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Calendar as CalendarIcon, Bot, Download, Zap } from 'lucide-react';

export default function Home() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [defaultDate, setDefaultDate] = useState<string | undefined>(undefined);

  // Ouve pedidos do layout para abrir o modal de post
  React.useEffect(() => {
    const handleOpen = () => setShowPostForm(true);
    window.addEventListener('open-post-form', handleOpen);
    return () => window.removeEventListener('open-post-form', handleOpen);
  }, []);

  const handleAddPost = () => {
    setDefaultDate(undefined);
    setShowPostForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seu calendário de conteúdo e planeje suas postagens
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className="flex items-center gap-2"
            >
              <Bot className="h-4 w-4" />
              IA Sugestões
            </Button>
            
            <ExportCalendar />
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {showAISuggestions && (
          <Card className="p-4">
            <AISuggestions />
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 glass">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <CalendarIcon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Posts este mês</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Zap className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engajamento</p>
                <p className="text-2xl font-bold">+23%</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Download className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Relatórios</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Calendar */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Calendário de Conteúdo</h2>
            <Button onClick={handleAddPost} className="cyber-button">
              Novo Post
            </Button>
          </div>
          <Calendar 
            onAddPost={handleAddPost}
            onDateSelect={(date) => { setDefaultDate(date); setShowPostForm(true); }}
          />
        </Card>

        {/* Future Integrations Preview */}
        <FutureIntegrations />

        {/* Post Form Modal */}
        {showPostForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <PostForm 
                onClose={() => setShowPostForm(false)} 
                defaultDate={defaultDate}
              />
            </div>
          </div>
        )}
    </div>
    </Layout>
  );
}
