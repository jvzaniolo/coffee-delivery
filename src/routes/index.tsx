import {
  Coffee as CoffeeIcon,
  Package,
  ShoppingCart,
  Timer,
} from '@phosphor-icons/react'
import backgroundImg from '../assets/background.png'
import coffeeDeliveryImg from '../assets/coffee-delivery-bg.png'
import { Quantity } from '../components/quantity'

export function Index() {
  return (
    <div className="home-page">
      <div className="hero">
        <img
          src={backgroundImg}
          className="hero__bg-image"
          alt=""
          role="presentation"
        />

        <div className="hero__container">
          <section className="hero__hero-sect">
            <div>
              <h1 className="hero__title">
                Encontre o café perfeito para qualquer hora do dia
              </h1>
              <p className="hero__description">
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </p>

              <ul className="hero__feature-list">
                <li className="hero__feature">
                  <div className="hero__feature-icon">
                    <ShoppingCart size={16} weight="fill" />
                  </div>
                  Compra simples e segura
                </li>
                <li className="hero__feature">
                  <div className="hero__feature-icon">
                    <Package size={16} weight="fill" />
                  </div>
                  Embalagem mantém o café intacto
                </li>
                <li className="hero__feature">
                  <div className="hero__feature-icon">
                    <Timer size={16} weight="fill" />
                  </div>
                  Entrega rápida e rastreada
                </li>
                <li className="hero__feature">
                  <div className="hero__feature-icon">
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

      <div className="coffee-list__container">
        <section className="coffee-list__section">
          <h2 className="coffee-list__subtitle">Nossos cafés</h2>

          <ul className="coffee-list">
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
    <li className="coffee-item">
      <img src={props.imageUrl} className="coffee-item__img" alt={props.name} />

      <div className="coffee-item__category-container">
        {props.category.map((c: any) => (
          <div key={c} className="coffee-item__category">
            {c}
          </div>
        ))}
      </div>

      <h3 className="coffee-item__title">{props.name}</h3>
      <p className="coffee-item__description">{props.description}</p>

      <form className="coffee-item__form">
        <div className="coffee-item__price">
          <span className="coffee-item__price-label">R$</span>
          <p className="coffee-item__price-value">
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.price)}
          </p>
        </div>

        <Quantity />

        <button
          type="submit"
          className="btn--icon"
          aria-label="Adicionar ao carrinho"
        >
          <ShoppingCart size={20} weight="fill" />
        </button>
      </form>
    </li>
  )
}
