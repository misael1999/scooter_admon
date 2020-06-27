import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { NoFoundDataComponent } from 'src/app/shared/no-found-data/no-found-data.component';
import { AssignDeliveryDialogComponent } from './new-orders/assign-delivery-dialog/assign-delivery-dialog.component';
import { RejectOrderDialogComponent } from './new-orders/reject-order-dialog/reject-order-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersCancelledComponent } from './orders-cancelled/orders-cancelled.component';



@NgModule({
  declarations: [
    OrdersInProcessComponent,
    DeliveredOrdersComponent,
    NewOrdersComponent,
    NoFoundDataComponent,
    AssignDeliveryDialogComponent,
    RejectOrderDialogComponent,
    OrdersCancelledComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AssignDeliveryDialogComponent,
    RejectOrderDialogComponent
  ]
})
export class OrdersModule { }
