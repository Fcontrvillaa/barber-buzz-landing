import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, Phone, Edit, Trash2, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';
import CalendarView from '@/components/CalendarView';

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

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      completed: "bg-green-500/20 text-green-400 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
    };
    const labels = {
      confirmed: "Confirmada",
      completed: "Completada",
      cancelled: "Cancelada"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold gold-gradient text-center">
              Panel de Administración
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-base font-semibold">
                Contraseña de Administrador
              </Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <Button onClick={handleLogin} className="w-full btn-primary">
              Acceder
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              Contraseña de prueba: admin123
            </p>
          </div>
        </DialogContent>
      </Dialog>
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Citas de Hoy</h3>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(), 'dd/MM/yyyy', { locale: es })}
                </span>
              </div>
              
              <div className="grid gap-4">
                {getTodayBookings().map((booking) => (
                  <Card key={booking.id} className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-primary" />
                            <span>{booking.customer.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span>{booking.customer.phone}</span>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">{booking.service}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusBadge(booking.status)}
                          {booking.status === 'confirmed' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'complete')}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBookingAction(booking.id, 'delete')}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {getTodayBookings().length === 0 && (
                  <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground">No hay citas programadas para hoy.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="week">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Citas de Esta Semana</h3>
              
              <div className="grid gap-4">
                {getWeekBookings().map((booking) => (
                  <Card key={booking.id} className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{format(booking.date, 'dd/MM', { locale: es })}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-primary" />
                            <span>{booking.customer.name}</span>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">{booking.service}</span>
                          </div>
                          <div>
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {booking.status === 'confirmed' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'complete')}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBookingAction(booking.id, 'delete')}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Todas las Citas</h3>
              
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="glass-card">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{format(booking.date, 'dd/MM/yyyy', { locale: es })}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-primary" />
                            <span>{booking.customer.name}</span>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">{booking.service}</span>
                          </div>
                          <div>
                            {getStatusBadge(booking.status)}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {booking.status === 'confirmed' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'complete')}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBookingAction(booking.id, 'cancel')}
                                className="h-8 w-8 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBookingAction(booking.id, 'delete')}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
