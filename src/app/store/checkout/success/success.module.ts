import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { SuccessRoutingModule } from './success-routing.module'
import { SuccessComponent } from './success.component'

@NgModule({
  declarations: [
    SuccessComponent
  ],
  imports: [
    SharedModule,
    SuccessRoutingModule
  ]
})
export class SuccessModule{ }
