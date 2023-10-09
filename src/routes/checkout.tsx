import {
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Trash,
} from '@phosphor-icons/react'
import { Fragment } from 'react'
import { Quantity } from '../components/quantity'

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
    <form className="checkout">
      <div>
        <h2 className="checkout__title">Complete seu pedido</h2>

        <fieldset className="section address">
          <div className="section__header">
            <MapPinLine size={22} fill="inherit" />
            <div className="section__header-content">
              <legend className="section__title">Endereço de entrega</legend>
              <p className="section__description">
                Informe o endereço onde deseja receber seu pedido
              </p>
            </div>
          </div>

          <div className="payment__form" style={{ marginTop: '2rem' }}>
            <Input
              type="text"
              placeholder="CEP"
              style={{ flexBasis: '200px' }}
            />

            <Input type="text" placeholder="Rua" style={{ width: '100%' }} />

            <div className="payment__form" style={{ width: '100%' }}>
              <Input
                type="text"
                placeholder="Número"
                style={{ flexBasis: '200px' }}
              />
              <Input
                type="text"
                placeholder="Complemento"
                optional
                style={{ flex: '1' }}
              />
            </div>

            <Input
              type="text"
              placeholder="Bairro"
              style={{ flexBasis: '200px' }}
            />
            <Input type="text" placeholder="Cidade" style={{ flexGrow: '1' }} />
            <Input type="text" placeholder="UF" style={{ width: '60px' }} />
          </div>
        </fieldset>

        <fieldset className="section payment">
          <div className="section__header">
            <CurrencyDollar size={22} fill="inherit" />
            <div className="section__header-content">
              <legend className="section__title">Pagamento</legend>
              <p className="section__description">
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </p>
            </div>
          </div>

          <div className="payment__content">
            <label className="radio__label">
              <CreditCard size={16} fill="inherit" />
              Cartão de crédito
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                className="radio__input"
              />
            </label>

            <label className="radio__label">
              <CreditCard size={16} fill="inherit" />
              Cartão de débito
              <input
                type="radio"
                name="paymentMethod"
                value="debit-card"
                className="radio__input"
              />
            </label>

            <label className="radio__label">
              <CreditCard size={16} fill="inherit" />
              Dinheiro
              <input
                type="radio"
                name="paymentMethod"
                value="money"
                className="radio__input"
              />
            </label>
          </div>
        </fieldset>
      </div>

      <div>
        <h2 className="checkout__title">Cafés selecionados</h2>

        <section className="section cart">
          {cart.map((cartItem, index) => (
            <Fragment key={cartItem.id}>
              <CartItem {...cartItem} />

              {index + 1 !== cart.length && <hr className="cart__separator" />}
            </Fragment>
          ))}

          <hr className="cart__separator" />

          <div>
            <div className="cart__info">
              <span>Total de itens</span>
              <span>
                R${' '}
                {new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(cartTotal)}
              </span>
            </div>
            <div className="cart__info">
              <span>Entrega</span>
              <span>
                R${' '}
                {new Intl.NumberFormat('pt-br', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(taxFee)}
              </span>
            </div>
            <div className="cart__info">
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
            <button className="btn--primary">Confirmar pedido</button>
          </div>
        </section>
      </div>
    </form>
  )
}

function Input({ optional, error, style, ...props }: any) {
  return (
    <div className="input__control" style={style}>
      <input
        className="input"
        {...props}
        aria-invalid={error ? 'true' : 'false'}
      />
      {optional && <span className="input__message">Opcional</span>}
      {error && (
        <p className="input__error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function CartItem(props: any) {
  return (
    <div className="cart-item">
      <img
        width={64}
        height={64}
        src={props.product.imageUrl}
        alt={props.product.name}
      />

      <div className="cart-item__content">
        <div
          className="cart-item__content-row"
          style={{
            justifyContent: 'space-between',
          }}
        >
          <p>{props.product.name}</p>
          <span className="cart-item__price">
            R${' '}
            {new Intl.NumberFormat('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(props.quantity * props.product.price)}
          </span>
        </div>

        <div className="cart-item__content-row">
          <Quantity />
          <button type="button" className="btn--secondary">
            <Trash size={16} fill="inherit" />
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}
