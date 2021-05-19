import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPromotionsComponent } from './tab-promotions.component';
import { TabPromotionsRoutingModule } from './tab-promotions-routing.module';
import { TypeOfPromotionsComponent } from './type-of-promotions/type-of-promotions.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';



@NgModule({
  declarations: [
    TabPromotionsComponent,
    TypeOfPromotionsComponent,
    AddPromotionComponent
  ],
  imports: [
    CommonModule,
    TabPromotionsRoutingModule
  ]
})
export class TabPromotionsModule { }
