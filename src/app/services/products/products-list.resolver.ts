import { ProductsService } from './products.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class ProductsListResolver implements Resolve<any> {

    constructor(
        private productsService: ProductsService
    ) { }

    resolve() {
        return this.productsService.getAllProducts().map(products => products['data']);
    }

}
