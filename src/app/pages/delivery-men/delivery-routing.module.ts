import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';

const routes: Routes = [
    { path: 'list', component: ListDeliveryComponent },
    { path: 'add', component: AddDeliveryComponent },
    { path: 'info', component: AddDeliveryComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full'}
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
