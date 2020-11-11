import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainZonesComponent } from './main-zones/main-zones.component';

const routes: Routes = [
    {path: '', component: MainZonesComponent},
    // { path: '', redirectTo: 'active', pathMatch: 'full' }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ZonesRoutingModule { }


