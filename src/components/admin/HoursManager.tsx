
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useBooking } from '@/contexts/BookingContext';

const HoursManager = () => {
  const { availableHours, updateAvailableHours, addAvailableHour, removeAvailableHour } = useBooking();
  const [newHour, setNewHour] = useState('');

  // Todas las horas posibles de 00:00 a 23:00
  const allPossibleHours = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const handleToggleHour = (hour: string) => {
    if (availableHours.includes(hour)) {
      removeAvailableHour(hour);
      toast({
        title: "Hora deshabilitada",
        description: `La hora ${hour} ha sido deshabilitada.`,
      });
    } else {
      addAvailableHour(hour);
      toast({
        title: "Hora habilitada",
        description: `La hora ${hour} ha sido habilitada.`,
      });
    }
  };

  const handleAddCustomHour = () => {
    if (!newHour) {
      toast({
        title: "Error",
        description: "Por favor, ingresa una hora válida.",
        variant: "destructive",
      });
      return;
    }

    // Validar formato HH:MM
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(newHour)) {
      toast({
        title: "Error",
        description: "Formato de hora inválido. Use HH:MM (ej: 09:30).",
        variant: "destructive",
      });
      return;
    }

    addAvailableHour(newHour);
    setNewHour('');
    toast({
      title: "Hora añadida",
      description: `La hora ${newHour} ha sido añadida.`,
    });
  };

  const handleRemoveCustomHour = (hour: string) => {
    removeAvailableHour(hour);
    toast({
      title: "Hora eliminada",
      description: `La hora ${hour} ha sido eliminada.`,
    });
  };

  // Separar horas estándar (cada hora completa) de horas personalizadas
  const standardHours = availableHours.filter(hour => hour.endsWith(':00'));
  const customHours = availableHours.filter(hour => !hour.endsWith(':00'));

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Gestión de Horarios Disponibles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Horarios estándar (cada hora) */}
          <div>
            <h4 className="font-semibold mb-3">Horarios Estándar (cada hora)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {allPossibleHours.map((hour) => (
                <div key={hour} className="flex items-center space-x-2 p-2 rounded border">
                  <Switch
                    id={hour}
                    checked={availableHours.includes(hour)}
                    onCheckedChange={() => handleToggleHour(hour)}
                  />
                  <Label htmlFor={hour} className="text-sm font-medium">
                    {hour}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Horarios personalizados */}
          <div>
            <h4 className="font-semibold mb-3">Horarios Personalizados</h4>
            
            {/* Añadir nuevo horario */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <Label htmlFor="newHour" className="text-sm font-medium">
                  Nuevo horario (HH:MM)
                </Label>
                <Input
                  id="newHour"
                  type="time"
                  value={newHour}
                  onChange={(e) => setNewHour(e.target.value)}
                  placeholder="09:30"
                />
              </div>
              <Button onClick={handleAddCustomHour} className="mt-6">
                <Plus className="h-4 w-4 mr-2" />
                Añadir
              </Button>
            </div>

            {/* Lista de horarios personalizados */}
            {customHours.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-muted-foreground">
                  Horarios personalizados activos:
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {customHours.sort().map((hour) => (
                    <div key={hour} className="flex items-center justify-between p-2 rounded border bg-secondary/50">
                      <span className="text-sm font-medium">{hour}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCustomHour(hour)}
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resumen */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Total de horarios disponibles:</strong> {availableHours.length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Los horarios mostrados aquí serán los únicos disponibles para las reservas de los clientes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoursManager;
