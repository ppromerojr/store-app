import { Icategory } from './../../providers/icategory';
import { SharedService } from './../../providers/shared.service';
import { Iproduct } from './../../providers/iproduct';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
  @Input() prod: Iproduct;

  constructor(
    private shared: SharedService
  ) { }

  categories: Icategory;
  isModal: boolean = true;
  selectedProduct: Iproduct = {
    name: 'test',
    categoryId: 0,
    price: '',
    stocks: ''
  }

  ngOnInit() {
    this._getCategories();
  }

  _getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
        console.log(res);
      })
  }
  _updateForm() {
    this.shared._putData(this.selectedProduct, 'products')
      .subscribe((res) => {
        console.log(res);

      });
    this.isModal = false;
  }


}
