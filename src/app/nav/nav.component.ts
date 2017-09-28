import { AdminProductsComponent } from './../pages/admin-products/admin-products.component';
import { SharedService } from './../providers/shared.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('checkbox') checkbox: ElementRef;

  isSearch: boolean = false;
  constructor(
    private shared: SharedService
  ) { }


  ngOnInit() {
  }

  toggleSearchIcon() {
    this.isSearch = false;
  }

  _changeCurrency() {
    //  $ = false
    let currency = this.checkbox.nativeElement.checked
    return (currency) ? 'PH' : 'US';
  }

}
