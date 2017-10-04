import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class CategoriesListResolver implements Resolve<any> {

    constructor(
        private categoriesService: CategoryService
    ) { }

    resolve() {
        return this.categoriesService.getAllCategories().map(categories => categories['data']);
    }

}
