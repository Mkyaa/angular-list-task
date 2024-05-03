import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//environment
import { environment } from '../../environments/environment';

//rxjs
import { Observable, catchError, map, of, tap } from 'rxjs';

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
    this.tokenService.clearToken();
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

  //check token validity
  checkTokenValidity() {
    const expirationDate = localStorage.getItem('tokenExpiration');
    if (expirationDate) {
      const now = new Date().getTime();
      const expiresIn = +expirationDate - now;
      if (expiresIn > 0) {
        // Token hala geçerli, yenileme işlemi gerekli değil
        return of (true);
      } else {
        // Token süresi dolmuş, yenileme işlemi gerekiyor
        return this.tokenService.refreshToken().pipe(
          tap((response: any) => {
            this.tokenService.setToken(response.access_token);
            localStorage.setItem('tokenExpiration', (now + (response.expires_in * 1000)).toString());
          }),
          map(() => true),
          catchError(() => {
            // Token yenileme başarısız, oturumu sonlandır
            this.logout();
            return of(false);
          })
        );
      }
    } else {
      // Token süresi bilgisi yok, oturumu sonlandır
      this.logout();
      return of(false);
    }
  }
  
}
