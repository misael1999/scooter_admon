import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsByMerchantRoutingModule } from './promotions-by-merchant-routing.module';
import { PromotionOnShippingComponent } from './promotion-on-shipping/promotion-on-shipping.component';
import { MerchantsListComponent } from './merchants-list/merchants-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzResultModule } from 'ng-zorro-antd/result';
import { PromotionFormComponent } from './promotion-form/promotion-form.component';

@NgModule({
  declarations: [
    PromotionOnShippingComponent,
    MerchantsListComponent,
    PromotionFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PromotionsByMerchantRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule,
    NzStepsModule,
    NzResultModule,
  ]
})
export class PromotionsByMerchantModule { }
