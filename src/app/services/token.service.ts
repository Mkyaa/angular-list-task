// token.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'accessToken';

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('client_id', 'Integration_App_Test');
    body.set('scope', 'profile email roles Integration offline_access');
    return this.http.post(environment.tokenURL, body.toString(), { headers });
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getTokenValue(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);
    body.set('client_id', 'Integration_App_Test');
    body.set('scope', 'profile email roles Integration offline_access');
    return this.http.post(environment.tokenURL, body.toString(), { headers });
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
  }
}
