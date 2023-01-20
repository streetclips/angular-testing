import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module'
import { ProfileRoutingModule } from './profile-routing.module'
import { ProfileComponent } from './profile.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule{ }
