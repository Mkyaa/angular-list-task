import { Component } from '@angular/core';

//router
import { Router } from '@angular/router';

//services
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';

//models
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User = {
    userNameOrEmailAddress: '',
    password: '',
    rememberMe: true
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  //login işlemi
  login(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');

    if (email !== null && password !== null) {
      const user: User = {
        userNameOrEmailAddress: email.toString(),
        password: password.toString(),
        rememberMe: rememberMe?.toString() === 'on' ? true : false
      };

      this.authService.login(user).subscribe({
        next: (res: any) => {
          if (res.result === 1) {
            this.alertService.showMessage('Giriş başarılı', 'success');
          }
          else if (res.result === 2) {
            this.alertService.showMessage('Kullanıcı adı veya şifre hatalı', 'danger');
          }
          else {
            this.alertService.showMessage('Bir hata oluştu', 'danger');
          }
        },
        error: (err) => {
          console.error(err);
        }
      });

      this.tokenService.getToken(user.userNameOrEmailAddress, user.password).subscribe({
        next: (token: any) => {
          this.tokenService.setToken(token.access_token);
          this.router.navigate(['dashboard/items']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
