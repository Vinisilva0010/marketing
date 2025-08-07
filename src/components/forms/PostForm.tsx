'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  Target, 
  Image, 
  Hash,
  Sparkles,
  Save,
  Trash2
} from 'lucide-react';
import { Post, SocialNetwork } from '@/types';
import { SOCIAL_NETWORKS, POST_OBJECTIVES } from '@/lib/constants';
import { storage } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface PostFormProps {
  post?: Post;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (post: Post) => void;
  defaultDate?: string;
  className?: string;
}

const PostForm: React.FC<PostFormProps> = ({
  post,
  isOpen,
  onClose,
  onSave,
  defaultDate,
  className
}) => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: '',
    socialNetwork: 'instagram',
    objective: 'engagement',
    date: defaultDate || new Date().toISOString().split('T')[0],
    time: '09:00',
    description: '',
    mediaUrl: '',
    hashtags: [],
    callToAction: '',
    status: 'draft'
  });

  const [hashtagInput, setHashtagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load post data if editing
  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
        date: post.date.split('T')[0], // Extract date part
        time: post.time || '09:00'
      });
      setHashtagInput(post.hashtags?.join(', ') || '');
    } else if (defaultDate) {
      setFormData(prev => ({
        ...prev,
        date: defaultDate
      }));
    }
  }, [post, defaultDate]);

  const handleInputChange = (field: keyof Post, value: string | string[] | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHashtagsChange = (value: string) => {
    setHashtagInput(value);
    const hashtags = value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => tag.startsWith('#') ? tag : `#${tag}`);
    
    handleInputChange('hashtags', hashtags);
  };

  const handleSave = async () => {
    if (!formData.title?.trim()) {
      alert('Título é obrigatório');
      return;
    }

    setIsLoading(true);

    try {
      const now = new Date().toISOString();
      const postData: Post = {
        id: post?.id || generateId(),
        title: formData.title!,
        socialNetwork: formData.socialNetwork!,
        objective: formData.objective!,
        date: `${formData.date}T${formData.time || '09:00'}:00.000Z`,
        time: formData.time,
        description: formData.description,
        mediaUrl: formData.mediaUrl,
        hashtags: formData.hashtags,
        callToAction: formData.callToAction,
        status: formData.status!,
        createdAt: post?.createdAt || now,
        updatedAt: now
      };

      if (post) {
        storage.updatePost(post.id, postData);
      } else {
        storage.addPost(postData);
      }

      onSave?.(postData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      alert('Erro ao salvar post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (post && confirm('Tem certeza que deseja excluir este post?')) {
      storage.deletePost(post.id);
      onClose();
    }
  };

  const generateAISuggestion = (type: 'idea' | 'cta' | 'hashtags') => {
    // Placeholder for AI suggestions - will be implemented later
    const suggestions = {
      idea: `Ideia criativa para ${SOCIAL_NETWORKS[formData.socialNetwork as SocialNetwork]?.name}: Compartilhe uma dica valiosa sobre seu nicho!`,
      cta: 'Compartilhe sua opinião nos comentários! 💬',
      hashtags: ['#marketing', '#redesociais', '#conteudo', '#digital', '#engajamento']
    };

    if (type === 'idea') {
      handleInputChange('description', suggestions.idea);
    } else if (type === 'cta') {
      handleInputChange('callToAction', suggestions.cta);
    } else if (type === 'hashtags') {
      setHashtagInput(suggestions.hashtags.join(', '));
      handleInputChange('hashtags', suggestions.hashtags);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card 
        variant="glass" 
        className={cn(
          "w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl">
            {post ? 'Editar Post' : 'Novo Post'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Title */}
          <Input
            label="Título *"
            placeholder="Digite o título do post..."
            value={formData.title || ''}
            onChange={(e) => handleInputChange('title', e.target.value)}
            icon={<CalendarIcon className="h-4 w-4" />}
          />

          {/* Social Network and Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rede Social *</label>
              <select
                value={formData.socialNetwork}
                onChange={(e) => handleInputChange('socialNetwork', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass"
              >
                {Object.entries(SOCIAL_NETWORKS).map(([key, network]) => (
                  <option key={key} value={key}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Objetivo *</label>
              <select
                value={formData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass"
              >
                {Object.entries(POST_OBJECTIVES).map(([key, objective]) => (
                  <option key={key} value={key}>
                    {objective.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Data *"
              type="date"
              value={formData.date || ''}
              onChange={(e) => handleInputChange('date', e.target.value)}
              icon={<CalendarIcon className="h-4 w-4" />}
            />

            <Input
              label="Horário"
              type="time"
              value={formData.time || '09:00'}
              onChange={(e) => handleInputChange('time', e.target.value)}
              icon={<Clock className="h-4 w-4" />}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Descrição</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateAISuggestion('idea')}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                IA
              </Button>
            </div>
            <textarea
              placeholder="Descreva o conteúdo do post..."
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass resize-none"
            />
          </div>

          {/* Media URL */}
          <Input
            label="Link da Arte/Imagem"
            placeholder="https://exemplo.com/imagem.jpg"
            value={formData.mediaUrl || ''}
            onChange={(e) => handleInputChange('mediaUrl', e.target.value)}
            icon={<Image className="h-4 w-4" />}
          />

          {/* Call to Action */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Call to Action</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateAISuggestion('cta')}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                IA
              </Button>
            </div>
            <Input
              placeholder="Ex: Comente abaixo sua opinião!"
              value={formData.callToAction || ''}
              onChange={(e) => handleInputChange('callToAction', e.target.value)}
              icon={<Target className="h-4 w-4" />}
            />
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Hashtags</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => generateAISuggestion('hashtags')}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                IA
              </Button>
            </div>
            <Input
              placeholder="Ex: #marketing, #social, #conteudo"
              value={hashtagInput}
              onChange={(e) => handleHashtagsChange(e.target.value)}
              icon={<Hash className="h-4 w-4" />}
            />
            {formData.hashtags && formData.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass"
            >
              <option value="draft">Rascunho</option>
              <option value="scheduled">Agendado</option>
              <option value="published">Publicado</option>
            </select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div>
            {post && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
              disabled={!formData.title?.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              {post ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostForm;
