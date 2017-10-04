import { UsersListResolver } from './services/users/users-list.resolver';
import { CategoriesListResolver } from './services/categories/categories-list.resolver';
import { ProductsListResolver } from './services/products/products-list.resolver';
import { SearchComponent } from './users/search/search.component';
import { UserRouteActivator } from './services/users/users.route.activator';
import { Error404Component } from './users/error404/error404.component';
import { CategoryDetailsComponent } from './users/categories/category-details/category-details.component';
import { ProductDetailsComponent } from './users/products/product-details/product-details.component';
import { LoginComponent } from './users/login/login.component';
import { ProductsComponent } from './users/products/product-list/products.component';
import { UsersListComponent } from './admin/users/users-list/users-list.component';
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';
import { AdminCategoriesComponent } from './admin/categories/categories.component';
import { AdminProductsComponent } from './admin/products/product-list/admin-products.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '', component: SearchComponent,
        resolve: {
            products: ProductsListResolver,
            categories: CategoriesListResolver
        }
    },
    { path: 'login', component: LoginComponent },
    {
        path: 'products/search', component: SearchComponent,
        resolve: {
            products: ProductsListResolver,
            categories: CategoriesListResolver
        }
    },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'products/:id', component: ProductDetailsComponent },
    {
        path: 'categories/:id', component: SearchComponent,
        resolve: {
            products: ProductsListResolver,
            categories: CategoriesListResolver
        }
    },
    { path: 'users', component: UsersListComponent },
    {
        path: 'users/:id', component: EditUserComponent,
        canActivate: [UserRouteActivator],
        resolve: {
            users: UsersListResolver
        }
    },
    { path: '404', component: Error404Component }

];
