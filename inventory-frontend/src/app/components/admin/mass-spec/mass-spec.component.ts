import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MassSpecButtonRendererComponent } from './mass-spec-button-renderer/mass-spec-button-renderer.component';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { IMassSpec } from 'src/app/shared/models/mass-spec.model';
import { DropdownRendererComponent } from './dropdown-renderer/dropdown-renderer.component';

@Component({
  selector: 'app-mass-spec',
  templateUrl: './mass-spec.component.html',
  styleUrls: ['./mass-spec.component.scss']
})
export class MassSpecComponent implements OnInit {
  categories: string[] = ['All', 'GC', 'LC', 'Columns', 'General', 'Gases', 'Solvents', 'LDTD', 'Sciex']
  selectedCategory = 'All'
  frameworkComponents: any;
  rowDataClicked = {}
  selectedItem: IMassSpec
  isDeleteButtonDisabled: boolean = true
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  context: any;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private massSpecService: MassSpecService, 
              private snackbarService: SnackbarService,
              private needToOrderService: NeedToOrderService) { 
    this.frameworkComponents = { 
      buttonRenderer: MassSpecButtonRendererComponent, 
      categoryRenderer: DropdownRendererComponent
    }
    this.context = { adminMassSpecComponent: this }
  }
  ngOnInit(): void {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110, checkboxSelection: true},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item_ID', field: 'Item_ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Category', field: 'Category', cellRenderer: 'categoryRenderer', cellStyle: { 'background-color': 'lightblue', 'font-weight': 600, 'padding-right': 0}, },
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150, cellRenderer: 'buttonRenderer' },
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150, editable: true },
      {headerName: 'Min Quantity', field: 'Min_Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Min_Quantity = params.newValue ? Number(params.newValue) : null}},
      {headerName: 'Max Quantity', field: 'Max_Quantity', editable: true, 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Max_Quantity = params.newValue ? Number(params.newValue) : null} },
      {headerName: 'Need To Order', field: 'Order_Quantity', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200 },
    ]
    this.getMassSpecQuantity()
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
  getMassSpecQuantity(): void {
    this.massSpecService.getMassSpecMasterItems().subscribe({
      next: data => this.rowData = data,
      error: error => error
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
    this.massSpecService.updateMassSpecItem(value.data.ID , value.data).subscribe({
      next: data => console.log(data),
      error: error => {
        console.error(error)
      }
    })
  }
  sendEmailReport() {
    this.massSpecService.sendEmailReport().subscribe({
      next: () => this.snackbarService.openSnackBar('Email has been sent', 'success'),
      error: () => this.snackbarService.openSnackBar('Email has not been sent', 'error')
    })
  }
  handleCategory(value: any) {
    this.massSpecService.getMassSpecMasterItems().subscribe({
      next: data => {
        if(value === 'All') {
          this.rowData = data
          return
        }
        this.rowData = data.filter(item => item.Category === value)
      },
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
    this.massSpecService.deleteItem(this.selectedItem.Item_ID).subscribe({
      next: () => {
        this.massSpecService.getMassSpecMasterItems().subscribe({
          next: data => this.rowData = data.filter(item => item.Item_ID !== this.selectedItem.Item_ID),
          error: error => error
        })
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
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
}
