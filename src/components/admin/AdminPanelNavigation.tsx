
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminPanelNavigationProps {
  onNavigate: (direction: 'prev' | 'next') => void;
  onToday: () => void;
  calendarView: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

const AdminPanelNavigation = ({ 
  onNavigate, 
  onToday, 
  calendarView, 
  onViewChange 
}: AdminPanelNavigationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate('prev')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onToday}>
          Hoy
        </Button>
        <Button variant="outline" size="sm" onClick={() => onNavigate('next')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Button
          variant={calendarView === 'day' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('day')}
        >
          Día
        </Button>
        <Button
          variant={calendarView === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('week')}
        >
          Semana
        </Button>
        <Button
          variant={calendarView === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('month')}
        >
          Mes
        </Button>
      </div>
    </div>
  );
};

export default AdminPanelNavigation;
