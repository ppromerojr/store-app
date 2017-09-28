import { Iproduct } from './../iproduct';
import { SharedService } from './../shared.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductsService {

  products: Iproduct = {
    id: 0,
    name: '',
    categoryId: 0,
    price: '',
    stocks: '',
    imageUrl: ''
  };

  constructor(
    private shared: SharedService
  ) { }


  _getProducts(): Observable<Iproduct[]> {

    return this.shared._getData('products')
      .map((res) => {
        console.log(res);
        return res.data;
      })
  }


}
