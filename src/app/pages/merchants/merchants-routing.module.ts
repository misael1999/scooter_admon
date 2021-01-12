import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantAddChipComponent } from './merchant-add-chip/merchant-add-chip.component';


const routes: Routes = [
  { path: '', component: MainMerchantComponent },
  { path: 'chips/:id', component: MerchantAddChipComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
