import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard'

const routes: Routes = [
  {
    path: 'checkout',
    loadChildren: () => import('./cart-resume/cart-resume.module').then(m => m.CartResumeModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
    canMatch: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () => import('./success/success.module').then(m => m.SuccessModule),
    canMatch: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule{ }
