import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MassSpecQuantityComponent } from 'src/app/components/admin/mass-spec/mass-spec-quantity/mass-spec-quantity.component';

@Injectable({
  providedIn: 'root'
})
export class OpenDialogQuantityService {

  constructor() { }
  openDialog(data: any, params: any, dialog: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = data
    const currentDialog = dialog.open(MassSpecQuantityComponent, dialogConfig)
    currentDialog.afterClosed().subscribe(() => params.context.massSpecCompoent.getExtractionTotal())
  }
}
