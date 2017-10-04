import { SharedService } from './../services/shared.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private sharedService: SharedService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isAdmin = this.sharedService.currentUser().isAdmin;

    if (isAdmin) {
      return true;
    }

    this.router.navigate(['/products/search']);
    return false;
  }
}
