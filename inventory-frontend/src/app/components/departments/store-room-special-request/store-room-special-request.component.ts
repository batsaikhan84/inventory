import { StoreRoomService } from '../../../shared/services/store-room.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { StoreRoomSpecialRequestFormComponent } from '../../forms/store-room-special-request-form/store-room-special-request-form.component';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SrConfirmationDataService } from 'src/app/shared/services/sr-confirmation-data.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-store-room-special-request',
  templateUrl: './store-room-special-request.component.html',
  styleUrls: ['./store-room-special-request.component.scss']
})
export class StoreRoomSpecialRequestComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isSendButtonDisabled: boolean = true
  isConfirmButtonDisabled: boolean = true
  selectedItem: IMaster;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;
  confirmationSelectedItems: any;
  confirmationData: any

  constructor(private dialog: MatDialog, 
              private storeRoomService: StoreRoomService,
              private specialRequestService: SpecialRequestService,
              public authService: AuthService,
              private srConfirmationDataService: SrConfirmationDataService,
              private snackbarService: SnackbarService) { 
    this.context = { componentFromStoreRoomSpecialRequest: this }
  }

  ngOnInit(): void {
    this.getMasterInventory()
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  selectedItems($event: any) {
    this.confirmationSelectedItems = $event
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', maxWidth: 100, checkboxSelection: true},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item ID', field: 'Item_ID', maxWidth: 100},
      {headerName: 'Recent CN', field: 'Recent_CN' },
      {headerName: 'Purchase Unit', field: 'Purchase_Unit'},
      {headerName: 'Part Number', field: 'Part_Number'},
      {headerName: 'Location', field: 'Location', minWidth: 150},
      {headerName: 'Comments', field: 'Comments', minWidth: 300}
    ]
  }
  getConfirmationItem(): void {
    this.specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const confirmationData: any = data.filter(specialRequestItem => 
         specialRequestItem.Is_Confirmed === false && specialRequestItem.Department === this.authService.getCurrentUser().department
        ).map(specialRequestItem => ({
          ...specialRequestItem,
          Item: specialRequestItem.master?.Item,
          Recent_CN: specialRequestItem.master?.Recent_CN
        }))
        this.srConfirmationDataService.updateSrCofirmationItems(confirmationData)
      },
      error: error => error
    })
  }
  getMasterInventory(): void {
    this.storeRoomService.getStoreRoomMasterItems().subscribe({
      next: data => this.rowData = data,
      error: error => error
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
    this.dialog.open(StoreRoomSpecialRequestFormComponent, dialogConfig).afterClosed().subscribe(() => {
      this.gridApi.deselectAll()
      this.getConfirmationItem()
    })  
  }
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const getSelectedData = selectedNodes.map(node => {
      // console.log(node.data)
      // this.specialRequestService.getSpecialRequestItems().subscribe({
      //   next: data => console.log(data)
      // })
      this.selectedItem = node.data
      return node.data
    })
    if(getSelectedData.length > 0) {
      this.isSendButtonDisabled = false
    } else {
      this.isSendButtonDisabled = true
    }
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
