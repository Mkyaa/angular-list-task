import { Injectable } from '@angular/core';

//RxJS
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSubject = new Subject<any>(); 

  //mesaj gösterme
  showMessage(message: string, type: string = 'success') {
    this.messageSubject.next({ message, type });
  }

  //mesajı alma
  getMessage() {
    return this.messageSubject.asObservable();
  }
}
