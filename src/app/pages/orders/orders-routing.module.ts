import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { DeliveredOrdersComponent } from './delivered-orders/delivered-orders.component';


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
  { path: '', redirectTo: 'news', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
