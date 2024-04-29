import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  message: string = '';
  type: string = '';
  isVisible: boolean = false;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe((message) => {
      this.message = message.message;
      this.type = message.type;
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    });
  }


}