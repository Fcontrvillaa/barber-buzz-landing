
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Phone, Check, X, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Booking } from '@/contexts/BookingContext';

interface BookingCardProps {
  booking: Booking;
  onAction: (bookingId: string, action: 'complete' | 'cancel' | 'delete') => void;
  showDate?: boolean;
}

const BookingCard = ({ booking, onAction, showDate = false }: BookingCardProps) => {
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

  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className={`grid grid-cols-1 gap-4 flex-1 ${showDate ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
            {showDate && (
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{format(booking.date, 'dd/MM/yyyy', { locale: es })}</span>
              </div>
            )}
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
                  onClick={() => onAction(booking.id, 'complete')}
                  className="h-8 w-8 p-0"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction(booking.id, 'cancel')}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onAction(booking.id, 'delete')}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
