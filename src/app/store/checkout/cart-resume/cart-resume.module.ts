import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { CartResumeRoutingModule } from './cart-resume-routing.module'
import { CartResumeComponent } from './cart-resume.component'

@NgModule({
  declarations: [
    CartResumeComponent
  ],
  imports: [
    SharedModule,
    CartResumeRoutingModule
  ]
})
export class CartResumeModule{ }
