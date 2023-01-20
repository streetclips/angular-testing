import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartResumeComponent } from './cart-resume.component';
import { SharedModule } from '../../../shared/shared.module'
import { ShoppingCartService } from '../../../core/services/shopping-cart.service'
import { CartMock, CartTotalsMock } from '../../../core/mocks/shopping-cart.mock'
import { RouterTestingModule } from '@angular/router/testing'
import { LocalstorageMock } from '../../../core/mocks/localstorage.mock'

describe('CartResumeComponent', () => {
  let component: CartResumeComponent;
  let fixture: ComponentFixture<CartResumeComponent>;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartResumeComponent ],
      imports: [ SharedModule, RouterTestingModule ]
    })
    .compileComponents();

    shoppingCartService = TestBed.inject(ShoppingCartService);
    fixture = TestBed.createComponent(CartResumeComponent);
    component = fixture.componentInstance;

    LocalstorageMock.mock()
    LocalstorageMock.clear()

    shoppingCartService.cart.next(CartMock);
    shoppingCartService.totals.next(CartTotalsMock);

    fixture.detectChanges();
  });

  afterAll(() => {
    LocalstorageMock.clear()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cart items and totals on init', () => {
    component.ngOnInit();
    expect(component.cartItems).toEqual(CartMock);
    expect(component.totals).toEqual(CartTotalsMock);
  })

  it('should show payment button if total is greater than 0', () => {
    expect(fixture.nativeElement.querySelector('#payment-btn')).toBeTruthy();
  })

  it('should hide payment button if total is 0', () => {
    shoppingCartService.totals.next({ ...CartTotalsMock, total: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#payment-btn')).toBeFalsy();
  })
});
