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

  public members:Array<any>;
  selectedMember:Member;
  requestResult;
  isLoading:Boolean;
  editMode:Boolean;

  editingSalaryId: Number;
  
  constructor(private _memberService: MemberService) {
    this.isLoading = false;
    this.requestResult = false;
    this.editMode = false;
    this.editingSalaryId = 0
    this.selectedMember = new Member(0, "", "", "", 0, "", false );
  }

  ngOnInit() {
    this.getMembers()
  }

  updateSalary(val) {
    this._memberService.updateMemberSalary(this.editingSalaryId, val).then(() => {
      this.editMode = false;
      this.editingSalaryId = 0
      utils.notification('info', 'Member salary updated to $' + val)
    })
  }

  toggleUpdateSalary(val:Boolean, memberId:Number) {
    this.editMode = val;
    val ? this.editingSalaryId = memberId : this.editingSalaryId = 0
  }

  getMembers(): void {
    this._memberService.getMembers().subscribe(res => {
      this.members = res;
    },
    error => {
      console.log(error.message)
    });
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
    this.selectedMember = new Member(0, "", "", "", 0, "", false );
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
      if (this.selectedMember.id == 0) {

        /* this._memberService.addMember(this.selectedMember).then(data=> {
          this.resetform()
          utils.notification('success', 'Member added')
        }).catch(error => {
          utils.notification('error', error)
        }).finally(() => {
          this.isLoading = false;
        }) */
      } else {
        this._memberService.updateMember(this.selectedMember.id, this.selectedMember).subscribe(
          val => {
            console.log(val)
            this.isLoading = false
            utils.notification('info', 'Member updated')
          }
        );
      }
      
    }, 1500);
  }

}
