
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Booking } from '@/contexts/BookingContext';
import BookingCard from './BookingCard';

interface BookingsListProps {
  bookings: Booking[];
  title: string;
  subtitle?: string;
  onAction: (bookingId: string, action: 'complete' | 'cancel' | 'delete') => void;
  showDate?: boolean;
}

const BookingsList = ({ bookings, title, subtitle, onAction, showDate = false }: BookingsListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        {subtitle && (
          <span className="text-sm text-muted-foreground">{subtitle}</span>
        )}
      </div>
      
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            onAction={onAction}
            showDate={showDate}
          />
        ))}
        
        {bookings.length === 0 && (
          <Card className="glass-card">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No hay citas para mostrar.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
