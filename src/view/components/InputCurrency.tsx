import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';

interface InputCurrencyProps {
  error?: string;
  onChange?(value: string): void;
  value?: string| number;
}

export function InputCurrency({ error, value, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className='w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none'
        onChange={event => onChange?.(event.target.value)}
        value={value}
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
      />

      {error && (
        <div className="flex gap-1 items-center  mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}