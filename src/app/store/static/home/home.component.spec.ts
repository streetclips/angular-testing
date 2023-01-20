import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../../shared/shared.module'
import { of } from 'rxjs'
import { CategoriesMock } from '../../../core/mocks/category.mock'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProductsService } from '../../../core/services/products.service'
import { Router } from '@angular/router'
import { SearchParams } from '../../../core/models/search-params'

describe('HomeComponent', () => {
  const mockSearchParams: SearchParams = {
    title: 'test',
    category: 2,
    priceRange: '0,100'
  }
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productsService: ProductsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ SharedModule, RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    productsService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories on init', () => {
    spyOn(productsService, 'getCategories').and.returnValue(of(CategoriesMock));
    component.ngOnInit();
    expect(productsService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(CategoriesMock);
  });

  it('should redirect to search page on search', () => {
    spyOn(router, 'navigate');

    component.search(mockSearchParams);

    expect(router.navigate).toHaveBeenCalledWith(['/search'], { queryParams: mockSearchParams });
  });

  it('should slugify category name', () => {
    const slugified = component.slugify('Test category');

    expect(slugified).toEqual('test-category');
  })
});
