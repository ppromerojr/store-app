import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class UsersListResolver implements Resolve<any> {

    constructor(
        private usersService: UsersService
    ) { }

    resolve() {
        return this.usersService.getAllUsers().map(products => products['data']);
    }

}
