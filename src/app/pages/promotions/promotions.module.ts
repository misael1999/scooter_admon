import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { MainPromotionsComponent } from './main-promotions/main-promotions.component';
import { PromotionOnShippingComponent } from './promotions-by-station/promotion-on-shipping/promotion-on-shipping.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';
@NgModule({
  declarations: [
    MainPromotionsComponent,
    PromotionOnShippingComponent,
    PromotionsListComponent,
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    AngularMaterialModule,
    SharedModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PromotionsModule { }
