import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainClientsComponent } from './main-clients/main-clients.component';
import { InfoClientComponent } from './info-client/info-client.component';

const routes: Routes = [
    { path: '', component: MainClientsComponent },
    { path: ':id/detail', component: InfoClientComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ClientsRoutingModule { }
