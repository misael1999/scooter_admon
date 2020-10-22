import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantOrdersRoutingModule } from './merchant-orders-routing.module';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RejectOrderMerchantComponent } from './new-orders/reject-order-merchant/reject-order-merchant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CancelOrderMerchantComponent } from './orders-in-process/cancel-order-merchant/cancel-order-merchant.component';


@NgModule({
  declarations: [
    OrdersInProcessComponent,
    NewOrdersComponent,
    DeliveredOrdersComponent,
    CancelledOrdersComponent,
    RejectOrderMerchantComponent,
    CancelOrderMerchantComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MerchantOrdersRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class MerchantOrdersModule { }
