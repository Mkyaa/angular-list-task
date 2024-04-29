import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemsDirective } from '../../../directives/items.directive';
import { ItemFormComponent } from '../../../components/item-form/item-form.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsDirective,
    ItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ItemsComponent }
    ])
  ],
  exports: [ItemsComponent]
})
export class ItemsModule {

 }