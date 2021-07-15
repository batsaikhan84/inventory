import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IStoreRoom } from 'src/app/shared/models/store-room.model';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StoreRoomService } from 'src/app/shared/services/store-room.service';

@Component({
  selector: 'app-store-room-department',
  templateUrl: './store-room-department.component.html',
  styleUrls: ['./store-room-department.component.scss']
})

export class StoreRoomDepartmentComponent implements OnInit {
  rowDataClicked = {}
  isDeleteButtonDisabled: boolean = true;
  selectedItem: IStoreRoom;
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private storeRoomService: StoreRoomService, 
              private needToOrderService: NeedToOrderService,
              private snackbarService: SnackbarService) { }
  ngOnInit(): void {
    this.getStoreRoomMaster()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
    this.handleEditing()
  }
  getStoreRoomMaster(): void {
    this.storeRoomService.getStoreRoomMasterItems().subscribe({
      next: res => {
        console.log(res)
        this.rowData = res.filter(item => item.Is_Active === true)
      }
    })
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item ID', field: 'Item_ID', minWidth: 100},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Location', field: 'Location'},
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150, 'type': 'numericColumn', 
        valueSetter: (params: any)=>{params.data.Quantity = Number(params.newValue)} },
      {headerName: 'Usage Level', field: 'Usage_Level'},
      {headerName: 'Min Quantity', field: 'Min_Quantity', 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Min_Quantity = params.newValue ? Number(params.newValue) : null}},
      {headerName: 'Max Quantity', field: 'Max_Quantity', 'type': 'numericColumn', valueSetter: (params: any)=>{params.data.Max_Quantity = params.newValue ? Number(params.newValue) : null}},
      {headerName: 'Need To Order', field: 'Order_Quantity', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Issued', field: 'Issued', editable: true, valueSetter: (params: any) => {
        if(params.newValue) {
          if(params.data.Quantity - Number(params.newValue) < 0 ) {
            this.snackbarService.openSnackBar('cannot issue more than total on hand', 'error')
            return
          }
          params.data.Quantity = params.data.Quantity - Number(params.newValue)
          if(params.data.Quantity <= params.data.Min_Quantity) {
            params.data.Is_Need_To_Order = true
            params.data.Order_Quantity = params.data.Max_Quantity - params.data.Quantity
          }
        }
      }
    },
    {headerName: 'Received', field: 'Received', editable: true, valueSetter: (params: any) => {
        if(params.newValue) {
          params.data.Quantity = params.data.Quantity + Number(params.newValue) 
          if(params.data.Quantity > params.data.Min_Quantity) {
            params.data.Is_Need_To_Order = false
            params.data.Order_Quantity = 0
          }
        }
      }
    }
    ]
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
  handleDelete() {
    const selectedItem = { ...this.selectedItem, Is_Active: false }
    this.storeRoomService.deactivateStoreRoomItem(this.selectedItem.ID, selectedItem).subscribe({
      next: data => {
        this.getStoreRoomMaster()
        this.snackbarService.openSnackBar('item deleted successfully', 'success')
      },
      error: error => {
        this.snackbarService.openSnackBar('item deleted unsuccessfully', 'error')
        this.getStoreRoomMaster()
      }
    })
    this.isDeleteButtonDisabled = true
  }
  handleUpdate(params: any) {
    this.storeRoomService.updateStoreRoomItem(params.data.ID , params.data).subscribe({
      next: () => { },
      error: error => this.snackbarService.openSnackBar('error', 'error')
    })
  }
}
  
  