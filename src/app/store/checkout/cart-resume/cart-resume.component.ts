import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ShoppingCartService } from '../../../core/services/shopping-cart.service'
import { CartItem } from '../../../core/models/cart-item'
import { CartTotals } from '../../../core/models/cart-totals'

@Component({
  selector: 'app-cart-resume',
  templateUrl: './cart-resume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartResumeComponent implements OnDestroy, OnInit {
  subscriptions: Subscription[] = [];
  cartItems: CartItem[] = [];
  totals: CartTotals = {
    total: 0,
    subtotal: 0,
    tax: 0
  };

  constructor (
    private shoppingCartService: ShoppingCartService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit () {
    this.subscriptions.push(
      this.shoppingCartService.cart.subscribe((cartItems: CartItem[]) => {
        this.cartItems = cartItems;
        this.changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.push(
      this.shoppingCartService.totals.subscribe((totals: CartTotals) => {
        this.totals = totals;
        this.changeDetectorRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
