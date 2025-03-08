export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  sizes: string[]
  colors: string[]
  imageUrl: string
  isNew?: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  size: string
  color: string
}

export interface Cart {
  _id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

