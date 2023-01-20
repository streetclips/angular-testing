import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { ProductRoutingModule } from './product-routing.module'
import { ProductComponent } from './product.component'

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule{ }
