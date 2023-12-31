import { MapPin, ShoppingCart } from '@phosphor-icons/react'
import { Link, Outlet } from 'react-router-dom'
import { useCart } from './hooks/useCart'

export function RootLayout() {
  const { data: cart } = useCart()

  return (
    <>
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-8">
        <Link to="/" className="rounded-md p-2">
          <img src="/images/logo.svg" alt="Coffee Delivery" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-md bg-purple-light fill-purple p-2 text-sm">
            <MapPin size={22} weight="fill" fill="inherit" />
            <span>Ribeirão Preto, SP</span>
          </div>

          <Link
            to="/checkout"
            className="relative flex items-center justify-center rounded-lg bg-yellow-light p-2 leading-none text-yellow-dark"
          >
            <ShoppingCart size={22} weight="fill" />
            {cart ? (
              <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-yellow-dark px-[0.4rem] py-1 text-xs font-bold tabular-nums leading-none text-white">
                {cart.length}
              </span>
            ) : null}
          </Link>
        </div>
      </header>

      <Outlet />
    </>
  )
}
