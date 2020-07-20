import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { InfoDeliveryComponent } from './info-delivery/info-delivery.component';
import { ListDeliveryBlockComponent } from './list-delivery-block/list-delivery-block.component';

const routes: Routes = [
    { path: 'active', component: ListDeliveryComponent },
    { path: 'block', component: ListDeliveryBlockComponent },
    { path: 'info/:id', component: InfoDeliveryComponent },
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
export class DeliveryRoutingModule { }
