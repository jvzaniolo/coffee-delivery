import {
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Trash,
} from '@phosphor-icons/react'
import { Fragment } from 'react'
import { Quantity } from '../components/quantity'
import { Button } from '../components/button'
import { cn } from '../utils/cn'

const taxFee = 3.5

const cart = [
  {
    product: {
      id: 1,
      name: 'Expresso Tradicional',
      description: 'O tradicional café feito com água quente e grãos moídos',
      price: 3.5,
      category: ['tradicional'],
      imageUrl: '/images/expresso.png',
    },
    quantity: 2,
    id: 1,
  },
  {
    product: {
      id: 7,
      name: 'Capuccino',
      description:
        'Bebida com canela feita de doses iguais de café, leite e espuma',
      price: 7,
      category: ['tradicional', 'com leite'],
      imageUrl: '/images/capuccino.png',
    },
    quantity: 1,
    id: 2,
  },
]

const cartTotal = 2 * 3.5 + 7

export function Checkout() {
  return (
    <form className="mx-auto grid max-w-[1120px] grid-cols-[1fr_400px] gap-8 py-10">
      <div>
        <h2 className="mb-4 font-display text-lg font-bold text-base-title">
          Complete seu pedido
        </h2>

        <fieldset className="rounded-md border-0 bg-base-card fill-yellow p-10">
          <div className="flex gap-2">
            <MapPinLine size={22} fill="inherit" />
            <div className="flex flex-col gap-[0.125rem]">
              <legend className="text-base-subtitle">
                Endereço de entrega
              </legend>
              <p className="text-sm text-base-text">
                Informe o endereço onde deseja receber seu pedido
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Input type="text" placeholder="CEP" className="basis-[200px]" />

            <Input type="text" placeholder="Rua" className="w-full" />

            <div className="flex w-full flex-wrap gap-4">
              <Input
                type="text"
                placeholder="Número"
                className="basis-[200px]"
              />
              <Input
                type="text"
                placeholder="Complemento"
                className="grow"
                optional
              />
            </div>

            <Input type="text" placeholder="Bairro" className="basis-[200px]" />
            <Input type="text" placeholder="Cidade" className="grow" />
            <Input type="text" placeholder="UF" className="w-[60px]" />
          </div>
        </fieldset>

        <fieldset className="mt-3 rounded-md border-0 bg-base-card fill-purple p-10">
          <div className="flex gap-2">
            <CurrencyDollar size={22} fill="inherit" />
            <div className="flex flex-col gap-[0.125rem]">
              <legend className="text-base-subtitle">Pagamento</legend>
              <p className="text-sm text-base-text">
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <RadioLabel>
              <CreditCard size={16} fill="inherit" />
              Cartão de crédito
              <input type="radio" value="credit-card" className="sr-only" />
            </RadioLabel>

            <RadioLabel>
              <CreditCard size={16} fill="inherit" />
              Cartão de débito
              <input type="radio" value="debit-card" className="sr-only" />
            </RadioLabel>

            <RadioLabel>
              <CreditCard size={16} fill="inherit" />
              Dinheiro
              <input type="radio" value="money" className="sr-only" />
            </RadioLabel>
          </div>
        </fieldset>
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-bold text-base-title">
          Cafés selecionados
        </h2>

        <section className="flex flex-col gap-6 rounded-[6px_36px] border-0 bg-base-card p-10">
          {cart.map((cartItem, index) => (
            <Fragment key={cartItem.id}>
              <CartItem {...cartItem} />

              {index + 1 !== cart.length && (
                <hr className="h-px border-0 bg-base-button" />
              )}
            </Fragment>
          ))}

          <hr className="h-px border-0 bg-base-button" />

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-base-text">
              <span>Total de itens</span>
              <span>
                R${' '}
                {new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cartTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-base-text">
              <span>Entrega</span>
              <span>
                R${' '}
                {new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(taxFee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xl font-bold text-base-subtitle">
              <span>Total</span>
              <span>
                R${' '}
                {new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cartTotal + taxFee)}
              </span>
            </div>
          </div>

          <div>
            <Button>Confirmar pedido</Button>
          </div>
        </section>
      </div>
    </form>
  )
}

export function RadioLabel(props: any) {
  return (
    <label
      className="inline-flex grow cursor-pointer select-none items-center gap-3 rounded-md border-2 border-base-button bg-base-button fill-purple p-4 text-xs uppercase text-base-text transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-yellow [&:has(input:checked)]:border-purple [&:has(input:checked)]:bg-purple-light"
      {...props}
    />
  )
}

function Input({ optional, error, className, ...props }: any) {
  return (
    <div className={cn('relative inline', className)}>
      <input
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
}

function CartItem(props: any) {
  return (
    <div className="flex items-center gap-5">
      <img
        width={64}
        height={64}
        src={props.product.imageUrl}
        alt={props.product.name}
      />

      <div className="flex grow flex-col gap-2">
        <div className="flex items-center justify-between gap-2 text-base-subtitle">
          <p>{props.product.name}</p>
          <span className="font-bold text-base-text">
            R${' '}
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.quantity * props.product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-base-subtitle">
          <Quantity />
          <Button type="button" variant="secondary">
            <Trash size={16} fill="inherit" />
            Remover
          </Button>
        </div>
      </div>
    </div>
  )
}
