import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColumnDefsService } from 'src/app/shared/services/column-defs.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IShipping } from 'src/app/shared/models/shipping.model';
import { ShippingService } from 'src/app/shared/services/shipping.service';
import { ShippingButtonRendererComponent } from './shipping-button-renderer/shipping-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IShipping
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  context: any;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private shippingService: ShippingService, 
              private needToOrderService: NeedToOrderService,
              private snackbarService: SnackbarService) { 
    this.frameworkComponents = { buttonRenderer: ShippingButtonRendererComponent }
    this.context = { adminShippingComponent: this}
  }
  ngOnInit(): void {
    this.handleEditing()
    this.getTotalItems()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item_ID', field: 'Item_ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Quantity', field: 'Quantity', minWidth: 150, cellStyle: { 'background-color': '#90EE90', 'text-align': 'center'}, editable: true},
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150 },
      {headerName: 'Min Quantity', field: 'Min_Quantity'},
      {headerName: 'Max Quantity', field: 'Max_Quantity'},
      {headerName: 'Need To Order', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200}
    ]
  }
  getTotalItems() {
    this.shippingService.getTotalItems().subscribe({
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
    this.shippingService.sendEmailReport().subscribe({
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
    const Quantity = Number(value.newValue)
    const data = {...value.data, Quantity}
    this.shippingService.updateItem(value.data.ID , data).subscribe({
      next: data => {
        console.log(data)
      },
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
    this.shippingService.deleteItem(this.selectedItem.Item_ID).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
        this.isDeleteButtonDisabled = true
        this.shippingService.getTotalItems().subscribe({
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

