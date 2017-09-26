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
    { path: 'all-products', component: ProductsComponent },
    { path: 'users', component: UsersComponent },
    { path: 'products/admin', component: AdminProductsComponent }
];