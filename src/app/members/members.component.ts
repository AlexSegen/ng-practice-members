import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member'
import { MemberService } from '../services/member.service';
import {RolesService} from '../services/roles.service'

import validator from 'validator'

import utils from '../helpers/utils'


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  selectedMember: Member;
  members: Array<Member>;
  requestResult;
  isLoading: Boolean;
  editMode: Boolean;

  editingSalaryId: Number;

  roles;

  constructor(private _memberService: MemberService, private _rolesService: RolesService) {
    this.isLoading = false;
    this.requestResult = false;
    this.editMode = false;
    this.editingSalaryId = 0
    this.selectedMember = new Member();
  }

  ngOnInit() {
    this.getMembers()
    this.getRoles()
  }

  getRoles() {
    this.roles = this._rolesService.getRoles();
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
    this.selectedMember = new Member();
  }

  getMember(member): void {
    this.selectedMember = member
  }

  handleForm() {
    
    if(!this.handleValidation().valid) {
      utils.notification('error', this.handleValidation().message);
      return false
    }

    utils.dialog('question', 'Confirm this action').then(value => {
      if (value) {
        this.setMember()
      }
    })
  }

  handleValidation() : any {
    if(validator.isEmpty(this.selectedMember.name) ||
      !validator.isLength(this.selectedMember.name)) {
      return {
        valid: false,
        message: "Invalid name"
      }
    }

    if(!validator.isEmail(this.selectedMember.email)) {
      return {
        valid: false,
        message: "Invalid email"
      }
    }

    if(!validator.isNumeric(this.selectedMember.salary.toString())) {
      return {
        valid: false,
        message: "Invalid salary"
      }
    }

    return true
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
