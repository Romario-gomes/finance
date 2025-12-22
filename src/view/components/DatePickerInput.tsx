import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  error?: string;
  className?: string;
}


export function DatePickerInput({ error, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <Popover.Root>

        <Popover.Trigger>
          <button type="button" className={cn("rbg-white  w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700  focus:border-gray-800 transition-all outline-none text-left relative pt-4",
            className,
            error && '!border-red-900'
          )}>
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">Data</span>
            <span>{formatDate(selectedDate)}</span>

            {error && (
              <div className="flex gap-1 items-center  mt-1 text-red-900">
                <CrossCircledIcon />
                <span className="text-xs">{error}</span>
              </div>
            )}
          </button>

        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={date => setSelectedDate(date)} />
        </Popover.Content>
      </Popover.Root>

    </div>
  )
}