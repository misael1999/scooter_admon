import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { VehiclesdRoutingModule } from './vehicles-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';



@NgModule({
  declarations: [
    AddVehiclesComponent,
    ViewVehiclesComponent],
  imports: [
    CommonModule,
    VehiclesdRoutingModule,
    AngularMaterialModule
  ]
})
export class VehiclesModule { }
