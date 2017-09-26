import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class SharedService {

  constructor(
    private _http: Http
  ) { }

  apiURL = 'http://localhost:8080/';

  _currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  _postData(formData, type) {
    formData = JSON.stringify(formData);
    return this._http.post(this.apiURL + type, formData)
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

  logout() {
    localStorage.removeItem('currentUser');
  }


}