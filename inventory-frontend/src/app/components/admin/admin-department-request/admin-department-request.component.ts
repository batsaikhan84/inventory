import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { IStoreRoom } from 'src/app/shared/models/store-room.model';
import { MasterService } from 'src/app/shared/services/master.service';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StoreRoomService } from 'src/app/shared/services/store-room.service';
import { IDepartmentRequest } from './admin-department-request.model';
import { DepartmentRequestService } from './admin-department-request.service';

@Component({
  selector: 'app-admin-department-request',
  templateUrl: './admin-department-request.component.html',
  styleUrls: ['./admin-department-request.component.scss'],
})
export class AdminDepartmentRequestComponent implements OnInit {
  rowDataClicked = {};
  isDeleteButtonDisabled: boolean = true;
  selectedItem: IMaster;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(
    private storeRoomService: StoreRoomService,
    private needToOrderService: NeedToOrderService,
    private masterService: MasterService,
    private snackbarService: SnackbarService
  ) {}
  ngOnInit(): void {
    this.getStoreRoomMaster();
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true,
    };
    this.handleEditing();
  }
  getStoreRoomMaster(): void {
    this.masterService.getMasterItems().subscribe({
      next: (data) => {
        this.rowData = data.filter(
          (masterItem) =>
            masterItem.storeRoom.length < 1 && masterItem.Is_Special_Request
        );
      },
    });
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData;
  }
  handleEditing() {
    this.columnDefs = [
      {
        headerName: 'ID',
        field: 'ID',
        minWidth: 100,
        maxWidth: 110,
        checkboxSelection: true,
      },
      { headerName: 'Item', field: 'Item' },
      { headerName: 'Purchase Unit', field: 'Purchase_Unit' },
      { headerName: 'Manufacturer', field: 'Manufacturer', maxWidth: 200 },
      { headerName: 'Part Number', field: 'Part_Number', maxWidth: 140 },
      { headerName: 'Recent CN', field: 'Recent_CN', maxWidth: 140 },
      { headerName: 'Recent Vendor', field: 'Recent_Vendor' },
      { headerName: 'Fisher CN', field: 'Fisher_CN', maxWidth: 140 },
      { headerName: 'VWR CN', field: 'VWR_CN', maxWidth: 140 },
      { headerName: 'Lab Source CN', field: 'Lab_Source_CN', minWidth: 140 },
      {
        headerName: 'Next Advance CN',
        field: 'Next_Advance_CN',
        minWidth: 140,
      },
      {
        headerName: 'Average Unit Price',
        field: 'Average_Unit_Price',
        minWidth: 140,
      },
      { headerName: 'Category', field: 'Category', minWidth: 150 },
      { headerName: 'Comments', field: 'Comments', minWidth: 150 },
      { headerName: 'Type', field: 'Type', maxWidth: 140 },
      { headerName: 'Class', field: 'Class', maxWidth: 140 },
    ];
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  autoSizeAll(skipHeader: any) {
    var allColumnIds: any[] = [];
    this.gridColumnApi
      .getAllColumns()
      .forEach(function (column: { colId: any }) {
        allColumnIds.push(column.colId);
      });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  handleSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }
  handleClearSearch() {
    this.searchValue = '';
    this.handleSearch(this.searchValue);
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const getSelectedData = selectedNodes.map((node) => {
      this.selectedItem = node.data;
    });
    if (getSelectedData.length > 0) {
      this.isDeleteButtonDisabled = false;
    } else {
      this.isDeleteButtonDisabled = true;
    }
  }
  handleDelete() {
    const selectedItem = { ...this.selectedItem, Is_Special_Request: false };
    this.masterService
      .updateMasterItem(this.selectedItem.ID, selectedItem, null)
      .subscribe({
        next: () => {
          this.getStoreRoomMaster();
          this.snackbarService.openSnackBar(
            'item deleted successfully',
            'success'
          );
        },
        error: () => {
          this.snackbarService.openSnackBar(
            'item deleted unsuccessfully',
            'error'
          );
          this.getStoreRoomMaster();
        },
      });
    this.isDeleteButtonDisabled = true;
  }
  handleUpdate(params: any) {
    this.storeRoomService
      .updateStoreRoomItem(params.data.ID, params.data)
      .subscribe({
        next: (data) => {
          data;
        },
        error: (error) => this.snackbarService.openSnackBar('error', 'error'),
      });
  }
}
