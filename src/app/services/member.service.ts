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
      "id": 1,
      "name": "Morrie Pallesen",
      "email": "mpallesen0@yale.edu",
      "company": "Thoughtblab",
      "isActive": false,
      "role": "Marketing Manager",
      "salary": 1738
    }, {
      "id": 2,
      "name": "Bev Moulds",
      "email": "bmoulds1@salon.com",
      "company": "Linkbuzz",
      "isActive": true,
      "role": "Civil Engineer",
      "salary": 1958
    }, {
      "id": 3,
      "name": "Manya Crocken",
      "email": "mcrocken2@house.gov",
      "company": "Twinder",
      "isActive": true,
      "role": "Research Assistant I",
      "salary": 1826
    }, {
      "id": 4,
      "name": "Ara Lissandri",
      "email": "alissandri3@yellowbook.com",
      "company": "Rooxo",
      "isActive": true,
      "role": "Sales Associate",
      "salary": 540
    }, {
      "id": 5,
      "name": "Morissa Plenderleith",
      "email": "mplenderleith4@craigslist.org",
      "company": "Topicshots",
      "isActive": false,
      "role": "Quality Engineer",
      "salary": 1430
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

  updateMember(memberId: Number, payload: Member) {
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
