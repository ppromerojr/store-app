import { ProductsService } from './../../../services/products/products.service';
import { AdminProductsComponent } from './../product-list/admin-products.component';
import { Iproduct } from './../../../services/iproduct';
import { Icategory } from './../../../services/icategory';
import { SharedService } from './../../../services/shared.service';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  @Output() cancelDialogBox = new EventEmitter();


  constructor(
    private shared: SharedService,
    private productsService: ProductsService,
    private ProductList: AdminProductsComponent,
    private router: Router
  ) { }

  isSucess: boolean;
  categories: Icategory[];
  formData: Iproduct[];
  products: Iproduct[];
  defaultImage = 'https://www.teliacompany.com/Assets/Images/not-available.png';
  productForm: FormGroup;
  name: FormControl;
  categoryId: FormControl;
  price: FormControl;
  stocks: FormControl;
  imageUrl: FormControl;
  isDirty = true;
  modalValue = '';
  isModal = true;




  ngOnInit() {
    this.getCategories();

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
    });

  }

  validateName() {
    return this.name.invalid && this.name.touched;
  }

  validateCategory() {
    return this.categoryId.invalid && this.categoryId.touched;
  }

  validatePrice() {
    return this.price.invalid && this.price.touched;
  }

  validateStocks() {
    return this.stocks.invalid && this.stocks.touched;
  }

  validateURL() {
    return this.imageUrl.invalid && this.imageUrl.touched;
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((res) => this.products = res['data']);
  }

  getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
        console.log(res);
      });
  }

  addProduct(formData) {

    this.productsService.saveProduct(formData)
      .subscribe((res) => {
        console.log(res);
        this.ProductList.getProducts();
        this.isSucess = true;
        this.cancelModal();
        this.productForm.reset();
      });
  }

  cancelModal() {
    this.cancelDialogBox.emit();
  }
  closeModal() {
    // this.router.navigate(['/products']);
    // const el: HTMLElement = this.close.nativeElement as HTMLElement;
    // el.click();
  }

}
