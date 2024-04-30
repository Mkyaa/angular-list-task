import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appItems]'
})
export class ItemsDirective implements AfterViewInit {

  text: string = '';

  constructor(private el: ElementRef) {}

  //Malzeme kart tipine göre arkaplan rengi ve border rengi ayarlama
  ngAfterViewInit() {
    this.text = this.el.nativeElement.textContent;
    if (this.text.includes('(TM)')) {
      this.el.nativeElement.style.backgroundColor = '#fff7e6';
      this.el.nativeElement.style.color = '#d46b08';
      this.el.nativeElement.style.border = '1px solid #ffd591';
    }
    else if (this.text.includes('(YM)')) {
      this.el.nativeElement.style.backgroundColor = '#e6fffb';
      this.el.nativeElement.style.color = '#08979c';
      this.el.nativeElement.style.border = '1px solid #87e8de';
    }
    else if (this.text.includes('(MM)')) {
      this.el.nativeElement.style.backgroundColor = '#f9f0ff';
      this.el.nativeElement.style.color = '#722ed1';
      this.el.nativeElement.style.border = '1px solid #d3adf7';
    }
    else if (this.text.includes('(HM)')) {
      this.el.nativeElement.style.backgroundColor = '#fff0f6';
      this.el.nativeElement.style.color = '#eb2f96';
      this.el.nativeElement.style.border = '1px solid #ffadd2';
    }
    else if (this.text.includes('(SK')) {
      this.el.nativeElement.style.backgroundColor = '#f0f5ff';
      this.el.nativeElement.style.color = '#3f6ad8';
      this.el.nativeElement.style.border = '1px solid #adc6ff';
    }
  }
}
