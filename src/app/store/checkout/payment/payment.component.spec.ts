import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import { SharedModule } from '../../../shared/shared.module'
import { ShoppingCartService } from '../../../core/services/shopping-cart.service'
import { CartMock, CartTotalsMock } from '../../../core/mocks/shopping-cart.mock'
import { PaymentMethodMock } from '../../../core/mocks/payment-method.mock'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { LocalstorageMock } from '../../../core/mocks/localstorage.mock'

describe('PaymentComponent', () => {
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [ SharedModule, RouterTestingModule, ReactiveFormsModule ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    shoppingCartService = TestBed.inject(ShoppingCartService);
    fixture = TestBed.createComponent(PaymentComponent);
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

  it('should fetch totals on init', () => {
    component.ngOnInit();
    expect(component.totals).toEqual(CartTotalsMock);
  });

  it('should show error message if form is invalid', () => {
    component.formGroup.setValue({ ...PaymentMethodMock, cardNumber: 'invalid' });

    component.pay();

    expect(component.formGroup.invalid).toBeTrue();
    expect(component.errored).toBeTrue();
  });

  it('should redirect to success page if payment was valid', () => {
    component.formGroup.setValue(PaymentMethodMock);

    component.pay();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/checkout/success']);
  });
});
