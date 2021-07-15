import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IScreening } from 'src/app/shared/models/screening.model';
import { ScreeningService } from 'src/app/shared/services/screening.service';

@Component({
  selector: 'app-screening-department-quantity',
  templateUrl: './screening-department-quantity.component.html',
  styleUrls: ['./screening-department-quantity.component.scss']
})
export class ScreeningDepartmentQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IScreening
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private screeningService: ScreeningService, 
              private dialog: MatDialogRef<ScreeningDepartmentQuantityComponent>, 
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
      {headerName: 'Location', field: 'Location'},
      {headerName: 'Quantity', field: 'Quantity', editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getMasterExtraction(): void {
    this.screeningService.getScreeningItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.screeningService.updateScreeningItem(value.data.ID, value.data).subscribe(response => 
      this.screeningService.getScreeningMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)
    )
  }
}
