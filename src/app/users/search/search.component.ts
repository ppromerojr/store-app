import { Products } from './../../interfaces/products';
import { CategoryService } from './../../services/categories/category.service';
import { ProductsService } from './../../services/products/products.service';
import { SharedService } from './../../services/shared.service';
import { Icategory } from './../../services/icategory';
import { Iproduct } from './../../services/iproduct';
import { Component, OnInit, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { ActivatedRoute } from '@angular/router';


import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter();

  constructor(
    private sharedService: SharedService,
    private categoryService: CategoryService,
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {

  }

  currencyValue = this.sharedService.dollarToPeso;

  currency: string;
  SearchSubscription: Subscription;
  subscription: Subscription;

  categories: Products[];
  products: Iproduct[];
  visibleProducts: Products[];
  searchTerms = '';
  filteredResults: Products[];
  itemCount = 0;


  categoryId = this.route.snapshot.params['id'];

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];
    this.products = this.route.snapshot.data['products'];
    this.getSearchTerm();
    this.subscription = this.sharedService.navItem.subscribe(res => this.currency = res);
  }

  getSearchTerm() {
    this.SearchSubscription = this.sharedService.searchTerm.subscribe((res) => {
      console.log(res);
      this.searchTerms = res;
      this.searchProduct(res);
    });
  }

  searchTerm() {
    this.search.emit();
  }

  searchProduct(searchTerms) {

    const term = searchTerms;
    this.categories.map(category => {

      category.products = this.products.filter((product) => {

        if (product.categoryId === +category.id) {
          if (category.name.toLowerCase().indexOf(term.toLowerCase()) > -1) {
            return product;
          } else if (term === 'term' && (!this.categoryId)) {
            return product;
          } else if (product.name.toLowerCase().indexOf(term.toLowerCase()) > -1) {
            return product;
          } else if (+product.price === +term) {
            return product;
          } else if (+product.stocks === +term) {
            return product;
          } else if (+this.categoryId === +product.categoryId) {
            return product;
          }

        }
      });
    });

    console.log(this.categories);
    this.visibleProducts = this.categories;
  }

  getCategory(id: number) {
    // this.getCategories();
    console.log(this.categories);
    this.categories.filter((category) => {
      if (category.id === +id) {
        console.log(category);
        // this.currentCategory = category;
      }
    });
  }



}
