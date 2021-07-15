import { IRd } from './../../../../shared/models/rd.model';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { RdService } from 'src/app/shared/services/rd.service';
import { ICellRendererParams } from 'ag-grid-community';
import { RdQuantityComponent } from '../rd-quantity/rd-quantity.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-rd-button-renderer',
  templateUrl: './rd-button-renderer.component.html',
  styleUrls: ['./rd-button-renderer.component.scss']
})
export class RdButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, 
              private rdService: RdService,
              private snackbarService: SnackbarService) { }
  rowItem: IRd;
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
    dialogConfig.width = "50%";
    dialogConfig.data = {rowItem: this.rowItem, cellValue: this.cellValue}
    const currentDialog = this.dialog.open(RdQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe({
      next: () => {
        () => this.params.context.rdComponent.getRdQuantity()
        this.snackbarService.openSnackBar('total quantity updated successfully', 'success')
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


