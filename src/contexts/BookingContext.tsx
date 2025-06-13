
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
  id: string;
  date: Date;
  time: string;
  service: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  status: 'confirmed' | 'completed' | 'cancelled';
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getAvailableTimeSlots: (date: Date) => string[];
  getBookingsForDate: (date: Date) => Booking[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      date: new Date(),
      time: "10:00",
      service: "corte-barba",
      customer: { name: "Miguel Rodríguez", phone: "+34 123 456 789", email: "miguel@email.com" },
      status: "confirmed"
    },
    {
      id: "2",
      date: new Date(),
      time: "11:30",
      service: "fade-moderno",
      customer: { name: "Carlos López", phone: "+34 987 654 321" },
      status: "confirmed"
    },
    {
      id: "3",
      date: new Date(),
      time: "15:00",
      service: "afeitado-clasico",
      customer: { name: "David García", phone: "+34 555 123 456", email: "david@email.com" },
      status: "confirmed"
    }
  ]);

  const allTimeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];

  const addBooking = (newBooking: Omit<Booking, 'id'>) => {
    const booking: Booking = {
      ...newBooking,
      id: Date.now().toString(),
    };
    setBookings(prev => [...prev, booking]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    ));
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getAvailableTimeSlots = (date: Date): string[] => {
    const dateString = date.toDateString();
    const bookedSlots = bookings
      .filter(booking => 
        booking.date.toDateString() === dateString && 
        booking.status === 'confirmed'
      )
      .map(booking => booking.time);
    
    return allTimeSlots.filter(slot => !bookedSlots.includes(slot));
  };

  const getBookingsForDate = (date: Date): Booking[] => {
    const dateString = date.toDateString();
    return bookings.filter(booking => 
      booking.date.toDateString() === dateString
    ).sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      updateBooking,
      deleteBooking,
      getAvailableTimeSlots,
      getBookingsForDate
    }}>
      {children}
    </BookingContext.Provider>
  );
};
