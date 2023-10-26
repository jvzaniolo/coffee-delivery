import { Minus, Plus } from '@phosphor-icons/react'
import { useReducer } from 'react'

type State = { quantity: number }
type Action = 'increment' | 'decrement'

function quantityReducer(state: State, action: Action) {
  switch (action) {
    case 'increment': {
      return { quantity: state.quantity + 1 }
    }
    case 'decrement': {
      const quantity = state.quantity > 1 ? state.quantity - 1 : 1
      return { quantity }
    }
    default: {
      throw new Error('Action does not exist')
    }
  }
}

export function Quantity({ defaultValue = 1 }: { defaultValue?: number }) {
  const [state, dispatch] = useReducer(quantityReducer, {
    quantity: defaultValue,
  })

  return (
    <div className="inline-flex items-center gap-1 rounded-md bg-base-button p-1">
      <button
        type="button"
        className="rounded bg-transparent p-1 leading-none text-purple disabled:opacity-30"
        aria-label="Diminuir quantidade"
        onClick={() => dispatch('decrement')}
        disabled={state.quantity === 1}
      >
        <Minus size={14} />
      </button>

      <span className="text-base tabular-nums leading-none text-base-title">
        {state.quantity}
      </span>

      <button
        type="button"
        className="rounded bg-transparent p-1 leading-none text-purple disabled:opacity-30"
        aria-label="Aumentar quantidade"
        onClick={() => dispatch('increment')}
      >
        <Plus size={14} />
      </button>

      <input type="hidden" name="quantity" defaultValue={state.quantity} />
    </div>
  )
}
