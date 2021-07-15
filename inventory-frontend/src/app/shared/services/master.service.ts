import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IMaster } from '../models/master.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MasterService {
  baseUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getMasterItems() {
    return this._http.get<IMaster[]>(this.baseUrl).pipe(map(items => items.filter(item => item.Is_Active === true )))
  }
  createMasterItem(masterItem: any) {
    return this._http.post<any>(this.baseUrl, masterItem)
  }
  updateMasterItem(id: number, selectedItem: IMaster, department: string) {
    return this._http.patch<IMaster>(`${this.baseUrl}/${id}`, { masterItem: selectedItem, department: department })
  }
  deactivateMasterItem(id: number, item: IMaster) {
    return this._http.patch(`${this.baseUrl}/deactivate/${id}`, item)
  }
}
