import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { SrStatusDataService } from 'src/app/shared/services/sr-status-data.service';

@Component({
  selector: 'app-store-room-special-request-status',
  templateUrl: './store-room-special-request-status.component.html',
  styleUrls: ['./store-room-special-request-status.component.scss']
})
export class StoreRoomSpecialRequestStatusComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;

  constructor(private specialRequestService: SpecialRequestService,
              private authService: AuthService,
              private srStatusDataService: SrStatusDataService,
              private snackbarService: SnackbarService ) { }

  ngOnInit(): void {
    this.getStatusItems()
    this.srStatusDataService.currentSrStatusItems.subscribe({
      next: data => this.rowData = data,
      error: (error) => this.snackbarService.openSnackBar(error.toString(), 'error')
    })
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'Item ID', field: 'Item_ID', minWidth: 100, maxWidth: 110 },
      {headerName: 'Item', field: 'Item', minWidth: 650},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Quantity', field: 'Quantity', maxWidth: 150 },
      {headerName: 'Status', field: 'Status', maxWidth: 150},
      {headerName: 'Comment', field: 'Comment', maxWidth: 200},
      {headerName: 'Time Requested', field: 'Time_Requested', maxWidth: 200,  valueFormatter: function(params: any) {
        return `${new Date(params.data.Time_Requested).toLocaleDateString()} ${new Date(params.data.Time_Requested).toLocaleTimeString()}`
      }},
      {headerName: 'Time Updated', field: 'Time_Updated', maxWidth: 200,  valueFormatter: function(params: any) {
        return `${new Date(params.data.Time_Requested).toLocaleDateString()} ${new Date(params.data.Time_Requested).toLocaleTimeString()}`
      }}
    ]
  }
  getStatusItems(): void {
    this.specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const statusData: any = data.filter(specialRequestItem => 
        specialRequestItem.Is_Confirmed === true && 
        specialRequestItem.Is_Store_Room_Item === true &&
        specialRequestItem.Department === this.authService.getCurrentUser().department
        )
        .map(statusItem => ({
          ...statusItem,
          Item: statusItem.master?.Item,
          Recent_CN: statusItem.master?.Recent_CN
        }))
        this.srStatusDataService.updateSrStatusItems(statusData)
      },
      error: error => error
    })
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
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
    this.searchValue = ''
    this.handleSearch(this.searchValue)
  }
}
