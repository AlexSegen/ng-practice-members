import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member'
import { MemberService } from '../services/member.service';

import utils from '../helpers/utils'


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

  constructor(private _memberService: MemberService) {
    this.isLoading = false;
    this.requestResult = false;
    this.selectedMember = new Member("0", "", "", "", 0, false );
  }

  ngOnInit() {
    this.getMembers()
  }

  getMembers(): void {
    this.members = this._memberService.getMembers();
  }

  deleteMember(member): void  {
    utils.dialog('warning', 'Confirm this action').then(value => {
      if(value) {
        this.isLoading = true;
        this._memberService.deleteMember(member).then(() => {
          utils.notification('warning', 'Member deleted')
          this.isLoading = false;
        })
      }
    })
  }

  resetform(): void {
    this.selectedMember = new Member("0", "", "", "", 0, false );
  }

  getMember(member): void {
    this.selectedMember = member
  }

  handleForm() {
    utils.dialog('question', 'Confirm this action').then(value => {
      if(value) {
        this.setMember()
      }
    })
  }

  setMember(): void {
    this.isLoading = true;
    setTimeout(() => {
      if (this.selectedMember.id == "0") {
        this._memberService.addMember(this.selectedMember).then(data=> {
          console.log(data)
          this.resetform()
          utils.notification('success', 'Member added')
        })
      } else {
        this._memberService.updateMember(this.selectedMember.id, this.selectedMember).then(data => {
          console.log(data)
          this.resetform()
          utils.notification('info', 'Member updated')
        })
      }
      this.isLoading = false;
    }, 1500);
  }

}
