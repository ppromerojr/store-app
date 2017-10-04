import { ProductsService } from './../../../services/products/products.service';
import { CategoryService } from './../../../services/categories/category.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Iproduct } from '../../../services/iproduct';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currencyValue = '50.97';

  currency: string;
  subscription: Subscription;
  product;
  currentProduct;

  constructor(
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  productId = this.route.snapshot.params['id'];


  ngOnInit() {
    this.getProduct(this.productId);
    this.subscription = this.sharedService.navItem.subscribe(res => this.currency = res);
  }

  getProduct(id: number) {
    this.productService.getAllProducts().subscribe(res => {
        this.product = res['data'];
        this.product.find((obj) => {
          if (obj.id === +id) {
            this.currentProduct = obj;
          }
        });
   });
 }

}
