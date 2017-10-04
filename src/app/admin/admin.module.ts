import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { ModalModule } from 'ngx-modal';
import { ToasterModule } from 'angular2-toaster';

// admin
import {
    AdminProductsComponent,
    AdminEditProductComponent,
    AdminAddProductComponent,
    AdminCategoriesComponent,
    UsersListComponent,
    AddUserComponent,
    EditUserComponent
} from './index';

import {
    CurrencyPipe
} from './../pipes/index';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(adminRoutes),
        ModalModule
    ],
    declarations: [
        AdminProductsComponent,
        AdminEditProductComponent,
        AdminAddProductComponent,
        AdminCategoriesComponent,
        UsersListComponent,
        AddUserComponent,
        EditUserComponent,
        CurrencyPipe
    ],
    providers: [
        ToasterModule,
        {
            provide: 'canDeactivateAddProduct',
            useValue: checkDirtyState
        },
    ]
})
export class AdminModule { }


export function checkDirtyState(component: AdminAddProductComponent) {
    if (component.isDirty && component.isModal) {
        return window.confirm('You have not saved this product, Do you really want to cancel?');
    }

    return true;
}
