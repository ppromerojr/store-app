import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterby'
})
export class FilterbyPipe implements PipeTransform {

  transform(records: Array<any>, args?: any): any {

    let categoryTerm = args.term;
    let AllProducts = args.products;
    if (args.term == '' || args.term == null) return AllProducts;

    return AllProducts.filter(function (product) {

      if (product.categoryId === +categoryTerm) {
        return product;
      }
    })
  }

}
