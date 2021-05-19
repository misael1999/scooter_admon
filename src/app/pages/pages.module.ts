import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AngularMaterialModule,
    NzDrawerModule

  ]
})
export class PagesModule { }
