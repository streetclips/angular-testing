import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { LocalStorageService } from '../services/local-storage.service'
import { LocalstorageMock } from '../mocks/localstorage.mock'
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AuthMock } from '../mocks/user.mock'

describe('AuthInterceptor', () => {
  const mockUrl = '/foobar'
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let interceptor: AuthInterceptor;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    localStorageService = TestBed.inject(LocalStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    LocalstorageMock.mock();
    LocalstorageMock.clear();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization header', () => {
    localStorageService.set('access_token', AuthMock.access_token);
    httpClient.get(mockUrl).subscribe();

    const req = httpTestingController.expectOne(mockUrl);
    req.flush('');

    httpTestingController.verify();

    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${AuthMock.access_token}`);
  });

  it("shouldn't add authorization header", () => {
    httpClient.get(mockUrl).subscribe();

    const req = httpTestingController.expectOne(mockUrl);
    req.flush('');

    httpTestingController.verify();

    expect(req.request.headers.get('Authorization')).toBeNull();
  });
});
