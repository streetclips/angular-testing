import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from '../../../core/services/auth.service'
import { User } from '../../../core/models/user'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../../core/services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = []
  user: User = {} as User
  errored = false;
  errorMessage = ''
  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.nullValidator, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required, Validators.pattern('admin|customer')]),
    avatar: new FormControl('')
  })

  constructor (
    private authService: AuthService,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit () {
    this.subscriptions.push(
      this.authService.getCurrentUser().subscribe(user => {
        this.user = user
        this.hydrateForm(user)
        this.changeDetectorRef.detectChanges()
      })
    )
  }

  ngOnDestroy () {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  update () {
    if (this.formGroup.invalid) {
      this.errored = true
      this.errorMessage = 'Please check the form for errors'
      this.changeDetectorRef.detectChanges()
      return
    }

    const user = <User>this.formGroup.value

    if (user.password === '') {
      delete user.password
    }

    this.subscriptions.push(
      this.userService.updateUser(this.user.id, user).subscribe({
        next: user => {
          this.user = user
          this.hydrateForm(user)
          this.errored = false
          this.changeDetectorRef.detectChanges()
        },
        error: err => {
          this.errored = true
          this.errorMessage = err.error?.message
          this.changeDetectorRef.detectChanges()
        }
      })
    )
  }

  hydrateForm (user: User) {
    this.formGroup.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    })
  }
}
