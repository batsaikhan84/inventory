import { RdService } from 'src/app/shared/services/rd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { RdButtonRendererComponent } from './rd-button-renderer/rd-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IRd } from 'src/app/shared/models/rd.model';


@Component({
  selector: 'app-rd',
  templateUrl: './rd.component.html',
  styleUrls: ['./rd.component.scss']
})
export class RdComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IRd
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private rdService: RdService, 
              private snackbarService: SnackbarService,
              private columnDefsService: ColumnDefsService) { 
    this.frameworkComponents = { buttonRenderer: RdButtonRendererComponent }
    this.context = { rdCompoent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getRdQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  getRdQuantity(): void {
    this.rdService.getRdMasterItems().subscribe(responseData => this.rowData = responseData)
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
    this.rdService.updateRdItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
  sendEmailReport() {
    this.rdService.sendEmailReport().subscribe({
      next: () => this.snackbarService.openSnackBar('Email has been sent', 'success'),
      error: () => this.snackbarService.openSnackBar('Email has not been sent', 'error')
    })
  }
  download() {
    this.gridApi.exportDataAsCsv()
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
    console.log(this.selectedItem)
    // this.extractionService.deleteItem(this.selectedItem.ID).subscribe({
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

