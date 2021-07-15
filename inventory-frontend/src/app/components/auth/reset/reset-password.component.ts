import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Output() resetPasswordEvent = new EventEmitter<boolean>();
  isForgotPassword: boolean = false
  buttonText = 'Forgot Password?'
  isReseting = false
  loginErrorMessage: string = ''
  passwordHide = true;
  confirmHide = true;
  resetPassword = new FormGroup({
    password: new FormControl('', [Validators.required]),
    password_confirm: new FormControl('' , [Validators.required]),
    username: new FormControl('', [Validators.required])
  })
  constructor(private authService: AuthService, private _router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  onSubmit = () => {
    this.isReseting = true
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next: () => {
          this.dataService.loginErrorMessage('')
          this.resetPasswordEvent.emit(false)
          this.isReseting = false
      },
      error: (error) => {
        this.isReseting = false
        if(error.status === 401) {
          this.dataService.loginErrorMessage(error.error.message)
          return
        }
        if(error.status === 400) {
          this.dataService.loginErrorMessage(error.error.message)
          return
        }
        if(error.status === 409) {
          this.dataService.loginErrorMessage(error.error.message)
          return
        }       
      }
    })
  }
  getErrorMessage() {
    return 'This field is required';
  }
}
