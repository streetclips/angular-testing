import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { LocalstorageMock } from '../mocks/localstorage.mock'
import { CoreModule } from '../core.module'
import { LocalStorageService } from '../services/local-storage.service'
import { AuthMock } from '../mocks/user.mock'

describe('AuthGuard', () => {
  const mockRoute = { path: 'test' }
  let guard: AuthGuard;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule]
    });

    guard = TestBed.inject(AuthGuard);
    localStorageService = TestBed.inject(LocalStorageService);

    LocalstorageMock.mock();
    LocalstorageMock.clear();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false', () => {
    expect(guard.canMatch(mockRoute, [])).toBeFalse();
  });

  it('should return true', () => {
    localStorageService.set('access_token', AuthMock.access_token);
    expect(guard.canMatch(mockRoute, [])).toBeTrue();
  });
});
