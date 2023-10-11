import {
  Coffee as CoffeeIcon,
  Package,
  ShoppingCart,
  Timer,
} from '@phosphor-icons/react'
import backgroundImg from '../assets/background.png'
import coffeeDeliveryImg from '../assets/coffee-delivery-bg.png'
import { Button } from '../components/button'
import { Quantity } from '../components/quantity'

export function Index() {
  return (
    <div>
      <div className="relative mx-auto max-w-[1440px]">
        <img
          src={backgroundImg}
          className="absolute z-[-1]"
          alt=""
          role="presentation"
        />

        <div className="mx-auto max-w-[1120px]">
          <section className="flex gap-14 py-[5.75rem]">
            <div>
              <h1 className="mb-4 font-display text-5xl font-extrabold text-base-text">
                Encontre o café perfeito para qualquer hora do dia
              </h1>
              <p className="text-xl text-base-subtitle">
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </p>

              <ul className="mt-16 grid grid-cols-[repeat(2,_auto)] gap-x-10 gap-y-5">
                <li className="flex items-center gap-3 text-base-text">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-dark text-white">
                    <ShoppingCart size={16} weight="fill" />
                  </div>
                  Compra simples e segura
                </li>
                <li className="flex items-center gap-3 text-base-text">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-text text-white">
                    <Package size={16} weight="fill" />
                  </div>
                  Embalagem mantém o café intacto
                </li>
                <li className="flex items-center gap-3 text-base-text">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow text-white">
                    <Timer size={16} weight="fill" />
                  </div>
                  Entrega rápida e rastreada
                </li>
                <li className="flex items-center gap-3 text-base-text">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple text-white">
                    <CoffeeIcon size={16} weight="fill" />
                  </div>
                  O café chega fresquinho até você
                </li>
              </ul>
            </div>

            <img
              src={coffeeDeliveryImg}
              alt="Copo descartável da Coffee Delivery com grãos de café atrás"
            />
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px]">
        <section className="py-8">
          <h2 className="mb-4 font-display text-[2rem] font-extrabold text-base-text">
            Nossos cafés
          </h2>

          <ul className="mt-12 grid grid-cols-4 gap-x-8 gap-y-10">
            <CoffeeItem
              name="Expresso Tradicional"
              description="O tradicional café feito com água quente e grãos moídos"
              price={3.5}
              category={['tradicional']}
              imageUrl="/images/expresso.png"
            />
            <CoffeeItem
              name="Expresso Americano"
              description="Expresso diluído, menos intenso que o tradicional"
              price={3.5}
              category={['tradicional']}
              imageUrl="/images/americano.png"
            />
            <CoffeeItem
              name="Expresso Cremoso"
              description="Café expresso tradicional com espuma cremosa"
              price={4}
              category={['tradicional']}
              imageUrl="/images/expresso-cremoso.png"
            />
          </ul>
        </section>
      </div>
    </div>
  )
}

function CoffeeItem(props: any) {
  return (
    <li className="flex flex-col items-center rounded-[6px_36px] bg-base-card px-6 py-5">
      <img
        src={props.imageUrl}
        className="-mt-10 select-none"
        alt={props.name}
      />

      <div className="flex gap-1">
        {props.category.map((c: any) => (
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

      <form className="mt-auto flex w-full gap-2">
        <div className="flex w-full items-center gap-1">
          <span className="text-sm leading-loose text-base-text">R$</span>
          <p className="font-display text-2xl font-extrabold text-base-text">
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.price)}
          </p>
        </div>

        <Quantity />

        <Button type="submit" variant="icon" aria-label="Adicionar ao carrinho">
          <ShoppingCart size={20} weight="fill" />
        </Button>
      </form>
    </li>
  )
}
