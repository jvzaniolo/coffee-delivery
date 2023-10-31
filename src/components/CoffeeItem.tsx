import { ShoppingCart } from '@phosphor-icons/react'

import { Quantity } from './Quantity'
import { Button } from './Button'
import { Coffee } from '../@types/Coffee'
import { useCart } from '../hooks/useCart'

export function CoffeeItem(props: Coffee) {
  const { addToCart } = useCart()

  function handleAddToCart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const quantity = formData.get('quantity')

    if (typeof quantity !== 'string') return

    addToCart.mutate({
      quantity: Number(quantity),
      product: props,
    })
  }

  return (
    <li className="flex flex-col items-center rounded-[6px_36px] bg-base-card px-6 py-5">
      <img
        src={props.imageUrl}
        className="-mt-10 select-none"
        alt={props.name}
      />

      <div className="flex gap-1">
        {props.category.map(c => (
          <div
            key={c}
            className="mt-3 rounded-full bg-yellow-light px-2 py-1 text-[0.625rem] font-bold uppercase text-yellow-dark"
          >
            {c}
          </div>
        ))}
      </div>

      <h3 className="mb-2 mt-4 font-display text-xl font-bold text-base-subtitle">
        {props.name}
      </h3>
      <p className="mb-8 text-center text-sm text-base-label">
        {props.description}
      </p>

      <form className="mt-auto flex w-full gap-2" onSubmit={handleAddToCart}>
        <div className="flex w-full items-start gap-1">
          <span className="text-sm leading-loose text-base-text">R$</span>
          <p className="font-display text-2xl font-extrabold text-base-text">
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.price)}
          </p>
        </div>

        <Quantity />

        <Button
          type="submit"
          variant="icon"
          aria-label="Adicionar ao carrinho"
          aria-busy={addToCart.isPending}
        >
          <ShoppingCart size={20} weight="fill" />
        </Button>
      </form>
    </li>
  )
}
