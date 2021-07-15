import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreRoomSpecialRequestConfirmationComponent } from '../store-room-special-request/store-room-special-request-confirmation/store-room-special-request-confirmation.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<StoreRoomSpecialRequestConfirmationComponent>) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close(false)
  }

}
