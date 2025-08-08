'use client';

import React from 'react';
import { 
  Calendar, 
  BarChart3, 
  Target, 
  Lightbulb, 
  Download, 
  Archive,
  Home,
  Settings,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onClose,
  className 
}) => {
  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/',
      isActive: true
    },
    {
      icon: Calendar,
      label: 'Calendário',
      href: '/calendar',
      isActive: false
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      href: '/analytics',
      isActive: false,
      badge: 'Em breve'
    },
    {
      icon: Target,
      label: 'Objetivos',
      href: '/goals',
      isActive: false,
      badge: 'Em breve'
    }
  ];

  const toolsItems = [
    {
      icon: Lightbulb,
      label: 'Sugestões IA',
      href: '/ai-suggestions',
      isActive: false
    },
    {
      icon: Download,
      label: 'Exportar',
      href: '/export',
      isActive: false
    },
    {
      icon: Archive,
      label: 'Arquivo',
      href: '/archive',
      isActive: false,
      badge: 'Em breve'
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "glass border-r border-border/40",
        className
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/40">
            <h2 className="text-lg font-semibold">Menu</h2>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="md:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {/* Main Navigation */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Principal
              </h3>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarItem 
                    key={item.href} 
                    {...item} 
                  />
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Ferramentas
              </h3>
              <div className="space-y-1">
                {toolsItems.map((item) => (
                  <SidebarItem 
                    key={item.href} 
                    {...item} 
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats Card */}
            <Card variant="glass" className="p-4">
              <h4 className="text-sm font-medium mb-2">Posts este mês</h4>
              <div className="text-2xl font-bold text-primary">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Comece criando seu primeiro post!
              </p>
            </Card>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/40">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

interface SidebarItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive?: boolean;
  badge?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  isActive = false,
  badge
}) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary/10 text-primary border border-primary/20 glow-blue"
      )}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {badge && (
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {badge}
        </span>
      )}
    </a>
  );
};

export default Sidebar;

