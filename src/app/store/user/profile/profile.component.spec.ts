import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../../shared/shared.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../../core/services/auth.service'
import { UserService } from '../../../core/services/user.service'
import { UserAMock } from '../../../core/mocks/user.mock'
import { of } from 'rxjs'
import { User } from '../../../core/models/user'

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ SharedModule, HttpClientTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user and hydrate form on init', () => {
    spyOn(authService, 'getCurrentUser').and.returnValue(of(UserAMock));
    spyOn(component, 'hydrateForm');

    component.ngOnInit();

    expect(authService.getCurrentUser).toHaveBeenCalled();
    expect(component.hydrateForm).toHaveBeenCalled();
    expect(component.user).toEqual(UserAMock);
  });

  it('should be errored if form is invalid', () => {
    component.formGroup.controls.email.setValue('test');
    component.update();
    expect(component.errored).toBeTrue();
  });

  it('should update if form is valid', () => {
    spyOn(userService, 'updateUser').and.returnValue(of(UserAMock));
    component.hydrateForm(UserAMock);
    component.update();
    expect(component.errored).toBeFalse()
    expect(userService.updateUser).toHaveBeenCalled();
  });

  it('should remove password if is empty', () => {
    spyOn(userService, 'updateUser').and.returnValue(of(UserAMock));
    component.hydrateForm(UserAMock);
    component.user = UserAMock;
    component.formGroup.controls.password.setValue('');
    component.update();

    expect(userService.updateUser).toHaveBeenCalledWith(UserAMock.id, <User>{
      email: UserAMock.email,
      name: UserAMock.name,
      role: UserAMock.role,
      avatar: UserAMock.avatar
    });
  });

  it('should hydrate form', () => {
    component.hydrateForm(UserAMock);
    expect(component.formGroup.controls.email.value).toEqual(UserAMock.email);
    expect(component.formGroup.controls.name.value).toEqual(UserAMock.name);
    expect(component.formGroup.controls.password.value).toEqual('');
  })
});
