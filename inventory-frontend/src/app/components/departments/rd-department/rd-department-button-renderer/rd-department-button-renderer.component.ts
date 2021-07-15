  import { IRd } from './../../../../shared/models/rd.model';
  import { Component } from '@angular/core';
  import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
  import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';
  import { RdService } from 'src/app/shared/services/rd.service';
  import { ICellRendererParams } from 'ag-grid-community';
import { RdDepartmentQuantityComponent } from '../rd-department-quantity/rd-department-quantity.component';
  
  @Component({
    selector: 'app-rd-department-button-renderer',
    templateUrl: './rd-department-button-renderer.component.html',
    styleUrls: ['./rd-department-button-renderer.component.scss']
  })
  export class RdDepartmentButtonRendererComponent implements AgRendererComponent, ICellRendererAngularComp {
    constructor(private dialog: MatDialog, private rdService: RdService) { }
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
      this.dialog.open(RdDepartmentQuantityComponent, dialogConfig).afterClosed().subscribe(() => 
        this.params.context.rdComponent.getRdQuantity())
    }
    buttonClicked() {
      this.openDialog()
    }
    getValueToDisplay(params: ICellRendererParams) {
      return params.valueFormatted ? params.valueFormatted : params.value;
    }
  }
  
  
  