import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';
import { OrdersCancelledComponent } from './orders-cancelled/orders-cancelled.component';
import { ConsumeTehComponent } from './consume-teh/consume-teh.component';


const routes: Routes = [
  {
    path: 'news', component: NewOrdersComponent,
  },
  {
    path: 'process', component: OrdersInProcessComponent,
  },
  {
    path: 'delivered', component: DeliveredOrdersComponent,
  },
  {
    path: 'cancelled', component: OrdersCancelledComponent,
  },
  {
    path: 'consumeteh', component: ConsumeTehComponent,
  },
  { path: '', redirectTo: 'news', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
