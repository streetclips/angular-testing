import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  errored = false;
  errorMessage = '';
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor (
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authService.loginChange.subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  login() {
    if (this.formGroup.valid) {
      this.subscriptions.push(
        this.authService.login(
          this.formGroup.value.email as string,
          this.formGroup.value.password as string
        ).subscribe({
          error: () => {
            this.errored = true;
            this.errorMessage = 'Invalid email or password';
            this.changeDetectorRef.detectChanges();
          }
        })
      )
    } else {
      this.errored = true;
      this.errorMessage = 'Please fill in all the fields';
      this.changeDetectorRef.detectChanges();
    }
  }
}
