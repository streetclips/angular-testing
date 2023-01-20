import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SharedModule } from '../../../shared/shared.module'
import { ProductsService } from '../../../core/services/products.service'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { ProductsMock } from '../../../core/mocks/product.mock'
import { of } from 'rxjs'

describe('SearchComponent', () => {
  const mockQueryParams = { title: 'some title', category: 2, priceRange: '0,100' }
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let productService: ProductsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: SearchComponent },
          { path: 'search', component: SearchComponent }
        ])
      ]
    })
    .compileComponents();

    productService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixture.ngZone?.run(() => {
      router.initialNavigation();
      component.updateQueryParams(mockQueryParams)
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update queryParams', (done) => {
    fixture.ngZone?.run(async () => {
      await router.navigate(
        ['search'],
        { queryParams: { ...mockQueryParams, title: 'foobar' } }
      )

      component.updateQueryParams({ title: 'foobar' })
      fixture.detectChanges();

      expect({
        title: 'foobar',
        category: mockQueryParams.category,
        priceRange: mockQueryParams.priceRange
      }).toEqual({
        ...mockQueryParams,
        title: 'foobar'
      })

      done();
    });
  });

  it('should load query params in constructor', () => {
    router.navigate(['search'], { queryParams: mockQueryParams })
    const newComponent = TestBed.createComponent(SearchComponent).componentInstance;
    expect(newComponent.title).toEqual(mockQueryParams.title);
    expect(newComponent.category).toEqual(mockQueryParams.category);
    expect(newComponent.priceRange).toEqual(mockQueryParams.priceRange);
  });

  it('should update search params on search', () => {
    component.onSearch(mockQueryParams);

    expect({
      title: component.title,
      category: component.category,
      priceRange: component.priceRange
    }).toEqual(mockQueryParams)
  });

  it('should restart current page on search', () => {
    spyOn(productService, 'searchProducts').and.returnValue(of(ProductsMock));
    component.onSearch(mockQueryParams);
    expect(component.currentPage).toEqual(1);
  });

  it('should update products on search', () => {
    spyOn(productService, 'searchProducts').and.returnValue(of(ProductsMock));
    component.onSearch(mockQueryParams);
    expect(component.products).toEqual(ProductsMock);
  });

  it('should update products on paginate', () => {
    spyOn(productService, 'searchProducts').and.returnValue(of(ProductsMock));
    component.onPaginate({ offset: 10, limit: 10 });
    expect(component.products).toEqual(ProductsMock);
  });
});
