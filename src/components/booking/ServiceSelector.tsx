
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface ServiceSelectorProps {
  selectedService: string;
  onServiceChange: (value: string) => void;
}

const services: Service[] = [
  { id: "corte-clasico", name: "Corte Clásico", duration: 45, price: 25 },
  { id: "barba-bigote", name: "Barba & Bigote", duration: 30, price: 20 },
  { id: "corte-barba", name: "Corte + Barba", duration: 60, price: 40 },
  { id: "fade-moderno", name: "Fade Moderno", duration: 50, price: 30 },
  { id: "afeitado-clasico", name: "Afeitado Clásico", duration: 40, price: 25 },
  { id: "tratamiento-capilar", name: "Tratamiento Capilar", duration: 45, price: 35 }
];

const ServiceSelector = ({ selectedService, onServiceChange }: ServiceSelectorProps) => {
  return (
    <div>
      <Label htmlFor="service" className="text-base font-semibold mb-2 block">
        Selecciona el Servicio *
      </Label>
      <Select value={selectedService} onValueChange={onServiceChange}>
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
  );
};

export default ServiceSelector;
export { services };
