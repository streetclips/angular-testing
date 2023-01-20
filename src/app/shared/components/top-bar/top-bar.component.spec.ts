import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { Router } from '@angular/router'
import { AuthService } from '../../../core/services/auth.service'

describe('TopBarComponent', () => {
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [HttpClientTestingModule],
      providers:[
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login button', (done) => {
    authService.loginChange.next(false);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button#login-btn')).toBeTruthy();
      done();
    })
  });

  it('should show logout button', (done) => {
    authService.loginChange.next(true);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button#logout-btn')).toBeTruthy();
      done();
    })
  });

  it('should show cart button', (done) => {
    authService.loginChange.next(true);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button#cart-btn')).toBeTruthy();
      done();
    })
  });

  it('should show profile button', (done) => {
    authService.loginChange.next(true);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button#profile-btn')).toBeTruthy();
      done();
    })
  });

  it('should logout', (done) => {
    authService.loginChange.next(true);
    spyOn(authService, 'logout')
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      done();
    })
  });
});
