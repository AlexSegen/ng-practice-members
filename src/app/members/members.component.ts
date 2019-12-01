import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member'
import { MemberService } from '../services/member.service';


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
    this.selectedMember = new Member("0", "", "", "", false );
  }

  ngOnInit() {
    this.getMembers()
  }

  getMembers(): void {
    this.members = this._memberService.getMembers();
  }

  deleteMember(member): void  {
    this.isLoading = true;
    this._memberService.deleteMember(member).then(() => {
      this.requestResult = "Member deleted";
      this.isLoading = false;
    })
  }

  resetform(): void {
    this.selectedMember = new Member("0", "", "", "", false );
  }

  getMember(member): void {
    this.selectedMember = member
  }

  setMember(): void {
    this.isLoading = true;
    setTimeout(() => {
      if (this.selectedMember.id == "0") {
        this._memberService.addMember(this.selectedMember).then(data=> {
          console.log(data)
          this.resetform()
          this.requestResult = "New member added";
        })
      } else {
        this._memberService.updateMember(this.selectedMember.id, this.selectedMember).then(data => {
          console.log(data)
          this.resetform()
          this.requestResult = "Member Updated";
        })
      }
      this.isLoading = false;
    }, 1500);
  }

}
