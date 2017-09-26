import { SharedService } from './providers/shared.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './providers/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
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
