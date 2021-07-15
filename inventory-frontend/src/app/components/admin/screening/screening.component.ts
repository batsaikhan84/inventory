import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IScreening } from 'src/app/shared/models/screening.model';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { ScreeningService } from 'src/app/shared/services/screening.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ScreeningButtonRendererComponent } from './screening-button-renderer/screening-button-renderer.component';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss']
})
export class ScreeningComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IScreening
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private screeningService: ScreeningService,
              private columnDefsService: ColumnDefsService,
              private snackbarService: SnackbarService) { 
    this.frameworkComponents = { buttonRenderer: ScreeningButtonRendererComponent }
    this.context = { screeningComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getScreeningQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  download() {
    this.gridApi.exportDataAsCsv()
  }
  getScreeningQuantity(): void {
    this.screeningService.getScreeningMasterItems().subscribe(responseData => this.rowData = responseData)
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
    this.screeningService.updateScreeningItem(value.data.ID , value.data).subscribe({
      next: () => { },
      error: error => {
        console.error(error)
      }
    })
  }
  sendEmailReport() {
    this.screeningService.sendEmailReport().subscribe({
      next: () => this.snackbarService.openSnackBar('Email has been sent', 'success'),
      error: () => this.snackbarService.openSnackBar('Email has not been sent', 'error')
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
    this.screeningService.deleteItem(this.selectedItem.Item_ID).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
        this.isDeleteButtonDisabled = true
        this.screeningService.getScreeningMasterItems().subscribe({
          next: data => this.rowData = data.filter(item => item.Item_ID !== this.selectedItem.Item_ID),
          error: error => error
        })
      },
      error: () => {
        this.snackbarService.openSnackBar('item deleted unsuccessfully', 'error')
      }
    })
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

