import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IRevenue } from './revenue';

@Injectable()
export class RevenueService {
  private basicAction = 'revenue/';

  constructor(private http: Http, private backend: BackendService) { }

  getRevenues(): Observable<IRevenue[]> {
    return this.backend.getAll(this.basicAction)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRevenue(id: string): Observable<IRevenue> {
    if (id === '0') {
      return Observable.of(this.initializeRevenue());
    };
    const action = `${this.basicAction}${id}`;
    return this.backend.getById(action)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteRevenue(id: string): Observable<Response> {

    const action = `${this.basicAction}${id}`;
    return this.backend.delete(action)
      .catch(this.handleError);
  }

  saveRevenue(revenue: IRevenue): Observable<IRevenue> {


    if (revenue.id === '0') {
      return this.createRevenue(revenue);
    }
    return this.updateRevenue(revenue);
  }

  private createRevenue(revenue: IRevenue): Observable<IRevenue> {
    revenue.id = undefined;
    return this.backend.create(this.basicAction, revenue)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private updateRevenue(revenue: IRevenue): Observable<IRevenue> {
    const action = `${this.basicAction}${revenue.id}`;
    return this.backend.update(action, revenue)
      .map(() => revenue)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json ? response.json() : response;
    return body.data ? body.data : (body || {});
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  initializeRevenue(): IRevenue {
    // Return an initialized object
    return {
      id: '0',
      type: '',
      isGuest: null,
      memberId: null,
      guestName: null,
      amount: '',
      paidDate: '',
      fromDate: null,
      toDate: null
    };
  }
}
