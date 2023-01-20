import { Category } from './category'

export interface Product {
  category: Category;
  creationAt: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  title: string;
  updatedAt: string;
}
