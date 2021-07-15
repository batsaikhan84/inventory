import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  baserUrl: string = "http://localhost:3000/master"
  constructor(private dialog: MatDialogRef<FormComponent>, private _masterService: MasterService) {}
  masterForm = new FormGroup({
    Item: new FormControl('', [Validators.required]),
    Purchase_Unit: new FormControl('' , [Validators.required]),
    Manufacturer: new FormControl(''),
    Part_Number: new FormControl('' , [Validators.required]),
    Recent_CN: new FormControl('' , [Validators.required]),
    Recent_Vendor: new FormControl('' , [Validators.required]),
    Fisher_CN: new FormControl('' , [Validators.required]),
    VWR_CN: new FormControl('' , [Validators.required]),
    Next_Advance_CN: new FormControl('' , [Validators.required]),
    Lab_Source_CN: new FormControl('' , [Validators.required]), 
    Average_Unit_Price: new FormControl(''),
    Category: new FormControl(''),
    Comments: new FormControl(''),
    Type: new FormControl(''),
  })
  minorForm = new FormGroup({
    extraction: new FormControl(false),
    massSpec: new FormControl(false),
    receiving: new FormControl(false),
    screening: new FormControl(false),
    quality: new FormControl(false),
    storeRoom: new FormControl(false),
    rd: new FormControl(false),
    shipping: new FormControl(false)
  })


  getErrorMessage() {
      return 'Please enter a value';
  }
  onSubmit() {
    this._masterService.createMasterItem({ masterItem: this.masterForm.value, departments: this.minorForm.value }).subscribe()
    this.onClose()
  }
  onClose() {
    this.dialog.close()
  }
  onClear() {
    this.masterForm.reset();
    this.minorForm.reset();
  }
}
