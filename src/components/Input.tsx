import {
  useState,
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
  type ChangeEvent,
} from 'react'
import { cn } from '../utils/cn'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  optional?: boolean
  error?: ReactNode
  mask?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { optional, error, className, ...props },
  ref,
) {
  return (
    <div className={cn('relative inline', className)}>
      <input
        ref={ref}
        className="w-full rounded border border-base-button bg-base-input p-3 text-sm text-base-text placeholder:text-base-label"
        {...props}
        aria-invalid={error ? 'true' : 'false'}
      />
      {optional && (
        <span className="pointer-events-none absolute bottom-0 right-3 top-1/2 -translate-y-1/2 text-xs italic leading-6 text-base-label">
          Opcional
        </span>
      )}
      {error && (
        <p className="mt-2 pl-[0.125rem] text-xs text-yellow-dark" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

function maskCEP(text: string) {
  return text.replace(/(\d{5})(\d{3})/, '$1-$2')
}

export const CepInput = forwardRef<HTMLInputElement, InputProps>(
  function CepInput({ value, onChange, defaultValue, ...props }, ref) {
    const [_value, _setValue] = useState((value ?? defaultValue) || '')

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const text = maskCEP(event.target.value)
      _setValue(text)
      onChange?.(event)
    }

    return <Input ref={ref} value={_value} onChange={handleChange} {...props} />
  },
)
