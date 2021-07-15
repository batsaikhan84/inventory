import { IReceiving } from './../models/receiving.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
  baseUrl = 'http://192.168.112.191:3000/receiving'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getReceivingItems() {
    return this._http.get<IReceiving[]>(this.baseUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getReceivingMasterItems() {
    return this._http.get<IReceiving[]>(`${this.baseUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getReceivingMasterItem(id: number) {
    return this._http.get<IReceiving>(`${this.baseUrl}/master/${id}`)
  }
  getReceivingItemsOfMaster(id: number) {
    return this._http.get<IReceiving>(`${this.baseMasterUrl}/${id}/receiving`)
  }
  updateReceivingItem(id: number, data: IReceiving) {
    return this._http.patch<IReceiving>(`${this.baseUrl}/${id}`, data)
  }
  deleteItem(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`)
  }
  sendEmailReport() {
    return this._http.get(`${this.baseUrl}/email`)
  }
}