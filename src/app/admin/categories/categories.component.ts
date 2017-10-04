import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../services/categories/category.service';
import { SharedService } from './../../services/shared.service';
import { Icategory } from './../../services/icategory';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  @ViewChild('close') close: ElementRef;
  categories: Icategory[];

  constructor(
    private shared: SharedService,
    private categoryService: CategoryService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  selectedCategory = {};
  isAdd = false;
  isEdit = true;
  isError = false;
  isDraft = false;
  addRow = 0;
  selCategory: Icategory;

  productForm: FormGroup;
  name: FormControl;
  id: FormControl;

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];

    this.productForm = this.fb.group({
      name: ['', Validators.required]
    });


  }



  getCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe(res => this.categories = res['data']);
  }

  editCategory(category) {
    console.log(category.name);
    this.selectedCategory = category.id;
  }


  onSubmit(productForm) {
    let updatedProduct = {};
    updatedProduct['id'] = this.selectedCategory;
    updatedProduct['name'] = this.productForm.controls.name.value;
    this.categoryService
      .updateCategory(updatedProduct)
      .subscribe((res) => {
        this.getCategories();
        updatedProduct = {};
        this.selectedCategory = {};
      });
  }

  removeCategory(category) {
    console.log(category);
    this.shared._deleteData(category, 'categories')
      .subscribe((res) => {
        console.log(res);
        this.getCategories();
        this.closeModal();
      });

    this.addRow = 0;
  }

  cancelCategory() {
    this.addRow = 0;
    this.getCategories();
  }

  newCategory() {
    this.addRow++;
    if (this.addRow === 1) {
      this.isAdd = true;
      console.log(this.isAdd);
      this.categories.push({ name: '' });
      console.log(this.addRow);
    } else {
      alert('Warning! New row is empty');
    }

  }

  addCategory(productForm) {
    this.categoryService.saveCategory(productForm)
      .subscribe((res) => {
        this.getCategories();
        this.isAdd = false;
        this.addRow = 0;
      });
  }

  removeFocus() {
    this.selectedCategory = {};
    this.isDraft = true;
  }

  closeModal() {
    const el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

}
