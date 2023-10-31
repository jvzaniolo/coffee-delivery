import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Coffee } from '../@types/Coffee'
import { CartItem } from '../@types/CartItem'
import toast from 'react-hot-toast'
import { useRef } from 'react'

async function getCart() {
  return fetch('http://localhost:3333/cart').then(res => res.json())
}

async function createCartItem(payload: { quantity: number; product: Coffee }) {
  return fetch('http://localhost:3333/cart/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(res => res.json())
}

async function updateCartItemQuantity(id: number, quantity: number) {
  return fetch('http://localhost:3333/cart/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  }).then(res => res.json())
}

export function useCart() {
  const toastId = useRef('')
  const queryClient = useQueryClient()
  const result = useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: getCart,
  })

  const addToCart = useMutation({
    mutationFn: (payload: { quantity: number; product: Coffee }) => {
      toastId.current = toast.loading('Adicionando ao carinho...')
      const hasItem = result.data?.find(
        item => item.product.id === payload.product.id
      )

      if (hasItem) {
        return updateCartItemQuantity(
          hasItem.id,
          hasItem.quantity + payload.quantity
        )
      }

      return createCartItem(payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Item adicionado ao carrinho', { id: toastId.current })
    },
  })

  return { addToCart, ...result }
}
