import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class AuthService {



  constructor(
    private _http: Http,
    private shared: SharedService
  ) { }

  apiURL = this.shared.apiURL;
  userData: any[];

  authenticateUser() {
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }

  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }



}