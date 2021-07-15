import { QualityService } from './../../../../shared/services/quality.service';
import { IQuality } from './../../../../shared/models/quality.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quality-quantity',
  templateUrl: './quality-quantity.component.html',
  styleUrls: ['./quality-quantity.component.scss']
})
export class QualityQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IQuality
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private qualityService: QualityService, 
              private dialog: MatDialogRef<QualityQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getQuantityMaster()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location', minWidth: 500 },
      {headerName: 'Quantity', field: 'Quantity', minWidth: 140, editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getQuantityMaster(): void {
    this.qualityService.getQualityItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.qualityService.updateQualityItem(value.data.ID, value.data).subscribe(response => 
      this.qualityService.getQualityMasterItem(response.Item_ID).subscribe(resData => this.rowItem = resData)
    )
  }
}
