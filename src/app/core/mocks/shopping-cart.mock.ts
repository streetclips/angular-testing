import { CartItem } from '../models/cart-item'
import { ProductAMock, ProductBMock } from './product.mock'
import { CartTotals } from '../models/cart-totals'

export const CartItemAMock: CartItem = {
  product: ProductAMock,
  quantity: 1
}

export const CartItemBMock: CartItem = {
  product: ProductBMock,
  quantity: 2
}

export const CartMock: CartItem[] = [CartItemAMock, CartItemBMock]

const total = (ProductAMock.price * CartItemAMock.quantity) + (ProductBMock.price * CartItemBMock.quantity)
const tax = total * 0.21
const subtotal = total - tax

export const CartTotalsMock: CartTotals = { total, tax, subtotal }
