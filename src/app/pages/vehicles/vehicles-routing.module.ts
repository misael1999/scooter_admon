import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { ViewVehiclesBlockComponent } from './view-vehicles-block/view-vehicles-block.component';

const routes: Routes = [
    { path: 'active', component: ViewVehiclesComponent },
    { path: 'block', component: ViewVehiclesBlockComponent },
    { path: '', redirectTo: 'active', pathMatch: 'full' }

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


