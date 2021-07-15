import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IRd } from '../models/rd.model';

@Injectable({
  providedIn: 'root'
})
export class RdService {
  baseUrl = 'http://192.168.112.191:3000/rd'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getRdItems() {
    return this._http.get<IRd[]>(this.baseUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getRdMasterItems() {
    return this._http.get<IRd[]>(`${this.baseUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getRdMasterItem(id: number) {
    return this._http.get<IRd>(`${this.baseUrl}/master/${id}`)
  }
  getRdItemsOfMaster(id: number) {
    return this._http.get<IRd>(`${this.baseMasterUrl}/${id}/rd`)
  }
  updateRdItem(id: number, data: IRd) {
    return this._http.patch<IRd>(`${this.baseUrl}/${id}`, data)
  }

  sendEmailReport() {
    return this._http.get(`${this.baseUrl}/email`)
  }
}
