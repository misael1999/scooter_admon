import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { TabMerchantGeneralComponent } from './merchant-detail/tabs/tab-merchant-general/tab-merchant-general.component';
import { TabMerchantSummaryComponent } from './merchant-detail/tabs/tab-merchant-summary/tab-merchant-summary.component';
import { TabMerchantSettingComponent } from './merchant-detail/tabs/tab-merchant-setting/tab-merchant-setting.component';
import { TabProductsComponent } from './merchant-detail/tabs/tab-products/tab-products.component';
import { TabReviewsComponent } from './merchant-detail/tabs/tab-reviews/tab-reviews.component';


const routes: Routes = [
  { path: '', component: MainMerchantComponent },
  {
    path: 'detail/:id', component: MerchantDetailComponent, children: [
      {
        path: 'general', component: TabMerchantGeneralComponent
      },
      {
        path: 'settings', component: TabMerchantSettingComponent
      },
      {
        path: 'summary', component: TabMerchantSummaryComponent
      },
      {
        path: 'products', component: TabProductsComponent
      },
      {
        path: 'reviews', component: TabReviewsComponent
      },
      {
        path: 'promotions',
        loadChildren: () => import('./merchant-detail/tabs/tab-promotions/tab-promotions.module').then(m => m.TabPromotionsModule)

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
