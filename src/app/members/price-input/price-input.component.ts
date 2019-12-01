import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { MemberService } from '../../services/member.service';

@Component({
  selector: 'price-input',
  templateUrl: './price-input.component.html',
  styleUrls: ['./price-input.component.scss']
})
export class PriceInputComponent implements OnInit {

  @Input() editingsalary: Number;
  @Output() salaryChange = new EventEmitter();
  @Output() editChange = new EventEmitter();

  constructor() { 
  }

  ngOnInit() {
  }

  saveChanges() {
    this.salaryChange.emit(this.editingsalary);
  }

  cancelChanges() {
    this.editChange.emit(false)
  }

}
