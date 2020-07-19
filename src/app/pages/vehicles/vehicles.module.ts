import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { VehiclesdRoutingModule } from './vehicles-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { ViewVehiclesBlockComponent } from './view-vehicles-block/view-vehicles-block.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AddVehiclesComponent,
    ViewVehiclesComponent,
    ViewVehiclesBlockComponent,
  ],
  imports: [
    CommonModule,
    VehiclesdRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],

})
export class VehiclesModule { }
