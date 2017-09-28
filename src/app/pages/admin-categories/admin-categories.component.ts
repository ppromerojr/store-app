import { SharedService } from './../../providers/shared.service';
import { Icategory } from './../../providers/icategory';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  categories: Icategory[] = [{
    id: 0,
    name: ''
  }];

  constructor(
    private shared: SharedService
  ) { }

  selectedCategory = {};
  isAdd: boolean = false;
  isEdit: boolean = true;
  isError: boolean = false;
  isDraft: boolean = false;
  addRow = 0;
  selCategory = {};

  productForm: FormGroup;
  name: FormControl;
  id: FormControl;

  ngOnInit() {
    this._getCategories();
    this.name = new FormControl(
      '',
      [
        Validators.required
      ]
    );

    this.productForm = new FormGroup({
      name: this.name,
    });
  }

  _getCategories() {
    this.shared._getData('categories')
      .subscribe((res) => {
        this.categories = res.data;
      })
  }

  _getAllCategories() {
    let allCategories: Icategory[] = [
      { id: 0, name: '' }
    ];
    this.shared._getData('categories')
      .subscribe((res) => {
        allCategories.push(res.data);
      });
    return allCategories;
  }

  _editCategory(category) {
    console.log(category.name);
    this.selectedCategory = category.id;
  }


  _updateCategory(productForm) {
    let updatedProduct = {};
    updatedProduct['id'] = this.selectedCategory;
    updatedProduct['name'] = productForm.name;
    console.log(updatedProduct);
    this.shared._putData(updatedProduct, 'categories')
      .subscribe((res) => {
        this._getCategories();
        updatedProduct = {};
      });
    this.selectedCategory = {};
  }

  _removeCategory(category) {
    console.log(category)
    this.shared._deleteData(category, 'categories')
      .subscribe((res) => {
        console.log(res);
        this._getCategories();
        this._close();
      });

    this.addRow = 0;
  }

  _cancelCategory() {
    this.addRow = 0;
    this._getCategories();
  }

  _newCategory() {
    this.addRow++;
    if (this.addRow == 1) {
      this.isAdd = true;
      console.log(this.isAdd);
      this.categories.push({ name: '' });
      console.log(this._getAllCategories());
      console.log(this.addRow);
    } else {
      alert('Warning! New row is empty');
    }

  }

  _addProduct(productForm) {
    console.log(productForm);
    this.shared._postData(productForm, 'categories')
      .subscribe((res) => {
        console.log(res);
        this._getCategories();
      });



    this.isAdd = false;
    this.addRow = 0;
  }

  _removeFocus() {
    this.selectedCategory = {};
    this.isDraft = true;
  }

  _close() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

}
