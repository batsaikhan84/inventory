import { ExtractionService } from 'src/app/shared/services/extraction.service';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { IExtraction } from 'src/app/shared/models/extraction.model';
import { ICellRendererParams } from 'ag-grid-community';
import { ExtractionDepartmentQuantityComponent } from '../extraction-department-quantity/extraction-department-quantity.component';

@Component({
  selector: 'app-extraction-department-button-renderer',
  templateUrl: './extraction-department-button-renderer.component.html',
  styleUrls: ['./extraction-department-button-renderer.component.scss']
})
export class ExtractionDepartmentButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, private extractionService: ExtractionService) { }
  rowItem: IExtraction;
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
    this.dialog.open(ExtractionDepartmentQuantityComponent, dialogConfig).
      afterClosed().subscribe(() => this.params.context.extractionComponent.getExtractionQuantity())
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}
