import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SearchParams } from '../../../core/models/search-params'
import { ProductsService } from '../../../core/services/products.service'
import { Category } from '../../../core/models/category'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  categories: Category[] = []

  constructor (
    private router: Router,
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit () {
    this.subscriptions.push(
      this.productsService.getCategories().subscribe(categories => {
        this.categories = categories
        this.changeDetectorRef.detectChanges()
      })
    )
  }

  ngOnDestroy () {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  search(search: SearchParams) {
    this.router.navigate(['/search'], {
      queryParams: search
    });
  }

  slugify(text: string) {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }
}
