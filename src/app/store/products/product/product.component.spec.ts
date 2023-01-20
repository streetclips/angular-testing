import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../../../shared/shared.module'
import { ProductsService } from '../../../core/services/products.service'
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductAMock } from '../../../core/mocks/product.mock'
import { of } from 'rxjs'
import { ShoppingCartService } from '../../../core/services/shopping-cart.service'
import { AuthService } from '../../../core/services/auth.service'
import { AuthMock } from '../../../core/mocks/user.mock'
import { LocalstorageMock } from '../../../core/mocks/localstorage.mock'

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductsService;
  let activatedRoute: ActivatedRoute;
  let shoppingCartService: ShoppingCartService;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: () => ({
            params: of({ id: 1 }),
            paramMap: of({ get: () => 1 })
          })
        }
      ]
    })
    .compileComponents();

    productService = TestBed.inject(ProductsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    shoppingCartService = TestBed.inject(ShoppingCartService);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    LocalstorageMock.mock();
    LocalstorageMock.clear();
  });

  afterAll(() => {
    LocalstorageMock.clear()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get url param id',() => {
    spyOn(activatedRoute.paramMap, 'subscribe');
    spyOn(productService, 'getProduct').and.returnValue(of(ProductAMock));

    component.ngOnInit();
    fixture.detectChanges();

    expect(activatedRoute.paramMap.subscribe).toHaveBeenCalled();
  });

  it('should get product with url param id',() => {
    spyOn(productService, 'getProduct').and.returnValue(of(ProductAMock));

    component.ngOnInit();
    fixture.detectChanges();

    expect(productService.getProduct).toHaveBeenCalledWith(1)
    expect(component.product).toEqual(ProductAMock)
  });

  it('should add product to cart',() => {
    spyOn(shoppingCartService, 'addItem')

    // simulate user logged in
    authService.setTokens(AuthMock.access_token, AuthMock.refresh_token);

    component.product = ProductAMock;
    component.addProductToCart();
    fixture.detectChanges();

    expect(shoppingCartService.addItem).toHaveBeenCalledWith(ProductAMock, 1)
  });

  it('should not add product to cart if user is not logged in',() => {
    spyOn(shoppingCartService, 'addItem')
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.product = ProductAMock;
    component.addProductToCart();
    fixture.detectChanges();

    expect(shoppingCartService.addItem).toHaveBeenCalledTimes(0)
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login'])
  });

  it('should get cart item quantity',(done) => {
    component.product = ProductAMock;

    // simulate user logged in
    authService.setTokens(AuthMock.access_token, AuthMock.refresh_token);

    shoppingCartService.addItem(ProductAMock, 1);
    fixture.detectChanges();

    component.getQuantity().subscribe(quantity => {
      expect(quantity).toEqual(1)
      done();
    })
  });

  it('should remove product from cart',() => {
    component.product = ProductAMock;

    // simulate user logged in
    authService.setTokens(AuthMock.access_token, AuthMock.refresh_token);

    shoppingCartService.addItem(ProductAMock, 1);
    fixture.detectChanges();

    component.removeProductFromCart();
    fixture.detectChanges();

    expect(shoppingCartService.getCart().length).toEqual(0)
  });
});
