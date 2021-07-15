import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shareComponents/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, messageType: 'error' | 'success') {
    this._snackBar.openFromComponent(SnackbarComponent,  
      { duration: 6000, 
        horizontalPosition: 'center', 
        verticalPosition: 'bottom', 
        panelClass: messageType,
        data: {
          message: message,
          type: messageType
        }
      })
  }
}
