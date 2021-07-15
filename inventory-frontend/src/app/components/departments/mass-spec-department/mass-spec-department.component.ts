import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { NeedToOrderService } from 'src/app/shared/services/need-to-order.service';
import { MassSpecDepartmentButtonRendererComponent } from './mass-spec-department-button-renderer/mass-spec-department-button-renderer.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MassSpecCategoryButtonRendererComponent } from './mass-spec-category-button-renderer/mass-spec-category-button-renderer.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-mass-spec-department',
  templateUrl: './mass-spec-department.component.html',
  styleUrls: ['./mass-spec-department.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MassSpecDepartmentComponent implements OnInit {
  categories: string[] = ['All', 'GC', 'LC', 'Columns', 'General', 'Gases', 'Solvents', 'LDTD', 'Sciex']
  paginationSize: number;
  selectedCategory = 'All'
  frameworkComponents: any;
  rowDataClicked = {}
  @ViewChild('agGrid', {static: false}) agGrid: AgGridAngular;
  searchValue: string = '';
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  columnDefs: any;
  rowData: any;
  context: any;

  constructor(private massSpecService: MassSpecService, 
              private needToOrderService: NeedToOrderService,
              public authService: AuthService,
              private _breakpointObserver: BreakpointObserver) { 
    this.frameworkComponents = { 
      buttonRenderer: MassSpecDepartmentButtonRendererComponent,
      categoryRenderer: MassSpecCategoryButtonRendererComponent
    }
    this.context = { massSpecComponent: this }
  }
  ngOnInit(): void {
    this.getMassSpecQuantity()
    this.defaultColDef = { 
      resizable: true,
      sortable: true,
      filter: true,
      enableCellChangeFlash: true
    }
    this.handleEditing()
    this._breakpointObserver.observe(Breakpoints.XSmall).subscribe(result => {
      if (result.matches) {
        this.paginationSize = 10;
      }
    });
    this._breakpointObserver.observe(Breakpoints.Small).subscribe(result => {
      if (result.matches) {
        this.paginationSize = 23;
      }
    });
    this._breakpointObserver.observe(Breakpoints.Medium).subscribe(result => {
      if (result.matches) {
        this.paginationSize = 15;
      }
    });
    this._breakpointObserver.observe(Breakpoints.Large).subscribe(result => {
      if (result.matches) {
        this.paginationSize = 13;
      }
    });
    this._breakpointObserver.observe(Breakpoints.XLarge).subscribe(result => {
      if (result.matches) {
        this.paginationSize = 17;
      }
    });
  }
  getMassSpecQuantity(): void {
    this.massSpecService.getMassSpecMasterItems().subscribe({
      next: data => {
        if(this.selectedCategory === 'All') {
          this.rowData = data
          return
        }
        this.rowData = data.filter(item => item.Category === this.selectedCategory)
      },
      error: error => error
    })
  }
  onBtnClick(event: any) {
    this.rowDataClicked = event.rowData
  }
  handleEditing() {
    this.columnDefs = [
      {headerName: 'ID', field: 'ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Item', field: 'Item', minWidth: 450},
      {headerName: 'Item_ID', field: 'Item_ID', minWidth: 100, maxWidth: 110},
      {headerName: 'Purchase Unit', field: 'Purchase_Unit' },
      {headerName: 'Part Number', field: 'Part_Number' },
      {headerName: 'Recent CN', field: 'Recent_CN'},
      {headerName: 'Category', field: 'Category', cellRenderer: 'categoryRenderer', cellStyle: { 'background-color': 'lightblue', 'font-weight': 600, 'padding-right': 0} },
      {headerName: 'Total Quantity', field: 'Quantity', minWidth: 150, cellRenderer: 'buttonRenderer', editable: true},
      {headerName: 'Usage Level', field: 'Usage_Level' },
      {headerName: 'Min Quantity', field: 'Min_Quantity'},
      {headerName: 'Max Quantity', field: 'Max_Quantity'},
      {headerName: 'Need To Order', cellStyle: this.needToOrderService.styleNeedToOrder, valueFormatter: this.needToOrderService.getNeedToOrderNumber},
      {headerName: 'Comments', field: 'Comments', minWidth: 150}
    ]
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
}

