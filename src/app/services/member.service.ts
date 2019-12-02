import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Member } from '../models/member'

import _ from 'underscore'

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  
  members:Array<Member>;
  url:string;


  constructor( private _http: HttpClient) {
    this.url = "http://localhost:3000/members"
    this.members = []
   }

  /* getMembers(): Member[] {

    return this.members;
  } */

  public getMembers(){
    return this._http.get(this.url);
  }

  addMember(member:Member) {
    return this._http.post(this.url, member);
  }

  updateMember(memberId: Number, payload) {
    return this._http.put(this.url + "/"  + memberId, payload);
  }

  updateMemberSalary(memberId: Number, newSalary: Number) {
    return new Promise((resolve, reject) => {
      let tmp = this.members;
      let index = tmp.findIndex(i => i.id == memberId);

      if(index != -1) {
        tmp[index].salary = newSalary;
        this.members = tmp;
        resolve(tmp[index])
      }
      reject("Member not found")
    })
  }

  deleteMember(member: Member) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let index = this.members.findIndex(i => i.id == member.id);
        if(index != -1) {
          this.members.splice(index, 1);
          resolve(true)
        }
        reject("Member not found")
      }, 500);
    })
  }
}
