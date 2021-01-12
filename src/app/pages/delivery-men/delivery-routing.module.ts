import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { InfoDeliveryComponent } from './info-delivery/info-delivery.component';

const routes: Routes = [
    { path: '', component: ListDeliveryComponent },
    { path: 'info/:id', component: InfoDeliveryComponent },
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
