import { Component, OnInit } from '@angular/core';
import {RolesService} from '../services/roles.service'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles;
  message:string;

  constructor(private _rolesService: RolesService) {
   }

  ngOnInit() {
    this._rolesService.sharedMessage.subscribe(message => this.message = message)
    this.getRoles()
  }

  getRoles() {
    this.roles = this._rolesService.getRoles();
  }

}
