import { NgModule } from '@angular/core';

//router
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from './pages/auth/login/login.component';

//guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'dashboard', 
  loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), 
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
