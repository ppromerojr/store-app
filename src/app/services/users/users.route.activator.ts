import { Users } from './../../interfaces/users';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';


@Injectable()
export class UserRouteActivator implements CanActivate {
    constructor(
        private usersService: UsersService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    users: Users[];
    userExists: boolean;
    isReady = false;

    canActivate(route: ActivatedRouteSnapshot) {
        const userId = route.params['id'];
        this.users = this.route.snapshot.data['users'];
        console.log(userId);

        this.usersService.getAllUsers().subscribe((res) => {
            this.users = res['data'];
            this.users.filter((user) => {
                if (user.id === +userId) {
                    this.userExists = true;
                }
            });

            console.log(this.userExists);
            if (!this.userExists) {
                this.router.navigate(['/404']);
                return false;
            }

        });
        return true;

    }

}
