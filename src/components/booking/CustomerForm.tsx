
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail } from 'lucide-react';

interface CustomerFormProps {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

const CustomerForm = ({
  customerName,
  customerPhone,
  customerEmail,
  onNameChange,
  onPhoneChange,
  onEmailChange
}: CustomerFormProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name" className="text-base font-semibold mb-2 block">
          Nombre Completo *
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            value={customerName}
            onChange={(e) => onNameChange(e.target.value)}
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
            onChange={(e) => onPhoneChange(e.target.value)}
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
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="tu@email.com"
            className="pl-10"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
