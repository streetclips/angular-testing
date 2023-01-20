import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { CoreModule } from '../core.module'
import { LocalstorageMock } from '../mocks/localstorage.mock'
import { CartItemAMock, CartItemBMock, CartMock, CartTotalsMock } from '../mocks/shopping-cart.mock'
import { ProductAMock } from '../mocks/product.mock'
import { CartItem } from '../models/cart-item'
import { Product } from '../models/product'

describe('ShoppingCartService', () => {
  let shoppingCartService: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        ShoppingCartService,
        { provide: 'LOCAL_STORAGE', useValue: LocalstorageMock }
      ]
    });

    shoppingCartService = TestBed.inject(ShoppingCartService);

    LocalstorageMock.mock()
    LocalstorageMock.clear()
    shoppingCartService.updateCart(CartMock);
  });

  afterAll(() => {
    LocalstorageMock.clear()
  })

  it('should be created', () => {
    expect(shoppingCartService).toBeTruthy();
  });

  it('should get cart', () => {
    const cart = shoppingCartService.getCart();
    expect(cart).toEqual(CartMock);
  });

  it('should update cart', () => {
    shoppingCartService.updateCart([CartItemAMock]);
    const cart = shoppingCartService.getCart();
    expect(cart).toEqual([CartItemAMock]);
  });

  it('should add item to cart', () => {
    const newProduct: Product = { ...ProductAMock, id: 3 }
    shoppingCartService.addItem(newProduct, 5);

    const cart = shoppingCartService.getCart();
    expect(cart).toEqual([...CartMock, { product: newProduct, quantity: 5 }]);
  });

  it('should add quantity if product already exist in cart', () => {
    shoppingCartService.addItem(ProductAMock, 5);

    const cart = shoppingCartService.getCart();
    const result = CartMock.map((cartItem: CartItem) => {
      if (cartItem.product.id === ProductAMock.id) {
        return { ...cartItem, quantity: cartItem.quantity + 5 }
      }
      return cartItem;
    });

    expect(cart).toEqual(result);
  });

  it('should update cart item', () => {
    shoppingCartService.updateItem(ProductAMock, 5);

    const cart = shoppingCartService.getCart();
    const result = CartMock.map((cartItem: CartItem) => {
      if (cartItem.product.id === ProductAMock.id) {
        return { ...cartItem, quantity: 5 }
      }
      return cartItem;
    });

    expect(cart).toEqual(result);
  });

  it('should remove cart item', () => {
    shoppingCartService.removeItem(ProductAMock);

    const cart = shoppingCartService.getCart();
    expect(cart).toEqual([CartItemBMock]);
  });

  it('should get total', () => {
    const totals = shoppingCartService.getTotals();
    expect(totals).toEqual(CartTotalsMock);
  });
});
