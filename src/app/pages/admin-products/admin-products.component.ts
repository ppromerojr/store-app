import { SharedService } from './../../providers/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any[];
  constructor(
    private shared: SharedService
  ) { }

  ngOnInit() {
    this._getProducts();
  }

  _getProducts() {
    this.shared._getData('products')
      .subscribe((res) => {
        console.log(res);
        this.products = res.data;
      })
  }

}
