import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { ItemsComponent } from './items.component';
import { ItemFormComponent } from '../../../components/item-form/item-form.component';

//directives
import { ItemsDirective } from '../../../directives/items.directive';

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