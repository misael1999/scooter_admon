import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MerchantsAddComponent } from './merchants-add/merchants-add.component';
import { MainMerchantComponent } from './main-merchant/main-merchant.component';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantsRoutingModule } from './merchants-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TabMerchantTagsComponent } from './merchant-detail/tabs/tab-merchant-tags/tab-merchant-tags.component';
import { TabMerchantSettingComponent } from './merchant-detail/tabs/tab-merchant-setting/tab-merchant-setting.component';
import { TabMerchantGeneralComponent } from './merchant-detail/tabs/tab-merchant-general/tab-merchant-general.component';
import { TabMerchantSchedulesComponent } from './merchant-detail/tabs/tab-merchant-schedules/tab-merchant-schedules.component';
import { AddTagMerchantComponent } from './merchant-detail/tabs/tab-merchant-tags/add-tag-merchant/add-tag-merchant.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    MainMerchantComponent,
    MerchantListComponent,
    MerchantsAddComponent,
    MerchantDetailComponent,
    TabMerchantTagsComponent,
    TabMerchantSettingComponent,
    TabMerchantGeneralComponent,
    TabMerchantSchedulesComponent,
    AddTagMerchantComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MerchantsRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressBarModule
  ]
})
export class MerchantsModule { }
