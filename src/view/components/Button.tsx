import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isPending?: boolean;
  variant?: 'danger' | 'ghost';
}

export function Button ({ className, isPending, disabled, children, variant, ...props }: ButtonProps) {
  return (
    <button {...props} disabled={isPending || disabled} className={cn("bg-teal-900 font-medium text-white disabled:cursor-not-allowed disabled:text-gray-400 hover:bg-teal-800 disabled:bg-gray-200 px-6 h-12 rounded-2xl transition-all active:bg-teal-900 hover:cursor-pointer flex items-center justify-center", variant === 'danger' && 'bg-red-900 hover:bg-red-800', variant === 'ghost' && 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/10', className)}>
      { !isPending && children  }
      { isPending && <Spinner className="W-6 h-6"/> }
    </button>
  )
}