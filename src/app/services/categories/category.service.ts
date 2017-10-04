import { Icategory } from './../icategory';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SharedService } from './../shared.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CategoryService {

  constructor(
    private shared: SharedService,
    private http: Http
  ) { }

  apiURL = this.shared.apiURL;
  type = 'categories';
  categories: Icategory[];


  getAllCategories(): Observable<Icategory[]> {
    return this.http.get(this.apiURL + this.type)
      .map((response: Response) => {
        return <Icategory[]>response.json();
      });
  }

  saveCategory(formData): Observable<Icategory> {

    formData = JSON.stringify(formData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiURL + this.type + '/create', formData, options)
      .map((response: Response) => {
        return <Icategory>response.json();
      });

  }

  updateCategory(formData): Observable<Icategory> {
    formData = JSON.stringify(formData);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.apiURL + this.type + '/update', formData, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteCategory(formData): Observable<Icategory> {

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
