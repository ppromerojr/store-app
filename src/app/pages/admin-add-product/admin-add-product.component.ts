import { AdminProductsComponent } from './../admin-products/admin-products.component';
import { Iproduct } from './../../providers/iproduct';
import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  categories: Icategory;
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
      })
  }

}
