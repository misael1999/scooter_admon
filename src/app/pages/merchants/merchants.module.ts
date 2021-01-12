import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MerchantsAddComponent } from './merchants-add/merchants-add.component';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantAddChipComponent } from './merchant-add-chip/merchant-add-chip.component';

@NgModule({
  declarations: [
    MainMerchantComponent,
    MerchantListComponent,
    MerchantsAddComponent,
    MerchantAddChipComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MerchantsRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class MerchantsModule { }
