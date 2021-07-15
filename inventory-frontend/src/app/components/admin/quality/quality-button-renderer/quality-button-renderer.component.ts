import { QualityService } from './../../../../shared/services/quality.service';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
import { IQuality } from 'src/app/shared/models/quality.model';
import { ICellRendererParams } from 'ag-grid-community';
import { QualityQuantityComponent } from '../quality-quantity/quality-quantity.component';

@Component({
  selector: 'app-quality-button-renderer',
  templateUrl: './quality-button-renderer.component.html',
  styleUrls: ['./quality-button-renderer.component.scss']
})
export class QualityButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
  constructor(private dialog: MatDialog, private qualityService: QualityService) { }
  rowItem: IQuality;
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
    const currentDialog = this.dialog.open(QualityQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(() => this.params.context.qualityComponent.getQualityQuantity())
  }
  buttonClicked() {
    this.openDialog()
  }
  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}

