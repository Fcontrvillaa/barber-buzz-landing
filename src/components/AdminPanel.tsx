
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';
import AdminLogin from './admin/AdminLogin';
import AdminPanelHeader from './admin/AdminPanelHeader';
import AdminPanelTabs from './admin/AdminPanelTabs';
import AdminPanelFooter from './admin/AdminPanelFooter';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel = ({ isOpen, onClose }: AdminPanelProps) => {
  const { bookings, updateBooking, deleteBooking } = useBooking();
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleLogin = () => {
    if (adminPassword === "admin123") {
      setIsAuthenticated(true);
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al panel de administración.",
      });
    } else {
      toast({
        title: "Error de acceso",
        description: "Contraseña incorrecta.",
        variant: "destructive",
      });
    }
  };

  const handleBookingAction = (bookingId: string, action: 'complete' | 'cancel' | 'delete') => {
    if (action === 'delete') {
      deleteBooking(bookingId);
    } else {
      updateBooking(bookingId, { 
        status: action === 'complete' ? 'completed' : 'cancelled' 
      });
    }

    const actionText = action === 'complete' ? 'completada' : action === 'cancel' ? 'cancelada' : 'eliminada';
    toast({
      title: "Cita actualizada",
      description: `La cita ha sido ${actionText}.`,
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      switch (calendarView) {
        case 'day':
          setSelectedDate(subDays(selectedDate, 1));
          break;
        case 'week':
          setSelectedDate(subWeeks(selectedDate, 1));
          break;
        case 'month':
          setSelectedDate(subMonths(selectedDate, 1));
          break;
      }
    } else {
      switch (calendarView) {
        case 'day':
          setSelectedDate(addDays(selectedDate, 1));
          break;
        case 'week':
          setSelectedDate(addWeeks(selectedDate, 1));
          break;
        case 'month':
          setSelectedDate(addMonths(selectedDate, 1));
          break;
      }
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const getTodayBookings = () => {
    const today = new Date();
    return bookings.filter(booking => 
      booking.date.toDateString() === today.toDateString()
    ).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getWeekBookings = () => {
    const startOfWeek = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return bookings.filter(booking => 
      booking.date >= startOfWeek && booking.date <= endOfWeek
    ).sort((a, b) => {
      if (a.date.getTime() === b.date.getTime()) {
        return a.time.localeCompare(b.time);
      }
      return a.date.getTime() - b.date.getTime();
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        isOpen={isOpen}
        onClose={onClose}
        password={adminPassword}
        onPasswordChange={setAdminPassword}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <AdminPanelHeader />

        <AdminPanelTabs
          calendarView={calendarView}
          selectedDate={selectedDate}
          onNavigate={navigateDate}
          onToday={handleToday}
          onViewChange={setCalendarView}
          todayBookings={getTodayBookings()}
          weekBookings={getWeekBookings()}
          allBookings={bookings}
          onBookingAction={handleBookingAction}
        />

        <AdminPanelFooter onLogout={handleLogout} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
