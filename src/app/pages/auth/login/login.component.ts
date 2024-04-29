import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { TokenService } from '../../../services/token.service';

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

  login(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe');
    console.log('rememberMe', rememberMe);

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
