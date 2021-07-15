import { Component, OnInit } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IMaster } from 'src/app/shared/models/master.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-mass-spec-category-button-renderer',
  templateUrl: './mass-spec-category-button-renderer.component.html',
  styleUrls: ['./mass-spec-category-button-renderer.component.scss']
})
export class MassSpecCategoryButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  categories: string[] = ['GC', 'LC', 'Columns', 'General', 'Gases', 'Solvents', 'LDTD', 'Sciex']
  rowItem: IMaster;
  cellValue: string;
  params: ICellRendererParams;
  constructor(private _masterService: MasterService,
              public authService: AuthService) { }
  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data.master
    this.cellValue = this.getValueToDisplay(params)
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
  updateCategory(value: string) {
    const data = {...this.rowItem, Category: value}
    this._masterService.updateMasterItem(data.ID, data, '').subscribe({
      next: data => {
        this.cellValue = data.Category
        this.params.context.massSpecComponent.getMassSpecQuantity()
      },
      error: error => error
    })
  }
}


