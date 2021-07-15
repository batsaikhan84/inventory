import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISpecialRequest } from '../models/special-request.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialRequestConfirmationDataService {
  constructor() { }

  private cofirmationItems = new BehaviorSubject<any>(undefined)
  currentConfirmationItems = this.cofirmationItems.asObservable()
  updateCofirmationItems(cofirmationItems: ISpecialRequest[]) {
    this.cofirmationItems.next(cofirmationItems)
  }
}
