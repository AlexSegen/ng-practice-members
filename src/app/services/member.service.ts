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
      "salary": 1150,
      "isActive": true
    }, {
      "id": "2",
      "name": "Nesta Udell",
      "email": "nudell1@cafepress.com",
      "company": "Chatterpoint",
      "salary": 1050,
      "isActive": false
    }, {
      "id": "3",
      "name": "Welsh Faulkes",
      "email": "wfaulkes2@cafepress.com",
      "company": "Tagopia",
      "salary": 1860,
      "isActive": true
    }, {
      "id": "4",
      "name": "Barnabe Korlat",
      "email": "bkorlat3@biblegateway.com",
      "company": "Blogpad",
      "salary": 1250,
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
        reject("Error creating member")
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
      reject("Member not found")
    })
  }

  updateMemberSalary(memberId: String, newSalary: Number) {
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
