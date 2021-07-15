import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IMaster } from '../models/master.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseUrl = 'http://192.168.112.191:3000/master'
  constructor(private _http: HttpClient) { }
  catergories() {
    return this._http.get<IMaster[]>(this.baseUrl).pipe(map(items => items.filter(item => console.log(item) )))
  }
}
