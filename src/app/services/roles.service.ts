import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();
  
  roles:String[]

  constructor() {
    this.roles = ["Frontend Developer", "Backend Developer", "DevOps", "Mobile Developer"]
   }

  nextMessage(message: string) {
    this.message.next(message)
  }

  getRoles() {
    return this.roles
  }
}
