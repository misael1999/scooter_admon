import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';

const routes: Routes = [
    { path: '', component: ViewVehiclesComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class VehiclesdRoutingModule { }


