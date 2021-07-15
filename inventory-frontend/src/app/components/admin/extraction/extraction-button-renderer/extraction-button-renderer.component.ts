import { ExtractionQuantityComponent } from '../extraction-quantity/extraction-quantity.component';
import { ExtractionService } from '../../../../shared/services/extraction.service';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-extraction-button-renderer',
  templateUrl: './extraction-button-renderer.component.html',
  styleUrls: ['./extraction-button-renderer.component.scss']
})
export class ExtractionButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, 
              private extractionService: ExtractionService,
              private snackbarService: SnackbarService) { }
  rowItem: IExtraction;
  cellValue: number;
  params: ICellRendererParams;
  extractionComponent: any

  agInit(params: ICellRendererParams): void {
    this.params = params
    this.extractionComponent = params.context.extractionComponent
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
    this.dialog.open(ExtractionQuantityComponent, dialogConfig).afterClosed().subscribe({
      next: () => {
        this.params.context.extractionComponent.getExtractionQuantity() 
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

