import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { CoreModule } from '../core.module'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ProductAMock, ProductsMock } from '../mocks/product.mock'
import { CategoriesMock, CategoryAMock } from '../mocks/category.mock'
import { HttpParams } from '@angular/common/http'
import { SearchParams } from '../models/search-params'
import { PaginationParams } from '../models/pagination-params'

describe('ProductsService', () => {
  const mockFilters = {
    title: 'test',
    priceRange: [0, 100],
    category: 1
  }
  let productsService: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ProductsService ],
      imports: [CoreModule, HttpClientTestingModule]
    });

    productsService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  it('should get products', (done) => {
    const url = `${productsService.url}${productsService.productsPath}?`;

    productsService.searchProducts().subscribe({
      next: (products) => {
        expect(products).toEqual(ProductsMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    req.flush(ProductsMock);
  })

  it('should filter products', (done) => {
    const filters: SearchParams = {
      title: mockFilters.title,
      priceRange: mockFilters.priceRange.join(','),
      category: mockFilters.category
    };
    const params = new HttpParams({
      fromObject: {
        title: mockFilters.title,
        categoryId: mockFilters.category.toString(),
        price_min: mockFilters.priceRange[0].toString(),
        price_max: mockFilters.priceRange[1].toString()
      }
    })
    const url = `${productsService.url}${productsService.productsPath}?${params.toString()}`;

    productsService.searchProducts(filters).subscribe({
      next: (products) => {
        expect(products).toEqual(ProductsMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(ProductsMock);
  })

  it('should paginate products', (done) => {
    const pagination: PaginationParams = { offset: 0, limit: 10 };
    const params = new HttpParams({
      fromObject: {
        limit: pagination.limit.toString(),
        offset: pagination.offset.toString()
      }
    })
    const url = `${productsService.url}${productsService.productsPath}?${params.toString()}`;

    productsService.searchProducts(undefined, pagination).subscribe({
      next: (products) => {
        expect(products).toEqual(ProductsMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(ProductsMock);
  })

  it('should get categories', (done) => {
    const url = `${productsService.url}${productsService.categoriesPath}`;

    productsService.getCategories().subscribe({
      next: (categories) => {
        expect(categories).toEqual(CategoriesMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(CategoriesMock);
  })

  it('should get product by id', (done) => {
    const url = `${productsService.url}${productsService.productsPath}/${ProductAMock.id}`;

    productsService.getProduct(ProductAMock.id).subscribe({
      next: (product) => {
        expect(product).toEqual(ProductAMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(ProductAMock);
  })

  it('should get category by id', (done) => {
    const url = `${productsService.url}${productsService.categoriesPath}/${CategoryAMock.id}`;

    productsService.getCategory(CategoryAMock.id).subscribe({
      next: (category) => {
        expect(category).toEqual(CategoryAMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(CategoryAMock);
  })
});
