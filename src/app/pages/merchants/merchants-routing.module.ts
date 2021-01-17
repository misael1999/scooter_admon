import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantAddChipComponent } from './merchant-add-chip/merchant-add-chip.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { TabMerchantGeneralComponent } from './merchant-detail/tabs/tab-merchant-general/tab-merchant-general.component';
import { TabMerchantSchedulesComponent } from './merchant-detail/tabs/tab-merchant-schedules/tab-merchant-schedules.component';
import { TabMerchantSettingComponent } from './merchant-detail/tabs/tab-merchant-setting/tab-merchant-setting.component';
import { TabMerchantTagsComponent } from './merchant-detail/tabs/tab-merchant-tags/tab-merchant-tags.component';


const routes: Routes = [
  { path: '', component: MainMerchantComponent },
  // { path: 'detail/:id', component: MerchantDetailComponent },
  {
    path: 'detail/:id', component: MerchantDetailComponent, children: [
      {
        path: 'general', component: TabMerchantGeneralComponent
      },
      {
        path: 'schedules', component: TabMerchantSchedulesComponent
      },
      {
        path: 'setting', component: TabMerchantSettingComponent
      },
      {
        path: 'tags', component: TabMerchantTagsComponent
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
