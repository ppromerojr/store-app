import { Component, OnInit, OnChanges } from '@angular/core';
import { CategorytService } from './shared/category.cervice';
import { ProductService } from './shared/product.service';
import { SharedService } from '../../providers/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  categories:any[];
  products:any[];
  isExpandAll: boolean = false;
  filterByCategory: string; 
  selectedData;

  constructor(private shared: SharedService) { 
    
  }

  ngOnInit() {
    this._getCategory();
  }

  _getCategory(){
    this.shared._getData('categories')
    .subscribe((res) => {
      this.categories = res.data;
    })
  }

  onSelect(val){
    this.shared._getData('products')
      .subscribe((res) => {
        this.selectedData = res.data.filter(getProduct => getProduct.id == val)
    })
  }

  expandAll(){
    this.isExpandAll = !this.isExpandAll;
  }

}
