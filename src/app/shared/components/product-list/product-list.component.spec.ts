import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ProductListComponent } from './product-list.component';
import { ProductsMock } from '../../../core/mocks/product.mock'
import { SharedModule } from '../../shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [ SharedModule, RouterTestingModule, HttpClientTestingModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = ProductsMock
      .concat(ProductsMock)
      .concat(ProductsMock)
      .concat(ProductsMock)
      .concat(ProductsMock)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should can go next', () => {
    console.log(component.products.length, component.pageSize)
    expect(component.canGoNext()).toBeTrue()
  });

  it('should can go previous', () => {
    component.onPaginateNext()
    fixture.detectChanges();
    console.log(component.currentPage)
    expect(component.canGoPrevious()).toBeTrue()
  });

  it('should can not go next', () => {
    component.products = ProductsMock
    fixture.detectChanges();
    expect(component.canGoNext()).toBeFalse()
  });

  it('should can not go previous', () => {
    expect(component.canGoPrevious()).toBeFalse()
  });

  it('should can paginate next', () => {
    const currentPage = component.currentPage
    component.onPaginateNext()
    fixture.detectChanges();
    expect(component.currentPage).toBeGreaterThan(currentPage)
  });

  it('should can paginate previous', () => {
    component.onPaginateNext()
    fixture.detectChanges();
    const currentPage = component.currentPage
    component.onPaginatePrevious()
    fixture.detectChanges();
    expect(component.currentPage).toBeLessThan(currentPage)
  });

  it('should emit pagination', () => {
    spyOn(component.paginate, 'emit')
    component.onPaginateNext()
    fixture.detectChanges()
    expect(component.paginate.emit).toHaveBeenCalled()
  });
});
