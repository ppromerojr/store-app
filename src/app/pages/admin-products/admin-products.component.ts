import { NavComponent } from './../../nav/nav.component';
import { SearchCategoryPipe } from './../../pipes/search-category.pipe';
import { OrderbyPipe } from './../../pipes/orderby.pipe';
import { AdminAddProductComponent } from './../admin-add-product/admin-add-product.component';
import { Component, ViewChild, OnInit, ViewContainerRef, ViewEncapsulation, ElementRef, EventEmitter } from '@angular/core';
import { Iproduct } from './../../providers/iproduct';
import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  outputs: ['onNewEntryAdded']

})
export class AdminProductsComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  @ViewChild('checkbox') checkbox: NavComponent;

  products: Iproduct = {
    id: 0,
    name: '',
    categoryId: 0,
    price: '',
    stocks: '',
    imageUrl: ''
  };
  selectedProduct: Iproduct = {
    name: '',
    categoryId: 0,
    price: '',
    stocks: ''
  }
  categories: Icategory[] = [
    {
      id: 0,
      name: ''
    }
  ]
  isAdd: boolean = false;
  isEdit: boolean = false;
  filterby: string = 'all';

  records: Array<any>;
  isDesc: boolean = false;
  column: string = '';
  direction: number;

  constructor(
    private shared: SharedService
  ) { }

  currency: string = 'PH';
  currencyValue = '50.97';

  // Input
  public newObject: string;
  //@Output()
  public onNewEntryAdded = new EventEmitter();

  ngOnInit() {
    this._getProducts();
    this._getCategories();
    console.log(this.currency);
    // this._getCategoryName(1); 
  }

  _changeCurrency(event): void {
    this.onNewEntryAdded.emit({
      value: this.newObject
    })
  }


  _getProducts() {
    this.shared._getData('products')
      .subscribe((res) => {
        console.log(res);
        this.products = res.data;
      })
  }

  _getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
      })
  }

  _removeProduct(index) {
    console.log(index);
    console.log(this.selectedProduct);
    this.shared._deleteData(this.selectedProduct, 'products')
      .subscribe((res) => {
        console.log(res);
        this._getProducts();
        this._close();
      })
  }

  _close() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }









}
