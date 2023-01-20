import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { CoreModule } from '../core.module'

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService],
      imports: [CoreModule]
    });

    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should be loading', (done) => {
    loaderService.show();
    loaderService.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
      done();
    })
  });

  it('should not be loading', (done) => {
    loaderService.hide();
    loaderService.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
      done();
    })
  });
});
