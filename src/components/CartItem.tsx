import { Trash } from '@phosphor-icons/react'

import { Quantity } from './Quantity'
import { Button } from './Button'
import { CartItem as CartItemProps } from '../@types/CartItem'
import { useCart } from '../hooks/useCart'

export function CartItem(props: CartItemProps) {
  const { updateCartItem, removeFromCart } = useCart()

  return (
    <div className="flex items-center gap-5">
      <img
        width={64}
        height={64}
        src={props.product.imageUrl}
        alt={props.product.name}
      />

      <div className="flex grow flex-col gap-2 overflow-hidden">
        <div className="flex items-center justify-between gap-1 text-base-subtitle">
          <p className=" overflow-hidden text-ellipsis whitespace-nowrap">
            {props.product.name}
          </p>
          <span className="whitespace-nowrap font-bold text-base-text">
            R${' '}
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.quantity * props.product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-base-subtitle">
          <Quantity
            value={props.quantity}
            onChange={quantity =>
              updateCartItem.mutate({ id: props.id, quantity })
            }
          />

          <Button
            type="button"
            variant="secondary"
            onClick={() => removeFromCart.mutate(props.id)}
            aria-busy={removeFromCart.isPending}
            disabled={removeFromCart.isPending}
          >
            <Trash size={16} fill="inherit" />
            Remover
          </Button>
        </div>
      </div>
    </div>
  )
}
