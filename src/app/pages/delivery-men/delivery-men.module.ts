import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { InfoDeliveryComponent } from './info-delivery/info-delivery.component';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { DeliveryRoutingModule } from './delivery-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    AddDeliveryComponent,
    InfoDeliveryComponent,
    ListDeliveryComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class DeliveryMenModule { }
