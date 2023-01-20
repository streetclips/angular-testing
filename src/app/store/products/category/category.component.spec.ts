import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CategoryComponent } from './category.component';
import { SharedModule } from '../../../shared/shared.module'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Router } from '@angular/router'
import { ProductsModule } from '../products.module'
import { CategoryAMock } from '../../../core/mocks/category.mock'
import { ProductsService } from '../../../core/services/products.service'
import { of } from 'rxjs'
import { ProductsMock } from '../../../core/mocks/product.mock'

describe('CategoryComponent', () => {
  const categoryId = 2;
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let productService: ProductsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        ProductsModule,
        RouterTestingModule.withRoutes([
          { path: 'category/:id', component: CategoryComponent },
          { path: 'search', component: CategoryComponent }
        ])
      ],
    })
    .compileComponents();

    productService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;

    component.id = categoryId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to search page if id is 0',(done) => {
    component.id = 0;
    component.loadData().then(() => {
      expect(router.url).toBe('/search');
      done();
    });
  });

  it('should get products',() => {
    spyOn(productService, 'searchProducts').and.returnValue(of(ProductsMock));

    component.getProducts()

    expect(productService.searchProducts).toHaveBeenCalled();
    expect(component.products).toEqual(ProductsMock);
  });

  it('should get category',() => {
    spyOn(productService, 'getCategory').and.returnValue(of(CategoryAMock));

    component.getCategory()

    expect(productService.getCategory).toHaveBeenCalled();
    expect(component.category).toEqual(CategoryAMock);
  });

  it('should paginate',() => {
    spyOn(productService, 'searchProducts').and.returnValue(of(ProductsMock));

    component.onPaginate({ offset: 0, limit: 10 })

    expect(productService.searchProducts).toHaveBeenCalled();
    expect(component.products).toEqual(ProductsMock);
  });
});
