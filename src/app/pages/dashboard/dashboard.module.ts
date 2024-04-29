import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    TopBarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, children: [
        { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) }
      ]},
      
     ])
  ]
})
export class DashboardModule { }
