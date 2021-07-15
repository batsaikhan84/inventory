import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ExtractionService } from 'src/app/shared/services/extraction.service';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';

@Component({
  selector: 'app-lab-director-extraction',
  templateUrl: './lab-director-extraction.component.html',
  styleUrls: ['./lab-director-extraction.component.scss']
})
export class LabDirectorExtractionComponent implements OnInit {
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  
  constructor(private extractionService: ExtractionService,
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
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150 },
      {headerName: 'Usage Level', field: 'Usage_Level', minWidth: 150 },
      {headerName: 'Min Quantity', field: 'Min_Quantity'},
      {headerName: 'Max Quantity', field: 'Max_Quantity'},
      {headerName: 'Need To Order', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 200}
    ]
  }
  getExtractionQuantity(): void {
    this.extractionService.getExtractionMasterItems().subscribe({
      next: data => { this.rowData = data }
    })
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
