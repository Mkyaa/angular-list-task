import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../models/items.models';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../../services/token.service';
import { AlertService } from '../../../services/alert.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  token = this.tokenService.getTokenValue();
  items = [] as Item[];
  filteredItems = [] as Item[];
  totalElement = 0;
  maxPage = 0;
  currentPage = 0;
  params = {
    Page: '1',
    PageSize: '10'
  };
  searchValue: string = '';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getItems(this.params.Page, this.params.PageSize);
  }

  // getItems(page: string, pageSize: string) {
  //   this.http.get<Item[]>(`${environment.apiURL}app/item?Page=${this.params.Page}&PageSize=${this.params.PageSize}`, {
  //     headers: {
  //       Authorization: `Bearer ${this.token}`
  //     }
  //   }).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.items = res.rows;
  //       this.totalElement = res.totalElement;
  //       this.maxPage = res.maxPage;
  //       this.currentPage = res.currentPage;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }

  getItems(page: string, pageSize: string) {
    if (this.searchValue === '') {
      this.http.get<Item[]>(`${environment.apiURL}app/item?Page=${this.params.Page}&PageSize=${this.params.PageSize}`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).subscribe({
        next: (res: any) => {
          console.log(res);
          this.filteredItems = res.rows;
          this.totalElement = res.totalElement;
          this.maxPage = res.maxPage;
          this.currentPage = res.currentPage;
        }
      });
    }
    else {
      this.http.get<Item[]>(`${environment.apiURL}app/item?Page=1&PageSize=2147483647`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).subscribe({
        next: (res: any) => {
          console.log(res);
          const clearItems = res.rows.filter((item: Item) => {
            return item.name.toLowerCase().includes(this.searchValue.toLowerCase()) 
          });
          //clearItems adjust page and page size
          this.filteredItems = clearItems.slice((parseInt(this.params.Page) - 1) * parseInt(this.params.PageSize), parseInt(this.params.PageSize) * parseInt(this.params.Page));
          this.totalElement = clearItems.length;
          this.maxPage = Math.ceil(clearItems.length / parseInt(this.params.PageSize));
          this.currentPage = parseInt(this.params.Page);
          this.params.Page = '1';
          if (this.filteredItems.length === 0) {
            this.alertService.showMessage('Arama sonucu boş', 'warning');
          }
        }
      });
    }
  }
            

  nextPage() {
    if (parseInt(this.params.Page) < this.maxPage) {
      this.params.Page = (parseInt(this.params.Page) + 1).toString();
      this.getItems(this.params.Page, this.params.PageSize);
    }
  }

  prevPage() {
    if (parseInt(this.params.Page) > 1) {
      this.params.Page = (parseInt(this.params.Page) - 1).toString();
      this.getItems(this.params.Page, this.params.PageSize);
    }
  }

  changePageSize(event: any) {
    this.params.PageSize = event.target.value;
    this.params.Page = '1';
    this.getItems(this.params.Page, this.params.PageSize);
  }

  changePage(event: any) {
    if (parseInt(event.target.value) > 0 && parseInt(event.target.value) <= this.maxPage) {
      this.params.Page = event.target.value;
      this.getItems(this.params.Page, this.params.PageSize);
    }
    else {
      this.alertService.showMessage('Lütfen geçerli bir sayfa numarası giriniz', 'danger');
    }
  }


  //FORMS FUNCTIONS

  operationType: string = '';
  showForm: boolean = false;
  item: Item = {
    code: '',
    name: '',
    unitsetCode: '',
    auxilCode: ''
  };

  openForm(operationType: string, item?: Item) {
    this.showForm = true;
    this.operationType = operationType;
    if (item) {
      this.item = item;
    }
  }

  closeForm() {
    this.showForm = false;
    this.operationType = '';
    this.item = {
      code: '',
      name: '',
      unitsetCode: '',
      auxilCode: ''
    };
  }

  addItem() {
    console.log(this.item);
    this.http.post(`${environment.apiURL}app/item`, this.item, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: (res: any) => {
        this.alertService.showMessage('Kayıt başarılı', 'success');
        console.log(this.item);
        this.getItems('1', this.params.PageSize);
        this.closeForm();
      },
      error: (err) => {
        console.error(err);
        this.alertService.showMessage('Kayıt sırasında bir hata oluştu', 'danger');
        this.closeForm();
      }
    });
  }

  updateItem() {
    console.log(this.item);
    this.http.put(`${environment.apiURL}app/item/${this.item.code}`, this.item, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: (res: any) => {
        this.alertService.showMessage('Güncelleme başarılı', 'success');
        this.getItems('1', this.params.PageSize);
        this.closeForm();
      },
      error: (err) => {
        console.error(err);
        this.alertService.showMessage('Güncelleme sırasında bir hata oluştu', 'danger');
        this.closeForm();
      }
    });
  }

  deleteItem() {
    this.http.delete(`${environment.apiURL}app/item/${this.item.code}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: (res: any) => {
        this.alertService.showMessage('Silme başarılı', 'success');
        this.getItems('1', this.params.PageSize);
        this.closeForm();
      },
      error: (err) => {
        console.error(err);
        this.alertService.showMessage('Silme sırasında bir hata oluştu', 'danger');
        this.closeForm();
      }
    });
  }

  //END FORMS FUNCTIONS



  //SEARCH FUNCTION

  searchItems(event: any) {
    this.searchValue = event.target.value.toLowerCase();
    this.getItems(this.params.Page, this.params.PageSize);
  }

}
