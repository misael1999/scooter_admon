import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { TabMerchantGeneralComponent } from './merchant-detail/tabs/tab-merchant-general/tab-merchant-general.component';
import { TabMerchantSummaryComponent } from './merchant-detail/tabs/tab-merchant-summary/tab-merchant-summary.component';


const routes: Routes = [
  { path: '', component: MainMerchantComponent },
  {
    path: ':id/detail', component: MerchantDetailComponent, children: [
      {
        path: 'general', component: TabMerchantGeneralComponent
      },
      {
        path: 'services', component: TabMerchantSummaryComponent
      },
      { path: '', redirectTo: 'general', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
