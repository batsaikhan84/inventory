import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecialRequestConfirmationDataService } from 'src/app/shared/services/special-request-confirmation-data.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { StoreRoomService } from 'src/app/shared/services/store-room.service';
import { SpecialRequestFormComponent } from '../forms/special-request-form/special-request-form.component';
import { DepartmentRequestService } from '../admin/admin-department-request/admin-department-request.service';

@Component({
  selector: 'app-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss']
})
export class SpecialRequestComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isDeleteButtonDisabled = true
  isSendButtonDisabled: boolean = true
  selectedItem: IMaster;
  searchValue: string;
  editText: string = 'Start Editing';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private dialog: MatDialog, 
              private departmentRequestService: DepartmentRequestService,
              private storeRoomService: StoreRoomService,
              private materService: MasterService,
              private specialRequestService: SpecialRequestService,
              public authService: AuthService,
              private specialRequestConfirmationDataService: SpecialRequestConfirmationDataService,
              private snackbarService: SnackbarService
              ) { }

  ngOnInit(): void {
    this.getMasterInventory()
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110, checkboxSelection: true},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Recent CN', field: 'Recent_CN' },
      {headerName: 'Purchase Unit', field: 'Purchase_Unit'},
      {headerName: 'Part Number', field: 'Part_Number'},
      {headerName: 'Comments', field: 'Comments', minWidth: 300}
    ]
  }
  getMasterInventory(): void {
    this.materService.getMasterItems().subscribe({
      next: (data) => {
        this.rowData = data.filter(masterItem => masterItem.storeRoom.length < 1 && masterItem.Is_Special_Request)
      },
    })
  }
  handleSendRequest() {
    this.openDialog()
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = this.selectedItem
    this.dialog.open(SpecialRequestFormComponent, dialogConfig).afterClosed().subscribe(() => {
      this.gridApi.deselectAll()
      this.getConfirmationItems()
      this.snackbarService.openSnackBar('Please confirm your request in step 2', 'success')
    })
  }
  getConfirmationItems(): void {
    this.specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const confirmationData: any = data.filter(specialRequestItem => 
         specialRequestItem.Is_Confirmed === false && specialRequestItem.Department === this.authService.getCurrentUser().department
        ).map(specialRequestItem => ({
          ...specialRequestItem,
          Item: specialRequestItem.master?.Item,
          Recent_CN: specialRequestItem.master?.Recent_CN
        }))
        this.specialRequestConfirmationDataService.updateCofirmationItems(confirmationData)
      },
      error: error => error
    })
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const getSelectedData = selectedNodes.map(node => {
      this.selectedItem = node.data
      return node.data
    })
    if(getSelectedData.length > 0) {
      this.isSendButtonDisabled = false
      this.isDeleteButtonDisabled = false
    } else {
      this.isSendButtonDisabled = true
      this.isDeleteButtonDisabled = true
    }
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
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
}
