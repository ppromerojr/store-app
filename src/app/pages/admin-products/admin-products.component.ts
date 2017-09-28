import { AdminAddProductComponent } from './../admin-add-product/admin-add-product.component';
import { Component, ViewChild, OnInit, ViewContainerRef, ViewEncapsulation, ElementRef } from '@angular/core';
import { Iproduct } from './../../providers/iproduct';
import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  products: Iproduct = {
    id: 0,
    name: '',
    categoryId: 0,
    price: '',
    stocks: '',
    imageUrl: ''
  };
  selectedProduct: Iproduct = {
    name: '',
    categoryId: 0,
    price: '',
    stocks: ''
  }
  categories: Icategory = {
    id: 0,
    name: ''
  }
  isAdd: boolean = false;
  isEdit: boolean = false;
  constructor(
    private shared: SharedService
  ) { }

  ngOnInit() {
    this._getProducts();
    this._getCategories();
    // this._getCategoryName(1);
  }

  _getProducts() {
    this.shared._getData('products')
      .subscribe((res) => {
        console.log(res);
        this.products = res.data;
      })
  }

  _getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
      })
  }

  _removeProduct(index) {
    console.log(index);
    console.log(this.selectedProduct);
    this.shared._deleteData(this.selectedProduct, 'products')
      .subscribe((res) => {
        console.log(res);
        this._getProducts();
        this._close();
      })
  }

  _close() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }



}