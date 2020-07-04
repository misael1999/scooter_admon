import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProfileModule } from './view-profile/view-profile.module';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule )
  },
  {
    path: 'client',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule )
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery-men/delivery-men.module').then(m => m.DeliveryMenModule )
  },
  {
    path: 'traicing',
    loadChildren: () => import('./traicing/traicing.module').then(m => m.TraicingModule )
  },
  {
    path: 'profile',
    loadChildren: () => import('./view-profile/view-profile.module').then(m => m.ViewProfileModule )
  },


  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
