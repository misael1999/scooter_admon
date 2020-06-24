import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';

const routes: Routes = [
    { path: 'view', component: ViewVehiclesComponent },
    { path: 'add', component: AddVehiclesComponent },
    { path: '', redirectTo: 'view', pathMatch: 'full'}
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


