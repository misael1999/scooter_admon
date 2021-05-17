import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromotionOnShippingComponent } from './promotion-on-shipping/promotion-on-shipping.component';

const routes: Routes = [
  { path:'shipping', component: PromotionOnShippingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionsByStationRoutingModule { }
