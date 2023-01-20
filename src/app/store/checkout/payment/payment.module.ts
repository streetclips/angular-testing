import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { PaymentRoutingModule } from './payment-routing.module'
import { PaymentComponent } from './payment.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    SharedModule,
    PaymentRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaymentModule{ }
