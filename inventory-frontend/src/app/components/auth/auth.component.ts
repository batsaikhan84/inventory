import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  buttonText = 'Forgot Password?'
  isForgotPassword = false
  loginErrorMessage: string = ''
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.loginErrorMessage = message)
  }
  getErrorMessage() {
    return 'This field is required';
  }
  buttonTextToggle() {
    this.isForgotPassword = !this.isForgotPassword
    if(this.buttonText === 'Sign In') {
      this.buttonText = 'Forgot Password?'
      this.loginErrorMessage = ''
      return
    }
    this.buttonText = 'Forgot Password?'
    this.buttonText = 'Sign In'
    this.loginErrorMessage = ''
  }
  handleEventEmitter($event: boolean) {
    this.isForgotPassword = $event
    if($event === false) {
      this.buttonText = 'Forgot Password'
    }
  }
}
