import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../../models/member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() members: Array<Member> = [];

  actives: Array<Member> = [];
  inactives: Array<Member> = [];

  constructor() { }

  ngOnInit() {
    this.filterMembers();
  }

  filterMembers() {
    console.log(this.members)
    this.actives = this.members ? this.members.filter(m => m.isActive) : [];
    this.inactives = this.members ? this.members.filter(m => !m.isActive) : [];
  }

}
