import { Product } from '../models/product'
import { CategoryAMock, CategoryBMock } from './category.mock'

export const ProductAMock: Product = {
  id: 1,
  title: 'Product 1',
  price: 1,
  description: 'Product 1 description',
  category: CategoryAMock,
  images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/500'],
  creationAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z"
}

export const ProductBMock: Product = {
  id: 2,
  title: 'Product 2',
  price: 2,
  description: 'Product 2 description',
  category: CategoryBMock,
  images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/500'],
  creationAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z"
}

export const ProductsMock: Product[] = [ProductAMock, ProductBMock]
