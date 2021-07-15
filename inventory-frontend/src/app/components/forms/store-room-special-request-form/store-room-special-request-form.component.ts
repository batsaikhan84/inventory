import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISpecialRequest } from 'src/app/shared/models/special-request.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SpecialRequestService } from 'src/app/shared/services/special-request.service';

@Component({
  selector: 'app-store-room-special-request-form',
  templateUrl: './store-room-special-request-form.component.html',
  styleUrls: ['./store-room-special-request-form.component.scss']
})
export class StoreRoomSpecialRequestFormComponent implements OnInit {
  specialRequestItem: any
  specialRequestForm = new FormGroup({
    Quantity: new FormControl('', [Validators.required]),
  })
  constructor(private _specialRequestService: SpecialRequestService, 
              private dialog: MatDialogRef<StoreRoomSpecialRequestFormComponent>, 
              @Inject(MAT_DIALOG_DATA) 
              public data: any,
              private authService: AuthService,
              private snackbarService: SnackbarService) { 
    this.specialRequestItem = data
  }
  ngOnInit() {
    
  }
  onSubmit() {
    const data: ISpecialRequest = {
      ID: this.specialRequestItem.ID,
      Quantity: Number(this.specialRequestForm.value.Quantity),
      Item_ID: this.specialRequestItem.Item_ID,
      Department: this.authService.getCurrentUser().department,
      User: this.authService.getCurrentUser().name,
      Is_Confirmed: false,
      Is_Store_Room_Item: true,
      Location: this.specialRequestItem.Location
    }
    this._specialRequestService.createSpecialRequestItem(data).subscribe({
      next: () => this.snackbarService.openSnackBar('Please confirm your request in step 2', 'success'),
      error: () => this.snackbarService.openSnackBar('Item already selected', 'error')
    })
    this.onClose()
  }
  onClose() {
    this.dialog.close()
  }
}
