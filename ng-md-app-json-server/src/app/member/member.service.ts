import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BackendService } from '../_services'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IMember } from './member';

@Injectable()
export class MemberService {
  private basicAction = 'members/';

  constructor(private http: Http, private backend: BackendService) { }

  getMembers(): Observable<IMember[]> {
    return this.backend.getAll(this.basicAction)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getMember(id: string): Observable<IMember> {
    if (id === '0') {
      return Observable.of(this.initializeMember());
    };
    const action = `${this.basicAction}${id}`;
    return this.backend.getById(action)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteMember(id: string): Observable<Response> {

    const action = `${this.basicAction}${id}`;
    return this.backend.delete(action)
      .catch(this.handleError);
  }

  saveMember(member: IMember): Observable<IMember> {


    if (member.id === '0') {
      return this.createMember(member);
    }
    return this.updateMember(member);
  }

  private createMember(member: IMember): Observable<IMember> {
    member.id = undefined;
    return this.backend.create(this.basicAction, member)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private updateMember(member: IMember): Observable<IMember> {
    const action = `${this.basicAction}${member.id}`;
    return this.backend.update(action, member)
      .map(() => member)
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

  initializeMember(): IMember {
    // Return an initialized object
    return {
      id: '0',
      name: null,
      mobileNumber: null,
      gender: null,
      area: null,
      address: null,
      age: null,
      married: null,
      occupation: null,
      income: null,
      familyMemDetails: null
    };
  }
}
