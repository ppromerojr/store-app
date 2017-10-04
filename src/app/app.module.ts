import { UserRouteActivator } from './services/users/users.route.activator';
import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './routes';
import { adminRoutes } from './admin/admin.routes';

// users
import {
  ProductsComponent,
  LoginComponent,
  ProductDetailsComponent,
  CategoryDetailsComponent,
  Error404Component
} from './users/index';

import {
  NavComponent,
  FooterComponent,
  NowComponent
} from './structure';

import {
  AuthGuard,
  AdminGuard
} from './guards/index';

import {
  ProductsService,
  CategoryService,
  AuthService,
  SharedService,
  UsersService,
  ProductsListResolver,
  CategoriesListResolver,
  UsersListResolver
} from './services/index';

import {
  SearchPipe,
  ChangeCurrencyPipe
} from './pipes/index';
import { SearchComponent } from './users/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CategoryDetailsComponent,
    Error404Component,
    ChangeCurrencyPipe,
    SearchComponent,
    NowComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    RouterModule.forRoot(adminRoutes)
  ],
  providers: [
    SharedService,
    AuthService,
    UsersService,
    AuthGuard,
    AdminGuard,
    ProductsService,
    ProductsService,
    CategoryService,
    UserRouteActivator,
    ProductsListResolver,
    CategoriesListResolver,
    UsersListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
