import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';


const routes: Routes = [
  { path: '', component: MainMerchantComponent },
  { path: 'detail/:id', component: MerchantDetailComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
