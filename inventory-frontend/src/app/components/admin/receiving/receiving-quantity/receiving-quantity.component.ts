import { ReceivingService } from './../../../../shared/services/receiving.service';
import { IReceiving } from './../../../../shared/models/receiving.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-receiving-quantity',
  templateUrl: './receiving-quantity.component.html',
  styleUrls: ['./receiving-quantity.component.scss']
})
export class ReceivingQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IReceiving
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private receivingService: ReceivingService, 
              private dialog: MatDialogRef<ReceivingQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbarService: SnackbarService) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getMasterReceiving()
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
  getMasterReceiving(): void {
    this.receivingService.getReceivingItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(params: any) {
    this.receivingService.updateReceivingItem(params.data.ID , params.data).subscribe({
      next: () => { },
      error: error => {
        console.error(error)
      }
    })
  }
}
