let storage: { [key: string]: string } = {};

export class LocalstorageMock {
  public static getItem(key: string): string | null {
    return storage[key] || null;
  }

  public static setItem(key: string, value: string): void {
    storage[key] = value;
  }

  public static removeItem(key: string): void {
    delete storage[key];
  }

  public static clear(): void {
    storage = {};
  }

  public static mock(): void {
    spyOn(localStorage, 'getItem').and.callFake(LocalstorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(LocalstorageMock.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(LocalstorageMock.removeItem);
    spyOn(localStorage, 'clear').and.callFake(LocalstorageMock.clear);
  }
}
