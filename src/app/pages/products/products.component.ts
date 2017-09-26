import { Component, OnInit } from '@angular/core';
import { CategorytService } from './shared/category.cervice';
import { ProductService } from './shared/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categories:any[];
  products:any[];
  constructor(private categoryService: CategorytService, private productServices: ProductService) { 
      this.categories = this.categoryService.getCategory();
      
      this.products = this.categoryService.getCategory();
  }

  ngOnInit() { }

}
