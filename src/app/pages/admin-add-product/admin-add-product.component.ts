import { AdminProductsComponent } from './../admin-products/admin-products.component';
import { Iproduct } from './../../providers/iproduct';
import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  isSucess: boolean = false;
  categories: Icategory[] = [{
    id: 0,
    name: ''
  }];
  productData: Iproduct = {
    name: '',
    categoryId: 0,
    price: '',
    stocks: '',
    imageUrl: ''
  }
  constructor(
    private shared: SharedService,
    private products: AdminProductsComponent
  ) { }

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

  _addProduct() {
    console.log(this.productData);
    this.shared._postData(this.productData, 'products')
      .subscribe((res) => {
        this.products._getProducts();
        this.isSucess = true;
        this._close();
        this.productData = {};

      })
  }

  _close() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

}
