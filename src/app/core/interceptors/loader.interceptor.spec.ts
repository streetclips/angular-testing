import { TestBed } from '@angular/core/testing';
import { LoaderInterceptor } from './loader.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'
import { LoaderService } from '../services/loader.service'

describe('LoaderInterceptor', () => {
  const mockUrl = '/foobar'
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let interceptor: LoaderInterceptor;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoaderInterceptor,
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
      ],
    });

    interceptor = TestBed.inject(LoaderInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    loaderService = TestBed.inject(LoaderService);

    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should show loader', (done) => {
    httpClient.get(mockUrl).subscribe(() => {
      expect(loaderService.show).toHaveBeenCalledTimes(1)
      done()
    });

    httpTestingController.expectOne(mockUrl).flush('');
  });

  it('should hide loader', () => {
    httpClient.get(mockUrl).subscribe();
    httpTestingController.expectOne(mockUrl).flush('');
    expect(loaderService.hide).toHaveBeenCalledTimes(1)
  });

  it('should not show loader if header is present', (done) => {
    httpClient.get(mockUrl, { headers: { 'X-Loader': 'false' } }).subscribe(() => {
      expect(loaderService.show).toHaveBeenCalledTimes(0)
      done()
    });

    httpTestingController.expectOne(mockUrl).flush('');
  });
});
