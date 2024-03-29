import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { InfoDeliveryComponent } from './info-delivery/info-delivery.component';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { CardInfoComponent } from './info-delivery/card-info/card-info.component';
import { HistoryOrdersComponent } from './info-delivery/history-orders/history-orders.component';
import { MainDeliveryMenComponent } from './main-delivery-men/main-delivery-men.component';



@NgModule({
  declarations: [
    AddDeliveryComponent,
    InfoDeliveryComponent,
    ListDeliveryComponent,
    CardInfoComponent,
    HistoryOrdersComponent,
    MainDeliveryMenComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class DeliveryMenModule { }
