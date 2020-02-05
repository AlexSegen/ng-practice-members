import { Component, OnInit } from '@angular/core';
import { Member } from '../interfaces/member'
import { MemberService } from '../services/member.service';
import {RolesService} from '../services/roles.service';

import utils from '../helpers/utils';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})

export class MembersComponent implements OnInit {

  selectedMember: Member;
  members: Array<Member>;
  actives: Array<Member>;
  inactives: Array<Member>;
  requestResult: any;
  isLoading: boolean;
  editMode: boolean;

  editingSalaryId: number;

  roles;

  constructor(private _memberService: MemberService, private _rolesService: RolesService) {
    this.isLoading = false;
    this.requestResult = false;
    this.editMode = false;
    this.editingSalaryId = 0;

  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this._rolesService.getRoles$.subscribe((roles: Rol[]) => {
      this.roles = roles
      this.getMembers();
    })
  }

  getRol(rolID: number) {
    const find = this.roles
    .find(r => r.id == rolID)
    if(find)
      return find.name;
  }

  updateSalary(val: number): void {
    this._memberService.updateMemberSalary(this.editingSalaryId, val).subscribe(
      (res: Member) => {
        this.members[this.members.findIndex((i: Member) => i.id === this.editingSalaryId)] = res;
        this.editMode = false;
        this.editingSalaryId = 0;
        utils.notification('info', 'Member updated');
      },
      error => {
        console.log(error.message);
        this.isLoading = false;
        utils.notification('error', error.message);
      });
  }

  toggleUpdateSalary(val: boolean, memberId: number) {
    this.editMode = val;
    val ? this.editingSalaryId = memberId : this.editingSalaryId = 0;
  }

  getMembers(): void {
    this.isLoading = true;
    this._memberService.getMembers().subscribe((res: Member[])=> {
      this.members = res;
      this.isLoading = false;
      this.actives = this.members ? this.members.filter(m => m.isActive) : [];
      this.inactives = this.members ? this.members.filter(m => !m.isActive) : [];
    },
    error => {
      console.log(error.message);
      this.isLoading = false;
      utils.notification('error', error.message);
    });
  }

  deleteMember(member: Member): void {
    utils.dialog('warning', 'Confirm this action').then(value => {
      if (value) {
        this.members.splice(this.members.findIndex(i => i.id == member.id), 1);
        this.isLoading = true;
        this._memberService.deleteMember(member).subscribe(
          () => {
            utils.notification('warning', 'Member deleted');
          },
          error => {
            this.members.splice(this.members.findIndex(i => i.id == member.id), 1, member);
            console.log(error.message);
            utils.notification('error', error.message);
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }

  addNew() {
    this.selectedMember = {
      id: 0,
      role: 0
    }
  }

  resetform(): void {
    this.selectedMember = undefined;
  }

  getMember(member: Member): void {
    this.selectedMember = member;
  }

  handleForm() {

    if (!this.handleValidation().valid) {
      utils.notification('error', this.handleValidation().message);
      return false;
    }

    this.setMember();
  }

  handleValidation() : any {
    if (utils.validation.isEmpty(this.selectedMember.name)) {
      return {
        valid: false,
        message: 'Name cannot be empty'
      };
    }

    if (!utils.validation.isLength(this.selectedMember.name)) {
      return {
        valid: false,
        message: 'Name is too short'
      };
    }

    if (!utils.validation.isAlpha(this.selectedMember.name)) {
      return {
        valid: false,
        message: 'Name cannot contain numbers'
      };
    }

    if (!utils.validation.isEmail(this.selectedMember.email)) {
      return {
        valid: false,
        message: 'Invalid email'
      };
    }

    if (!utils.validation.isNumeric(this.selectedMember.salary)) {
      return {
        valid: false,
        message: 'Invalid salary'
      };
    }

    return {
      valid: true,
      message: 'Validation passed!'
    };
  }

  setMember(): void {
    this.isLoading = true;

    if (this.selectedMember && this.selectedMember.id === 0) {

      this._memberService.addMember(this.selectedMember).subscribe(
        member => {
          this.members.push(member);
          this.resetform();
          utils.notification('success', 'Member added');
        },
        error => {
          console.log(error.message);
          this.isLoading = false;
          utils.notification('error', error.message);
        });
    } else {
      this._memberService.updateMember(this.selectedMember).subscribe(
        res => {
          this.members[this.members.findIndex(i => i.id === this.editingSalaryId)] = res;
          this.isLoading = false;
          utils.notification('info', 'Member updated');
        },
        error => {
          console.log(error.message);
          this.isLoading = false;
          utils.notification('error', error.message);
        }
      );
    }
  }
}

interface Rol {
  id: number;
  name: string;
}