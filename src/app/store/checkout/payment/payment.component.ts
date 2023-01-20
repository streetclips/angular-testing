import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { ShoppingCartService } from '../../../core/services/shopping-cart.service'
import { CartTotals } from '../../../core/models/cart-totals'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnDestroy, OnInit {
  subscriptions: Subscription[] = [];
  months = Array.from({ length: 12 }, (v, k) => k + 1);
  years = Array.from({ length: 10 }, (v, k) => k + (new Date()).getFullYear());
  errored = false;
  totals: CartTotals = {
    total: 0,
    subtotal: 0,
    tax: 0
  };
  formGroup: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{16}')
    ]),
    expirationMonth: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(12)
    ]),
    expirationYear: new FormControl('', [
      Validators.required,
      Validators.min((new Date()).getFullYear()),
      Validators.max((new Date()).getFullYear() + 10)
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{3}')
    ])
  })

  constructor (
    private shoppingCartService: ShoppingCartService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit () {
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

  pay() {
    this.errored = !this.formGroup.valid;
    this.changeDetectorRef.detectChanges()

    if (!this.formGroup.valid) {
      this.errored = true;
      this.changeDetectorRef.detectChanges()
    } else {
      this.shoppingCartService.updateCart([])
      this.router.navigate(['/checkout/success']);
    }
  }
}
