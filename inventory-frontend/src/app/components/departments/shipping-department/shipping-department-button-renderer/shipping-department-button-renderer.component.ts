import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ShippingService } from 'src/app/shared/services/shipping.service';
import { IShipping } from 'src/app/shared/models/shipping.model';
import { ShippingDepartmentQuantityComponent } from '../shippping-department-quantity/shipping-department-quantity.component';

@Component({
  selector: 'app-shipping-department-button-renderer',
  templateUrl: './shipping-department-button-renderer.component.html',
  styleUrls: ['./shipping-department-button-renderer.component.scss']
})
export class ShippingDepartmentButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, private shipppingService: ShippingService) { }
  rowItem: IShipping;
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
    this.dialog.open(ShippingDepartmentQuantityComponent, dialogConfig).
      afterClosed().subscribe(() => this.params.context.extractionComponent.getTotalItems())
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
