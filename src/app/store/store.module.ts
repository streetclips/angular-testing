import { NgModule } from '@angular/core';
import { StaticModule } from './static/static.module'
import { ProductsModule } from './products/products.module'
import { AuthModule } from './auth/auth.module'
import { CheckoutModule } from './checkout/checkout.module'
import { UserModule } from './user/user.module'

@NgModule({
  imports: [
    StaticModule,
    ProductsModule,
    AuthModule,
    CheckoutModule,
    UserModule
  ]
})
export class StoreModule { }
