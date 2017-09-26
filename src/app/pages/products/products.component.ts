import { Component, OnInit } from '@angular/core';
import { CategorytService } from './shared/category.cervice';
import { ProductService } from './shared/product.service';
import { SharedService } from '../../providers/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categories:any[];
  products:any[];
  isExpandAll: boolean = false;
  constructor(private shared: SharedService) { 

  }

  ngOnInit() {
    this._getCategory();
    this._getProduct();
  }

  _getCategory(){
    this.shared._getData('categories')
    .subscribe((res) => {
      this.categories = res.data;
    })
  }

  _getProduct(){
    this.shared._getData('products')
    .subscribe((res) => {
      this.products = res.data;
    })
  }

  expandAll() {
    console.log('test')
    this.isExpandAll = true
  }

}
