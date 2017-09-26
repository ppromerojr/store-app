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
  constructor(private categoryService: CategorytService, private productServices: ProductService,
    private shared: SharedService
  ) { 
      // this.categories = this.categoryService.getCategory();
      
      // this.products = this.categoryService.getCategory();
  }

  ngOnInit() {
    this._getCategory();
   }

  _getCategory(){
    this.shared._getData('categories')
    .subscribe((res) => {
      console.log(res);
      this.categories = res;
    })
  }

}
