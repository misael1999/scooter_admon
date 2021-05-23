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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainClientsComponent } from './main-clients/main-clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ProfileComponent } from './client-detail/tabs/profile/profile.component';
import { OrderHistoryComponent } from './client-detail/tabs/order-history/order-history.component';

@NgModule({
  declarations: [
    ClientListComponent,
    InfoClientComponent,
    CardInfoComponent,
    HistoryOrdersComponent,
    MainClientsComponent,
    ClientDetailComponent,
    ProfileComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ClientsModule { }
