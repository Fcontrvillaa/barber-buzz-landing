
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { services } from './ServiceSelector';

interface BookingSummaryProps {
  selectedService: string;
  selectedDate: Date;
  selectedTime: string;
}

const BookingSummary = ({ selectedService, selectedDate, selectedTime }: BookingSummaryProps) => {
  const service = services.find(s => s.id === selectedService);
  
  if (!service) return null;

  return (
    <div className="bg-secondary/30 p-4 rounded-lg border">
      <h4 className="font-semibold mb-2 text-primary">Resumen de la Reserva</h4>
      <div className="space-y-1 text-sm">
        <p><strong>Servicio:</strong> {service.name}</p>
        <p><strong>Fecha:</strong> {format(selectedDate, 'dd/MM/yyyy', { locale: es })}</p>
        <p><strong>Hora:</strong> {selectedTime}</p>
        <p><strong>Precio:</strong> €{service.price}</p>
      </div>
    </div>
  );
};

export default BookingSummary;
