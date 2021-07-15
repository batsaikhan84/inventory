import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupFormComponent } from '../forms/signup-form/signup-form.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isSidenavOpen: boolean = false
  menuTitle: string = ''
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  showFiller = false;
  constructor(public authService: AuthService,
              public dataService: DataService, 
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver) {
  }
  ngOnInit(): void { 
  }
  handleLogout() {
    this.authService.logout()
    this.isSidenavOpen = false
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
    return this.authService.getCurrentUser().department === "mass-spec" ? true : false
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