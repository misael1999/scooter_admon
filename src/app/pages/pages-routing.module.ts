import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/guards/auth.guard';
import { RefreshTokenGuard } from '../services/guards/refresh-token.guard';
import { PromotionsRoutingModule } from './promotions/promotions-routing.module';
import { PromotionsModule } from './promotions/promotions.module';


const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'statistics',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  {
    path: 'orders',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'vehicles',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule)
  },
  {
    path: 'clients',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'delivery',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./delivery-men/delivery-men.module').then(m => m.DeliveryMenModule)
  },
  {
    path: 'traicing',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./traicing/traicing.module').then(m => m.TraicingModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./view-profile/view-profile.module').then(m => m.ViewProfileModule)
  },
  {
    path: 'reports',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'support',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'merchants',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./merchants/merchants.module').then(m => m.MerchantsModule)
  },
  {
    path: 'promotions',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./promotions/promotions.module').then(m => m.PromotionsModule)
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'zones',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./zones/zones.module').then(m => m.ZonesModule)
  },
  {
    path: 'administration',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
  },


  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
