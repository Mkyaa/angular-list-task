import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//environment
import { environment } from '../../environments/environment';

//rxjs
import { Observable } from 'rxjs';

//models
import { User } from '../models/user.model';

//services
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService  
  ) { }

  //login
  login(user: User): Observable<any> {
    return this.http.post(`${environment.apiURL}account/login`, user);
  }

  //logout
  logout(): Observable<any> {
    return this.http.get(`${environment.apiURL}account/logout`);
  }

  //isAuthenticated kontrolü 
  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      if (this.tokenService.getTokenValue() !== '') {
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}
