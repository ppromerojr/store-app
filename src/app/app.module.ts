import { SharedService } from './providers/shared.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './providers/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routes } from './routes';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategorytService } from './pages/products/shared/category.cervice';
import { ProductService } from './pages/products/shared/product.service';
import { UsersComponent } from './pages/users/users.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminEditProductComponent } from './pages/admin-edit-product/admin-edit-product.component';
import { SortPipe } from './pipes/sort.pipe';
import { AdminAddProductComponent } from './pages/admin-add-product/admin-add-product.component';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { AccordionModule } from "ng2-accordion";
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    ProductsComponent,
    UsersComponent,
    AdminProductsComponent,
    AdminEditProductComponent,
    SortPipe,
    AdminAddProductComponent,
    AdminCategoriesComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    BootstrapModalModule,
    AccordionModule
  ],
  providers: [
    SharedService,
    AuthService,
    AuthGuard,
    CategorytService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
