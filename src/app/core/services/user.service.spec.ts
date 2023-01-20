import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { CoreModule } from '../core.module'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { UserAMock, UsersMock } from '../mocks/user.mock'

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [CoreModule, HttpClientTestingModule]
    });

    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should get all users', (done) => {
    const url = `${userService.url}${userService.usersPath}`;

    userService.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(UsersMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(UsersMock);
  });

  it('should user by id', (done) => {
    const url = `${userService.url}${userService.usersPath}/${UserAMock.id}`;

    userService.getUser(UserAMock.id).subscribe({
      next: (user) => {
        expect(user).toEqual(UserAMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(UserAMock);
  });

  it('should create user', (done) => {
    const url = `${userService.url}${userService.usersPath}`;

    userService.createUser(UserAMock).subscribe({
      next: (user) => {
        expect(user).toEqual(UserAMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('POST');

    req.flush(UserAMock);
  });

  it('should update user', (done) => {
    const url = `${userService.url}${userService.usersPath}/${UserAMock.id}`;

    userService.updateUser(UserAMock.id, UserAMock).subscribe({
      next: (user) => {
        expect(user).toEqual(UserAMock);
        done();
      },
      error: () => done.fail('should not fail')
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('PUT');

    req.flush(UserAMock);
  });
});
