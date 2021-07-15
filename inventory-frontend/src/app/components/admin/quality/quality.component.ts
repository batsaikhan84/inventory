import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IQuality } from 'src/app/shared/models/quality.model';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { QualityService } from 'src/app/shared/services/quality.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { QualityButtonRendererComponent } from './quality-button-renderer/quality-button-renderer.component';


@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
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

  constructor(private qualityService: QualityService,
              private snackbarService: SnackbarService,
              private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: QualityButtonRendererComponent }
    this.context = { QualityComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getQualityQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getQualityQuantity(): void {
    this.qualityService.getQualityMasterItems().subscribe(responseData => this.rowData = responseData)
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
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
    this.qualityService.deleteItem(this.selectedItem.Item_ID).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
        this.isDeleteButtonDisabled = true
        this.qualityService.getQualityMasterItems().subscribe({
          next: data => this.rowData = data.filter(item => item.Item_ID !== this.selectedItem.Item_ID),
          error: error => error
        })
      },
      error: () => {
        this.snackbarService.openSnackBar('item deleted unsuccessfully', 'error')
      }
    })
    this.isDeleteButtonDisabled = true
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
  download() {
    this.gridApi.exportDataAsCsv()
  }
  sendEmailReport() {
    this.qualityService.sendEmailReport().subscribe({
      next: () => this.snackbarService.openSnackBar('Email has been sent', 'success'),
      error: () => this.snackbarService.openSnackBar('Email has not been sent', 'error')
    })
  }
}

