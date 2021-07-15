import { IQuality } from './../models/quality.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QualityService {
  baseExtractionUrl = 'http://192.168.112.191:3000/quality'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getQualityItems() {
    return this._http.get<IQuality[]>(this.baseExtractionUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getQualityMasterItems() {
    return this._http.get<IQuality[]>(`${this.baseExtractionUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getQualityMasterItem(id: number) {
    return this._http.get<IQuality>(`${this.baseExtractionUrl}/master/${id}`)
  }
  getQualityItemsOfMaster(id: number) {
    return this._http.get<IQuality>(`${this.baseMasterUrl}/${id}/quality`)
  }
  updateQualityItem(id: number, data: IQuality) {
    return this._http.patch<IQuality>(`${this.baseExtractionUrl}/${id}`, data)
  }
  deleteItem(id: number) {
    return this._http.delete(`${this.baseExtractionUrl}/${id}`)
  }
  sendEmailReport() {
    return this._http.get(`${this.baseExtractionUrl}/email`)
  }
}
