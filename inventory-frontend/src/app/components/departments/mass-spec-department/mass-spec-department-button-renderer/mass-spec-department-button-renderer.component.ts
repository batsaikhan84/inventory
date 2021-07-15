import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IMassSpec } from 'src/app/shared/models/mass-spec.model';
import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { MassSpecDepartmentQuantityComponent } from '../mass-spec-department-quantity/mass-spec-department-quantity.component';

@Component({
  selector: 'app-mass-spec-department-button-renderer',
  templateUrl: './mass-spec-department-button-renderer.component.html',
  styleUrls: ['./mass-spec-department-button-renderer.component.scss']
})
export class MassSpecDepartmentButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, private massSpecService: MassSpecService) { }
  rowItem: IMassSpec;
  cellValue: number;
  params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.rowItem = params.node.data
    this.cellValue = Number(this.getValueToDisplay(params))
  }

  refresh(params: ICellRendererParams): any {
    this.cellValue = this.getValueToDisplay(params)
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {rowItem: this.rowItem, cellValue: this.cellValue}
    const currentDialog = this.dialog.open(MassSpecDepartmentQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(() => this.params.context.massSpecComponent.getMassSpecQuantity())
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}

