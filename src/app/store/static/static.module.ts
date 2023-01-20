import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module'
import { StaticRoutingModule } from './static-routing.module'

@NgModule({
  imports: [
    StaticRoutingModule,
    HomeModule
  ]
})
export class StaticModule { }
