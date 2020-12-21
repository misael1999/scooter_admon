import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
