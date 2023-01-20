import { NgModule } from '@angular/core';
import { ProfileModule } from './profile/profile.module'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  imports: [
    UserRoutingModule,
    ProfileModule
  ]
})
export class UserModule{ }
