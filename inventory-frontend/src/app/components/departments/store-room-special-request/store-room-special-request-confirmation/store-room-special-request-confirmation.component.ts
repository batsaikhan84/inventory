import { EmailService } from '../../../../shared/services/email.service';
import { Component, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SrConfirmationDataService } from 'src/app/shared/services/sr-confirmation-data.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { SrStatusDataService } from 'src/app/shared/services/sr-status-data.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-store-room-special-request-confirmation',
  templateUrl: './store-room-special-request-confirmation.component.html',
  styleUrls: ['./store-room-special-request-confirmation.component.scss']
})
export class StoreRoomSpecialRequestConfirmationComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isButtonDisabled: boolean = true;
  searchValue: string;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  selectedRows: ISpecialRequest[];

  constructor(private specialRequestService: SpecialRequestService,
              private authService: AuthService,
              private dialogService: DialogService,
              private srConfirmationDataService: SrConfirmationDataService,
              private srStatusDataService: SrStatusDataService,
              private emailService: EmailService,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getSpecialRequestItems()
    this.srConfirmationDataService.currentSrConfirmationItems.subscribe(res => this.rowData = res)
    this.handleEditing()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }

  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', width: 120, checkboxSelection: true, headerCheckboxSelection: true, },
      {headerName: 'Item', field: 'Item', minWidth: 700},
      {headerName: 'Item_ID', field: 'Item_ID', minWidth: 150},
      {headerName: 'Quantity', field: 'Quantity', minWidth: 220, editable: true },
      {headerName: 'Recent CN', field: 'Recent_CN', minWidth: 210 },
      {headerName: 'Status', field: 'Status', minWidth: 220},
      {headerName: 'Time Requested', field: 'Time_Requested', minWidth: 220,  valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }},
      {headerName: 'Time Updated', field: 'Time_Updated',  valueFormatter: function(params: any) {
        return new Date(params.data.Time_Requested).toLocaleDateString()
      }}
    ]
  }
  handleConfirmation() {
    let isError = false
    const currentUser = this.authService.getCurrentUser()
    this.dialogService.confirmationDialog("Please confirm your special request.").afterClosed().subscribe(res => {
      if(res === true) {
        this.selectedRows.map(selectedRow => {
          const data = {
            Is_Confirmed: true
          }
          this.specialRequestService.updateSpecialRequestItem(selectedRow.ID, data).subscribe({
            next: (data) => {
              this.getSpecialRequestItems() 
              this.getStatusItems()
              this.isButtonDisabled = true
            },
            error: () => {
              isError = true
              this.snackbarService.openSnackBar('Submission Failed', 'error')
            }

          })
        })
      }
      if(isError === false) {
        this.emailService.sendSrSpecialRequestEmail({Items: this.selectedRows, User: currentUser, Type: 'Store Room'}).subscribe()
        this.snackbarService.openSnackBar('Your store room special Request submitted successfully', 'success')
      } else {
        this.snackbarService.openSnackBar('Submission Failed', 'error')
      }
    })
  }
  handleUpdate(value: any) {
    this.specialRequestService.updateSpecialRequestItem(value.data.ID, value.data).subscribe({
      next: () => {
        this.snackbarService.openSnackBar('item quantity updated successfully', 'success')
      },
      error: () => {
        this.snackbarService.openSnackBar('item quantity updated unsuccessfully', 'error')
      }
    })
  }
  handleDelete() {
    this.dialogService.confirmationDialog("Please confirm your delete action.").afterClosed().subscribe({
      next: (data) => {
        if(data === true) {
          this.selectedRows.map(item => {
            this.specialRequestService.deleteItem(item.ID).subscribe({
              next: () => {
                this.snackbarService.openSnackBar(`selected items deleted successfully'`, 'success')
                this.getSpecialRequestItems()
                this.srConfirmationDataService.currentSrConfirmationItems.subscribe(res => this.rowData = res)
              },
              error: () => this.snackbarService.openSnackBar(`selected items deleted unsuccessfully'`, 'error')
            })
          })
          this.isButtonDisabled = true

        }
      },
      error: () =>  this.snackbarService.openSnackBar(`selected items deleted unsuccessfully'`, 'error')
    })
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
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedRows = selectedNodes.map(node => {
      return node.data
    })
    if(this.selectedRows.length > 0) {
      this.isButtonDisabled = false
    } else {
      this.isButtonDisabled = true
    }
  }
  getSpecialRequestItems(): void {
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
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  // onFirstDataRendered(params: any) {
  //   params.api.sizeColumnsToFit();
  // }
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
