import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any, args?: any): any {
    const searchText = args.terms;
    if (searchText === 'term') { return products; }

    return products.filter(function (product) {
      return product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }

}
