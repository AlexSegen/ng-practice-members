import { Component, OnInit } from '@angular/core';
import {RolesService} from '../services/roles.service'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})


export class RolesComponent implements OnInit {

  roles: Array<Rol>;
  message: string;

  constructor(private _rolesService: RolesService) {}

  ngOnInit() {
    this.getRoles()
  }

  getRoles() {
    this._rolesService.getRoles$.subscribe((roles: Rol[]) => this.roles = roles)
  }

}

interface Rol {
  id: number;
  name: string;
}