import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface ButtonProps extends ComponentProps<'button'> {}

export function Button ({ className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn("bg-teal-900 font-medium text-white disabled:cursor-not-allowed disabled:text-gray-400 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl transition-all active:bg-teal-900 hover:cursor-pointer", className)} />
  )
}