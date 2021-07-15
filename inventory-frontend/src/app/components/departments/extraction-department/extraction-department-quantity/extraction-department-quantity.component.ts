import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { IAudit } from 'src/app/audit/audit.model';
import { AuditService } from 'src/app/audit/audit.service';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ExtractionService } from 'src/app/shared/services/extraction.service';

@Component({
  selector: 'app-extraction-department-quantity',
  templateUrl: './extraction-department-quantity.component.html',
  styleUrls: ['./extraction-department-quantity.component.scss']
})
export class ExtractionDepartmentQuantityComponent implements OnInit {
  cellTotal: number;
  rowItem: IExtraction
  rowData: any
  columnDefs: any
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any
  constructor(private authService: AuthService,
              private auditService: AuditService,
              private extractionService: ExtractionService, 
              private dialog: MatDialogRef<ExtractionDepartmentQuantityComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.rowItem = data.rowItem
    this.cellTotal = data.cellValue
  }
  ngOnInit(): void {
    this.getExtractionitemsOfMaster()
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
  getExtractionitemsOfMaster(): void {
    this.extractionService.getExtractionItemsOfMaster(this.rowItem.Item_ID).subscribe(responseData => this.rowData = responseData)
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleUpdate(value: any) {
    this.extractionService.updateExtractionItem(value.data.ID, value.data).subscribe({
      next: res => {
        this.extractionService.getExtractionMasterItem(res.Item_ID).subscribe(item => this.rowItem = item)
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
