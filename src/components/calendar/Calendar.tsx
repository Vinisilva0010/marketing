'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Post, CalendarEvent, SocialNetwork } from '@/types';
import { storage } from '@/lib/storage';
import { SOCIAL_NETWORKS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';


interface CalendarProps {
  onDateSelect?: (date: string) => void;
  onEventClick?: (post: Post) => void;
  onAddPost?: () => void;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  onEventClick,
  onAddPost,
  className
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Load posts from localStorage and react to changes
  useEffect(() => {
    const loadPosts = () => {
      const storedPosts = storage.getPosts();
      setPosts(storedPosts);
    };

    loadPosts();

    const handleStorageChange = (event?: Event) => {
      // Optional: only react to posts key, but for simplicity reload all
      loadPosts();
    };

    window.addEventListener('localStorage', handleStorageChange as EventListener);
    return () => window.removeEventListener('localStorage', handleStorageChange as EventListener);
  }, []);

  // Convert posts to calendar events
  useEffect(() => {
    const events: CalendarEvent[] = posts.map(post => {
      const socialNetworkConfig = SOCIAL_NETWORKS[post.socialNetwork];
      
      return {
        ...post,
        id: post.id,
        title: post.title,
        start: post.date,
        backgroundColor: socialNetworkConfig.color + '80', // Add transparency
        borderColor: socialNetworkConfig.color,
        textColor: '#ffffff',
        extendedProps: {
          socialNetwork: post.socialNetwork,
          objective: post.objective,
          description: post.description,
          mediaUrl: post.mediaUrl,
          hashtags: post.hashtags,
          callToAction: post.callToAction,
          status: post.status
        }
      };
    });

    setCalendarEvents(events);
  }, [posts]);

  const handleDateClick = (info: { dateStr: string }) => {
    const clickedDate = info.dateStr;
    onDateSelect?.(clickedDate);
    onAddPost?.();
  };

  const handleEventClick = (info: { event: { id: string } }) => {
    const post = posts.find(p => p.id === info.event.id);
    if (post) {
      onEventClick?.(post);
    }
  };

  const renderEventContent = (eventInfo: { event: { title: string; extendedProps: Record<string, unknown> } }) => {
    const { extendedProps } = eventInfo.event;
    const socialNetwork = SOCIAL_NETWORKS[extendedProps.socialNetwork as SocialNetwork];

    return (
      <div className="p-1 text-xs">
        <div className="flex items-center space-x-1 mb-1">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: socialNetwork.color }}
          />
          <span className="font-medium truncate">
            {eventInfo.event.title}
          </span>
        </div>
        <div className="text-xs opacity-80">
          {socialNetwork.name}
        </div>
      </div>
    );
  };

  return (
    <Card variant="glass" className={cn("p-4", className)}>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="pt-br"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
          }}
          buttonText={{
            today: 'Hoje',
            month: 'Mês'
          }}
          events={calendarEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          height="auto"
          dayMaxEvents={3}
          moreLinkText="mais"
          eventDisplay="block"
          displayEventTime={false}
          fixedWeekCount={false}
          showNonCurrentDates={false}
          dayHeaderFormat={{ weekday: 'short' }}
          titleFormat={{ 
            year: 'numeric', 
            month: 'long' 
          }}
          firstDay={0} // Sunday
          weekNumbers={false}
          eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
          dayCellClassNames="hover:bg-accent/20 cursor-pointer transition-colors"
          viewClassNames="custom-calendar"
        />
      </div>

      {/* Calendar Legend */}
      <div className="mt-4 border-t border-border/40 pt-4">
        <h4 className="text-sm font-medium mb-3">Redes Sociais</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(SOCIAL_NETWORKS).map(([key, network]) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: network.color }}
              />
              <span className="text-xs text-muted-foreground">
                {network.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-primary">
            {posts.length}
          </div>
          <div className="text-xs text-muted-foreground">
            Total Posts
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-500">
            {posts.filter(p => p.status === 'published').length}
          </div>
          <div className="text-xs text-muted-foreground">
            Publicados
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-yellow-500">
            {posts.filter(p => p.status === 'scheduled').length}
          </div>
          <div className="text-xs text-muted-foreground">
            Agendados
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Calendar;
