import { Component } from '@angular/core';

//Router
import { Router } from '@angular/router';

//services
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { TokenService } from '../../services/token.service';

interface NavItem {
  link: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMobileMenuOpen: boolean = false;

  //linkler ve iconlar
  navItems: NavItem[] = [
    { link: '#', title: 'Anasayfa', icon: 'fa-solid fa-house' },
    { link: '#', title: 'Kullanıcılar', icon: 'fa-solid fa-user' },
    { link: '/dashboard/items', title: 'Malzemeler', icon: 'fa-solid fa-box' },
    { link: '#', title: 'Siparişler', icon: 'fa-solid fa-layer-group' },
    { link: '#', title: 'Faturalar', icon: 'fa-solid fa-file-invoice' },
    { link: '#', title: 'Raporlar', icon: 'fa-solid fa-chart-line' },
    { link: '#', title: 'Ayarlar', icon: 'fa-solid fa-cog' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private tokenService: TokenService
  ) { }

  //mobile menu aç kapa
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  //çıkış yap
  logout() {
    this.authService.logout().subscribe(() => {
      this.alertService.showMessage('Çıkış yapıldı', 'success');
      this.tokenService.setToken('');
      this.router.navigate(['auth/login']);
    });
  }

}
