import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { MasterComponent } from './components/admin/master/master.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormComponent } from './components/forms/new-item-form/form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { ExtractionComponent } from './components/admin/extraction/extraction.component';
import { MassSpecComponent } from './components/admin/mass-spec/mass-spec.component';
import { ReceivingComponent } from './components/admin/receiving/receiving.component';
import { StoreRoomComponent } from './components/admin/store-room/store-room.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExtractionButtonRendererComponent } from './components/admin/extraction/extraction-button-renderer/extraction-button-renderer.component';
import { SpecialRequestComponent } from './components/special-request/special-request.component';
import { ExtractionDepartmentComponent } from './components/departments/extraction-department/extraction-department.component';
import { AuthComponent } from './components/auth/auth.component';
import { ChemicalComponent } from './components/chemical/chemical.component';
import { AuthGuard } from './components/auth/auth.guard';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { ScreeningComponent } from './components/admin/screening/screening.component';
import { RdComponent } from './components/admin/rd/rd.component';
import { QualityComponent } from './components/admin/quality/quality.component';
import { ScreeningDepartmentComponent } from './components/departments/screening-department/screening-department.component';
import { RdDepartmentComponent } from './components/departments/rd-department/rd-department.component';
import { QualityDepartmentComponent } from './components/departments/quality-department/quality-department.component';
import { SafetyDepartmentComponent } from './components/departments/safety-department/safety-department.component';
import { AdminSpecialRequestComponent } from './components/admin/admin-special-request/admin-special-request.component';
import { StatusRendererComponent } from './components/admin/admin-special-request/status-renderer/status-renderer.component';
import { SpecialRequestFormComponent } from './components/forms/special-request-form/special-request-form.component';
import { ExtractionQuantityComponent } from './components/admin/extraction/extraction-quantity/extraction-quantity.component';
import { MassSpecButtonRendererComponent } from './components/admin/mass-spec/mass-spec-button-renderer/mass-spec-button-renderer.component';
import { MassSpecQuantityComponent } from './components/admin/mass-spec/mass-spec-quantity/mass-spec-quantity.component';
import { RdButtonRendererComponent } from './components/admin/rd/rd-button-renderer/rd-button-renderer.component';
import { ReceivingButtonRendererComponent } from './components/admin/receiving/receiving-button-renderer/receiving-button-renderer.component';
import { ScreeningButtonRendererComponent } from './components/admin/screening/screening-button-renderer/screening-button-renderer.component';
import { RdQuantityComponent } from './components/admin/rd/rd-quantity/rd-quantity.component';
import { ReceivingQuantityComponent } from './components/admin/receiving/receiving-quantity/receiving-quantity.component';
import { ScreeningQuantityComponent } from './components/admin/screening/screening-quantity/screening-quantity.component';
import { QualityButtonRendererComponent } from './components/admin/quality/quality-button-renderer/quality-button-renderer.component';
import { QualityQuantityComponent } from './components/admin/quality/quality-quantity/quality-quantity.component';
import { ScreeningDepartmentButtonRendererComponent } from './components/departments/screening-department/screening-department-button-renderer/screening-department-button-renderer.component';
import { RdDepartmentQuantityComponent } from './components/departments/rd-department/rd-department-quantity/rd-department-quantity.component';
import { RdDepartmentButtonRendererComponent } from './components/departments/rd-department/rd-department-button-renderer/rd-department-button-renderer.component';
import { QualityDepartmentButtonRendererComponent } from './components/departments/quality-department/quality-department-button-renderer/quality-department-button-renderer.component';
import { QualityDepartmentQuantityComponent } from './components/departments/quality-department/quality-department-quantity/quality-department-quantity.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { DepartmentsHomeComponent } from './components/departments/departments-home/departments-home.component';
import { ExtractionDepartmentQuantityComponent } from './components/departments/extraction-department/extraction-department-quantity/extraction-department-quantity.component';
import { ExtractionDepartmentButtonRendererComponent } from './components/departments/extraction-department/extraction-department-button-renderer/extraction-department-button-renderer.component';
import { MassSpecDepartmentButtonRendererComponent } from './components/departments/mass-spec-department/mass-spec-department-button-renderer/mass-spec-department-button-renderer.component';
import { MassSpecDepartmentQuantityComponent } from './components/departments/mass-spec-department/mass-spec-department-quantity/mass-spec-department-quantity.component';
import { ReceivingDepartmentButtonRendererComponent } from './components/departments/receiving-department/receiving-department-button-renderer/receiving-department-button-renderer.component';
import { ReceivingDepartmentQuantityComponent } from './components/departments/receiving-department/receiving-department-quantity/receiving-department-quantity.component';
import { MassSpecDepartmentComponent } from './components/departments/mass-spec-department/mass-spec-department.component';
import { SignupFormComponent } from './components/forms/signup-form/signup-form.component'
import { ReceivingDepartmentComponent } from './components/departments/receiving-department/receiving-department.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ChemicalFilterPipe } from './shared/custom-pipe/chemical-filter.pipe';
import { StoreRoomSpecialRequestComponent } from './components/departments/store-room-special-request/store-room-special-request.component';
import { StoreRoomSpecialRequestFormComponent } from './components/forms/store-room-special-request-form/store-room-special-request-form.component';
import { StoreRoomSpecialRequestStatusComponent } from './components/departments/store-room-special-request/store-room-special-request-status/store-room-special-request-status.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { StoreRoomSpecialRequestConfirmationComponent } from './components/departments/store-room-special-request/store-room-special-request-confirmation/store-room-special-request-confirmation.component';
import { ConfirmationDialogComponent } from './components/departments/confirmation-dialog/confirmation-dialog.component';
import { SpecialRequestConfirmationComponent } from './components/special-request/special-request-confirmation/special-request-confirmation.component';
import { SpecialRequestStatusComponent } from './components/special-request/special-request-status/special-request-status.component';
import { ForgotPasswordFormComponent } from './components/forms/forgot-password-form/forgot-password-form.component';
import { SigninFormComponent } from './components/forms/signin-form/signin-form.component';
import { ResetPasswordComponent } from './components/auth/reset/reset-password.component';
import { AdminSrSpecialRequestComponent } from './components/admin/admin-special-request/admin-sr-special-request/admin-sr-special-request.component';
import { SnackbarComponent } from './shared/shareComponents/snackbar/snackbar.component';
import { AuditComponent } from './audit/audit.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ScreeningDepartmentQuantityComponent } from './components/departments/screening-department/screening-department-quantity/screening-department-quantity.component';
import { StoreRoomDepartmentComponent } from './components/departments/store-room-department/store-room-department.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LabDirectorExtractionComponent } from './components/lab-director/lab-director-extraction/lab-director-extraction.component';
import { LabDirectorReceivingComponent } from './components/lab-director/lab-director-receiving/lab-director-receiving.component';
import { LabDirectorMassSpecComponent } from './components/lab-director/lab-director-mass-spec/lab-director-mass-spec.component';
import { LabDirectorScreeningComponent } from './components/lab-director/lab-director-screening/lab-director-screening.component';
import { LabDirectorHomeComponent } from './components/lab-director/lab-director-home/lab-director-home.component';
import { MassSpecCategoryButtonRendererComponent } from './components/departments/mass-spec-department/mass-spec-category-button-renderer/mass-spec-category-button-renderer.component';
import { DropdownRendererComponent } from './components/admin/mass-spec/dropdown-renderer/dropdown-renderer.component';
import { AdminDepartmentRequestComponent } from './components/admin/admin-department-request/admin-department-request.component';
import { ShippingDepartmentComponent } from './components/departments/shipping-department/shipping-department.component';
import { ShippingDepartmentButtonRendererComponent } from './components/departments/shipping-department/shipping-department-button-renderer/shipping-department-button-renderer.component';
import { ShippingDepartmentQuantityComponent } from './components/departments/shipping-department/shippping-department-quantity/shipping-department-quantity.component';
import { ShippingComponent } from './components/admin/shipping/shipping.component';
import { ShippingQuantityComponent } from './components/admin/shipping/shipping-quantity/shipping-quantity.component';
import { ShippingButtonRendererComponent } from './components/admin/shipping/shipping-button-renderer/shipping-button-renderer.component';
import { LabDirectorRdComponent } from './components/lab-director/lab-director-rd/lab-director-rd.component';
import { LabDirectorQualityComponent } from './components/lab-director/lab-director-quality/lab-director-quality.component';
import { LabDirectorShippingComponent } from './components/lab-director/lab-director-shipping/lab-director-shipping.component';

