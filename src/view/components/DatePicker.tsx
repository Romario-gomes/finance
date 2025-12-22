import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { capitalizeFirstLetter } from '../../app/utils/capitalizeFirstLetter';

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      mode="single"
      selected={value}
      onSelect={(date) => onChange?.(date ?? new Date())}
      formatters={{
        formatCaption: (date, options) =>
          capitalizeFirstLetter(format(date, 'LLLL yyyy', options)),
      }}
    />
  );
}
