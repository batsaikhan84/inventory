import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  hide = true;
  departments = ['extraction', 'mass-spec', 'receiving', 'quality', 'screening', 'rd', 'storeRoom', 'it', 'safety', 'shipping']
  roles = ['admin', 'manager', 'supervisor', 'employee', 'coordinator', 'director', 'lab-director']
  constructor(private dialog: MatDialogRef<SignupFormComponent>, private _authService: AuthService) {}
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required])
  })
  getErrorMessage() {
      return 'Please enter a value';
  }
  onSubmit() {
    this._authService.signup(this.signupForm.value)
    this.onClose()
  }
  onClose() {
    this.dialog.close()
  }
  onClear() {
    this.signupForm.reset();
  }
}
