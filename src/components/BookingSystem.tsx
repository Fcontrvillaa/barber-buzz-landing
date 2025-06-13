
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';
import ServiceSelector from './booking/ServiceSelector';
import DateTimeSelector from './booking/DateTimeSelector';
import CustomerForm from './booking/CustomerForm';
import BookingSummary from './booking/BookingSummary';

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingSystem = ({ isOpen, onClose }: BookingSystemProps) => {
  const { addBooking, getAvailableTimeSlots } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService || !customerName || !customerPhone) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const booking = {
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail
      },
      status: 'confirmed' as const
    };

    addBooking(booking);

    toast({
      title: "¡Reserva confirmada!",
      description: `Tu cita ha sido programada para el ${selectedDate.toLocaleDateString('es-ES')} a las ${selectedTime}.`,
    });

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime("");
    setSelectedService("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    onClose();
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(""); // Reset time when date changes
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gold-gradient">
            Reservar Cita
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Service & DateTime */}
          <div className="space-y-6">
            <ServiceSelector 
              selectedService={selectedService}
              onServiceChange={setSelectedService}
            />
            
            <DateTimeSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableTimeSlots={availableTimeSlots}
              onDateChange={handleDateChange}
              onTimeChange={setSelectedTime}
            />
          </div>

          {/* Right Column - Customer Info */}
          <div className="space-y-6">
            <CustomerForm
              customerName={customerName}
              customerPhone={customerPhone}
              customerEmail={customerEmail}
              onNameChange={setCustomerName}
              onPhoneChange={setCustomerPhone}
              onEmailChange={setCustomerEmail}
            />

            {/* Booking Summary */}
            {selectedService && selectedDate && selectedTime && (
              <BookingSummary
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleBooking} className="flex-1 btn-primary">
            Confirmar Reserva
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSystem;
