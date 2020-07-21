import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsTheOrdersComponent } from './statistics-the-orders/statistics-the-orders.component';
import { StatisticsTheVehiclesComponent } from './statistics-the-vehicles/statistics-the-vehicles.component';
import { StatisticsTheDeliveryComponent } from './statistics-the-delivery/statistics-the-delivery.component';
import { StatisticsTheClientComponent } from './statistics-the-client/statistics-the-client.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    StatisticsTheOrdersComponent,
    StatisticsTheVehiclesComponent,
    StatisticsTheDeliveryComponent,
    StatisticsTheClientComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ChartsModule,
    MatTabsModule
  ]
})
export class StatisticsModule { }
