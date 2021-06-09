import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabPromotionsComponent } from './tab-promotions.component';
import { TabPromotionsRoutingModule } from './tab-promotions-routing.module';
import { TypeOfPromotionsComponent } from './type-of-promotions/type-of-promotions.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { ListPromotionsComponent } from './list-promotions/list-promotions.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TabPromotionsComponent,
    TypeOfPromotionsComponent,
    AddPromotionComponent,
    ListPromotionsComponent
  ],
  imports: [
    CommonModule,
    TabPromotionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TabPromotionsModule { }
