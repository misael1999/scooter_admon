import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDataComponent } from './loading-data/loading-data.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoFoundDataComponent } from './no-found-data/no-found-data.component';
import { AngularMaterialModule } from './angular-material.module';



@NgModule({
  declarations: [
    LoadingDataComponent,
    NoFoundDataComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AngularMaterialModule,
  ],
  exports: [
    LoadingDataComponent,
    NoFoundDataComponent,
    AngularMaterialModule
  ]
})
export class SharedModule { }
