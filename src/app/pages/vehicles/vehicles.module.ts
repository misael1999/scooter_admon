import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { VehiclesdRoutingModule } from './vehicles-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';

import { VehiclesService } from '../../services/vehicles.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddVehiclesComponent,
    ViewVehiclesComponent],
  imports: [
    CommonModule,
    VehiclesdRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    VehiclesService
  ]
})
export class VehiclesModule { }
