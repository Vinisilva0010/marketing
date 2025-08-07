'use client';

import React from 'react';
import { Calendar, Settings, User, Menu, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onAddPost?: () => void;
  onToggleSidebar?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onAddPost, 
  onToggleSidebar,
  className 
}) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 glass backdrop-blur-md",
      className
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 glow-blue">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ConteúdoMestre
              </h1>
              <p className="text-xs text-muted-foreground">
                Planejamento de Redes Sociais
              </p>
            </div>
          </div>
        </div>

        {/* Center - Search or Navigation (for future) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          {/* Placeholder for search or quick actions */}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Add Post Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onAddPost}
            className="shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Novo Post</span>
            <span className="sm:hidden">+</span>
          </Button>

          {/* Settings Button */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:glow-blue"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Configurações</span>
          </Button>

          {/* Profile Button */}
          <Button
            variant="ghost"
            size="sm"
            className="relative hover:glow-purple"
          >
            <User className="h-4 w-4" />
            <span className="sr-only">Perfil</span>
          </Button>
        </div>
      </div>

      {/* Progress indicator for future use */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </header>
  );
};

export default Header;
