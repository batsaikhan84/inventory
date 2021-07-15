import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReceiving } from 'src/app/shared/models/receiving.model';
import { ReceivingService } from 'src/app/shared/services/receiving.service';

@Component({
  selector: 'app-receiving-department-quantity',
  templateUrl: './receiving-department-quantity.component.html',
  styleUrls: ['./receiving-department-quantity.component.scss']
})
export class ReceivingDepartmentQuantityComponent implements OnInit {
  rowItem: IReceiving
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private receivingService: ReceivingService, 
              private dialog: MatDialogRef<ReceivingDepartmentQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
  }
  ngOnInit(): void {
    this.getReceivingItemsOfMaster()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location'},
      {headerName: 'Quantity', field: 'Quantity', editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getReceivingItemsOfMaster(): void {
    this.receivingService.getReceivingItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.receivingService.updateReceivingItem(value.data.ID, value.data).subscribe(response => 
      this.receivingService.getReceivingMasterItem(response.Item_ID).subscribe(responseData => this.rowItem = responseData)  
    )
  }
}
