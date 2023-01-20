import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Product } from '../../../core/models/product'
import { map, of, Subscription, take } from 'rxjs'
import { ProductsService } from '../../../core/services/products.service'
import { ShoppingCartService } from '../../../core/services/shopping-cart.service'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  subscriptions: Subscription[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id') || '0')
      if (id > 0) {
        this.getProduct(id)
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  getProduct(id: number) {
    this.subscriptions.push(
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product
        this.changeDetectorRef.detectChanges()
      })
    )
  }

  addProductToCart() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login'])
      return
    }

    this.shoppingCartService.addItem(this.product as Product, 1)
  }

  getQuantity() {
    if (!this.product) {
      return of(0)
    }

    return this.shoppingCartService.cart.pipe(map(cart => {
      const item = cart.find(item => item.product.id === this.product?.id)
      return item ? item.quantity : 0
    }))
  }

  removeProductFromCart() {
    if (!this.product) {
      return
    }

    this.getQuantity().pipe(take(1)).subscribe(quantity => {
      if (quantity > 0) {
        this.shoppingCartService.updateItem(this.product as Product, quantity - 1)
      }
    })
  }
}
