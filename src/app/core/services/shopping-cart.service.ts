import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Product } from '../models/product'
import { LocalStorageService } from './local-storage.service'
import { CartItem } from '../models/cart-item'
import { CartTotals } from '../models/cart-totals'

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart = new BehaviorSubject<CartItem[]>(this.getCart());
  totals = new BehaviorSubject<CartTotals>(this.getTotals());

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  getCart(): CartItem[] {
    const token = this.localStorageService.get('access_token');
    return this.localStorageService.get('cart_' + token) || [];
  }

  updateCart(cart: CartItem[]) {
    const token = this.localStorageService.get('access_token');
    this.localStorageService.set('cart_' + token, cart);
    this.cart.next(cart);
    this.calculateTotals();
  }

  addItem(product: Product, quantity: number) {
    const cart = this.getCart();
    const index = cart.findIndex((cartItem: CartItem) => cartItem.product.id === product.id);
    if (index === -1) {
      cart.push({
        product: product,
        quantity
      });
    } else {
      cart[index].quantity += quantity;
    }
    this.updateCart(cart);
  }

  updateItem(product: Product, quantity: number) {
    const cart = this.getCart();
    const index = cart.findIndex((cartItem: CartItem) => cartItem.product.id === product.id);
    if (index !== -1) {
      if (quantity === 0) {
        this.removeItem(product);
      } else {
        cart[index].quantity = quantity;
        this.updateCart(cart);
      }
    }
  }

  removeItem(product: Product) {
    const cart = this.getCart();
    const index = cart.findIndex((cartItem: CartItem) => cartItem.product.id === product.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    this.updateCart(cart);
  }

  getTotals(): CartTotals {
    const cart = this.getCart();
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = total * 0.21;
    const subtotal = total - tax;
    return { total, tax, subtotal };
  }

  calculateTotals() {
    this.totals.next(this.getTotals());
  }
}
