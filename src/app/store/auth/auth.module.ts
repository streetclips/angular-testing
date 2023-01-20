import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  imports: [
    AuthRoutingModule,
    LoginModule
  ]
})
export class AuthModule{ }
