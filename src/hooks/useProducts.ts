import { useQuery } from '@tanstack/react-query'
import { Coffee } from '../@types/Coffee'

async function getProducts() {
  return fetch('http://localhost:3333/product').then(res => res.json())
}

export function useProducts() {
  const result = useQuery<Coffee[]>({
    queryKey: ['product'],
    queryFn: getProducts,
  })

  return result
}
