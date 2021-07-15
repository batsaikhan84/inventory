import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { IAudit } from 'src/app/audit/audit.model';
import { AuditService } from 'src/app/audit/audit.service';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShippingService } from 'src/app/shared/services/shipping.service';

@Component({
  selector: 'app-shipping-department-quantity',
  templateUrl: './shipping-department-quantity.component.html',
  styleUrls: ['./shipping-department-quantity.component.scss']
})
export class ShippingDepartmentQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IExtraction
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private authService: AuthService,
              private auditService: AuditService,
              private shippingService: ShippingService, 
              private dialog: MatDialogRef<ShippingDepartmentQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getTotalItems()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
    }
    this.columnDefs = [
      {headerName: 'Location', field: 'Location' },
      {headerName: 'Quantity', field: 'Quantity', editable: true },
    ]
  }
  onClose() {
    this.dialog.close()
  }
  getTotalItems(): void {
    this.shippingService.getItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.shippingService.updateItem(value.data.ID, value.data).subscribe({
      next: res => {
        this.shippingService.getTotalItem(res.Item_ID).subscribe(item => this.rowItem = item)
        const auditItem: IAudit = {
          ID: null,
          New_Quantity: value.newValue,
          Old_Quantity: value.oldValue,
          Item_ID: value.data.Item_ID,
          Department_Item_ID: value.data.ID,
          User: this.authService.getCurrentUser().name,
          Department: this.authService.getCurrentUser().department
        }
        this.auditService.createAuditItem(auditItem).subscribe()
      },
      error: (error) => error 
    })
  }
}
