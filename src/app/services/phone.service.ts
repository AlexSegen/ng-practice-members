import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Smartphone } from '../models/smartphone'
import { Observable, of } from 'rxjs';

const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }
  
  getSmartphone(): Observable<HttpResponse<Smartphone[]>> {
    return this.http.get<Smartphone[]>(
      apiUrl + "/phones", { observe: 'response' });
  }
  
  getSmartphoneById(id: any): Observable<any> {
    return this.http.get<Smartphone>(apiUrl + "/phones/" + id, { observe: 'response' })
  }

}
