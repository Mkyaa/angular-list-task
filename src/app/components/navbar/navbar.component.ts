import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.alertService.showMessage('Çıkış yapıldı', 'success');
      this.tokenService.setToken('');
      this.router.navigate(['auth/login']);
    });
  }

}
