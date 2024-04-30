import { Injectable } from '@angular/core';

//router
import { CanActivate, Router } from '@angular/router';

//services
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

//rxjs
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService
    ) { }

    //giriş yapmış mı kontrolü
    canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            take(1),
            map((isAuthenticated: boolean) => {
                if (isAuthenticated) {
                    return true;
                } else {
                    this.router.navigate(['auth/login']);
                    this.alertService.showMessage('Bu sayfayı görüntülemek için giriş yapmalısınız', 'error');
                    return false;
                }
            })
        );
    }
}
