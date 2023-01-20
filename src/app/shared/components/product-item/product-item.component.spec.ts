import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';
import { SharedModule } from '../../shared.module'
import { ProductsService } from '../../../core/services/products.service'
import { of } from 'rxjs'
import { ProductAMock, ProductBMock } from '../../../core/mocks/product.mock'
import { SimpleChange } from '@angular/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let productsService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductItemComponent ],
      imports: [ SharedModule, HttpClientTestingModule ]
    })
    .compileComponents();

    productsService = TestBed.inject(ProductsService)
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update price if category is 2', () => {
    spyOn(productsService, 'getProductPrice').and.returnValue(of(100))
    component.product = Object.assign({}, ProductAMock) // avoid reference
    component.ngOnChanges({
      product: <SimpleChange>{ currentValue: ProductBMock }
    })

    expect(productsService.getProductPrice).toHaveBeenCalled()
    expect(component.product?.price).toBe(100)
  });

  it('should not update price if category is not 2', () => {
    spyOn(productsService, 'getProductPrice').and.returnValue(of(100))
    component.product = ProductAMock
    component.ngOnChanges({
      product: <SimpleChange>{ currentValue: ProductAMock }
    })

    expect(productsService.getProductPrice).toHaveBeenCalledTimes(0)
    expect(component.product?.price).toBe(ProductAMock.price)
  })

});
