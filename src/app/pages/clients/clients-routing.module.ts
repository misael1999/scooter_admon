import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { InfoClientComponent } from './info-client/info-client.component';

const routes: Routes = [
    { path: 'list', component: ClientListComponent },
    { path: 'info', component: InfoClientComponent },
    { path: '', redirectTo: 'client', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ClientsRoutingModule {}
