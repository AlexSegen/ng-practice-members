import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../services/phone.service';
import { Smartphone } from '../models/smartphone';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {
  
  smartphone: Smartphone[] = [];
  headers;
  
  constructor(private api: PhoneService) { }

  ngOnInit() {
    //this.getSmartphones()
    this.getSmartphoneById(1)
  }

  getSmartphones() {
    this.api.getSmartphone()
    .subscribe(resp => {
      console.log(resp);

  
      for (const data of resp.body) {
        this.smartphone.push(data);
      }
    });
  }

  getSmartphoneById(id: any) {
    this.api.getSmartphoneById(id)
      .subscribe(data => {
        console.log(data);
      });
  }

}
