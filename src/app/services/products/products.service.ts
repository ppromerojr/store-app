import { Iproduct } from './../iproduct';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SharedService } from './../shared.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductsService {

  constructor(
    private shared: SharedService,
    private http: Http
  ) { }

  apiURL = this.shared.apiURL;
  type = 'products';
  products: Iproduct[];


  getAllProducts(): Observable<Iproduct[]> {
    return this.http.get(this.apiURL + this.type)
      .map((response: Response) => {
        return <Iproduct[]>response.json();
      })
      .catch(this.handleError);
  }

  saveProduct(formData): Observable<Iproduct> {

    formData = JSON.stringify(formData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiURL + this.type + '/create', formData, options)
      .map((response: Response) => {
        return <Iproduct>response.json();
      });

  }

  updateProduct(formData): Observable<Iproduct> {
    formData = JSON.stringify(formData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiURL + this.type + '/update', formData, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteProduct(formData): Observable<Iproduct> {

    const formId = formData.id;
    formData = JSON.stringify(formData);

    return this.http.delete(this.apiURL + this.type + '/delete/' + formId, formData)
      .map((response: Response) => {
        return response.json();
      });
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}
