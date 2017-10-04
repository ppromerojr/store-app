import { CategoryService } from './../../../services/categories/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../services/products/products.service';
import { NavComponent } from './../../../nav/nav.component';
import { AdminAddProductComponent } from './../add-product/add-product.component';
import { Iproduct } from './../../../services/iproduct';
import { Icategory } from './../../../services/icategory';
import { SharedService } from './../../../services/shared.service';

import { Component, ViewChildren, ViewChild, OnInit, ViewContainerRef, ViewEncapsulation, ElementRef, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']

})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild('close') close: ElementRef;
  @ViewChild('addModal') addModal: ElementRef;


  constructor(
    private shared: SharedService,
    private productsService: ProductsService,
    private categoriesService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  products: Iproduct[];
  selectedProduct: Iproduct;
  categories: Icategory[];

  isAdd: boolean;
  isEdit: boolean;
  filterby = 'all';
  catName: number;
  isDirty = true;
  isModal = false;

  records: Array<any>;
  isDesc: boolean;
  column: string;
  direction: number;
  currentIndex = 0;

  visibleProducts: Iproduct[];
  VisibleCategories: Icategory[];


  dollarToPeso = this.shared.dollarToPeso;


  currency: string;
  SearchTerms: string;
  subscription: Subscription;
  SearchSubscription: Subscription;

  ngOnInit() {

    this.getAllData();
    this.getProducts();
    this.subscription = this.shared.navItem.subscribe(res => this.currency = res);
    this.SearchSubscription = this.shared.searchTerm.subscribe(res => this.SearchTerms = res);

  }

  getAllData() {
    this.products = this.route.snapshot.data['products'];
    this.visibleProducts = this.products;
    this.categories = this.route.snapshot.data['categories'];
  }

  getProducts() {
    this.getAllProducts();
    this.getAllCategories();

    setTimeout(() => {
      this.categories.map((category) => {
        this.visibleProducts.map((product) => {
          if (category.id === +product.categoryId) {
            product['categoryName'] = category.name;
          }
        });
      });
      console.log(this.visibleProducts);
    }, 300);


  }

  getAllProducts() {
    this.productsService
      .getAllProducts()
      .subscribe((res) => {
        this.products = res['data'];
        this.visibleProducts = this.products;
      });
  }

  getAllCategories() {
    this.categoriesService
      .getAllCategories()
      .subscribe(res => this.categories = res['data']);
  }



  removeProduct(index) {
    this.productsService
      .deleteProduct(this.selectedProduct)
      .subscribe((res) => {
        this.getProducts();
        this.closeModal();
      });
  }

  closeModal() {

    // this.router.navigate(['/products']);
    // const el: HTMLElement = this.close.nativeElement as HTMLElement;
    // el.click();

  }

  sort(property) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;

    const dir = +this.direction;

    this.visibleProducts
      .sort(function (a, b) {

        const arr1 = (property === 'name' && property === 'categoryName') ? a[property].toUpperCase() : a[property];
        const arr2 = (property === 'name' && property === 'categoryName') ? b[property].toUpperCase() : b[property];


        if (arr1 < arr2) {
          return -1 * dir;
        } else if (arr1 > arr2) {
          return 1 * dir;
        } else {
          return 0;
        }

      });

  }

  filterProducts() {
    const catId = +this.catName;
    if (catId === 0) {
      this.getProducts();
    } else {
      this.visibleProducts = this.products.filter((product) => {
        if (product.categoryId === +catId) {
          return product;
        }
      });
    }

  }

  cancelModal() {
    // console.log([this.addModal][0].modal);

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.SearchSubscription.unsubscribe();
  }

}
