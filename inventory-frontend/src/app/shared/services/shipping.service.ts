import { IMaster } from 'src/app/shared/models/master.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShipping } from '../models/shipping.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  baserUrl = 'http://192.168.112.191:3000/shipping'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getItems() {
    return this._http.get<IShipping[]>(this.baserUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getTotalItems() {
    return this._http.get<IShipping[]>(`${this.baserUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getTotalItem(id: number) {
    return this._http.get<IShipping>(`${this.baserUrl}/master/${id}`)
  }
  getItemsOfMaster(id: number) {
    return this._http.get<IMaster>(`${this.baseMasterUrl}/${id}/extraction`)
  }
  updateItem(id: number, data: IShipping) {
    return this._http.patch<IShipping>(`${this.baserUrl}/${id}`, data)
  }
  deleteItem(id: number) {
    return this._http.delete(`${this.baserUrl}/${id}`)
  }
  sendEmailReport() {
    return this._http.get(`${this.baserUrl}/email`)
  }
}
