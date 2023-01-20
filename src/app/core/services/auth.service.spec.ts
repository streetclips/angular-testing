import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LocalstorageMock } from '../mocks/localstorage.mock'
import { LocalStorageService } from './local-storage.service'
import { CoreModule } from '../core.module'
import { User } from '../models/user'
import { UserAMock } from '../mocks/user.mock'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

describe('AuthService', () => {
  const mockAccessToken = 'foobar';
  const mockCredentials = { email: 'foo@bar.com', password: '123456' };
  const mockLoginResponse = { access_token: mockAccessToken, refresh: mockAccessToken };
  let authService: AuthService;
  let localStorageService: LocalStorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    localStorageService = TestBed.inject(LocalStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);

    LocalstorageMock.mock();
    localStorageService.clear();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login in', (done) => {
    const url = `${authService.url}${authService.loginPath}`;

    authService.login(mockCredentials.email, mockCredentials.password).subscribe({
      next: (mockLoginResponse) => {
        expect(mockLoginResponse).toEqual(mockLoginResponse);
        expect(authService.isLoggedIn()).toBeTrue();
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

    req.flush(mockLoginResponse);
  })

  it('should logout', () => {
    localStorageService.set('access_token', mockAccessToken);
    authService.logout();
    expect(authService.isLoggedIn()).toBeFalse();
  })

  it('should be logged in', () => {
    localStorageService.set('access_token', mockAccessToken);
    expect(authService.isLoggedIn()).toBeTrue();
  })

  it("shouldn't be logged in", () => {
    expect(authService.isLoggedIn()).toBeFalsy();
  })

  it('should save tokens', () => {
    authService.setTokens(mockAccessToken, mockAccessToken);
    expect(localStorageService.get('access_token')).toEqual(mockAccessToken);
    expect(localStorageService.get('refresh_token')).toEqual(mockAccessToken);
  })

  it('should get current user', (done) => {
    const url = `${authService.url}${authService.profilePath}`;

    authService.getCurrentUser().subscribe({
      next: (user: User) => {
        expect(user).toEqual(UserAMock);
        done();
      },
      error: (e) => done.fail(e.error.message),
    })

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(UserAMock);
  })

  it('should get access token', () => {
    localStorageService.set('access_token', mockAccessToken);
    expect(authService.getAccessToken()).toEqual(mockAccessToken);
  })
});
