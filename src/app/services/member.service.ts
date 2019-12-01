import { Injectable } from '@angular/core';
import { Member } from '../models/member'

import _ from 'underscore'

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  
  members:Array<Member>;

  constructor() {
    this.members = [{
      "id": "1",
      "name": "Correy O'Gormally",
      "email": "cogormally0@4shared.com",
      "company": "Izio",
      "isActive": true
    }, {
      "id": "2",
      "name": "Nesta Udell",
      "email": "nudell1@cafepress.com",
      "company": "Chatterpoint",
      "isActive": false
    }, {
      "id": "3",
      "name": "Welsh Faulkes",
      "email": "wfaulkes2@cafepress.com",
      "company": "Tagopia",
      "isActive": true
    }, {
      "id": "4",
      "name": "Barnabe Korlat",
      "email": "bkorlat3@biblegateway.com",
      "company": "Blogpad",
      "isActive": false
    }]
   }

  getMembers(): Member[] {
    return this.members;   
  }

  addMember(member:Member) {
    return new Promise((resolve, reject) => {
        member.id = _.now();
        if(member.id) {
          this.members.push(member);
          resolve(member)
        }
        reject(false)
    })
  }

  updateMember(memberId: String, payload: Member) {
    return new Promise((resolve, reject) => {
      let tmp = this.members;
      let index = tmp.findIndex(i => i.id == memberId);

      if(index != -1) {
        tmp[index] = {...tmp[index], ...payload};
        this.members = tmp;
        resolve({...tmp[index], ...payload})
      }
      reject(false)
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
        reject(false)
      }, 500);
    })
  }
}
