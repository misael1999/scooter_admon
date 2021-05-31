import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmSignupDialogComponent } from './alerts/confirm-signup-dialog/confirm-signup-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './alerts/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './alerts/success-dialog/success-dialog.component';
import { NoFoundDataComponent } from './no-found-data/no-found-data.component';
import { AngularMaterialModule } from './angular-material.module';
import { LoadingDataComponent } from './loading-data/loading-data.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ConfirmSignupDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    NoFoundDataComponent,
    LoadingDataComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AngularMaterialModule,
  ],
  entryComponents: [
    ConfirmSignupDialogComponent,
    ErrorDialogComponent,
    SuccessDialogComponent
  ],
  exports: [
    ConfirmSignupDialogComponent,
    ErrorDialogComponent,
    LoadingDataComponent,
    SuccessDialogComponent,
    NoFoundDataComponent,
    AngularMaterialModule
  ]
})
export class SharedModule { }
