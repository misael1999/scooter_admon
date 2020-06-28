import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { InfoDeliveryComponent } from './info-delivery/info-delivery.component';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddDeliveryComponent,
    InfoDeliveryComponent,
    ListDeliveryComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    ReactiveFormsModule
  ]
})
export class DeliveryMenModule { }
