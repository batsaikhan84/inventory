import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { DataService } from './data.service';
import { IForgotPassword } from '../models/reset-password.model';
import { SnackbarService } from './snackbar.service';
import { IUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any;
  message: string = ''
  helper = new JwtHelperService();
  constructor(private _http: HttpClient,
              private dataService: DataService,
              private _router: Router,
              private _snackbarService: SnackbarService) { }

  signin(formValue: { username: string, password: string }) {
    return this._http.post('http://192.168.112.191:3000/auth/signin', formValue).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.accessToken)
        const decodedToken = this.helper.decodeToken(res.accessToken)
        const tokenExpirationDate = decodedToken.exp * 1000 - new Date().getTime()
        this.autoLogout(tokenExpirationDate)
        this.dataService.loginErrorMessage('')
        if(decodedToken.role === 'admin') {
          this._router.navigate(['/admin/store-room'])
        } else if(decodedToken.username === 'brichey') {
          this._router.navigate([`/department/store-room-department`])
        } else if(decodedToken.role === 'leader') {
          this._router.navigate([`/leader/store-room-special-request`])
        } else {
          this._router.navigate([`/department/${decodedToken.department}`])
        }
        return
      },
      error: () => {
        this.dataService.loginErrorMessage('There was a problem logging in. Please check your username and password.')
      }
    })
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(()=> {
      this.logout();
    }, expirationDuration)
  }
  resetPassword(password: string) {
    return this._http.post('http://192.168.112.191:3000/auth/reset-password', password)
  }
  logout() {
    localStorage.removeItem('token')
    this._router.navigate([''])
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
  }
  getCurrentUser() {
    const token: string = localStorage.getItem('token') || ''
    let user: IUser = {
        username: '',
        name: '',
        department: '',
        role: '',
        exp: null
    }
    if(token) {
      const decodedToken = this.helper.decodeToken(token)
      user = {
        username: decodedToken.username,
        name: decodedToken.name,
        department: decodedToken.department,
        role: decodedToken.role,
        exp: decodedToken.exp
      }
      return user
    }
    return user
  }
  isLoggedin(): boolean {
    const token: string = localStorage.getItem('token') || ''
    return !this.helper.isTokenExpired(token)
  }
  signup(formValue: { 
    username: string,
    password: string,
    role: string,
    department: string,
    name: string
   }) {
    this._http.post('http://192.168.112.191:3000/auth/signup', formValue).subscribe({
      next: () => this._snackbarService.openSnackBar('User created successfully', 'success'),
      error: () => this._snackbarService.openSnackBar('User created unsuccessfully', 'error')
    })
  }
  forgotPassword(user: IForgotPassword) {
    return this._http.post('http://192.168.112.191:3000/forgot', user)
  }
}
