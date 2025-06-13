
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Booking } from '@/contexts/BookingContext';
import CalendarView from '@/components/CalendarView';
import BookingsList from './BookingsList';
import HoursManager from './HoursManager';
import AdminPanelNavigation from './AdminPanelNavigation';

interface AdminPanelTabsProps {
  calendarView: 'day' | 'week' | 'month';
  selectedDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToday: () => void;
  onViewChange: (view: 'day' | 'week' | 'month') => void;
  todayBookings: Booking[];
  weekBookings: Booking[];
  allBookings: Booking[];
  onBookingAction: (bookingId: string, action: 'complete' | 'cancel' | 'delete') => void;
}

const AdminPanelTabs = ({
  calendarView,
  selectedDate,
  onNavigate,
  onToday,
  onViewChange,
  todayBookings,
  weekBookings,
  allBookings,
  onBookingAction
}: AdminPanelTabsProps) => {
  return (
    <Tabs defaultValue="calendar" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="calendar">Vista Gráfica</TabsTrigger>
        <TabsTrigger value="today">Hoy</TabsTrigger>
        <TabsTrigger value="week">Esta Semana</TabsTrigger>
        <TabsTrigger value="all">Todas las Citas</TabsTrigger>
        <TabsTrigger value="hours">Gestión de Horarios</TabsTrigger>
      </TabsList>

      <TabsContent value="calendar">
        <div className="space-y-4">
          <AdminPanelNavigation
            onNavigate={onNavigate}
            onToday={onToday}
            calendarView={calendarView}
            onViewChange={onViewChange}
          />
          <CalendarView view={calendarView} selectedDate={selectedDate} />
        </div>
      </TabsContent>

      <TabsContent value="today">
        <BookingsList
          bookings={todayBookings}
          title="Citas de Hoy"
          subtitle={new Date().toLocaleDateString('es-ES')}
          onAction={onBookingAction}
        />
      </TabsContent>

      <TabsContent value="week">
        <BookingsList
          bookings={weekBookings}
          title="Citas de Esta Semana"
          onAction={onBookingAction}
          showDate={true}
        />
      </TabsContent>

      <TabsContent value="all">
        <BookingsList
          bookings={allBookings}
          title="Todas las Citas"
          onAction={onBookingAction}
          showDate={true}
        />
      </TabsContent>

      <TabsContent value="hours">
        <HoursManager />
      </TabsContent>
    </Tabs>
  );
};

export default AdminPanelTabs;
