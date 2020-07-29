import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TabGeneralComponent } from './profile/tabs/tab-general/tab-general.component';
import { TabRatesComponent } from './profile/tabs/tab-rates/tab-rates.component';
import { TabAddressComponent } from './profile/tabs/tab-address/tab-address.component';
import { TabScheduleComponent } from './profile/tabs/tab-schedule/tab-schedule.component';
import { TabOtherComponent } from './profile/tabs/tab-other/tab-other.component';
import { TabPromotionComponent } from './profile/tabs/tab-promotion/tab-promotion.component';



const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      {path: 'general', component: TabGeneralComponent},
      {path: 'rates', component: TabRatesComponent},
      {path: 'address', component: TabAddressComponent},
      {path: 'schedule', component: TabScheduleComponent},
      {path: 'others', component: TabOtherComponent},
      {path: 'promotions', component: TabPromotionComponent},
      {path: '', redirectTo: 'general'},
    ]
  },
  { path: '', redirectTo: 'general', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProfileRoutingModule { }
