import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Product } from '../models/product'
import { SearchParams } from '../models/search-params'
import { Category } from '../models/category'
import { PaginationParams } from '../models/pagination-params'
import { environment } from '../../../environments/environment'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public readonly url = environment.apiUrl;
  public readonly productsPath = '/products';
  public readonly categoriesPath = '/categories';

  constructor(private http: HttpClient) { }

  searchProducts(search?: SearchParams, pagination?: PaginationParams) {
    let params = new HttpParams()

    if (search) {
      const { title, priceRange, category } = search;

      if (title) {
        params = params.append('title', title);
      }

      if (category && category >= 0) {
        params = params.append('categoryId', category);
      }

      if (priceRange) {
        const priceRangeArray = priceRange?.length ? priceRange.split(',') : [];
        if (priceRangeArray.length > 1) {
          params = params.append('price_min', priceRangeArray[0]);
          params = params.append('price_max', priceRangeArray[1]);
        }
      }
    }

    if (pagination) {
      const { offset, limit } = pagination;
      params = params.append('limit', limit);
      params = params.append('offset', offset);
    }

    return this.http.get<Product[]>(`${this.url}${this.productsPath}?${params.toString()}`);
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.url}${this.categoriesPath}`);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.url}${this.productsPath}/${id}`)
  }

  getCategory(id: number) {
    return this.http.get<Category>(`${this.url}${this.categoriesPath}/${id}`)
  }

  getProductPrice(id: number) {
    return this.http.get<Product>(`${this.url}${this.productsPath}/${id}`, {
      headers: { 'X-Loader': 'false' }
    }).pipe(map(product => product.price))
  }
}
