import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IScreening } from '../models/screening.model';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {
  baseUrl = 'http://192.168.112.191:3000/screening'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getScreeningItems() {
    return this._http.get<IScreening[]>(this.baseUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getScreeningMasterItems() {
    return this._http.get<IScreening[]>(`${this.baseUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getScreeningMasterItem(id: number) {
    return this._http.get<IScreening>(`${this.baseUrl}/master/${id}`)
  }
  getScreeningItemsOfMaster(id: number) {
    return this._http.get<IScreening>(`${this.baseMasterUrl}/${id}/screening`)
  }
  updateScreeningItem(id: number, data: IScreening) {
    return this._http.patch<IScreening>(`${this.baseUrl}/${id}`, data)
  }
  deleteItem(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`)
  }
  sendEmailReport() {
    return this._http.get(`${this.baseUrl}/email`)
  }
}