import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../_models';

@Injectable()
export class BackendService {

  private baseUrl: string = "http://localhost:8585/";

  constructor(private http: Http, private location: Location) {
    console.log(http);
    this.location.prepareExternalUrl(this.baseUrl);

  }

  getAll(action: string) {
    return this.http.get(this.baseUrl + action, this.jwt()).map((response: Response) => response.json());
  }

  getByQuery(action: string) {
    const url = `${this.baseUrl}${action}`
    return this.http.get(url, this.jwt()).map((response: Response) => response.json());
  }

  getById(action: string) {
    const url = `${this.baseUrl}${action}`
    return this.http.get(url, this.jwt()).map((response: Response) => response.json());
  }

  create(action: string, data: any) {
    const url = `${this.baseUrl}${action}`
    return this.http.post(url, JSON.stringify(data), this.jwtWithJsonContent()).map((response: Response) => response.json());
  }

  update(action: string, data: any) {
    const url = `${this.baseUrl}${action}`
    return this.http.put(url, JSON.stringify(data), this.jwtWithJsonContent()).map((response: Response) => response.json());
  }

  delete(action: string) {
    const url = `${this.baseUrl}${action}`
    return this.http.delete(url, this.jwt()).map((response: Response) => response.json());
  }

  login(action: string, user: User) {
    const url = `${this.baseUrl}${action}`;
    // Use get method to call Restful fake API to pretend login 
    // return this.http.get(url).map((response: Response) => response.json());
    // Production should use post method as follow
    return this.http.post(url, JSON.stringify(user), this.jsonHeader()).map((response: Response) => response.json());
  }

  // private helper methods
  private jsonHeader() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  // private helper methods
  private form() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return new RequestOptions({ headers: headers });
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + currentUser.token);
      return new RequestOptions({ headers: headers });
    }
  }

  private jwtWithJsonContent() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + currentUser.token);
      headers.append('Content-Type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}