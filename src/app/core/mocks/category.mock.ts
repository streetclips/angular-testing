import { Category } from '../models/category'

export const CategoryAMock: Category = {
  id: 1,
  name: 'Category 1',
  image: 'https://picsum.photos/200/300',
  creationAt: "2021-01-01T00:00:00.000Z",
}

export const CategoryBMock: Category = {
  id: 2,
  name: 'Category 2',
  image: 'https://picsum.photos/200/300',
  creationAt: "2021-01-02T00:00:00.000Z",
}

export const CategoriesMock: Category[] = [CategoryAMock, CategoryBMock]
