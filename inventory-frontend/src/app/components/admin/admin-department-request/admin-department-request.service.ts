import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDepartmentRequest } from './admin-department-request.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentRequestService {
  baseUrl = 'http://192.168.112.191:3000/department-request'
  constructor(private _http: HttpClient) { }
  getItems() {
    return this._http.get<[IDepartmentRequest]>(this.baseUrl).pipe(map(res => res.filter(item => item.Is_Active === true)))
  }
  deactivateItem(id: number, item: IDepartmentRequest) {
    return this._http.patch(`${this.baseUrl}/deactivate/${id}`, item)
  }
}
