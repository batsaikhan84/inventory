import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IReceiving } from 'src/app/shared/models/receiving.model';
import { ReceivingDepartmentQuantityComponent } from '../receiving-department-quantity/receiving-department-quantity.component';

@Component({
  selector: 'app-receiving-department-button-renderer',
  templateUrl: './receiving-department-button-renderer.component.html',
  styleUrls: ['./receiving-department-button-renderer.component.scss']
})
export class ReceivingDepartmentButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog) { }
  rowItem: IReceiving;
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
    const currentDialog = this.dialog.open(ReceivingDepartmentQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(() => this.params.context.receivingComponent.getReceivingQuantity())
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}


