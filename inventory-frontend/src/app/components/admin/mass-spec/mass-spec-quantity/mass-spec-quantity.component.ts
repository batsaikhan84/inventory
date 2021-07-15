import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { IMassSpec } from './../../../../shared/models/mass-spec.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-mass-spec-quantity',
  templateUrl: './mass-spec-quantity.component.html',
  styleUrls: ['./mass-spec-quantity.component.scss']
})
export class MassSpecQuantityComponent implements OnInit {
  rowItem: IMassSpec
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private massSpecService: MassSpecService, 
              private dialog: MatDialogRef<MassSpecQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbarService: SnackbarService) { 
    this.rowItem = data.rowItem
  }
  ngOnInit(): void {
    this.getMasterMassSpec()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', editable: true },
      {headerName: 'Quantity', field: 'Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Quantity = Number(params.newValue)} },
      {headerName: 'Issued', field: 'Issued', editable: true, valueSetter: (params: any) => {
        if(params.newValue) {
          if(params.data.Quantity - Number(params.newValue) < 0 ) {
            this.snackbarService.openSnackBar('cannot issue more than total on hand', 'error')
            return
          }
          params.data.Quantity = params.data.Quantity - Number(params.newValue)
          if(params.data.Quantity <= params.data.Min_Quantity) {
            params.data.Is_Need_To_Order = true
            params.data.Order_Quantity = params.data.Max_Quantity - params.data.Quantity
          }
        }
      }
    },
    {headerName: 'Received', field: 'Received', editable: true, valueSetter: (params: any) => {
        if(params.newValue) {
          params.data.Quantity = params.data.Quantity + Number(params.newValue) 
          if(params.data.Quantity > params.data.Min_Quantity) {
            params.data.Is_Need_To_Order = false
            params.data.Order_Quantity = 0
          }
        }
      }
    }
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getMasterMassSpec(): void {
    this.massSpecService.getMassSpecItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(params: any) {
    this.massSpecService.updateMassSpecItem(params.data.ID , params.data).subscribe({
      next: () => { },
      error: error => {
        console.error(error)
      }
    })
  }
}
