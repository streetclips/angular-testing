import { NgModule } from '@angular/core';
import { CartResumeModule } from './cart-resume/cart-resume.module'
import { CheckoutRoutingModule } from './checkout-routing.module'

@NgModule({
  imports: [
    CheckoutRoutingModule,
    CartResumeModule
  ]
})
export class CheckoutModule{ }
