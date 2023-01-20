import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, tap } from 'rxjs'
import { LocalStorageService } from './local-storage.service'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly url = environment.apiUrl;
  public readonly loginPath = '/auth/login';
  public readonly profilePath = '/auth/profile';
  loginChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string; refresh_token: string }>(
      `${this.url}${this.loginPath}`,
      { email, password }
    ).pipe(
      tap(({ access_token, refresh_token }) => {
        this.setTokens(access_token, refresh_token);
        this.loginChange.next(true);
      }
    ));
  }

  logout() {
    this.localStorageService.remove('access_token');
    this.localStorageService.remove('refresh_token');
    this.loginChange.next(false);
  }

  isLoggedIn() {
    return !!this.localStorageService.get('access_token');
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.localStorageService.set('access_token', accessToken);
    this.localStorageService.set('refresh_token', refreshToken);
  }

  getCurrentUser() {
    return this.http.get<User>(`${this.url}${this.profilePath}`);
  }

  getAccessToken() {
    return this.localStorageService.get('access_token');
  }
}
