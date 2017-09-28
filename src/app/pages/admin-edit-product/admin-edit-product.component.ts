import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';
import { Iproduct } from './../../providers/iproduct';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
  @Input() prod: Iproduct;
  @ViewChild('close') close: ElementRef;

  constructor(
    private shared: SharedService
  ) { }

  categories: Icategory[] = [{
    id: 0,
    name: ''
  }];
  isModal: boolean = true;
  selectedProduct: Iproduct[] = [{
    name: 'test',
    categoryId: 0,
    price: '',
    stocks: ''
  }];

  ngOnInit() {
    this._getCategories();
  }

  _getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
        console.log(res);
      })
  }
  _updateForm() {
    console.log(this.prod);
    this.shared._putData(this.prod, 'products')
      .subscribe((res) => {
        this._close();
      });
    this.isModal = false;
  }

  _close() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }



}
