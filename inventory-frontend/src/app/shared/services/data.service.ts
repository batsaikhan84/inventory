import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs'
import { IExtraction } from '../models/extraction.model';
import { ExtractionService } from './extraction.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  helper = new JwtHelperService();
  private extractionMaster = new BehaviorSubject<any>(undefined)
  currentItem = this.extractionMaster.asObservable();
  private errorMessage = new BehaviorSubject<string>('')
  currentMessage = this.errorMessage.asObservable();

  constructor(private extractionService: ExtractionService) { }
  ngOnInit() { }
  updateCurrentItem(extractionMasterItem: IExtraction[]) {
    this.extractionMaster.next(extractionMasterItem)
  }
  loginErrorMessage(message: string) {
    this.errorMessage.next(message)
  }
}
