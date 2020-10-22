import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MainMerchantComponent, MerchantListComponent],
  imports: [
    CommonModule,
    MerchantsRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class MerchantsModule { }
