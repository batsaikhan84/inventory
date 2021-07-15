import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';

@Component({
  selector: 'app-lab-director-mass-spec',
  templateUrl: './lab-director-mass-spec.component.html',
  styleUrls: ['./lab-director-mass-spec.component.scss']
})
export class LabDirectorMassSpecComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  
  constructor(private massSpecService: MassSpecService,
              private needToOrderService: NeedToOrderService) { }

  ngOnInit(): void {
    this.getExtractionQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true
    }
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item_ID', field: 'Item_ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit', minWidth: 150},
      {headerName: 'Part Number', field: 'Part_Number', minWidth: 150},
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Total Quantity', field: 'Quantity' },
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150 },
      {headerName: 'Min Quantity', field: 'Min_Quantity'},
      {headerName: 'Max Quantity', field: 'Max_Quantity'},
      {headerName: 'Need To Order', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200}
    ]
  }
  getExtractionQuantity(): void {
    this.massSpecService.getMassSpecMasterItems().subscribe(responseData => this.rowData = responseData)
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

