import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { IMaster } from 'src/app/shared/models/master.model';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';
import { StatusRendererComponent } from '../status-renderer/status-renderer.component';

@Component({
  selector: 'app-admin-sr-special-request',
  templateUrl: './admin-sr-special-request.component.html',
  styleUrls: ['./admin-sr-special-request.component.scss']
})
export class AdminSrSpecialRequestComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  isButtonDisabled: boolean;
  selectedItem: IMaster;
  searchValue: string;
  editText: string = 'Start Editing';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  frameworkComponents: any
  constructor(private _specialRequestService: SpecialRequestService) { 
    this.frameworkComponents = { dropdownRenderer: StatusRendererComponent }
  }

  ngOnInit(): void {
    this.getMasterInventory()
    this.isButtonDisabled = true
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      editable: true
    }
    this.handleEditing()
  }
  getMasterInventory(): void {
    this._specialRequestService.getSpecialRequestItems().subscribe({
      next: data => {
        const result = data.filter(res => res.Is_Store_Room_Item === true).map(item => ({
          ...item,
          Item: item.master.Item,
          Recent_CN: item.master.Recent_CN
        }))
        this.rowData = result
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
      this.isButtonDisabled = false
    } else {
      this.isButtonDisabled = true
    }
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', maxWidth: 100 },
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Recent CN', field: 'Recent_CN' },
      {headerName: 'Quantity', field: 'Quantity'},
      {headerName: 'Department', field: 'Department'},
      {headerName: 'Status', field: 'Status', 
        cellStyle: { 'background-color': 'lightblue', 'font-weight': 600 }, 
        cellRenderer: 'dropdownRenderer' },
      {headerName: 'Comment', field: 'Comment', editable: true },
      {headerName: 'Time Requested', field: 'Time_Requested', valueFormatter: function(params: any) {
        return `${new Date(params.data.Time_Requested).toLocaleDateString()} ${new Date(params.data.Time_Requested).toLocaleTimeString()}`
      }},
      {headerName: 'Time Updated', field: 'Time_Updated', valueFormatter: function(params: any) {
        return `${new Date(params.data.Time_Updated).toLocaleDateString()} ${new Date(params.data.Time_Updated).toLocaleTimeString()}`
      }},
    ]
  }
  onCellValueChanged(params: any) {
    this._specialRequestService.updateSpecialRequestItem(params.data.ID, params.data).subscribe(response => this.getMasterInventory())
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
  handleUpdate(value: any) {
    this._specialRequestService.updateSpecialRequestItem(value.data.ID, value.data).subscribe({
      next: (data) => { console.log(data) },
      error: () => { }
    })
  }
  onSearchClear() {
    this.searchValue = ''
  }
}

  