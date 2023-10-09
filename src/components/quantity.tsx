import { Minus, Plus } from '@phosphor-icons/react'

export function Quantity() {
  return (
    <div className="quantity">
      <button
        type="button"
        className="quantity__btn"
        aria-label="Diminuir quantidade"
      >
        <Minus size={14} />
      </button>

      <span className="quantity__value">1</span>

      <button
        type="button"
        className="quantity__btn"
        aria-label="Aumentar quantidade"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
