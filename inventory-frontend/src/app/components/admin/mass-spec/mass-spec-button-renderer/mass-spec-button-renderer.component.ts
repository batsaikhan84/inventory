import { IMassSpec } from './../../../../shared/models/mass-spec.model';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { MassSpecService } from 'src/app/shared/services/mass-spec.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { MassSpecQuantityComponent } from '../mass-spec-quantity/mass-spec-quantity.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-mass-spec-button-renderer',
  templateUrl: './mass-spec-button-renderer.component.html',
  styleUrls: ['./mass-spec-button-renderer.component.scss']
})
export class MassSpecButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, private massSpecService: MassSpecService,
              private snackbarService: SnackbarService) { }
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
    dialogConfig.width = "50%";
    dialogConfig.data = {rowItem: this.rowItem}
    const currentDialog = this.dialog.open(MassSpecQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe({
      next: () => {
        this.params.context.adminMassSpecComponent.getMassSpecQuantity()
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

