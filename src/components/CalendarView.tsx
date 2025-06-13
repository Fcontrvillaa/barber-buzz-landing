
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useBooking, Booking } from '@/contexts/BookingContext';

interface CalendarViewProps {
  view: 'day' | 'week' | 'month';
  selectedDate: Date;
}

const CalendarView = ({ view, selectedDate }: CalendarViewProps) => {
  const { getBookingsForDate, bookings } = useBooking();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const renderDayView = () => {
    const dayBookings = getBookingsForDate(selectedDate);
    
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: es })}
        </h3>
        {dayBookings.length === 0 ? (
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No hay citas programadas para este día.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {dayBookings.map((booking) => (
              <Card key={booking.id} className="glass-card">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-lg">{booking.time}</span>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status === 'confirmed' ? 'Confirmada' : 
                           booking.status === 'completed' ? 'Completada' : 'Cancelada'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.customer.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">{booking.customer.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Semana del {format(weekStart, 'dd MMM', { locale: es })} al {format(weekEnd, 'dd MMM yyyy', { locale: es })}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {days.map((day) => {
            const dayBookings = getBookingsForDate(day);
            return (
              <Card key={day.toISOString()} className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {format(day, 'EEE dd', { locale: es })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {dayBookings.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Sin citas</p>
                  ) : (
                    <div className="space-y-2">
                      {dayBookings.map((booking) => (
                        <div key={booking.id} className="p-2 bg-primary/10 rounded text-xs">
                          <div className="font-medium">{booking.time}</div>
                          <div className="text-muted-foreground">{booking.customer.name}</div>
                          <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                            {booking.status === 'confirmed' ? 'Conf.' : 
                             booking.status === 'completed' ? 'Comp.' : 'Canc.'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          {format(selectedDate, 'MMMM yyyy', { locale: es })}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {days.map((day) => {
            const dayBookings = getBookingsForDate(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <Card key={day.toISOString()} className={`glass-card ${isToday ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-2">
                  <div className="text-sm font-medium mb-1">
                    {format(day, 'd', { locale: es })}
                  </div>
                  <div className="space-y-1">
                    {dayBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="text-xs p-1 bg-primary/10 rounded">
                        <div>{booking.time}</div>
                        <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                          {booking.status === 'confirmed' ? 'C' : 
                           booking.status === 'completed' ? 'OK' : 'X'}
                        </Badge>
                      </div>
                    ))}
                    {dayBookings.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayBookings.length - 3} más
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  switch (view) {
    case 'day':
      return renderDayView();
    case 'week':
      return renderWeekView();
    case 'month':
      return renderMonthView();
    default:
      return renderDayView();
  }
};

export default CalendarView;
