import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent } from '../app/members/members.component'
import { PhonesComponent } from '../app/phones/phones.component'

const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: 'phones', component: PhonesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
