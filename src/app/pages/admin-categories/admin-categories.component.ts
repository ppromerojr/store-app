import { SharedService } from './../../providers/shared.service';
import { Icategory } from './../../providers/icategory';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  ngOnInit() {
    this._getCategories();
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
    console.log(category.id);
    this.selectedCategory = category.id;
  }


  _updateCategory(category) {
    console.log(category);
    this.shared._putData(category, 'categories')
      .subscribe((res) => {
        console.log(res);
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

  _addProduct(category) {
    console.log(category);
    this.shared._postData(category, 'categories')
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
