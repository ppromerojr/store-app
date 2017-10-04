import { CategoryService } from './../../../services/categories/category.service';
import { AdminProductsComponent } from './../product-list/admin-products.component';
import { ProductsService } from './../../../services/products/products.service';
import { Icategory } from './../../../services/icategory';
import { SharedService } from './../../../services/shared.service';
import { Iproduct } from './../../../services/iproduct';

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
  @Input() prod: Iproduct;
  @ViewChild('close') close: ElementRef;

  defaultImage = 'https://www.teliacompany.com/Assets/Images/not-available.png';
  constructor(
    private shared: SharedService,
    private productsService: ProductsService,
    private categoriesService: CategoryService,
    private productLists: AdminProductsComponent
  ) { }

  categories: Icategory[];
  products: Iproduct;
  isModal: boolean;


  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAllCategories()
      .subscribe((res) => this.categories = res['data']);
  }


  updateForm() {
    this.productsService.updateProduct(this.prod)
      .subscribe((res) => {
        this.closeModal();
        this.productLists.getProducts();
        this.isModal = false;
      });
  }

  closeModal() {
    const el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }



}
