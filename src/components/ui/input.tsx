import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// Solution 1: Use type alias instead of interface
type InputProps = InputHTMLAttributes<HTMLInputElement>


const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-xl border border-amber-200 bg-amber-50/40 px-3 py-2 text-sm text-amber-950 placeholder:text-amber-500/70 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
