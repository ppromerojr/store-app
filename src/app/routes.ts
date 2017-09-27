import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'products/manage', component: AdminProductsComponent, canActivate: [AuthGuard] },
    { path: 'categories/manage', component: AdminCategoriesComponent, canActivate: [AuthGuard] }
];