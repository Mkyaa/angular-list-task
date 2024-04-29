import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token = '';
  private tokenUrl = environment.tokenURL;

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);
    body.set('client_id', 'Integration_App_Test');
    body.set('scope', 'profile email roles Integration offline_access');

    return this.http.post(this.tokenUrl, body.toString(), { headers });
  }

  setToken(token: string) {
    this.token = token;
  }

  getTokenValue() {
    return this.token;
  }
}
