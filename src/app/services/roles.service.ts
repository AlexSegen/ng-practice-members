import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    //'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles$ = new BehaviorSubject([]);
  getRoles$ = this.roles$.asObservable();
  url: string;
  roles: Rol[]

  constructor(private _http: HttpClient) {
    this.url = "http://localhost:3000/roles"
    this.roles = []
    this.getRoles()
   }

  setRoles$(rol: Rol) {
    this.roles.push(rol)
    this.roles$.next(this.roles)
  }

  getRoles() {
    this._http.get<Rol[]>(this.url).subscribe(res => {
      this.roles = res;
      this.roles$.next(this.roles);
    })
  }
}

interface Rol {
  id: number;
  name: string;
}