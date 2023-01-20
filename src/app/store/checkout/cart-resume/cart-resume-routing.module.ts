import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartResumeComponent } from './cart-resume.component'

const routes: Routes = [
  {
    path: 'cart',
    component: CartResumeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartResumeRoutingModule{ }
