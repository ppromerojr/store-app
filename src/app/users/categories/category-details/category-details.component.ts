import { CategoryService } from './../../../services/categories/category.service';
import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../../services/icategory';
import { Iproduct } from '../../../services/iproduct';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  constructor(
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {

  }

  currencyValue = '50.97';

  currency: string;
  subscription: Subscription;

  currentCategory: Icategory;
  AllCategories: Icategory[];
  products: Iproduct[];
  visibleProducts: Iproduct;

  categoryId = this.route.snapshot.params['id'];

  ngOnInit() {
    this.getCategories();
    this.getProducts(this.categoryId);
    this.subscription = this.sharedService.navItem.subscribe(res => this.currency = res);
  }

  getProducts(id: number) {
    console.log(id);
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res['data'];
     this.products = this.products.filter((product) => {
       if (product.categoryId === +id) {
       return product;
       }
      });
      console.log(this.products);
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.AllCategories = res['data'];
      this.getCategory(this.categoryId);
  });

  }

  getCategory(id: number) {
    // this.getCategories();
    console.log(this.AllCategories);
    this.AllCategories.filter((category) => {
      if (category.id === +id ) {
        console.log(category);
      this.currentCategory = category;
      }
    });
  }

}
