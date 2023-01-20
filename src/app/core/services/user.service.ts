import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly url = environment.apiUrl;
  public readonly usersPath = '/users';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(id: number) {
    return this.http.get<User>(`${this.url}${this.usersPath}/${id}`);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.url}${this.usersPath}`);
  }

  createUser(user: User) {
    return this.http.post<User>(`${this.url}${this.usersPath}`, user);
  }

  updateUser(id: number, user: User) {
    return this.http.put<User>(`${this.url}${this.usersPath}/${id}`, user);
  }
}
