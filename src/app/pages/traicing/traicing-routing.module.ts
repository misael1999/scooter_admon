import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapTraicingComponent } from './map-traicing/map-traicing.component';


const routes: Routes = [
    { path: '', component: MapTraicingComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TraicingRoutingModule { }
