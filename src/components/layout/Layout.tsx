'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const [requestAddPost, setRequestAddPost] = useState<null | { at: number }>(null);

  const handleAddPost = () => {
    // Dispara um evento customizado para que a página atual abra o modal
    try {
      window.dispatchEvent(new CustomEvent('open-post-form'));
    } catch {}
    setRequestAddPost({ at: Date.now() });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header 
          onAddPost={handleAddPost}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* Main content */}
        <main className={cn(
          "flex-1 overflow-y-auto bg-gradient-to-br from-background via-background to-background/95",
          "p-4 md:p-6 lg:p-8",
          "custom-scrollbar",
          className
        )}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

