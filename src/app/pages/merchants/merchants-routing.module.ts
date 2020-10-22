import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';


const routes: Routes = [
  { path: 'info', component: MainMerchantComponent },
  { path: '', redirectTo: 'info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
