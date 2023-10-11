import { cn } from '../utils/cn'

const variants = {
  primary:
    'w-full px-4 py-3 text-white bg-yellow hover:bg-yellow-dark font-bold text-sm',
  secondary:
    'p-2 text-xs fill-purple text-base-text bg-base-button hover:bg-base-hover',
  icon: 'p-2 text-[1.375rem] text-base-card bg-purple-dark hover:bg-purple',
}

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: keyof typeof variants
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-1 rounded-md uppercase transition-colors',
        'aria-busy:pointer-events-none aria-busy:cursor-wait aria-busy:opacity-60',
        variants[variant],
        className
      )}
      {...props}
    ></button>
  )
}
