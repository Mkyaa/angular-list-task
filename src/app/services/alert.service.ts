import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSubject = new Subject<any>(); 

  showMessage(message: string, type: string = 'success') {
    this.messageSubject.next({ message, type });
  }

  getMessage() {
    return this.messageSubject.asObservable();
  }
}
