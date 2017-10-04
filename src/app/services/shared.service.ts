import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SharedService {

  currency = localStorage.getItem('currency');
  private _navItemSource = new BehaviorSubject<string>(this.currency);
  navItem = this._navItemSource.asObservable();

  private searchTermSource = new BehaviorSubject<string>('term');
  searchTerm = this.searchTermSource.asObservable();

  constructor(
    private _http: Http,
    private router: ActivatedRoute
  ) { }


  apiURL = 'http://localhost:8080/';
  dollarToPeso = '50.97';
  activeUrl = this.router.url;

  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  changeCurrency(currency) {
    currency = (currency) && localStorage.getItem('currency');
    this._navItemSource.next(currency);
  }

  searchProducts(term) {
    this.searchTermSource.next(term);
  }

  _postData(formData, type) {
    formData = JSON.stringify(formData);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this.apiURL + type + '/create', formData, { headers: headers })
      .map((response: Response) => {
        return response.json();
      });
  }

  _putData(formData, type) {
    formData = JSON.stringify(formData);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put(this.apiURL + type + '/update', formData, { headers: headers })
      .map((response: Response) => {
        return response.json();
      });
  }

  _deleteData(formData, type) {

    const formID = formData.id;
    console.log(formID);
    formData = JSON.stringify(formData);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete(this.apiURL + type + '/delete/' + formID, formData)
      .map((response: Response) => {
        return response.json();
      });
  }

  _getData(type) {
    return this._http.get(this.apiURL + type)
      .map((response: Response) => {
        return response.json();
      });
  }

  getData(type) {
    return this._http.get(this.apiURL + type)
      .map((response: Response) => {
        return response.json();
      });
  }


  logout() {
    localStorage.removeItem('currentUser');
  }

  _testFunction() {
    return localStorage.getItem('currency');
  }

}
