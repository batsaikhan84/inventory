import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';

@Component({
  selector: 'app-status-renderer-component',
  templateUrl: './status-renderer.component.html',
  styleUrls: ['./status-renderer.component.scss']
})
export class StatusRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private _specialRequestservice: SpecialRequestService,
              private _snackbarService: SnackbarService) { }
  statuses = ['Completed', 'Pending', 'Cancelled', 'Ordered', 'Back Ordered' ] 
  rowItem: ISpecialRequest
  selected: string

  agInit(params: ICellRendererParams): void {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
    
  }

  refresh(params: ICellRendererParams): any {
    this.rowItem = params.data
    this.selected = this.getValueToDisplay(params)
  }
  updateStatus(value: string) {
    const data = {...this.rowItem, Status: value}
    this._specialRequestservice.updateSpecialRequestItem(data.ID, data).subscribe({
      next: (res) => {},
      error: (error) => this._snackbarService.openSnackBar(`item was updated unsuccessfully`, 'error')
    })
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
