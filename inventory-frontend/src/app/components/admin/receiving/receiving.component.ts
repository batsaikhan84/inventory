import { IReceiving } from '../../../shared/models/receiving.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from '../../forms/new-item-form/form.component';
import { ReceivingService } from 'src/app/shared/services/receiving.service';
import { ReceivingButtonRendererComponent } from './receiving-button-renderer/receiving-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss']
})
export class ReceivingComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IReceiving
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private receivingService: ReceivingService,
              private columnDefsService: ColumnDefsService,
              private snackbarService: SnackbarService) { 
    this.frameworkComponents = { buttonRenderer: ReceivingButtonRendererComponent }
    this.context = { receivingComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = this.columnDefsService.columnDefs()
    this.getReceivingQuantity()
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
  getReceivingQuantity(): void {
    this.receivingService.getReceivingMasterItems().subscribe({
      next: res => {
        this.rowData = res
      }
    })
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
    this.receivingService.updateReceivingItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
  sendEmailReport() {
    this.receivingService.sendEmailReport().subscribe({
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
    this.receivingService.deleteItem(this.selectedItem.Item_ID).subscribe({
      next: () => {
        this.receivingService.getReceivingMasterItems().subscribe({
          next: data => this.rowData = data.filter(item => item.Item_ID !== this.selectedItem.Item_ID),
          error: error => error
        })
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
      },
      error: () => {
        this.snackbarService.openSnackBar("Could not delete item", 'error')
      },
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
}

