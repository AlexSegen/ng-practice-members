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

  public members: Array<any>;
  selectedMember: Member;
  requestResult;
  isLoading: Boolean;
  editMode: Boolean;

  editingSalaryId: Number;

  constructor(private _memberService: MemberService) {
    this.isLoading = false;
    this.requestResult = false;
    this.editMode = false;
    this.editingSalaryId = 0
    this.selectedMember = new Member(0, "", "", "", 0, "", false);
  }

  ngOnInit() {
    this.getMembers()
  }

  updateSalary(val) {
    this._memberService.updateMemberSalary(this.editingSalaryId, val).subscribe(
      res => {
        this.members[this.members.findIndex(i => i.id == this.editingSalaryId)] = res
        this.editMode = false;
        this.editingSalaryId = 0
        utils.notification('info', 'Member updated')
      },
      error => {
        console.log(error.message)
        utils.notification('error', error.message)
      },
      () => {
        this.isLoading = false;
      })
  }

  toggleUpdateSalary(val: Boolean, memberId: Number) {
    this.editMode = val;
    val ? this.editingSalaryId = memberId : this.editingSalaryId = 0
  }

  getMembers(): void {
    this.isLoading = true;
    this._memberService.getMembers().subscribe(res => {
      this.members = res;
      this.isLoading = false;
    },
    error => {
      console.log(error.message)
      this.isLoading = false;
      utils.notification('error', error.message)
    })
  }

  deleteMember(member: Member): void {
    utils.dialog('warning', 'Confirm this action').then(value => {
      if (value) {
        this.isLoading = true;
        this._memberService.deleteMember(member).subscribe(
          () => {
            this.members.splice(this.members.findIndex(i => i.id == member.id), 1);
            utils.notification('warning', 'Member deleted')
          },
          error => {
            console.log(error.message)
            utils.notification('error', error.message)
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    })
  }

  resetform(): void {
    this.selectedMember = new Member(0, "", "", "", 0, "", false);
  }

  getMember(member): void {
    this.selectedMember = member
  }

  handleForm() {
    utils.dialog('question', 'Confirm this action').then(value => {
      if (value) {
        this.setMember()
      }
    })
  }

  setMember(): void {
    this.isLoading = true;

    if (this.selectedMember.id == 0) {

      this._memberService.addMember(this.selectedMember).subscribe(
        member => {
          this.members.push(member)
          this.resetform()
          utils.notification('success', 'Member added')
        },
        error => {
          console.log(error.message)
          utils.notification('error', error.message)
        },
        () => {
          this.isLoading = false;
        }
      );
    } else {
      this._memberService.updateMember(this.selectedMember).subscribe(
        res => {
          this.members[this.members.findIndex(i => i.id == this.editingSalaryId)] = res
          this.isLoading = false
          utils.notification('info', 'Member updated')
        },
        error => {
          console.log(error.message)
          utils.notification('error', error.message)
        },
        () => {
          this.isLoading = false;
        }
      );
    }
  }
}
