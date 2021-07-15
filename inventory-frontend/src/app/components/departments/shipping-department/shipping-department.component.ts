import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { ShippingService } from 'src/app/shared/services/shipping.service';
import { ShippingDepartmentButtonRendererComponent } from './shipping-department-button-renderer/shipping-department-button-renderer.component';

@Component({
  selector: 'app-shipping-department',
  templateUrl: './shipping-department.component.html',
  styleUrls: ['./shipping-department.component.scss']
})
export class ShippingDepartmentComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked = {}
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private shippingService: ShippingService, 
              private needToOrderService: NeedToOrderService,
              public authService: AuthService) { 
    this.frameworkComponents = { buttonRenderer: ShippingDepartmentButtonRendererComponent }
    this.context = { shippingComponent: this }
  }
  ngOnInit(): void {
    this.getExtractionQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
    this.handleEditing()
  }
  getExtractionQuantity(): void {
    this.shippingService.getTotalItems().subscribe({
      next: data => {
        this.rowData = data
      }
    })
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
      {headerName: 'Quantity', field: 'Quantity', minWidth: 150, cellStyle: { 'background-color': '#90EE90', 'text-align': 'center'}, editable: true},
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150 },
      {headerName: 'Min Quantity', field: 'Min_Quantity'},
      {headerName: 'Max Quantity', field: 'Max_Quantity'},
      {headerName: 'Need To Order', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200}
    ]
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
}

