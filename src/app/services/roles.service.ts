import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  
  roles:String[]

  constructor() {
    this.roles = ["Frontend Developer", "Backend Developer", "DevOps", "Mobile Developer"]
   }

  getRoles() {
    return this.roles
  }
}
