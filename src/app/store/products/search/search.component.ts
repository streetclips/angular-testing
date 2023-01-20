import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ProductsService } from '../../../core/services/products.service'
import { Product } from '../../../core/models/product'
import { Subscription } from 'rxjs'
import { CategoryParam, PriceRangeParam, SearchParams, TitleParam } from '../../../core/models/search-params'
import { Location } from '@angular/common'
import { PaginationParams } from '../../../core/models/pagination-params'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  title: TitleParam = null;
  priceRange: PriceRangeParam = null;
  category: CategoryParam = null;
  products: Product[] = [];
  pageSize = 12;
  currentPage = 1;

  constructor (
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private productsService: ProductsService,
    private location: Location
  ) {
    const extractedUrl = this.router.getCurrentNavigation()?.extractedUrl;
    const category = extractedUrl?.queryParams['category'];
    const priceRange = extractedUrl?.queryParams['priceRange'];

    this.title = extractedUrl?.queryParams['title'] || null;
    this.category = category || category == 0 ? parseInt(category) : null;

    if(priceRange && priceRange.length > 0) {
      this.priceRange = priceRange;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit() {
    this.onSearch({
      title: this.title,
      priceRange: this.priceRange,
      category: this.category
    });
  }

  onSearch(
    search: SearchParams,
    pagination: PaginationParams = { offset: 0, limit: this.pageSize }
  ) {
    this.updateQueryParams(search);

    this.title = search.title;
    this.priceRange = search.priceRange;
    this.category = search.category;

    this.currentPage = 1;
    this.changeDetectorRef.detectChanges();

    this.subscriptions.push(
      this.productsService.searchProducts(search, pagination).subscribe((products) => {
        this.products = products;
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  onPaginate(pagination: PaginationParams) {
    this.currentPage = pagination.offset / this.pageSize + 1;
    this.changeDetectorRef.detectChanges();

    this.subscriptions.push(
      this.productsService.searchProducts({
        title: this.title,
        priceRange: this.priceRange?.toString(),
        category: this.category
      }, {
        offset: pagination.offset,
        limit: pagination.limit
      }).subscribe((products) => {
        this.products = products;
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  updateQueryParams(search: SearchParams) {
    const path = this.router.url.split('?')[0];
    const urlTree = this.router.createUrlTree([path], {
      relativeTo: this.router.routerState.root,
      queryParams: search,
      queryParamsHandling: 'merge',
    });

    this.location.go(urlTree.toString());
  }
}
