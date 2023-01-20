import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core'
import { Product } from '../../../core/models/product'
import { ProductsService } from '../../../core/services/products.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnChanges, OnDestroy{
  @Input() product: Product | undefined;
  subscriptions: Subscription[] = []
  refreshingPrice = false

  constructor(
    private productsService: ProductsService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnDestroy () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue !== null) {
      const newProduct: Product = changes['product'].currentValue

      if(newProduct.category.id === 2) {
        this.updatePrice()
      }

      this.changeDetectorRef.detectChanges()
    }
  }

  updatePrice() {
    this.refreshingPrice = true
    this.changeDetectorRef.detectChanges()

    this.subscriptions.push(
      this.productsService.getProductPrice(<number>this.product?.id).subscribe({
          next: price => {
            (<Product>this.product).price = price
            this.refreshingPrice = false
            this.changeDetectorRef.detectChanges()
          },
          complete: () => {
            this.refreshingPrice = false
            this.changeDetectorRef.detectChanges()
          }
        }
      )
    )
  }
}