@NgModule({
  declarations: [
    InventoryComponent,
    MasterComponent,
    HomeComponent,
    NavbarComponent,
    FormComponent,
    ExtractionComponent,
    MassSpecComponent,
    ReceivingComponent,
    StoreRoomComponent,
    ExtractionButtonRendererComponent,
    SpecialRequestComponent,
    ExtractionDepartmentComponent,
    MassSpecDepartmentComponent,
    ScreeningDepartmentComponent,
    AuthComponent,
    ChemicalComponent,
    GlobalSearchComponent,
    ScreeningComponent,
    RdComponent,
    QualityComponent,
    ScreeningDepartmentComponent,
    RdDepartmentComponent,
    QualityDepartmentComponent,
    SafetyDepartmentComponent,
    AdminSpecialRequestComponent,
    StatusRendererComponent,
    SpecialRequestFormComponent,
    ExtractionQuantityComponent,
    MassSpecButtonRendererComponent,
    MassSpecQuantityComponent,
    RdButtonRendererComponent,
    ReceivingButtonRendererComponent,
    ScreeningButtonRendererComponent,
    RdQuantityComponent,
    ReceivingQuantityComponent,
    ScreeningQuantityComponent,
    QualityButtonRendererComponent,
    QualityQuantityComponent,
    ExtractionDepartmentButtonRendererComponent,
    ExtractionDepartmentQuantityComponent,
    MassSpecDepartmentButtonRendererComponent,
    MassSpecDepartmentQuantityComponent,
    ScreeningDepartmentButtonRendererComponent,
    ReceivingDepartmentButtonRendererComponent,
    ReceivingDepartmentQuantityComponent,
    RdDepartmentButtonRendererComponent,
    RdDepartmentQuantityComponent,
    QualityDepartmentButtonRendererComponent,
    QualityDepartmentQuantityComponent,
    AdminHomeComponent,
    DepartmentsHomeComponent,
    ExtractionDepartmentComponent,
    SignupFormComponent,
    ReceivingDepartmentComponent,
    ChemicalFilterPipe,
    StoreRoomSpecialRequestComponent,
    StoreRoomSpecialRequestFormComponent,
    StoreRoomSpecialRequestStatusComponent,
    StoreRoomSpecialRequestConfirmationComponent,
    ConfirmationDialogComponent,
    SpecialRequestConfirmationComponent,
    SpecialRequestStatusComponent,
    ForgotPasswordFormComponent,
    SigninFormComponent,
    ResetPasswordComponent,
    AdminSrSpecialRequestComponent,
    SnackbarComponent,
    StatusRendererComponent,
    AuditComponent,
    NavigationComponent,
    ScreeningDepartmentQuantityComponent,
    StoreRoomDepartmentComponent,
    LabDirectorExtractionComponent,
    LabDirectorReceivingComponent,
    LabDirectorMassSpecComponent,
    LabDirectorScreeningComponent,
    LabDirectorHomeComponent,
    MassSpecCategoryButtonRendererComponent,
    DropdownRendererComponent,
    AdminDepartmentRequestComponent,
    ShippingDepartmentComponent,
    ShippingDepartmentButtonRendererComponent,
    ShippingDepartmentQuantityComponent,
    ShippingComponent,
    ShippingQuantityComponent,
    ShippingButtonRendererComponent,
    LabDirectorRdComponent,
    LabDirectorQualityComponent,
    LabDirectorShippingComponent
  ],
  exports: [
    MatChipsModule
  ],
  imports: [
    MatPaginatorModule,
    BrowserModule,
    InventoryRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([ExtractionButtonRendererComponent,
                                  MassSpecButtonRendererComponent,
                                  ReceivingButtonRendererComponent,
                                  RdButtonRendererComponent,
                                  ScreeningButtonRendererComponent])
  ],
  providers: [AuthGuard],
  bootstrap: [InventoryComponent],
  entryComponents: [FormComponent]
})
export class AppModule { }
