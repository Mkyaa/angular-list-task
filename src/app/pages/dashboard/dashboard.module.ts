import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { DashboardComponent } from './dashboard.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';


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
