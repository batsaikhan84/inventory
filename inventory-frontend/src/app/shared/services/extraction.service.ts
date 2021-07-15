import { IMaster } from 'src/app/shared/models/master.model';
import { filter, map } from 'rxjs/operators';
import { IExtraction } from './../models/extraction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtractionService {
  baseExtractionUrl = 'http://192.168.112.191:3000/extraction'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getExtractionItems() {
    return this._http.get<IExtraction[]>(this.baseExtractionUrl).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getExtractionMasterItems() {
    return this._http.get<IExtraction[]>(`${this.baseExtractionUrl}/master`).pipe(map(res => res.filter(item => item.master.Is_Active === true)))
  }
  getExtractionMasterItem(id: number) {
    return this._http.get<IExtraction>(`${this.baseExtractionUrl}/master/${id}`)
  }
  getExtractionItemsOfMaster(id: number) {
    return this._http.get<IExtraction>(`${this.baseMasterUrl}/${id}/extraction`)
  }
  updateExtractionItem(id: number, data: IExtraction) {
    return this._http.patch<IExtraction>(`${this.baseExtractionUrl}/${id}`, data)
  }
  deleteItem(id: number) {
    return this._http.delete(`${this.baseExtractionUrl}/${id}`)
  }
  sendEmailReport() {
    return this._http.get(`${this.baseExtractionUrl}/email`)
  }
}
