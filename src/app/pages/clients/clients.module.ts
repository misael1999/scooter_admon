import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CardInfoComponent } from './info-client/card-info/card-info.component';
import { HistoryOrdersComponent } from './info-client/history-orders/history-orders.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    ClientListComponent,
    InfoClientComponent,
    CardInfoComponent,
    HistoryOrdersComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule
  ],
})
export class ClientsModule { }
