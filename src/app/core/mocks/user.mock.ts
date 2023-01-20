import { User } from '../models/user'

export const UserAMock: User = {
  id: 1,
  name: 'User 1',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?img=1',
  email: 'usera@test.com',
  password: '123456'
}

export const UserBMock: User = {
  id: 2,
  name: 'User 2',
  role: 'admin',
  avatar: 'https://i.pravatar.cc/150?img=2',
  email: 'userb@test.com',
  password: '123456'
}

export const UsersMock: User[] = [UserAMock, UserBMock]

export const AuthMock = {
  access_token: '1234567890',
  refresh_token: '1234567890',
}
