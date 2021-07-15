import { IMassSpec } from 'src/app/shared/models/mass-spec.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MassSpecService {
  baseUrl = 'http://192.168.112.191:3000/mass-spec'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getMassSpecItems() {
    return this._http.get<IMassSpec[]>(this.baseUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getMassSpecMasterItems() {
    return this._http.get<IMassSpec[]>(`${this.baseUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getMassSpecMasterItem(id: number) {
    return this._http.get<IMassSpec>(`${this.baseUrl}/master/${id}`)
  }
  getMassSpecItemsOfMaster(id: number) {
    return this._http.get<IMassSpec>(`${this.baseMasterUrl}/${id}/mass-spec`)
  }
  updateMassSpecItem(id: number, data: IMassSpec) {
    return this._http.patch<IMassSpec>(`${this.baseUrl}/${id}`, data)
  }
  deleteItem(id: number) {
    return this._http.delete(`${this.baseUrl}/${id}`)
  }
  sendEmailReport() {
    return this._http.get(`${this.baseUrl}/email`)
  }
}