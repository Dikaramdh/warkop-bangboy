import { ButtonHTMLAttributes, cloneElement, forwardRef, isValidElement, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/70 disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-amber-700 text-amber-50 hover:bg-amber-800 shadow-sm hover:shadow-md': variant === 'default',
        'bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md': variant === 'destructive',
        'border border-amber-300 bg-white text-amber-900 hover:bg-amber-50': variant === 'outline',
        'bg-amber-100 text-amber-900 hover:bg-amber-200': variant === 'secondary',
      },
      {
        'h-10 px-4 py-2': size === 'default',
        'h-9 rounded-lg px-3': size === 'sm',
        'h-11 rounded-xl px-8 text-base': size === 'lg',
      },
      className
    )

    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        className: cn(classes, (children.props as { className?: string }).className),
      })
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
