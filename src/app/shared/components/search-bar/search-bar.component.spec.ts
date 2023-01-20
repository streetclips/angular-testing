import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { CategoriesMock } from '../../../core/mocks/category.mock'
import { SimpleChange } from '@angular/core'
import { ProductsService } from '../../../core/services/products.service'
import { of } from 'rxjs'

describe('SearchBarComponent', () => {
  const mockInputs = {
    category: 2,
    title: 'test',
    priceRange: '0,100'
  }
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let productsService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();

    productsService = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
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

  it('should hydrate form from input values', () => {
    component.ngOnChanges({
      title: new SimpleChange(null, mockInputs.title, true),
      category: new SimpleChange(null, mockInputs.category, true),
      priceRange: new SimpleChange(null, mockInputs.priceRange, true)
    })

    expect(component.formGroup.get('title')?.value).toEqual(mockInputs.title);
    expect(component.formGroup.get('category')?.value).toEqual(mockInputs.category);
    expect(component.formGroup.get('priceRange')?.value).toEqual(mockInputs.priceRange);
  });

  it('should emit search event on submit', (done) => {
    component.formGroup.get('title')?.setValue(mockInputs.title);
    component.formGroup.get('category')?.setValue(mockInputs.category);
    component.formGroup.get('priceRange')?.setValue(mockInputs.priceRange);

    component.search.subscribe((searchParams) => {
      expect(searchParams).toEqual(mockInputs);
      done();
    })

    component.doSearch();
  })
});
