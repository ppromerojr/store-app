import { Icategory } from './../providers/icategory';
import { SharedService } from './../providers/shared.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {
  constructor(
    private shared: SharedService
  ) { }
  categoryName = '';

  transform(value: number, AllCategories: Icategory[]) {
    AllCategories.map( cat => {
      if (value === cat.id) {
        this.categoryName = cat.name;
      }
    });
    return this.categoryName;
  }



}
