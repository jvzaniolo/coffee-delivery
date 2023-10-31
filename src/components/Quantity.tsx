import { Minus, Plus } from '@phosphor-icons/react'
import { useState } from 'react'

export function Quantity({
  value,
  onChange,
  defaultValue = 1,
}: {
  defaultValue?: number
  value?: number
  onChange?: (quantity: number) => void
}) {
  const [quantity, setQuantity] = useState(defaultValue)
  // If this is a Controlled input,
  // Use the `value` prop
  // Otherwise, use the internal state `quantity`
  const state = value ?? quantity

  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-base-button p-1">
      <button
        type="button"
        className="rounded bg-transparent p-1 leading-none text-purple disabled:opacity-30"
        aria-label="Diminuir quantidade"
        onClick={() => {
          setQuantity(quantity - 1)
          onChange?.(quantity - 1)
        }}
        disabled={quantity === 1}
      >
        <Minus size={14} />
      </button>

      <span className="text-base tabular-nums leading-none text-base-title">
        {state}
      </span>

      <button
        type="button"
        className="rounded bg-transparent p-1 leading-none text-purple disabled:opacity-30"
        aria-label="Aumentar quantidade"
        onClick={() => {
          setQuantity(quantity + 1)
          onChange?.(quantity + 1)
        }}
      >
        <Plus size={14} />
      </button>

      <input type="hidden" name="quantity" defaultValue={state} />
    </div>
  )
}
