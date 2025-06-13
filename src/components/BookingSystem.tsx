
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, User, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';

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

  const services = [
    { id: "corte-clasico", name: "Corte Clásico", duration: 45, price: 25 },
    { id: "barba-bigote", name: "Barba & Bigote", duration: 30, price: 20 },
    { id: "corte-barba", name: "Corte + Barba", duration: 60, price: 40 },
    { id: "fade-moderno", name: "Fade Moderno", duration: 50, price: 30 },
    { id: "afeitado-clasico", name: "Afeitado Clásico", duration: 40, price: 25 },
    { id: "tratamiento-capilar", name: "Tratamiento Capilar", duration: 45, price: 35 }
  ];

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
      description: `Tu cita ha sido programada para el ${format(selectedDate, 'dd/MM/yyyy', { locale: es })} a las ${selectedTime}.`,
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
            <div>
              <Label htmlFor="service" className="text-base font-semibold mb-2 block">
                Selecciona el Servicio *
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige un servicio" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{service.name}</span>
                        <span className="text-primary ml-4">€{service.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold mb-2 block">
                Selecciona la Fecha *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-base font-semibold mb-2 block">
                Selecciona la Hora *
              </Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Elige una hora" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.length > 0 ? (
                    availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-slots" disabled>
                      No hay horarios disponibles
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {selectedDate && availableTimeSlots.length === 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  No hay horarios disponibles para esta fecha.
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Customer Info */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                Nombre Completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                Teléfono *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+34 123 456 789"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                Email (Opcional)
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Booking Summary */}
            {selectedService && selectedDate && selectedTime && (
              <div className="bg-secondary/30 p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-primary">Resumen de la Reserva</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Servicio:</strong> {services.find(s => s.id === selectedService)?.name}</p>
                  <p><strong>Fecha:</strong> {format(selectedDate, 'dd/MM/yyyy', { locale: es })}</p>
                  <p><strong>Hora:</strong> {selectedTime}</p>
                  <p><strong>Precio:</strong> €{services.find(s => s.id === selectedService)?.price}</p>
                </div>
              </div>
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
