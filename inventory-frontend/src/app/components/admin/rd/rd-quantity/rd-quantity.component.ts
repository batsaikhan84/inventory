import { RdService } from 'src/app/shared/services/rd.service';
import { IRd } from './../../../../shared/models/rd.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rd-quantity',
  templateUrl: './rd-quantity.component.html',
  styleUrls: ['./rd-quantity.component.scss']
})
export class RdQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IRd
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private rdService: RdService, 
              private dialog: MatDialogRef<RdQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getMasterExtraction()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500, editable: true },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getMasterExtraction(): void {
    this.rdService.getRdItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    console.log(value)
    this.rdService.updateRdItem(value.data.ID, value.data).subscribe(response => 
      this.rdService.getRdItemsOfMaster(response.Item_ID).subscribe(resData => this.rowItem = resData)  
    )
  }
}
