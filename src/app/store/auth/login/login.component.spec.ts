import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'
import { AuthMock, UserAMock } from '../../../core/mocks/user.mock'
import { of } from 'rxjs'

describe('LoginComponent', () => {
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home page if user is logged in', () => {
    authService.loginChange.next(true);
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show error message if form is invalid', () => {
    spyOn(authService, 'login').and.returnValue(of(AuthMock));
    component.formGroup.setValue({
      email: 'malformed_email',
      password: 'invalid'
    });

    component.login();

    expect(component.formGroup.invalid).toBeTrue();
    expect(component.errored).toBeTrue();
  });

  it('should show error message if credentials are invalid', () => {
    component.formGroup.setValue({
      email: UserAMock.email,
      password: UserAMock.password + 'invalid'
    });

    component.login();

    httpTestingController.expectOne(() => true)
      .flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(component.formGroup.valid).toBeTrue();
    expect(component.errored).toBeTrue();
  });
});
