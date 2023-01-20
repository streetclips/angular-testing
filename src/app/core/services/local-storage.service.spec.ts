import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LocalstorageMock } from '../mocks/localstorage.mock'

describe('LocalStorageService', () => {
  const mockKey = 'key';
  const mockSimpleValue = 'value';
  const mockComplexValue = { key: 'value', arr: [1,2,3,4] };
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    localStorageService = TestBed.inject(LocalStorageService);

    LocalstorageMock.mock();
    LocalstorageMock.clear();
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('should set a simple value', () => {
    localStorageService.set(mockKey, mockSimpleValue);
    expect(localStorageService.get(mockKey)).toEqual(mockSimpleValue);
  });

  it('should set a complex value', () => {
    localStorageService.set(mockKey, mockComplexValue);
    expect(localStorageService.get(mockKey)).toEqual(mockComplexValue);
  });

  it('should remove a value', () => {
    localStorageService.set(mockKey, mockComplexValue);
    localStorageService.remove(mockKey);
    expect(localStorageService.get(mockKey)).toBeNull();
  });

  it('should return null if key does not exist', () => {
    expect(localStorageService.get(mockKey)).toBeNull();
  });

});
