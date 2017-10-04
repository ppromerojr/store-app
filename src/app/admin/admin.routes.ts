import { CategoriesListResolver } from './../services/categories/categories-list.resolver';
import { ProductsListResolver } from './../services/products/products-list.resolver';
import { AuthGuard } from './../guards/auth.guard';
import { UsersListComponent } from './../admin/users/users-list/users-list.component';
import { EditUserComponent } from './../admin/users/edit-user/edit-user.component';
import { AdminCategoriesComponent } from './../admin/categories/categories.component';
import { AdminProductsComponent } from './../admin/products/product-list/admin-products.component';
import { AdminGuard } from './../guards/admin.guard';

import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: 'products/manage',
        component: AdminProductsComponent,
        resolve: {
            products: ProductsListResolver,
            categories: CategoriesListResolver
        },
        canActivate: [AdminGuard],
        canDeactivate: ['canDeactivateAddProduct']
    },
    {
        path: 'categories/manage',
        component: AdminCategoriesComponent,
        resolve: { categories: CategoriesListResolver },
        canActivate: [AdminGuard]
    },
    { path: 'users', component: UsersListComponent, canActivate: [AdminGuard] },
];
