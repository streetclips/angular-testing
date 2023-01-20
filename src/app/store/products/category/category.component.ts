import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from '../../../core/models/product'
import { Subscription } from 'rxjs'
import { ProductsService } from '../../../core/services/products.service'
import { PaginationParams } from '../../../core/models/pagination-params'
import { Category } from '../../../core/models/category'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  products: Product[] = []
  category: Category = {} as Category
  id = 0;
  pageSize = 12;
  currentPage = 1;

  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit () {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        this.id = parseInt(params.get('id') || '0');
        this.loadData();
      })
    )
  }

  ngOnDestroy () {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  async loadData() {
    if (this.id > 0) {
      this.getCategory();
      this.getProducts();
    } else {
      await this.router.navigate(['/search'])
    }
  }

  getCategory() {
    this.subscriptions.push(
      this.productsService.getCategory(this.id).subscribe({
        next: category => {
          this.category = category
          this.changeDetectorRef.detectChanges()
        },
        error: () => {
          this.router.navigate(['/search'])
        }
      })
    )
  }

  getProducts() {
    this.subscriptions.push(
      this.productsService.searchProducts({
        category: this.id
      }, {
        offset: 0,
        limit: this.pageSize
      }).subscribe(products => {
        this.products = products
        this.changeDetectorRef.detectChanges()
      })
    )
  }

  onPaginate(pagination: PaginationParams) {
    this.currentPage = pagination.offset / this.pageSize + 1;
    this.changeDetectorRef.detectChanges();

    this.subscriptions.push(
      this.productsService.searchProducts({ category: this.id }, {
        offset: pagination.offset,
        limit: pagination.limit
      }).subscribe((products) => {
        this.products = products;
        this.changeDetectorRef.detectChanges();
      })
    );
  }
}
