import { ExtractionService } from '../../../shared/services/extraction.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ExtractionButtonRendererComponent } from './extraction-button-renderer/extraction-button-renderer.component';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IExtraction } from 'src/app/shared/models/extraction.model';

@Component({
  selector: 'app-extraction',
  templateUrl: './extraction.component.html',
  styleUrls: ['./extraction.component.scss']
})
export class ExtractionComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IExtraction
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  context: any;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private extractionService: ExtractionService, 
              private columnDefsService: ColumnDefsService,
              private snackbarService: SnackbarService) { 
    this.frameworkComponents = { buttonRenderer: ExtractionButtonRendererComponent }
    this.context = { extractionComponent: this}
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getExtractionQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getExtractionQuantity() {
    this.extractionService.getExtractionMasterItems().subscribe({
      next: items => {
        this.rowData = items
      }
    })
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
  }
  download() {
    this.gridApi.exportDataAsCsv()
  }
  sendEmailReport() {
    this.extractionService.sendEmailReport().subscribe({
      next: () => this.snackbarService.openSnackBar('Email has been sent', 'success'),
      error: () => this.snackbarService.openSnackBar('Email has not been sent', 'error')
    })
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
    this.extractionService.updateExtractionItem(value.data.ID , value.data).subscribe({
      next: data => data,
      error: error => error
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
    this.extractionService.deleteItem(this.selectedItem.Item_ID).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
        this.isDeleteButtonDisabled = true
        this.extractionService.getExtractionMasterItems().subscribe({
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

