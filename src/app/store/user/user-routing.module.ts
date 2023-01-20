import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard'

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canMatch: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule{ }
