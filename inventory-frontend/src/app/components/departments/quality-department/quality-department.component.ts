import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IQuality } from 'src/app/shared/models/quality.model';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { QualityService } from 'src/app/shared/services/quality.service';
import { QualityDepartmentButtonRendererComponent } from './quality-department-button-renderer/quality-department-button-renderer.component';

@Component({
  selector: 'app-quality-department',
  templateUrl: './quality-department.component.html',
  styleUrls: ['./quality-department.component.scss']
})
export class QualityDepartmentComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IQuality
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private qualityService: QualityService, private needToOrderService: NeedToOrderService) { 
    this.frameworkComponents = { buttonRenderer: QualityDepartmentButtonRendererComponent }
    this.context = { qualityComponent: this }
  }
  ngOnInit(): void {
    this.getQualityQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
    this.handleEditing()
  }
  getQualityQuantity(): void {
    this.qualityService.getQualityMasterItems().subscribe(responseData => this.rowData = responseData)
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item_ID', field: 'Item_ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150, cellRenderer: 'buttonRenderer', editable: true},
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150 },
      {headerName: 'Min Quantity', field: 'Min_Quantity'},
      {headerName: 'Max Quantity', field: 'Max_Quantity'},
      {headerName: 'Need To Order', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200}
    ]
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }
  handleClearSearch() {
    this.searchValue = ''
    this.handleSearch(this.searchValue)
  }
  handleUpdate(value: any) {
    this.qualityService.updateQualityItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  autoSizeAll(skipHeader: any) {
    var allColumnIds: any[] = [];
    this.gridColumnApi.getAllColumns().forEach(function (column: { colId: any; }) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }
  handleDelete() {
    // this.qualityService.deleteItem(this.selectedItem.ID).subscribe({
    //   next: data => {
    //     this.getExtractionQuantity()
    //     this.snackbarService.openSnackBar('item deleted successfully', 'success')
    //   },
    //   error: error => {
    //     this.snackbarService.openSnackBar('item deleted unsuccessfully', 'error')
    //     this.getExtractionQuantity()
    //   }
    // })
    // this.isDeleteButtonDisabled = true
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const getSelectedData = selectedNodes.map(node => {
      this.selectedItem = node.data
    })
    if(getSelectedData.length > 0) {
      this.isDeleteButtonDisabled = false
    } else {
      this.isDeleteButtonDisabled = true
    }

  }
}