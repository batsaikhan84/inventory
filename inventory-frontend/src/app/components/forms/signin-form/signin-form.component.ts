import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent implements OnInit {
  buttonText = 'Forgot Password?'
  isForgotPassword = false
  loginErrorMessage: string = ''
  isLoginIn = false
  hide = true;
  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('' , [Validators.required]),
  })
  constructor(private authService: AuthService, 
              private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  onSubmit = () => {
    const username: string = this.signInForm.value.username.toLowerCase()
    const password: string = this.signInForm.value.password
    const user = {username: username, password: password}
    this.authService.signin(user)
  }
  getErrorMessage() {
    return 'This field is required';
  }
}
