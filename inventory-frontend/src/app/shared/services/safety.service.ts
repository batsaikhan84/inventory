import { ISafety } from './../models/safety.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SafetyService {
  baseExtractionUrl = 'http://192.168.112.191:3000/safety'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getSafetyItems() {
    return this._http.get<ISafety[]>(this.baseExtractionUrl)
  }
  getSafetyMasterItems() {
    return this._http.get<ISafety[]>(`${this.baseExtractionUrl}/master`)
  }
  getSafetyMasterItem(id: number) {
    return this._http.get<ISafety>(`${this.baseMasterUrl}/${id}/safety`)
  }
  updateSafetyItem(id: number, data: ISafety) {
    return this._http.patch<ISafety>(`${this.baseExtractionUrl}/${id}`, data)
  }
}