import { AdminProductsComponent } from './../admin-products/admin-products.component';
import { Iproduct } from './../../providers/iproduct';
import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  isSucess: boolean = false;
  categories: Icategory[] = [{
    id: 0,
    name: ''
  }];
  formData: Iproduct[] = [{
    name: '',
    categoryId: 0,
    price: '',
    stocks: '',
    imageUrl: ''
  }]
  // productData: Iproduct = {
  //   name: '',
  //   categoryId: 0,
  //   price: '',
  //   stocks: '',
  //   imageUrl: ''
  // }

  productForm: FormGroup;
  name: FormControl;
  categoryId: FormControl;
  price: FormControl;
  stocks: FormControl;
  imageUrl: FormControl;


  constructor(
    private shared: SharedService,
    private products: AdminProductsComponent
  ) { }

  ngOnInit() {
    this._getCategories();

    this.name = new FormControl('', Validators.required);
    this.categoryId = new FormControl('', Validators.required);
    this.price = new FormControl('',
      [
        Validators.required,
        Validators.pattern('[0-9]+(\\.[0-9][0-9]?)?')
      ]);
    this.stocks = new FormControl('',
      [
        Validators.required,
        Validators.pattern('[0-9]+')
      ]);
    this.imageUrl = new FormControl('',
      [
        Validators.required,
        Validators.pattern('https?://.+')
      ]);



    this.productForm = new FormGroup({
      name: this.name,
      categoryId: this.categoryId,
      price: this.price,
      stocks: this.stocks,
      imageUrl: this.imageUrl
    })

  }

  _validateName() {
    return this.name.invalid && this.name.touched;
  }

  _validateCategory() {
    return this.categoryId.invalid && this.categoryId.touched;
  }

  _validatePrice() {
    return this.price.invalid && this.price.touched;
  }

  _validateStocks() {
    return this.stocks.invalid && this.stocks.touched;
  }

  _validateURL() {
    return this.imageUrl.invalid && this.imageUrl.touched;
  }


  _getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
        console.log(res);
      })
  }

  _addProduct(formData) {
    console.log(formData);
    this.shared._postData(formData, 'products')
      .subscribe((res) => {
        this.products._getProducts();
        this.isSucess = true;
        this._close();
        this.productForm.reset();
      })
  }

  _close() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

}
