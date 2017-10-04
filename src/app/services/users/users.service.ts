import { Users } from './../../interfaces/users';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SharedService } from './../shared.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

  apiURL = this.shared.apiURL;
  type = 'users';

  constructor(
    private http: Http,
    private shared: SharedService
  ) { }

  users: Users;

  getAllUsers(): Observable<Users[]> {
    return this.http.get(this.apiURL + this.type)
      .map((response: Response) => {
        return <Users[]>response.json();
      })
      .catch(this.handleError);
  }

  getUser(id: number): Observable<Users> {
    return this.http.get(this.apiURL + this.type)
      .map((response: Response) => {
        const allUsers = <Users>response.json();
        console.log(allUsers);
        return <Users>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
