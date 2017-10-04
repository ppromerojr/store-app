import { Iproduct } from './../../../services/iproduct';
import { NavComponent } from './../../../nav/nav.component';
import { CategoryService } from './../../../services/categories/category.service';
import { ProductsService } from './../../../services/products/products.service';
import { SharedService } from './../../../services/shared.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Icategory } from '../../../services/icategory';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categories: Icategory[];
  products: Iproduct[];
  VisibleCategory: any[];
  VisibleProducts: Iproduct[];
  isExpandAll = false;
  filterByCategory: string;
  selectedData;
  isDesc;
  isToggle: boolean;
  direction: number;
  column;
  records;
  private Data = [];
  private Val = [];
  totalCount;

  constructor(
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private productsService: ProductsService) { }

    currencyValue = '50.97';

    currency: string;
    subscription: Subscription;

  ngOnInit() {
    this.getProducts();
    this.getCategory();
    this.subscription = this.sharedService.navItem.subscribe(res => this.currency = res);
  }

  getCategory() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res['data'];
    });

    setTimeout(() => {
      this.categories.forEach(obj => {
        obj.products = this.products.filter(prodItem => prodItem.categoryId === +obj.id);
      });
      console.log(this.categories);
    }, 100);

  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((res) => {
      this.products = res['data'];
      this.VisibleProducts = res['data'];
    });
  }

  expandAll() {
    this.isExpandAll = !this.isExpandAll;
  }

  toggleThis(id: string) {
    console.log(id);
    // this.isToggle = !this.isToggle;
  }

  sortBy(sort: string) {

    if (sort ===  'name') {
      this.categories = this.VisibleCategory.sort(SortByName);
      console.log(this.VisibleCategory);
    } else if (sort === 'price') {
      this.categories = this.VisibleCategory.sort(SortByName);
      console.log(this.VisibleProducts);
    }
    // this.isDesc = !this.isDesc;
    // this.column = property;
    // this.direction = this.isDesc ? 1 : -1;
  }
}

function SortByName(a: Icategory, b: Icategory) {
    if (a.name > b.name) {
      return 1;
    } else if (a.name === b.name ) {
      return 0;
    } else {
      return -1;
    }
}
