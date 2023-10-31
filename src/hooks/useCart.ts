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

async function updateCartItemQuantity(payload: {
  id: number
  quantity: number
}) {
  return fetch('http://localhost:3333/cart/' + payload.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity: payload.quantity }),
  }).then(res => res.json())
}

async function removeCartItem(id: number) {
  return fetch('http://localhost:3333/cart/' + id, {
    method: 'DELETE',
  })
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
        return updateCartItemQuantity({
          id: hasItem.id,
          quantity: hasItem.quantity + payload.quantity,
        })
      }

      return createCartItem(payload)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Item adicionado ao carrinho', {
        id: toastId.current,
        duration: 2000,
      })
    },
    onError: () => {
      toast.error('Não foi possível adicionar o item', {
        id: toastId.current,
        duration: 4000,
      })
    },
  })

  const removeFromCart = useMutation({
    mutationFn: removeCartItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  // const updateCartItem = useMutation({
  //   mutationFn: updateCartItemQuantity,
  //   onSuccess: async () => {
  //     await queryClient.invalidateQueries({ queryKey: ['cart'] })
  //   },
  // })

  const updateCartItemOptimistic = useMutation({
    mutationFn: updateCartItemQuantity,
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ['cart'] })

      const previousCart = result.data

      queryClient.setQueryData<CartItem[]>(
        ['cart'],
        old => old?.map(item => (item.id === id ? { ...item, quantity } : item))
      )

      return { previousCart }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['cart'], context?.previousCart)
      toast.error('Não foi possível atualizar a quantidade do item')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })

  return { addToCart, removeFromCart, updateCartItemOptimistic, ...result }
}
