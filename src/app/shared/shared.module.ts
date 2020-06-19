import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmSignupDialogComponent } from './alerts/confirm-signup-dialog/confirm-signup-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './alerts/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './alerts/success-dialog/success-dialog.component';



@NgModule({
  declarations: [
    ConfirmSignupDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [
    ConfirmSignupDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent
  ],
  exports: [
    ConfirmSignupDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent
  ]
})
export class SharedModule { }
