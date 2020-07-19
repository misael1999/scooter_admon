import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralReportComponent } from './general-report/general-report.component';
import { GeneralReportsRoutingModule } from './reports-routing.module';



@NgModule({
  declarations: [
    GeneralReportComponent],
  imports: [
    CommonModule,
    GeneralReportsRoutingModule
  ]
})
export class ReportsModule { }
