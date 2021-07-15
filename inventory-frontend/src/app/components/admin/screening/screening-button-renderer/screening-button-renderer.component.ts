import { IScreening } from './../../../../shared/models/screening.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ScreeningService } from 'src/app/shared/services/screening.service';
import { ICellRendererParams } from 'ag-grid-community';
import { ScreeningQuantityComponent } from '../screening-quantity/screening-quantity.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-screening-button-renderer',
  templateUrl: './screening-button-renderer.component.html',
  styleUrls: ['./screening-button-renderer.component.scss']
})
export class ScreeningButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, 
              private screeningService: ScreeningService,
              private snackbarService: SnackbarService) { }
  rowItem: IScreening;
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
    this.dialog.open(ScreeningQuantityComponent, dialogConfig).afterClosed().subscribe({
      next: () => {
        this.params.context.screeningComponent.getScreeningQuantity()
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

