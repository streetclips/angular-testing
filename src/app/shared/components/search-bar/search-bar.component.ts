import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CategoryParam, PriceRangeParam, SearchParams, TitleParam } from '../../../core/models/search-params'
import { Category } from '../../../core/models/category'
import { ProductsService } from '../../../core/services/products.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnChanges, OnInit, OnDestroy {
  @Input() title: TitleParam = null;
  @Input() priceRange: PriceRangeParam = null;
  @Input() category: CategoryParam = null;
  @Input() showPriceRange = true;
  @Input() showCategory = true;
  @Output() search: EventEmitter<SearchParams> = new EventEmitter();
  subscriptions: Subscription[] = [];
  categories: Category[] = [];
  priceRangeOptions = [
    [0, 100],
    [100, 200],
    [200, 300],
    [300, 400],
    [400, 500],
    [500, 600],
  ]
  formGroup = new FormGroup({
    title: new FormControl<TitleParam>(
      this.title,
      [Validators.required]
    ),
    priceRange: new FormControl<PriceRangeParam>(
      this.priceRange,
      [Validators.pattern(/^[0-9]+(,[0-9]+)*$/)]
    ),
    category: new FormControl<CategoryParam>(
      this.category,
      [Validators.pattern('^[0-9]*$')]
    )
  });

  constructor (
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.productsService.getCategories().subscribe((categories) => {
        this.categories = categories;
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes['title']) {
      this.formGroup.controls.title.setValue(changes['title'].currentValue);
    }
    if (changes['priceRange']) {
      this.formGroup.controls.priceRange.setValue(changes['priceRange'].currentValue?.toString() || '');
    }
    if (changes['category']) {
      this.formGroup.controls.category.setValue(changes['category'].currentValue);
    }

    this.changeDetectorRef.detectChanges();
  }

  doSearch() {
    const search: SearchParams = {};

    if (this.formGroup.controls.title.valid) {
      search.title = this.formGroup.controls.title.value;
    }

    if (this.formGroup.controls.priceRange.valid) {
      search.priceRange = this.formGroup.controls.priceRange.value;
    }

    if (this.formGroup.controls.category.valid) {
      search.category = this.formGroup.controls.category.value;
    }

    this.search.emit(search);
  }
}
