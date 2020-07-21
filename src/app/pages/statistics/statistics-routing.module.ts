import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsTheOrdersComponent } from './statistics-the-orders/statistics-the-orders.component';
import { StatisticsTheVehiclesComponent } from './statistics-the-vehicles/statistics-the-vehicles.component';
import { StatisticsTheDeliveryComponent } from './statistics-the-delivery/statistics-the-delivery.component';
import { StatisticsTheClientComponent } from './statistics-the-client/statistics-the-client.component';


const routes: Routes = [
    { path: 'orders', component: StatisticsTheOrdersComponent },
    { path: 'vehicles', component: StatisticsTheVehiclesComponent },
    { path: 'delivery', component: StatisticsTheDeliveryComponent },
    { path: 'client', component: StatisticsTheClientComponent },
    { path: '', redirectTo: 'orders', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StatisticsRoutingModule { }
