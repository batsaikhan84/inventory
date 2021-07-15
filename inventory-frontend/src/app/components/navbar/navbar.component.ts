import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignupFormComponent } from '../forms/signup-form/signup-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  constructor(public authService: AuthService,
              public dataService: DataService, 
              private dialog: MatDialog) {
  }
  ngOnInit(): void { 
  }
  handleLogout() {
    this.authService.logout()
  }
  handleSignup() {
    this.openDialog()
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(SignupFormComponent, dialogConfig)
  }
  isAdmin(): boolean {
    return this.authService.getCurrentUser().role === "admin" ? true : false
  }
  isExtraction(): boolean {
    return this.authService.getCurrentUser().department === "extraction" ? true : false
  }
  isMassSpec(): boolean {
    return this.authService.getCurrentUser().department === "massSpec" ? true : false
  }
  isReceiving(): boolean {
    return this.authService.getCurrentUser().department=== "receiving" ? true : false
  }
  isScreening(): boolean {
    return this.authService.getCurrentUser().department === "screening" ? true : false
  }
  isRd(): boolean {
    return this.authService.getCurrentUser().department === "rd" ? true : false
  }
  isQuality(): boolean {
    return this.authService.getCurrentUser().department === "quality" ? true : false
  }
  isSafety(): boolean {
    return this.authService.getCurrentUser().department === "safety" ? true : false
  }
  isIt(): boolean {
    return this.authService.getCurrentUser().department === "it" ? true : false
  }
}
