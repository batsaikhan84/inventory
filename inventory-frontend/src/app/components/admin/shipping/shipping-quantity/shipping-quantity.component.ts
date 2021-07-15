import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { IShipping } from 'src/app/shared/models/shipping.model';
import { ShippingService } from 'src/app/shared/services/shipping.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ExtractionService } from '../../../../shared/services/extraction.service';

@Component({
  selector: 'app-shipping-quantity',
  templateUrl: './shipping-quantity.component.html',
  styleUrls: ['./shipping-quantity.component.scss']
})
export class ShippingQuantityComponent implements OnInit {
  rowItem: IShipping
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private shippingService: ShippingService, 
              private dialog: MatDialogRef<ShippingQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackbarService: SnackbarService) { 
    this.rowItem = data.rowItem
  }
  ngOnInit(): void {
    this.getItemsOfMaster()
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
    this.dialog.close(this.rowItem)
  }
  getItemsOfMaster(): void {
    this.shippingService.getItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData
  )}
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(params: any) {
    this.shippingService.updateItem(params.data.ID , params.data).subscribe({
      next: () =>{ },
      error: error => {
        console.error(error)
      }
    })
  }
}
