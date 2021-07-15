import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss']
})
export class ForgotPasswordFormComponent implements OnInit {
  buttonText = 'Forgot Password?'
  isForgotPassword = false
  loginErrorMessage: string = ''
  hide = true;
  forgotPasswordForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('' , [Validators.required]),
  })
  constructor(private authService: AuthService, private _router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  onSubmit = () => {
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }
  getErrorMessage() {
    return 'This field is required';
  }
}
