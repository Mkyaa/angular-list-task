import { Component, EventEmitter, Input, Output } from '@angular/core';

//models
import { Item } from '../../models/items.models';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})

export class ItemFormComponent {

  @Input() showForm : boolean;
  @Input() operationType : string;
  @Input() item : Item;

  @Output() closeForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() addItem : EventEmitter<Item> = new EventEmitter<Item>();
  @Output() updateItem : EventEmitter<Item> = new EventEmitter<Item>();
  @Output() deleteItem : EventEmitter<Item> = new EventEmitter<Item>();

  constructor() { }

}
