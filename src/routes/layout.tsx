import { MapPin, ShoppingCart } from '@phosphor-icons/react'

export function Layout({ children }: any) {
  return (
    <>
      <header className="header">
        <a href="/" className="header__link">
          <img src="/images/logo.svg" alt="Coffee Delivery" />
        </a>

        <div className="header__content">
          <div className="header__locale">
            <MapPin size={22} weight="fill" fill="inherit" />
            <span>Ribeirão Preto, SP</span>
          </div>

          <a href="/checkout" className="header__cart-link">
            <ShoppingCart size={22} weight="fill" />
            <span className="header__cart-link-badge">2</span>
          </a>
        </div>
      </header>

      {children}
    </>
  )
}
