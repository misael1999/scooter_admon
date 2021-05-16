import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoDeliveryComponent } from './info-delivery/info-delivery.component';
import { MainDeliveryMenComponent } from './main-delivery-men/main-delivery-men.component';

const routes: Routes = [
    { path: '', component: MainDeliveryMenComponent },
    { path: ':id/detail', component: InfoDeliveryComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DeliveryRoutingModule { }
