
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface DateTimeSelectorProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  availableTimeSlots: string[];
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
}

const DateTimeSelector = ({ 
  selectedDate, 
  selectedTime, 
  availableTimeSlots, 
  onDateChange, 
  onTimeChange 
}: DateTimeSelectorProps) => {
  return (
    <>
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
              onSelect={onDateChange}
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
        <Select value={selectedTime} onValueChange={onTimeChange}>
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
    </>
  );
};

export default DateTimeSelector;
