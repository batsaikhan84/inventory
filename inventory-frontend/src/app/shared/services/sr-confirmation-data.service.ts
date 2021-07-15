import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpecialRequest } from '../models/special-request.model';

@Injectable({
  providedIn: 'root'
})
export class SrConfirmationDataService {
  constructor() { }

  private srCofirmationItems = new BehaviorSubject<any>(undefined)
  currentSrConfirmationItems = this.srCofirmationItems.asObservable()
  updateSrCofirmationItems(srCofirmationItems: ISpecialRequest[]) {
    this.srCofirmationItems.next(srCofirmationItems)
  }
}
