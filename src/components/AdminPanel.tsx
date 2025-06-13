
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';
import CalendarView from '@/components/CalendarView';
import AdminLogin from './admin/AdminLogin';
import BookingsList from './admin/BookingsList';

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
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gold-gradient">
            Panel de Administración - José El Barbero
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar">Vista Gráfica</TabsTrigger>
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Esta Semana</TabsTrigger>
            <TabsTrigger value="all">Todas las Citas</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                    Hoy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant={calendarView === 'day' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalendarView('day')}
                  >
                    Día
                  </Button>
                  <Button
                    variant={calendarView === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalendarView('week')}
                  >
                    Semana
                  </Button>
                  <Button
                    variant={calendarView === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCalendarView('month')}
                  >
                    Mes
                  </Button>
                </div>
              </div>
              
              <CalendarView view={calendarView} selectedDate={selectedDate} />
            </div>
          </TabsContent>

          <TabsContent value="today">
            <BookingsList
              bookings={getTodayBookings()}
              title="Citas de Hoy"
              subtitle={format(new Date(), 'dd/MM/yyyy', { locale: es })}
              onAction={handleBookingAction}
            />
          </TabsContent>

          <TabsContent value="week">
            <BookingsList
              bookings={getWeekBookings()}
              title="Citas de Esta Semana"
              onAction={handleBookingAction}
              showDate={true}
            />
          </TabsContent>

          <TabsContent value="all">
            <BookingsList
              bookings={bookings}
              title="Todas las Citas"
              onAction={handleBookingAction}
              showDate={true}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Cerrar Sesión
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cerrar Panel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
