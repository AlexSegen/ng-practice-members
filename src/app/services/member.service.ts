import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';

import { Member } from '../interfaces/member'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    //'Authorization': 'my-auth-token'
  })
};

import _ from 'underscore'

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Array<Member>;
  url: string;


  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3000/members"
    this.members = []
  }

  public getMembers(): Observable<Member[]> {
    return this._http.get<Member[]>(this.url)
  }

  addMember(member: Member): Observable<Member> {
    return this._http.post<Member>(this.url, member, httpOptions);
  }

  updateMember(member: Member): Observable<Member> {
    return this._http.put<Member>(this.url + "/" + member.id, member);
  }

  updateMemberSalary(memberId: Number, newSalary: Number): Observable<Member> {
    return this._http.patch<Member>(this.url + "/" + memberId, { salary: newSalary });
  }

  deleteMember(member: Member) {
    return this._http.delete<Member>(this.url + "/" + member.id, httpOptions);
  }
}
