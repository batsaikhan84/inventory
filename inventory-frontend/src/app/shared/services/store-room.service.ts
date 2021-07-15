import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStoreRoom } from '../models/store-room.model';

@Injectable({
  providedIn: 'root'
})
export class StoreRoomService {
  baseStoreRoomUrl = 'http://192.168.112.191:3000/store-room'
  baseMasterUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  getStoreRoomItems() {
    return this._http.get<IStoreRoom[]>(this.baseStoreRoomUrl)
  }
  getStoreRoomMasterItems() {
    return this._http.get<IStoreRoom[]>(`${this.baseStoreRoomUrl}/master`)
  }
  getStoreRoomMasterItem(id: number) {
    return this._http.get<IStoreRoom>(`${this.baseMasterUrl}/${id}/store-room`)
  }
  updateStoreRoomItem(id: number, data: IStoreRoom) {
    return this._http.patch<IStoreRoom>(`${this.baseStoreRoomUrl}/${id}`, data)
  }
  deactivateStoreRoomItem(id: number, item: IStoreRoom) {
    return this._http.patch(`${this.baseStoreRoomUrl}/deactivate/${id}`, item)
  }
  sendEmailReport() {
    return this._http.get(`${this.baseStoreRoomUrl}/email`)
  }
}





