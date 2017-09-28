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
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this._http.post(this.apiURL + type + '/create', formData, { headers: headers })
      .map((response: Response) => {
        return response.json();
      });
  }

  _putData(formData, type) {
    formData = JSON.stringify(formData);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    return this._http.put(this.apiURL + type + '/update', formData, { headers: headers })
      .map((response: Response) => {
        return response.json();
      });
  }


  _deleteData(formData, type) {

    let formID = formData.id;
    console.log(formID);
    formData = JSON.stringify(formData);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
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

  logout() {
    localStorage.removeItem('currentUser');
  }


}