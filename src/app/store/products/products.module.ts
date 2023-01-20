import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module'
import { SearchModule } from './search/search.module';
import { ProductModule } from './product/product.module'
import { CategoryModule } from './category/category.module'

@NgModule({
  imports: [
    ProductsRoutingModule,
    SearchModule,
    ProductModule,
    CategoryModule
  ]
})
export class ProductsModule { }
