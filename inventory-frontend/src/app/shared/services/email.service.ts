import { HttpClient } from '@angular/common/http';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
 baseUrl = 'http://192.168.112.191:3000/email/special-request'
  constructor(private _http: HttpClient) { }
  sendGeneralSpecialRequestEmail(specialRequestItems: any) {
    return this._http.post('http://192.168.112.191:3000/email/special-request', specialRequestItems)
  }
  sendSrSpecialRequestEmail(specialRequestItems: any) {
    return this._http.post('http://192.168.112.191:3000/email/special-request-sr', specialRequestItems)
  }
}
