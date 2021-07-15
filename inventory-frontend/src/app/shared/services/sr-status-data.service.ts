import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpecialRequest } from '../models/special-request.model';

@Injectable({
  providedIn: 'root'
})
export class SrStatusDataService {
  constructor() { }
  private srStatusItems = new BehaviorSubject<any>(undefined)
  currentSrStatusItems = this.srStatusItems.asObservable()
  updateSrStatusItems(srCofirmationItems: ISpecialRequest) {
    this.srStatusItems.next(srCofirmationItems)
  }



}
