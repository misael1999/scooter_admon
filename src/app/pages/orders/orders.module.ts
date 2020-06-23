import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';



@NgModule({
  declarations: [
    OrdersInProcessComponent,
     DeliveredOrdersComponent,
      NewOrdersComponent
    ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AngularMaterialModule
  ]
})
export class OrdersModule { }
