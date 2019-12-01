import { Component, OnInit } from '@angular/core';

import _ from 'underscore'

import { Member } from '../models/member'
import { members } from '../../services/members.service'


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members:Array<Member>;
  selectedMember:Member;
  requestResult;
  isLoading:Boolean;

  constructor() {
    this.isLoading = false;
    this.requestResult = false;
    this.members = members;
  }

  ngOnInit() {
    this.resetform()
  }

  deleteMember(member) {
    this.isLoading = true;
    setTimeout(() => {
      let index = this.members.findIndex(i => i.id == member.id);
      this.members.splice(index, 1);      
      this.requestResult = "Member deleted";
      this.isLoading = false;
    }, 1000);
  }

  resetform() {
    this.selectedMember = new Member("0", "", "", "", false );
  }

  getMember(member) {
    this.selectedMember = member
  }

  setMember() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.selectedMember.id == "0") {
        this.selectedMember.id = _.uniqueId('_');
        this.members.push(this.selectedMember);
        this.resetform()
        this.requestResult = "New member added";
      } else {
        this.resetform()
        this.requestResult = "Member Updated";
      }
      this.isLoading = false;
    }, 1500);
  }

}
