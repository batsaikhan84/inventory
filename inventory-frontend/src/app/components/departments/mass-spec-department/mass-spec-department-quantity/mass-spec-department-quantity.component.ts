import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMassSpec } from 'src/app/shared/models/mass-spec.model';
import { MassSpecService } from 'src/app/shared/services/mass-spec.service';

@Component({
  selector: 'app-mass-spec-department-quantity',
  templateUrl: './mass-spec-department-quantity.component.html',
  styleUrls: ['./mass-spec-department-quantity.component.scss']
})
export class MassSpecDepartmentQuantityComponent implements OnInit {
  rowItem: IMassSpec
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private massSpecService: MassSpecService, 
              private dialog: MatDialogRef<MassSpecDepartmentQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
  }
  ngOnInit(): void {
    this.getMassSpecItemsOfMaster()
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
  getMassSpecItemsOfMaster(): void {
    this.massSpecService.getMassSpecItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.massSpecService.updateMassSpecItem(value.data.ID, value.data).subscribe(response => 
      this.massSpecService.getMassSpecMasterItem(response.Item_ID).subscribe(responseData => this.rowItem = responseData)
    )
  }
}
