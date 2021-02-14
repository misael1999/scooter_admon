import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPromotionsComponent } from './main-promotions/main-promotions.component';
import { PromotionOnShippingComponent } from './promotion-on-shipping/promotion-on-shipping.component';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';


const routes: Routes = [
    { path: 'add-promotion', component: MainPromotionsComponent },
    { path: 'shipping', component: PromotionOnShippingComponent },
    { path: 'list', component: PromotionsListComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromotionsRoutingModule { }
