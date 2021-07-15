import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ShippingService } from 'src/app/shared/services/shipping.service';
import { IShipping } from 'src/app/shared/models/shipping.model';
import { ShippingQuantityComponent } from '../shipping-quantity/shipping-quantity.component';

@Component({
  selector: 'app-shipping-button-renderer',
  templateUrl: './shipping-button-renderer.component.html',
  styleUrls: ['./shipping-button-renderer.component.scss']
})
export class ShippingButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, 
              private shippingService: ShippingService,
              private snackbarService: SnackbarService) { }
  rowItem: IShipping;
  cellValue: number;
  params: ICellRendererParams;
  adminShippingComponent: any

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.adminShippingComponent = params.context.adminShippingComponent
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
    dialogConfig.width = "50%";
    dialogConfig.data = {rowItem: this.rowItem, cellValue: this.cellValue}
    this.dialog.open(ShippingQuantityComponent, dialogConfig).afterClosed().subscribe({
      next: () => {
        this.params.context.adminShippingComponent.getTotalItems() 
      },
      error: () => {
        this.snackbarService.openSnackBar('total quantity updated unsuccessfully', 'error')
      }
    })
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}

