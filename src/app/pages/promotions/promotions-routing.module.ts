import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPromotionsComponent } from './main-promotions/main-promotions.component';
import { PromotionOnShippingComponent } from './promotions-by-station/promotion-on-shipping/promotion-on-shipping.component';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';

const routes: Routes = [
    { path: 'add-promotion', component: MainPromotionsComponent },
    { path: 'shipping', component: PromotionOnShippingComponent },
    { path: 'list', component: PromotionsListComponent },
    {
        path: 'merchant',
        loadChildren: () => import('./promotions-by-merchant/promotions-by-merchant.module').then(m => m.PromotionsByMerchantModule)
    },
    {
        path: 'station',
        loadChildren: () => import('./promotions-by-station/promotions-by-station.module').then(m => m.PromotionsByStationModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromotionsRoutingModule { }
